import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {isEmpty} from "lodash";

export async function middleware (req) {
    let token = null;
    let user;

    const authorization = req.cookies.accessToken;
    const authUser = req.cookies?.user;
    if(!isEmpty(authUser)) {
        user = JSON.parse(req.cookies?.user);
    }

    if(!isEmpty(authorization)) {
        token = await jwt.verify(authorization, process.env.TOKEN_SECRET);
    }

    const { pathname, origin } = req.nextUrl

    if(token && pathname !== '/auth' && (user && !user.username)) {
        return NextResponse.redirect(origin + '/auth');
    }

    return NextResponse.next();
}