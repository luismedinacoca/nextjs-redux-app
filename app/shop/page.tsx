import { getAllProducts } from "@/actions/products";
import Product from "@/components/ui/Product";
import Link from "next/link";

const page = async () => {
  const products = await getAllProducts();
  const productCount = products?.length ?? 0;

  return (
    <div className="bg-[#f2f7ff] py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Contenedor principal con ancho máximo de 1080px y centrado */}
      <div className="max-w-[1080px] mx-auto">
        {/* Header */}
        <div className="py-3 flex items-center justify-between">
          <h2 className="font-bold text-2xl sm:text-3xl text-gray-900">
            Product List <span className="text-gray-500">({productCount})</span>
          </h2>
          <Link
            href="/cart"
            className="text-sm sm:text-base font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            View Cart
          </Link>
        </div>

        {/* Mensaje si no hay productos */}
        {productCount === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-700 text-xl">No products found</p>
          </div>
        )}

        {/* Grid de productos */}
        {productCount > 0 && (
          <div className="grid grid-cols-1 min-[375px]:grid-cols-2 min-[659px]:grid-cols-3 min-[1080px]:grid-cols-4 gap-4 sm:gap-6">
            {products!.map((item) => (
              <Product key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
