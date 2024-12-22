import React from "react";
import Container from "@/components/ui/container";
import getBillboard from "../../actions/get-billboard";
import Billboard from "@/components/billboard";
import getProducts from "../../actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const storeId = ""; // Placeholder value for storeId
  const products = await getProducts({ isFeatured: true, storeId });
  const billboard = await getBillboard("b3009913-e3fc-4b99-a217-d80ef1eed9f2");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <Container>
        <div className="space-y-16 py-10">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
              Boutique en ligne
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de produits tendance
            </p>
          </div>

          {billboard && (
            <div className="rounded-3xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
              <Billboard data={billboard} />
            </div>
          )}
          
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
                Produits populaires
              </h2>
              <p className="mt-2 text-gray-600">
                Les articles les plus appréciés par nos clients
              </p>
            </div>
            <div className="bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-3xl shadow-lg p-8">
              <ProductList items={products} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default HomePage;
