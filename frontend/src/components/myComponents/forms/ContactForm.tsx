"use client";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
	name: z.string().min(2, { message: "Name is Required" }),
	email: z.string().email({ message: "Invalid email" }),
	phoneNumber: z
		.string()
		.regex(/^(?:\+91\d{10}|\d{10})$/, "Invalid phone number"),
	message: z.string().min(2, { message: "Message is Required" }),
});
export type ContactFormType = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
	// define the form

	const form = useForm<ContactFormType>({
		resolver: zodResolver(contactFormSchema),
	});

	function submitForm(values: ContactFormType) {
		// submit the form here

		console.log(values);
		console.log("form submitted");
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submitForm)}
				className="space-y-4 w-full"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="flex flex-col gap-2">
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
									className="resize-y"
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default ContactForm;
