import { notFound } from "next/navigation";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import ClientGalleryWrapper from "./components/client-gallery-wrapper";
import Info from "@/components/info";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return notFound();
  }

  const suggestedProducts = await getProducts({
    categoryId: product.category?.id,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 py-8 sm:py-12">
      <Container>
        <Link
          href={`/category/${product.category.id}`}
          className="inline-flex items-center text-sm sm:text-base text-gray-700 hover:text-purple-700 bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-white border border-purple-100 rounded-xl px-4 py-2.5 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl group relative overflow-hidden mb-8"
        >
          <span className="absolute inset-0 bg-purple-100 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          <ChevronLeftIcon className="w-5 h-5 mr-2 text-gray-600 group-hover:text-purple-700 transition-colors duration-300" />
          Retour à {product.category.name}
        </Link>

        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <ClientGalleryWrapper product={product} />

            {suggestedProducts.length > 0 && (
              <div className="mt-20">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
                    Articles similaires
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
                    Découvrez d&apos;autres produits qui pourraient vous plaire
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-4">
                  <ProductList items={suggestedProducts} variant="similar" />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
