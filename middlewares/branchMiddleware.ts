import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {parseJwt} from "@/middleware";

export function branchMiddleware(req: NextRequest) {
    const token = req.cookies.get('accessToken');
    const userData = parseJwt(token?.value || '');

    if (!userData) return NextResponse.redirect(new URL('/login', req.url)); // Redirect jika token invalid

    const branches = userData.account_data.branches || [];
    const currentBranchCode = req.nextUrl.searchParams.get('branch'); // Asumsi branch di URL query

    // Jika tidak ada branch cocok, redirect ke halaman error
    if (currentBranchCode && !branches.some(branch => branch.code === currentBranchCode)) {
        return NextResponse.redirect(new URL('/not-authorized', req.url));
    }

    return NextResponse.next();
}