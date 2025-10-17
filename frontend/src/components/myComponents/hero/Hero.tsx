"use client";
import { Button } from "@/components/ui/button";
import { IImage } from "@/lib/data";
import { motion } from "motion/react";
import Link from "next/link";

const Hero = ({ heroImg }: { heroImg: IImage }) => {
	return (
		<section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10" />
			<img
				src={heroImg.src}
				alt={heroImg.alt}
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="relative z-20 text-center text-white px-4"
			>
				<h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
					Luxury Comfort
				</h1>
				<p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
					Everyday Wear for Men & Kids
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button
						asChild
						size="lg"
						variant="default"
						className="text-lg"
					>
						<Link href="/shop/men">Shop Men</Link>
					</Button>
					<Button
						asChild
						size="lg"
						variant="secondary"
						className="text-lg"
					>
						<Link href="/shop/kids">Shop Kids</Link>
					</Button>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
