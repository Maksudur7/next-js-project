import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    let isAuthenticated = false;
    let isAdmin = false;
    const { data } = userService.getSelection()

    if (data) {
        isAuthenticated = true
        isAdmin = data.user.role === Roles.admin;
    }
    //* User in not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    //*User authenticated and role = admin
    //* User can not visit user dashboard
    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    //*User authenticated and role = user
    //* User can not visit admin dashboard
    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));

    }
    return NextResponse.next()
}
export const config = {
    matcher: ["/dashboard", "/admin-dashboard", "/dashboard/:path*", "/admin-dashboard/path*"]
}