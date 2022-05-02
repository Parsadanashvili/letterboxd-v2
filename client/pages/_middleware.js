import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function middleware (req, res) {
    const authorization = req.cookies.accessToken;

    let user = req.cookies.user;
    if(user) {
        user = JSON.parse(user);
    }

    let token = null;
    if(authorization != null) {
        token = await jwt.verify(authorization, process.env.TOKEN_SECRET);
    }

    const { pathname, origin } = req.nextUrl

    // if(token && pathname !== '/auth' && (user && !user.username)) {
    //     return NextResponse.redirect(origin + '/auth');
    // }

    // if(token && (user && !user.username) && (pathname === '/auth' || pathname === '/')) {
    //     return NextResponse.redirect(origin + '/movies');
    // }

    return NextResponse.next();
}