import z from "zod";

export const SignUpFormSchema = z.object({
	email: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "Email is required"
					: "Invalid email input",
		})
		.email("Invalid Email"),

	password: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "Password is required"
					: "Invalid password input",
		})
		.min(8, { error: "Password should be greater than 8 characters" }),

	username: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "Username is required"
					: "Invalid username input",
		})
		.min(3, { error: "Username should contain at least 3 characters" }),

	name: z
		.string({
			error: (issue) =>
				issue.input === undefined
					? "Name is required"
					: "Invalid name input",
		})
		.min(2, { error: "Name should contain at least 2 characters" }),

	termsCondition: z.boolean({
		error: (issue) =>
			issue.input === undefined
				? "You must accept the terms"
				: "Invalid checkbox value",
	}),
});

export type SignUpForm = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "Email is required")
		.email("Please enter a valid email"),
	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters long")
		.max(64, "Password must not exceed 64 characters"),
});

export type SignInForm = z.infer<typeof SignInFormSchema>;
