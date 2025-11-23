import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	console.log("path : ", path);
}
