'use server';

import { createServerSupabaseClient } from '../../lib/supabase/server';
import { headers } from 'next/headers';
import { createHash } from 'crypto';

export async function submitVote(candidat_id, id_faculty, id_grade) {


    if (!candidat_id || !id_faculty || !id_grade) {

        throw new Error('Champs manquants');
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') ?? headersList.get('x-real-ip') ?? 'unknown';
    const ip_hash = createHash('sha256').update(ip).digest('hex');

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.from('vote').insert({
        candidat_id,
        id_faculty,
        id_grade,
        ip_hash: ip,
        voted_at: new Date().toISOString(),
    });

    const { error: error2 } = await supabase.from('visiteur').insert({
        fingerprint: ip_hash,
        has_voted: true,
        last_seen: new Date().toISOString(),
    })

    if (error) throw new Error(error.message);
    if (error2) throw new Error(error2.message);


}

