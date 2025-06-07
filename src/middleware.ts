import { authMiddleware } from '../middlewares/authMiddleware';
import { branchMiddleware } from '../middlewares/branchMiddleware';
import { featureMiddleware } from '../middlewares/featureMiddleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Gunakan Auth Middleware (Validasi Login)
    let response = authMiddleware(req);
    if (response) return response;

    // Gunakan Branch Middleware (Validasi Branch)
    response = branchMiddleware(req);
    if (response) return response;

    // Gunakan Feature Middleware (Validasi Fitur)
    response = featureMiddleware(req);
    if (response) return response;

    return NextResponse.next(); // Jika semua validasi lolos
}

export const config = {
    matcher: [
        '/',
        '/page/:path*', // Middleware berjalan di semua rute di bawah /page
    ],
};


export function parseJwt(token: string) {
    try {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
    } catch (err) {
        return null;
    }
}