import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function middleware (req, res) {
    const authorization = req.cookies.accessToken;

    let token = null;
    if(authorization != null) {
        token = await jwt.verify(authorization, process.env.TOKEN_SECRET);
    }

    const { pathname, origin } = req.nextUrl

    if(token && (pathname === '/auth' || pathname === '/')) {
        return NextResponse.redirect(origin + '/movies');
    }

    return NextResponse.next();
}