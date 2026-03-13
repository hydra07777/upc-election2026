import { createAdminSupabaseClient } from '../../../lib/supabase/admin';
import AdminSettingsClient from './ui';

export default async function AdminSettingsPage() {
    const supabase = createAdminSupabaseClient();
    const { data } = await supabase.from('settings').select('*').order('key', { ascending: true });
    return <AdminSettingsClient initialSettings={data ?? []} />;
}
