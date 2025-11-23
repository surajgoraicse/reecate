"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { AuthStatusPage } from "../components/auth-status";

export default function AuthCallbackPage() {
	const router = useRouter();

	useEffect(() => {
		const verifySession = async () => {
			try {
				const session = await authClient.getSession();

				if (session?.data && session?.data.user) {
					toast.success(
						`Welcome back, ${session.data.user.name || "User"}!`
					);
					setTimeout(() => router.replace("/"), 1500);
				} else {
					toast.error("Authentication failed. Please try again.");
					setTimeout(() => router.replace("/auth/signin"), 1500);
				}
			} catch {
				toast.error(
					"Something went wrong while verifying your session."
				);
				setTimeout(() => router.replace("/auth/signin"), 1500);
			}
		};

		verifySession();
	}, [router]);

	return (
		<AuthStatusPage
			title="Signing you in..."
			message="Please wait while we verify your credentials."
			variant="loading"
		/>
	);
}
