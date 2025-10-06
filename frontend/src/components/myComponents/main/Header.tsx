"use client";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/useAuth";
import { LogOut, Shield, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import MobileView from "./MobileView";
import MyNavigationMenu from "./MyNavigationMenu";
// import MobileView from "./myComponents/main/MobileView";
// import MyNavigationMenu from "./myComponents/main/MyNavigationMenu";

const Header = () => {
	// const { user, isAdmin } = useAuth();
	// const { toast } = useToast();
	// const navigate = useNavigate();

	// const handleSignOut = async () => {
	// 	// const { error } = await signOut();
	// 	const error = null;
	// 	if (error) {
	// 		toast({
	// 			title: "Error",
	// 			// description: error.message,
	// 			variant: "destructive",
	// 		});
	// 	} else {
	// 		toast({
	// 			title: "Success",
	// 			description: "Signed out successfully!",
	// 		});
	// 		navigate("/");
	// 	}
	// };
	const isAdmin = false;
	const user = true;

	const handleSignOut = async () => {};

	return (
		<header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
							Reecate
						</h1>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<MyNavigationMenu />
					</nav>

					{/* Actions */}
					<div className="flex items-center space-x-4">
						{isAdmin && (
							<Button variant="ghost" size="sm" asChild>
								<Link href="/admin">
									<Shield className="h-4 w-4 mr-2" />
									<span className="hidden lg:inline">
										Admin
									</span>
								</Link>
							</Button>
						)}
						{user ? (
							<>
								<Button variant="ghost" size="icon" asChild>
									<Link href="/profile">
										<User className="h-5 w-5" />
									</Link>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={handleSignOut}
								>
									<LogOut className="h-5 w-5" />
								</Button>
							</>
						) : (
							<Button variant="ghost" size="sm" asChild>
								<Link href="/auth">Sign In</Link>
							</Button>
						)}
						<Button
							variant="ghost"
							size="icon"
							asChild
							className="relative"
						>
							<Link href="/cart">
								<ShoppingBag className="h-5 w-5" />
								<span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
									0
								</span>
							</Link>
						</Button>

						<MobileView />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
