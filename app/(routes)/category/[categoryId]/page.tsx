import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import React from "react";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import Filter from "./components/filter";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11"; // Remplacez par votre storeId réel

  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
    storeId: storeId, // Ajoutez cette ligne
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50">
      <Container>
        <div className="space-y-8 py-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block">
              {category.name}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits {category.name.toLowerCase()} soigneusement choisis pour vous
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
            <Billboard data={category.billboard} />
          </div>
          
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              <MobileFilters sizes={sizes} colors={colors} />
              <div className="hidden lg:block">
                <div className="bg-gradient-to-br from-white via-purple-50 to-fuchsia-50 rounded-2xl shadow-sm p-6 sticky top-8">
                  <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                    Affiner la recherche
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Tailles</h4>
                      <Filter valueKey="sizeId" name="" data={sizes} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Couleurs</h4>
                      <Filter valueKey="colorId" name="" data={colors} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                {products.length === 0 && <NoResult />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((item) => (
                    <div key={item.id} className="transform hover:scale-[1.02] transition-transform duration-200 bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 rounded-2xl shadow-sm">
                      <ProductCard data={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
