import React from "react";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import getProduct from "@/actions/get-product";
import Gallery from "@/components/gallery";
import Info from "@/components/info";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11"; // Add your actual storeId here
  const suggestedProducts = await getProducts({
    categoryId: product.category.id,
    storeId,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm mb-8">
            <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors">Accueil</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href={`/category/${product.category.id}`} className="text-gray-600 hover:text-purple-600 transition-colors">{product.category.name}</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
          
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
            <div className="bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-2xl shadow-sm p-4">
              <Gallery images={product.images} />
            </div>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div className="bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 rounded-2xl shadow-sm p-8">
                <Info data={product} />
              </div>
            </div>
          </div>
          
          <div className="mt-20 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
                Articles similaires
              </h2>
              <p className="mt-2 text-gray-600">
                Découvrez d&apos;autres produits qui pourraient vous plaire
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 rounded-2xl shadow-sm p-8">
              <ProductList title="" items={suggestedProducts} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
