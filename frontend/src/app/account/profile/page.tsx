import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

const page = () => {
	return (
		<div>
			<h1 className="text-4xl font-display font-bold mb-8">My Profile</h1>

			<div className="text-center py-20">
				<User className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
				<h2 className="text-2xl font-display font-bold mb-4">
					Authentication Coming Soon
				</h2>
				<p className="text-muted-foreground mb-8">
					Sign in to view your profile and order history
				</p>
				<Button asChild size="lg">
					<Link href="/">Go Home</Link>
				</Button>
			</div>
		</div>
	);
};

export default page;
