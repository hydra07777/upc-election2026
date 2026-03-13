import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
    const { folder } = await request.json().catch(() => ({ folder: 'upc-election' }));

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        return NextResponse.json({ error: 'Missing Cloudinary env vars' }, { status: 500 });
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

    return NextResponse.json({
        cloudName,
        apiKey,
        timestamp,
        folder,
        signature,
    });
}
