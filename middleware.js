import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(req => {
    if (req.nextUrl.pathname.startsWith('/candidates-dashboard') && req.nextauth.token?.type !== "candidate") return NextResponse.redirect(new URL('/', req.url))
    else if (req.nextUrl.pathname.startsWith('/employers-dashboard') && req.nextauth.token?.type !== "employer") return NextResponse.redirect(new URL('/', req.url))
    else if (req.nextUrl.pathname === '/candidates' && req.nextauth.token?.type !== "employer") return NextResponse.redirect(new URL('/', req.url))
    return
})

export const config = {
    matcher: [
        "/candidates-dashboard/:path*",
        "/employers-dashboard/:path*",
        "/candidates",
    ]
}