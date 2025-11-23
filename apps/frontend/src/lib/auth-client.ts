import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
export const authClient = createAuthClient({
	baseURL: "http://localhost:8000",
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: "string",
					required: true,
					default: "USER",
					input: false,
				},
				userName: {
					type: "string",
					required: true,
				},
			},
		}),
	],
});

export const signOut = async () => {
	await authClient.signOut({
		fetchOptions: {
			onSuccess: () => {
				toast.success("Signed out successfully");
				redirect("/auth/signin");
			},
		},
	});
};

// export const handleGoogleSignIn = async () => {
// 	const { error } = await authClient.signIn.social({
// 		provider: "google",
// 		callbackURL: "http://localhost:3000/temp",
// 		errorCallbackURL: "http://localhost:3000/error",
// 		newUserCallbackURL: "http://localhost:3000/welcome",
// 	});
// 	if (error) {
// 		toast.error(error.message || "Failed to sign in with Google");

// 		return;
// 	} else {
// 		// wait for 2 sec
// 		await new Promise((resolve) => {
// 			setTimeout(resolve, 2000);
// 		});
// 		toast.success("Signed in successfully");
// 	}
// };

export const handleGoogleSignIn = async () => {
	try {
		await authClient.signIn.social({
			provider: "google",
			callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
			errorCallbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/error`,
			newUserCallbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/welcome`,
		});
	} catch (error: any) {
		toast.error(error?.message || "Failed to start Google sign-in");
	}
};

export const handleGithubSignIn = async () => {
	const { error } = await authClient.signIn.social({
		provider: "github",
		callbackURL: "http://localhost:3000/temp",
		errorCallbackURL: "http://localhost:3000/error",
		newUserCallbackURL: "http://localhost:3000/welcome",
	});
	if (error) {
		toast.error(error.code);
		return;
	} else {
		// wait for 2 sec
		new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});
		toast.success("Signed in successfully");
	}
};
export const handleFacebookSignIn = async () => {
	const { error } = await authClient.signIn.social({
		provider: "facebook",
		callbackURL: "http://localhost:3000/temp",
		errorCallbackURL: "http://localhost:3000/error",
		newUserCallbackURL: "http://localhost:3000/welcome",
	});
	if (error) {
		toast.error(error.code);
		return;
	} else {
		// wait for 2 sec
		new Promise((resolve) => {
			setTimeout(resolve, 2000);
		});
		toast.success("Signed in successfully");
	}
};
