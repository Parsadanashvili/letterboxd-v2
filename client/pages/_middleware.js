import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function middleware (req) {
    const authorization = req.cookies.accessToken;

    let user = JSON.parse(req.cookies.user ?? '{}');

    let token = null;
    if(authorization != null) {
        token = await jwt.verify(authorization, process.env.TOKEN_SECRET);
    }

    const { pathname, origin } = req.nextUrl

    if(token && pathname !== '/auth' && (user && !user.username)) {
        return NextResponse.redirect(origin + '/auth');
    }

    return NextResponse.next();
}