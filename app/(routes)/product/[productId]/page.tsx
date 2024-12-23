import React from "react";
import { notFound } from 'next/navigation';
import getProducts from "@/actions/get-products";
import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { Product } from "@/types";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const STORE_ID = "f072e5ca-1a6a-4312-81dd-23034de5f8cf";

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  console.group('🛍️ Product Page Diagnostics');
  console.log('🆔 Requested Product ID:', params.productId);

  let product: Product | null = null;
  let suggestedProducts: Product[] = [];

  try {
    product = await getProduct(params.productId);

    if (!product) {
      console.error('❌ No product found for ID:', params.productId);
      console.groupEnd();
      return notFound();
    }

    console.log('✅ Product Found:', product.name);
    
    console.log('🔍 Fetching suggested products for category:', product.category.id);
    suggestedProducts = await getProducts({
      categoryId: product.category.id,
    });

    console.log('📦 Suggested Products Count:', suggestedProducts.length);
    console.groupEnd();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 py-8 sm:py-12">
        <Container>
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Back Navigation */}
            <div className="mb-4 sm:mb-8 relative">
              <Link 
                href={`/category/${product.category.id}`} 
                className="
                  inline-flex 
                  items-center 
                  text-sm 
                  sm:text-base
                  text-gray-700 
                  hover:text-purple-700 
                  bg-gradient-to-br 
                  from-white 
                  to-purple-50 
                  hover:from-purple-50 
                  hover:to-white 
                  border 
                  border-purple-100 
                  rounded-xl 
                  px-4 
                  py-2.5 
                  transition-all 
                  duration-300 
                  ease-in-out 
                  shadow-md 
                  hover:shadow-xl
                  group
                  relative
                  overflow-hidden
                "
              >
                <span className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <ChevronLeftIcon 
                  className="
                    w-5 
                    h-5 
                    mr-2 
                    text-gray-600 
                    group-hover:text-purple-700 
                    transition-colors 
                    duration-300
                  "
                />
                Retour à {product.category.name}
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">
              <div 
                className="
                  bg-white 
                  rounded-2xl 
                  sm:rounded-3xl 
                  shadow-xl 
                  overflow-hidden 
                  transform 
                  hover:scale-[1.01] 
                  sm:hover:scale-[1.02] 
                  transition-transform 
                  duration-300
                "
              >
                <Gallery images={product.images} />
              </div>
              <div className="mt-4 sm:mt-10 px-2 sm:px-4 lg:mt-0">
                <div 
                  className="
                    bg-white 
                    rounded-2xl 
                    sm:rounded-3xl 
                    shadow-xl 
                    p-4 
                    sm:p-8 
                    transform 
                    hover:scale-[1.01] 
                    sm:hover:scale-[1.02] 
                    transition-transform 
                    duration-300
                  "
                >
                  <Info data={product} />
                </div>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-20 space-y-4 sm:space-y-8">
              <div className="text-center">
                <h2 
                  className="
                    text-2xl 
                    sm:text-3xl 
                    md:text-4xl 
                    font-bold 
                    bg-clip-text 
                    text-transparent 
                    bg-gradient-to-r 
                    from-purple-600 
                    to-pink-600 
                    inline-block 
                    mb-2 
                    sm:mb-4
                  "
                >
                  Articles similaires
                </h2>
                <p 
                  className="
                    text-xs 
                    sm:text-base 
                    text-gray-600 
                    max-w-xl 
                    mx-auto 
                    leading-relaxed
                  "
                >
                  Découvrez d&apos;autres produits qui pourraient vous plaire et compléter votre style
                </p>
              </div>
              <div 
                className="
                  bg-white 
                  rounded-2xl 
                  sm:rounded-3xl 
                  shadow-xl 
                  p-4 
                  sm:p-4
                  transform 
                  hover:scale-[1.005] 
                  sm:hover:scale-[1.01] 
                  transition-transform 
                  duration-300
                "
              >
                <ProductList 
                  title="" 
                  items={suggestedProducts} 
                  variant="similar" 
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error('🚨 ProductPage Error:', error);
    console.groupEnd();
    return notFound();
  }
};

export default ProductPage;
