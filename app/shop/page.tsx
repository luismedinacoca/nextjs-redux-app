import { getAllProducts } from "@/actions/products";
import Product from "@/components/ui/Product";
//import ProductList from "@/components/ui/ProductList";

const page = async () => {
  const products = await getAllProducts();
  const productCount = products?.length ?? 0;
  // e6e6e6

  return (
    <div className="bg-[#f2f7ff] py-8 px-8 min-h-screen">
      <h2 className="px-16 font-bold text-3xl text-center">Product List ({productCount})</h2>
      {productCount === 0 && <p className="py-8 text-center max-w-5xl mx-auto">No products found</p>}
      {productCount > 0 && (
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {products!.map((item) => (
            <Product key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
