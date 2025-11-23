import { FeaturedProducts } from "@/components/myComponents/landing/featured-products";
import { NewArrivals } from "@/components/myComponents/landing/new-arrivals";
import BannerCarousel from "@/components/myComponents/swiper/Banner";

const page = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1">
				{/* hero section */}
				<BannerCarousel />
				<FeaturedProducts />

				<NewArrivals />
			</main>
		</div>
	);
};

export default page;
