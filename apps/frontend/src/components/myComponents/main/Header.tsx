"use client";
import { Button } from "@/components/ui/button";
import { authClient, signOut } from "@/lib/auth-client";
import { LogOut, Shield, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileView from "./MobileView";
import MyNavigationMenu from "./MyNavigationMenu";

const Header = () => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);

	useEffect(() => {
		(async function getSession() {
			const { data: session, error } = await authClient.getSession();

			if (error) {
				console.log("error fetching session ", error);
				return;
			}
			console.log("session ", session);

			if (session?.user.role === "ADMIN") {
				setIsAdmin(true);
				setIsUser(false);
			} else if (session?.user.role === "USER") {
				setIsAdmin(false);
				setIsUser(true);
			} else {
				setIsAdmin(false);
				setIsUser(false);
			}
		})();
	}, [isAdmin, isUser]);

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
						{isUser ? (
							<>
								<Button variant="ghost" size="icon" asChild>
									<Link href="/account/profile">
										<User className="h-5 w-5" />
									</Link>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={signOut}
								>
									<LogOut className="h-5 w-5" />
								</Button>
							</>
						) : (
							<Button variant="ghost" size="sm" asChild>
								<Link href="/auth/signin">Sign In</Link>
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
