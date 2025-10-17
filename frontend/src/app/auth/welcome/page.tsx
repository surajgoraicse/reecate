"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthStatusPage } from "../components/auth-status";

export default function WelcomePage() {
	const router = useRouter();

	useEffect(() => {
		toast.success("Welcome to our platform! 🎉");
		const timer = setTimeout(() => router.replace("/"), 2000);
		return () => clearTimeout(timer);
	}, [router]);

	return (
		<AuthStatusPage
			title="Welcome aboard!"
			message="Setting up your account. You’ll be redirected shortly."
			variant="success"
		/>
	);
}
