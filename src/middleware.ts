import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let data = false;

    if (path === "/login" && data) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (path === "/" && !data) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}
