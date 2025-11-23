"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface AuthStatusPageProps {
	title: string;
	message?: string;
	variant?: "loading" | "success" | "error";
}

export function AuthStatusPage({
	title,
	message,
	variant = "loading",
}: AuthStatusPageProps) {
	const getIcon = () => {
		switch (variant) {
			case "success":
				return (
					<motion.div
						initial={{ scale: 0.6, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							type: "spring",
							stiffness: 180,
							damping: 15,
						}}
					>
						<CheckCircle2 className="h-12 w-12 text-green-500 dark:text-green-400 drop-shadow-md" />
					</motion.div>
				);
			case "error":
				return (
					<motion.div
						initial={{ x: -10 }}
						animate={{ x: [0, -6, 6, -6, 6, 0] }}
						transition={{ duration: 0.5 }}
					>
						<XCircle className="h-12 w-12 text-red-500 dark:text-red-400 drop-shadow-md" />
					</motion.div>
				);
			default:
				return (
					<motion.div
						animate={{ rotate: 360 }}
						transition={{
							repeat: Infinity,
							duration: 1.4,
							ease: "linear",
						}}
					>
						<Loader2 className="h-12 w-12 text-blue-500 dark:text-blue-400" />
					</motion.div>
				);
		}
	};

	return (
		<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Animated gradient background */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900"
				animate={{
					backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "linear",
				}}
				style={{
					backgroundSize: "200% 200%",
				}}
			/>

			{/* Content */}
			<AnimatePresence mode="wait">
				<motion.div
					key={variant}
					initial={{ opacity: 0, y: 20, scale: 0.98 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="relative w-full max-w-sm z-10"
				>
					<motion.div
						animate={
							variant === "loading"
								? {
										scale: [1, 1.02, 1],
										transition: {
											repeat: Infinity,
											duration: 1.8,
										},
								  }
								: {}
						}
					>
						<Card
							className={cn(
								"shadow-lg border-none bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl"
							)}
						>
							<CardContent className="p-8 flex flex-col items-center text-center">
								{getIcon()}

								<motion.h1
									className="mt-6 text-xl font-semibold text-neutral-800 dark:text-neutral-100"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.1 }}
								>
									{title}
								</motion.h1>

								{message && (
									<motion.p
										className="mt-2 text-sm text-neutral-500 dark:text-neutral-400"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
									>
										{message}
									</motion.p>
								)}
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
