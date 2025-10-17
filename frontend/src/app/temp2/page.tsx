import ProductCard1 from "@/components/myComponents/cards/ProductCard1";


const sampleProduct = {
  id: "1",
  name: "Men's Black Batman Oversized T-shirt",
  brand: "Bewakoof®",
  image: "/cargo-trousers.jpg",
  price: 599,
  originalPrice: 1299,
  discount: 53,
  rating: 4.3,
  ratingCount: 128,
  tag: "BUY 2 FOR 999",
  link: "/",
};
const sampleProduct2 = {
  id: "1",
  name: "Men's Black Batman Oversized T-shirt",
  brand: "Bewakoof®",
  image: "/classic-cotton-tee-alt-image-1.jpg",
  price: 599,
  originalPrice: 1299,
  discount: 53,
  rating: 4.3,
  ratingCount: 128,
  tag: "BUY 2 FOR 999",
  link: "/",
};

export default function Page() {
  return (
    <main className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
      <ProductCard1 product={sampleProduct} />
      <ProductCard1 product={sampleProduct} />
      <ProductCard1 product={sampleProduct} />
      <ProductCard1 product={sampleProduct} />
      <ProductCard1 product={sampleProduct} />
      <ProductCard1 product={sampleProduct} />
      <ProductCard1 product={sampleProduct2} />
      <ProductCard1 product={sampleProduct2} />
      <ProductCard1 product={sampleProduct2} />
      <ProductCard1 product={sampleProduct2} />
      <ProductCard1 product={sampleProduct2} />
      <ProductCard1 product={sampleProduct2} />
    </main>
  );
}
