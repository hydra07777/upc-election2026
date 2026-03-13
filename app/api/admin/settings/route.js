import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/auth/admin';
import { createAdminSupabaseClient } from '../../../../lib/supabase/admin';

export async function GET() {
    const auth = await requireAdmin();
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase.from('settings').select('*').order('key', { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
}

export async function PUT(request) {
    const auth = await requireAdmin();
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const items = Array.isArray(body?.items) ? body.items : [];

    const supabase = createAdminSupabaseClient();

    const updates = items
        .filter((it) => typeof it?.key === 'string')
        .map((it) => ({ key: it.key, value: it.value ?? null, updated_at: new Date().toISOString() }));

    if (updates.length > 0) {
        const { error } = await supabase.from('settings').upsert(updates, { onConflict: 'key' });
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data, error: readError } = await supabase.from('settings').select('*').order('key', { ascending: true });
    if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

    return NextResponse.json({ data });
}
