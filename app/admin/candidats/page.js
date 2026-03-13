import { createAdminSupabaseClient } from '../../../lib/supabase/admin';
import AdminCandidateClient from './ui';

export default async function AdminCandidatsPage() {
    const supabase = createAdminSupabaseClient();
    const { data } = await supabase.from('candidat').select('*').order('created_at', { ascending: false });

    return <AdminCandidateClient initialCandidats={data ?? []} />;
}
