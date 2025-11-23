"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { AuthStatusPage } from "../components/auth-status";

export default function AuthErrorPage() {
	const router = useRouter();

	useEffect(() => {
		toast.error("Something went wrong during authentication.");
		const timer = setTimeout(() => router.replace("/auth/signin"), 2000);
		return () => clearTimeout(timer);
	}, [router]);

	return (
		<AuthStatusPage
			title="Authentication Failed"
			message="We couldn't verify your credentials. Redirecting to login..."
			variant="error"
		/>
	);
}
