import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/auth/admin';
import { createAdminSupabaseClient } from '../../../../lib/supabase/admin';

export async function GET() {
    const auth = await requireAdmin();
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const supabase = createAdminSupabaseClient();
    const { data, error } = await supabase.from('candidat').select('*').order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
}

export async function POST(request) {
    const auth = await requireAdmin();
    if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const supabase = createAdminSupabaseClient();

    const { data, error } = await supabase
        .from('candidat')
        .insert({
            nom: body.nom,
            slogan: body.slogan ?? null,
            programme: body.programme ?? null,
            photo_url: body.photo_url ?? null,
            photo_url2: body.photo_url2 ?? null,
        })
        .select('*')
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
}
