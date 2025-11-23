// components/layout/Footer.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import {
	FaCcMastercard,
	FaCcPaypal,
	FaCcVisa,
	FaYoutube,
} from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { SiAmericanexpress, SiInstagram } from "react-icons/si";

export default function Footer() {
	return (
		<footer className="bg-[#1C1C1C] text-neutral-300 px-6 py-12 md:px-16">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
				{/* Brand */}
				<div>
					<h2 className="text-2xl font-bold text-white">Reecate</h2>
					<p className="mt-3 text-sm text-neutral-400">
						Your go-to store for modern, stylish, and comfortable
						fashion.
					</p>
					<div className="flex space-x-4 mt-4">
						<Link href="#" aria-label="Instagram">
							<SiInstagram className="h-5 w-5 hover:text-white transition" />
						</Link>
						<Link href="#" aria-label="Facebook">
							<BsFacebook className="h-5 w-5 hover:text-white transition" />
						</Link>
						<Link href="#" aria-label="Twitter">
							<FaSquareTwitter className="h-5 w-5 hover:text-white transition" />
						</Link>
						<Link href="#" aria-label="Youtube">
							<FaYoutube className="h-5 w-5 hover:text-white transition" />
						</Link>
					</div>
				</div>

				{/* Navigation */}
				<div>
					<h3 className="text-lg font-semibold text-white">Shop</h3>
					<ul className="mt-3 space-y-2 text-sm">
						<li>
							<Link href="/men" className="hover:text-white">
								Men
							</Link>
						</li>
						<li>
							<Link href="/women" className="hover:text-white">
								Women
							</Link>
						</li>
						<li>
							<Link href="/kids" className="hover:text-white">
								Kids
							</Link>
						</li>
						<li>
							<Link href="/new" className="hover:text-white">
								New Arrivals
							</Link>
						</li>
						<li>
							<Link href="/sale" className="hover:text-white">
								Sale
							</Link>
						</li>
					</ul>
				</div>

				{/* Customer Support */}
				<div>
					<h3 className="text-lg font-semibold text-white">
						Customer Support
					</h3>
					<ul className="mt-3 space-y-2 text-sm">
						<li>
							<Link href="/shipping" className="hover:text-white">
								Shipping & Returns
							</Link>
						</li>
						<li>
							<Link
								href="/order-tracking"
								className="hover:text-white"
							>
								Order Tracking
							</Link>
						</li>
						<li>
							<Link
								href="/size-guide"
								className="hover:text-white"
							>
								Size Guide
							</Link>
						</li>
						<li>
							<Link href="/faq" className="hover:text-white">
								FAQs
							</Link>
						</li>
						<li>
							<Link href="/contact" className="hover:text-white">
								Contact Us
							</Link>
						</li>
					</ul>
				</div>

				{/* Newsletter */}
				<div>
					<h3 className="text-lg font-semibold text-white">
						Join our Newsletter
					</h3>
					<p className="mt-2 text-sm text-neutral-400">
						Be the first to get updates on new arrivals, exclusive
						deals, and more.
					</p>
					<form className="flex mt-4">
						<Input
							type="email"
							placeholder="Enter your email"
							className="rounded-r-none bg-neutral-900 border-neutral-700 text-white"
						/>
						<Button type="submit" className="rounded-l-none">
							Subscribe
						</Button>
					</form>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col md:flex-row justify-between px-10 items-center text-sm text-neutral-500">
				<p>© {new Date().getFullYear()} Reeket. All rights reserved.</p>

				{/* Payment Methods */}
				<div className="flex space-x-8 mt-4 md:mt-0">
					<FaCcVisa color="white" size={24} />
					<FaCcMastercard color="white" size={24} />
					<FaCcPaypal color="white" size={24} />
					<SiAmericanexpress color="white" size={24} />
				</div>
			</div>
		</footer>
	);
}
