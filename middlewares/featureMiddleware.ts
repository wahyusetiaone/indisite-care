import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {parseJwt} from "@/middleware";

export function featureMiddleware(req: NextRequest) {
    const token = req.cookies.get('accessToken');
    const userData = parseJwt(token?.value || '');

    if (!userData) return NextResponse.redirect(new URL('/login', req.url)); // Redirect jika token invalid

    const branches = userData.account_data.branches || [];
    const currentBranchCode = req.nextUrl.searchParams.get('branch'); // Asumsi branch dari URL query
    const currentFeatureCode = req.nextUrl.searchParams.get('feature'); // Asumsi feature dari URL query

    // Temukan branch yang cocok
    const branch = branches.find(branch => branch.code === currentBranchCode);
    if (!branch) {
        return NextResponse.redirect(new URL('/not-authorized', req.url));
    }

    // Validasi apakah fitur tersedia untuk branch ini
    if (
        currentFeatureCode &&
        !branch.branchType.features.some(feature => feature.code === currentFeatureCode)
    ) {
        return NextResponse.redirect(new URL('/not-authorized', req.url));
    }

    return NextResponse.next(); // Fitur diizinkan
}