import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parseJwt } from '@/middleware'; // Fungsi utilitas untuk decode token

export function authMiddleware(req: NextRequest) {
    const token = req.cookies.get('accessToken');

    // Jika tidak ada token, redirect ke login
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Decode token untuk memvalidasi data pengguna
    const userData = parseJwt(token.value);

    // Jika token invalid atau telah expired, redirect ke login
    if (!userData || userData.exp < Date.now() / 1000) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Jika user sudah login dan mencoba mengakses /login, redirect ke /dashboard
    if (req.nextUrl.pathname === '/login') {
        const dashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next(); // Melanjutkan request ke halaman lainnya
}