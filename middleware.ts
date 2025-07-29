export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // Only protect specific admin/private routes, not the general dashboard
    "/dashboard/admin/:path*",
    "/api/dashboard/:path*",
  ],
};
