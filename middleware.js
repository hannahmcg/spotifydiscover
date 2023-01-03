 import { getToken } from 'next-auth/jwt';
 import { NextResponse, URLPattern } from 'next/server';
 
 
 
 export async function middleware(req) {

    const token = await getToken({req, secret: process.env.JWT_SECRET});

    const { pathname } = req.nextUrl;


    // allow requests if following is true:
    // 1) its a request for a next-auth session & provider fetching 
    // 2) token exists 
    
    if (pathname.startsWith("/_next") || token ) return NextResponse.next();

   // if (pathname.startsWith("/_next")) return NextResponse.next();

    if (pathname === "/") {
        req.nextUrl.pathname = "/login";
        return NextResponse.redirect(req.nextUrl);
      }
    
      return NextResponse.next();


 }