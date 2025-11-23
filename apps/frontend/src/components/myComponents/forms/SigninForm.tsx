import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, handleFacebookSignIn, handleGoogleSignIn } from "@/lib/auth-client";
import { SignInForm, SignInFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FacebookIcon, GoogleIcon } from "../icons";

// --- TYPE DEFINITIONS ---
export interface Testimonial {
	avatarSrc: string;
	name: string;
	handle: string;
	text: string;
}

interface SignInPageProps {
	title?: React.ReactNode;
	description?: React.ReactNode;
	heroImageSrc?: string;
	testimonials?: Testimonial[];
}

const TestimonialCard = ({
	testimonial,
	delay,
}: {
	testimonial: Testimonial;
	delay: string;
}) => (
	<div
		className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-card/40 dark:bg-zinc-800/40 backdrop-blur-xl border border-white/10 p-5 w-64`}
	>
		<img
			src={testimonial.avatarSrc}
			className="h-10 w-10 object-cover rounded-2xl"
			alt="avatar"
		/>
		<div className="text-sm leading-snug">
			<p className="flex items-center gap-1 font-medium">
				{testimonial.name}
			</p>
			<p className="text-muted-foreground">{testimonial.handle}</p>
			<p className="mt-1 text-foreground/80">{testimonial.text}</p>
		</div>
	</div>
);



const handleResetPassword = () => {
	alert("Reset Password clicked");
};

const handleCreateAccount = () => {
	alert("Create Account clicked");
};

// --- MAIN COMPONENT ---

export const SignInPage: React.FC<SignInPageProps> = ({
	title = (
		<span className="font-light text-foreground tracking-tighter">
			Welcome
		</span>
	),
	description = "Access your account and continue your journey with us",
	heroImageSrc,
	testimonials = [],
}) => {
	const form = useForm<SignInForm>({
		resolver: zodResolver(SignInFormSchema),
	});
	const handleSignIn = async (values: SignInForm) => {
		try {
			console.log(values);
			const signIn = await authClient.signIn.email({
				email: values.email,
				password: values.password,
			});
			console.log(signIn);
			if (signIn.error) {
				toast.error(signIn.error.code);
			} else {
				toast.success("Signed In Successfully");
				form.reset({ email: "", password: "" });
				redirect("/");
			}
		} catch (error) {
			console.log("error submitting form ", error);
			toast.error("Unable To Signin");
		}
	};
	return (
		<div className="h-[calc(100dvh-5rem)]  flex flex-col md:flex-row  font-geist w-full">
			{/* Left column: sign-in form */}
			<section className="flex-1 flex items-center justify-center p-8  ">
				<div className="w-full max-w-md">
					<div className="flex flex-col gap-6">
						<h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
							{title}
						</h1>
						<p className="animate-element animate-delay-200 text-muted-foreground">
							{description}
						</p>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleSignIn)}
								className="space-y-8"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl className="">
												<Input
													placeholder="surajgoraicse@gmail.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="password"
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button className="w-full py-5" type="submit">
									Submit
								</Button>
							</form>
						</Form>

						<div className="animate-element animate-delay-700 relative flex items-center justify-center">
							<span className="w-full border-t border-border"></span>
							<span className="px-4 text-sm text-muted-foreground bg-background absolute">
								Or continue with
							</span>
						</div>
						<div className="flex ">
							<button
								onClick={handleGoogleSignIn}
								className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-l-2xl py-4 hover:bg-secondary transition-colors"
							>
								<GoogleIcon />
								Google
							</button>
							<button
								onClick={handleFacebookSignIn}
								className="animate-element animate-delay-800 w-full flex items-center justify-center gap-3 border border-border rounded-r-2xl py-4 hover:bg-secondary transition-colors"
							>
								<FacebookIcon />
								Facebook
							</button>
						</div>
						<div>
							<p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
								New to our platform?{" "}
								<Link
									href="/signup"
									className="text-violet-400 hover:underline transition-colors"
								>
									Create Account
								</Link>
							</p>
							<p className="animate-element animate-delay-900 text-center text-sm text-muted-foreground">
								<Link
									href="/signup"
									className="text-violet-400 hover:underline transition-colors"
								>
									Reset Password
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Right column: hero image + testimonials */}
			{heroImageSrc && (
				<section className="hidden md:block flex-1 relative p-4  ">
					<div
						className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
						style={{ backgroundImage: `url(${heroImageSrc})` }}
					></div>
					{testimonials.length > 0 && (
						<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
							<TestimonialCard
								testimonial={testimonials[0]}
								delay="animate-delay-1000"
							/>
							{testimonials[1] && (
								<div className="hidden xl:flex">
									<TestimonialCard
										testimonial={testimonials[1]}
										delay="animate-delay-1200"
									/>
								</div>
							)}
							{testimonials[2] && (
								<div className="hidden 2xl:flex">
									<TestimonialCard
										testimonial={testimonials[2]}
										delay="animate-delay-1400"
									/>
								</div>
							)}
						</div>
					)}
				</section>
			)}
		</div>
	);
};
