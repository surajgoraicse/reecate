import Header from "@/components/Header";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
const page = () => {
	return (
		<div>
			<Header />
			<div>
				<AnimatedThemeToggler />
			</div>
			<div>home page</div>
		</div>
	);
};

export default page;
