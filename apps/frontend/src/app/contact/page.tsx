import {
	Facebook,
	Instagram,
	MailIcon,
	MapPinIcon,
	PhoneIcon,
	Youtube,
} from "lucide-react";

import { ContactCard } from "@/components/myComponents/cards/ContactCard";
import ContactForm from "@/components/myComponents/forms/ContactForm";

export default function Contact() {
	return (
		<main className="relative flex size-full min-h-screen w-full justify-center p-4 md:pt-20">
			<div className="mx-auto max-w-5xl h-max ">
				<ContactCard
					title="Get in touch"
					description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
					contactInfo={[
						{
							icon: PhoneIcon,
							label: "Phone",
							value: "+91 911009918",
							url: "#",
						},
						{
							icon: MailIcon,
							label: "Email",
							value: "surajgoraicse@gmail.com",
							url: "#",
						},
						{
							icon: MapPinIcon,
							label: "Address",
							value: "Jamshedpur, Jharkhand",
							url: "#",
						},
						{
							icon: Instagram,
							label: "Address",
							value: "Jamshedpur, Jharkhand",
							url: "#",
						},
						{
							icon: Facebook,
							label: "Address",
							value: "Jamshedpur, Jharkhand",
							url: "#",
						},
						{
							icon: Youtube,
							label: "Address",
							value: "Jamshedpur, Jharkhand",
							url: "#",
						},
					]}
				>
					<ContactForm />
				</ContactCard>
			</div>
		</main>
	);
}
