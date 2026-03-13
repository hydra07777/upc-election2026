-- =============================================================
--  SCHEMA ELECTIONS — Supabase / PostgreSQL
-- =============================================================

-- Extensions
create extension if not exists "pgcrypto";
-- pour gen_random_uuid()

-- =============================================================
--  TABLE : candidat
-- =============================================================
create table if not exists candidat (
    id uuid primary key default gen_random_uuid (),
    nom text not null,
    slogan text,
    programme text,
    photo_url text,
    photo_url2 text,
    created_at timestamptz not null default now()
);

-- =============================================================
--  TABLE : visiteur
--  Représente un électeur anonyme (pas de compte requis)
-- =============================================================
create table if not exists visiteur (
    id uuid primary key default gen_random_uuid (),
    fingerprint text not null unique, -- hash navigateur (user-agent, langue, résolution…)
    has_voted boolean not null default false,
    has_linked boolean not null default false, -- a-t-il lié cree un lien ?
    first_seen timestamptz not null default now(),
    last_seen timestamptz not null default now()
);

create index if not exists idx_visiteur_fingerprint on visiteur (fingerprint);

-- =============================================================
--  TABLE : vote
--  Un visiteur → au plus un vote → un candidat
-- =============================================================
create table if not exists vote (
  id           uuid        primary key default gen_random_uuid(),
  candidat_id  uuid        not null references candidat(id) on delete restrict,
  voted_at     timestamptz not null default now(),
  ip_hash      text,                           -- SHA-256 de l'IP (RGPD-friendly)

-- Garantit qu'un visiteur ne peut voter qu'une seule fois

);

create index if not exists idx_vote_candidat on vote (candidat_id);

-- =============================================================
--  TABLE : admin_user
--  Comptes administrateurs (organisateurs de l'élection)
--  Distinct des visiteurs/électeurs
-- =============================================================
create table if not exists admin_user (
    id uuid primary key default gen_random_uuid (),
    nom text not null,
    email text not null unique,
    -- Le mot de passe est géré par Supabase Auth (auth.users)
    -- Ce champ pointe vers l'uid Supabase Auth
    auth_uid uuid unique,
    created_at timestamptz not null default now()
);

-- =============================================================
--  TABLE : settings
--  Configuration de l'élection en modèle clé/valeur
-- =============================================================
create table if not exists settings (
    key text primary key,
    value text,
    description text, -- documentation interne de la clé
    updated_at timestamptz not null default now()
);

-- =============================================================
--  VUE : resultats
--  Calcule les votes à la volée (pas de compteur dénormalisé)
-- =============================================================
create or replace view resultats as
  select
    c.id,
    c.nom,
    c.slogan,
    c.photo_url,
    count(v.id)                                          as nb_votes,
    round(
      count(v.id)::numeric
      / nullif((select count(*) from vote), 0) * 100,
      2
    )                                                    as pourcentage
  from candidat c
  left join vote v on v.candidat_id = c.id
  group by c.id
  order by nb_votes desc;

-- =============================================================
--  FUNCTION + TRIGGER : met à jour has_voted sur visiteur
--  après insertion dans vote
-- =============================================================
create or replace function sync_has_voted()
returns trigger language plpgsql as $$
begin
  update visiteur
  set has_voted = true,
      last_seen = now()
  where id = new.visiteur_id;
  return new;
end;
$$;

create trigger trg_sync_has_voted
after insert on vote
for each row execute procedure sync_has_voted();

-- =============================================================
--  ROW LEVEL SECURITY (Supabase)
-- =============================================================

alter table candidat enable row level security;

alter table visiteur enable row level security;

alter table vote enable row level security;

alter table settings enable row level security;

alter table admin_user enable row level security;

-- Candidats : lecture publique, écriture admin seulement
create policy "candidats_lecture_publique" on candidat for
select using (true);

-- Visiteurs : chaque visiteur ne peut lire/modifier que sa propre ligne
create policy "visiteur_own_row"
  on visiteur for all
  using (id = current_setting('app.visiteur_id', true)::uuid);

-- Votes : insertion libre (contrôlée par la contrainte UNIQUE),
--         lecture interdite au public (confidentialité du vote)
create policy "vote_insertion"
  on vote for insert
  with check (visiteur_id = current_setting('app.visiteur_id', true)::uuid);

-- Settings : lecture publique, écriture admin seulement
create policy "settings_lecture_publique" on settings for
select using (true);

-- =============================================================
--  DONNÉES D'EXEMPLE
-- =============================================================

-- Paramètres de l'élection
insert into
    settings (key, value, description)
values (
        'date_election',
        '2025-04-15 08:00:00+02',
        'Date et heure d''ouverture du vote'
    ),
    (
        'date_cloture',
        '2025-04-15 18:00:00+02',
        'Date et heure de clôture'
    ),
    (
        'allow_vote',
        'true',
        'Activer / désactiver le vote'
    ),
    (
        'show_results',
        'false',
        'Afficher les résultats publiquement'
    ),
    (
        'vues',
        0,
        'Titre affiché sur la page'
    ),
    on conflict (key) do nothing;

-- Candidats
insert into
    candidat (
        nom,
        slogan,
        programme,
        photo_url
    )
values (
        'Liste Horizon',
        'Ensemble, construisons demain',
        'Notre programme : refonte du local étudiant, soirées thématiques mensuelles, partenariats entreprises pour les stages, navette campus.',
        'https://example.com/photos/horizon.jpg'
    ),
    (
        'Liste Étincelle',
        'L''énergie qui manquait',
        'Priorités : associations sportives, tarifs resto U négociés, agenda culturel hebdo, boîte à idées permanente.',
        'https://example.com/photos/etincelle.jpg'
    ),
    (
        'Liste Racines',
        'Proches de vous, proches du campus',
        'Actions concrètes : permanences hebdomadaires, entraide entre promos, fonds d''urgence solidaire.',
        'https://example.com/photos/racines.jpg'
    ) on conflict (id) do nothing;

-- Visiteurs (électeurs anonymes)

-- Votes (seulement pour les visiteurs qui ont voté)
insert into
    vote (candidat_id, ip_hash)
values (
        'a1000000-0000-0000-0000-000000000001', -- vote pour Horizon
        encode (
            digest ('192.168.1.42', 'sha256'),
            'hex'
        )
    ),
    (
        'a1000000-0000-0000-0000-000000000002', -- vote pour Étincelle
        encode (
            digest ('192.168.1.77', 'sha256'),
            'hex'
        )
    ) on conflict do nothing;

-- =============================================================
--  REQUÊTES UTILES (commentées — à copier selon besoin)
-- =============================================================

-- Résultats en temps réel
-- select * from resultats;

-- Vérifier si un visiteur a déjà voté
-- select has_voted from visiteur where fingerprint = 'fp_hash_abc123';

-- Nombre total de votants
-- select count(*) from vote;

-- Taux de participation (si on connaît le nombre d'inscrits)
-- select round(count(*)::numeric / 500 * 100, 1) || '%' as participation from vote;