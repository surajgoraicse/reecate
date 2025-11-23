"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactFormSchema = z.object({
	phoneNumber: z
		.string()
		.regex(/^(?:\+91\d{10}|\d{10})$/, "Invalid phone number"),
	message: z.string().min(2, { message: "Message is Required" }),
});
export type ContactFormType = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
	const form = useForm<ContactFormType>({
		resolver: zodResolver(contactFormSchema),
	});
	async function submitContactForm(values: ContactFormType) {
		// submit the form here
		try {
			console.log(values);

			const res = await axios.post("/api/v1/user/contact-form", {
				message: values.message,
				phoneNumber: values.phoneNumber,
			});

			if (res.status != 201) {
				toast.error("Something Went Wrong");
				return;
			}
			console.log(res.data);
			toast.success("Registration successful!");
			form.reset({ phoneNumber: "", message: "" });
		} catch (error: any) {
			toast.error(error.message);
			console.error("errors ",error);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitContactForm)}
				className="space-y-4 w-full "
			>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input placeholder="+91911009918" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel>message</FormLabel>
							<FormControl>
								<Textarea
									className="resize-y min-h-40"
									placeholder="message"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Enter Your Message Here
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="flex items-center gap-2"
				>
					{" "}
					{form.formState.isSubmitting ? (
						<>
							{" "}
							<Loader2 className="h-4 w-4 animate-spin" />{" "}
							Submitting...{" "}
						</>
					) : (
						"Submit"
					)}{" "}
				</Button>
			</form>
		</Form>
	);
};

export default ContactForm;
