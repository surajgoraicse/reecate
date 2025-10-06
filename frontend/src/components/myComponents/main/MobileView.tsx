"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	Facebook,
	Home,
	Instagram,
	LayoutGrid,
	Linkedin,
	LogIn,
	LogOut,
	Menu,
	ShoppingBag,
	ShoppingCart,
	User,
	Youtube,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileView() {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // placeholder auth state

	const navLinks = [
		{ name: "Home", icon: Home, href: "/" },
		{ name: "Shop", icon: ShoppingBag, href: "/shop" },
		{ name: "Men", icon: LayoutGrid, href: "/categories" },
		{ name: "Kids", icon: LayoutGrid, href: "/categories" },
		{ name: "Cart", icon: ShoppingCart, href: "/cart" },
		{ name: "Profile", icon: User, href: "/profile" },
	];

	return (
		<div className="md:hidden">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="text-primary hover:bg-primary/10 transition-colors"
					>
						<Menu className="h-6 w-6" />
					</Button>
				</SheetTrigger>

				<SheetContent
					side="right"
					className="
            w-[80%] sm:w-[400px] 
            bg-gradient-to-b from-pink-100 via-white to-blue-100 
            dark:from-slate-900 dark:via-slate-950 dark:to-slate-900
            border-l-0 shadow-2xl p-6 flex flex-col justify-between
            transition-all duration-300
          "
				>
					<div>
						{/* Logo / Site Name */}
						<div className="flex items-center justify-between mb-4">
							<Link
								href="/"
								className="text-2xl font-bold text-pink-600 dark:text-blue-400"
							>
								ShopVerse
							</Link>
						</div>

						{/* Search Bar */}
						<div className="mb-4">
							<Input
								placeholder="Search products..."
								className="border-pink-200 focus:ring-2 focus:ring-pink-400 dark:bg-slate-800 dark:border-slate-700"
							/>
						</div>

						<Separator className="mb-4 dark:bg-slate-700" />

						{/* Navigation Links */}
						<nav className="space-y-3">
							{navLinks.map(({ name, icon: Icon, href }) => (
								<Link
									key={name}
									href={href}
									onClick={() => setIsOpen(false)}
									className="
                    flex items-center gap-3 text-lg font-medium 
                    text-slate-700 dark:text-slate-200
                    hover:text-pink-600 dark:hover:text-blue-400
                    hover:bg-pink-50 dark:hover:bg-slate-800
                    px-3 py-2 rounded-xl transition-colors
                  "
								>
									<Icon className="h-5 w-5" />
									{name}
								</Link>
							))}
						</nav>

						<Separator className="my-6 dark:bg-slate-700" />

						{/* Auth Button */}
						<Button
							variant="outline"
							onClick={() => setIsLoggedIn(!isLoggedIn)}
							className="
                w-full mt-2 flex items-center gap-2 justify-center
                border-pink-300 dark:border-blue-700
                text-pink-600 dark:text-blue-400
                hover:bg-pink-100 dark:hover:bg-slate-800
                transition-colors rounded-xl
              "
						>
							{isLoggedIn ? (
								<>
									<LogOut className="h-5 w-5" /> Logout
								</>
							) : (
								<>
									<LogIn className="h-5 w-5" /> Login
								</>
							)}
						</Button>
					</div>

					{/* Footer Section */}
					<div className="mt-6 space-y-4">
						<Separator className="dark:bg-slate-700" />
						<div className="flex justify-center gap-5">
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Linkedin className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Instagram className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Facebook className="h-5 w-5" />
							</Link>
							<Link
								href="#"
								className="text-pink-600 hover:text-pink-800 dark:text-blue-400 dark:hover:text-blue-500 transition-colors"
							>
								<Youtube className="h-5 w-5" />
							</Link>
						</div>
						<p className="text-center text-xs text-slate-500 dark:text-slate-400">
							© 2025 ShopVerse. All rights reserved.
						</p>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
