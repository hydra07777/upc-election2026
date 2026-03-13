import { createServerSupabaseClient } from '../supabase/server';
import { createAdminSupabaseClient } from '../supabase/admin';

export async function requireAdmin() {
    const supabase = await createServerSupabaseClient();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        return { ok: false, status: 401, error: userError.message };
    }

    if (!user) {
        return { ok: false, status: 401, error: 'Not authenticated' };
    }

    const adminClient = createAdminSupabaseClient();
    const { data: adminRow, error: adminError } = await adminClient
        .from('admin_user')
        .select('id,email,auth_uid')
        .or(`email.eq.${user.email},auth_uid.eq.${user.id}`)
        .maybeSingle();

    if (adminError) {
        return { ok: false, status: 500, error: adminError.message };
    }

    if (!adminRow) {
        return { ok: false, status: 403, error: 'Not an admin' };
    }

    return { ok: true, user, admin: adminRow };
}
