"use client";
import { Button } from "@/components/ui/button";
import { myImages } from "@/lib/data";
import { motion } from "motion/react";
import Link from "next/link";
const HeroSwiper = () => {
	return (
		<section className="container mx-auto px-4 py-12">
			<div className="grid md:grid-cols-2 gap-6">
				{/* Men Banner */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="relative h-[400px] rounded-xl overflow-hidden group"
				>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
					<img
						src={myImages.heroMen.src}
						alt="Men's Collection"
						className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<div className="relative z-20 h-full flex flex-col justify-end p-8 text-white">
						<h3 className="text-3xl font-display font-bold mb-2">
							Men's Collection
						</h3>
						<p className="mb-4 text-lg">
							Sophisticated everyday style
						</p>
						<Button asChild variant="secondary" className="w-fit">
							<Link href="/shop/men">Explore Men</Link>
						</Button>
					</div>
				</motion.div>

				{/* Kids Banner */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="relative h-[400px] rounded-xl overflow-hidden group"
				>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
					<img
						src={myImages.heroKids.src}
						alt="Kids' Collection"
						className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
					/>
					<div className="relative z-20 h-full flex flex-col justify-end p-8 text-white">
						<h3 className="text-3xl font-display font-bold mb-2">
							Kids' Collection
						</h3>
						<p className="mb-4 text-lg">
							Playful comfort for little ones
						</p>
						<Button asChild variant="secondary" className="w-fit">
							<Link href="/shop/kids">Explore Kids</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSwiper;
