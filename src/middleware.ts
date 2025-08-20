import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type Decode = {
  role: string;
};

export function middleware(request: NextRequest) {
  console.log("🔥 Middleware running for:", request.nextUrl.pathname);

  const token = request.cookies.get("accessToken")?.value;
  console.log("🍪 Token found:", !!token);

  if (!token) {
    console.log("❌ No token, continuing to page...");
    return NextResponse.next();
  }

  try {
    const decoded: Decode = jwtDecode(token);
    console.log("🔑 Decoded token:", decoded);
    console.log("✅ Decoded role:", decoded.role);
    console.log("📍 Current path:", request.nextUrl.pathname);

    if (decoded.role === "admin" && request.nextUrl.pathname === "/") {
      console.log("🔄 REDIRECTING ADMIN TO DASHBOARD");
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (decoded.role === "doctor" && request.nextUrl.pathname === "/") {
      console.log("🔄 REDIRECTING ADMIN TO DASHBOARD");
      return NextResponse.redirect(new URL("/doctor", request.url));
    } else {
      console.log("➡️ No redirect needed");
    }
  } catch (err) {
    console.log("❌ JWT decode error:", err);
    return NextResponse.next();
  }

  console.log("✅ Continuing to page...");
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
