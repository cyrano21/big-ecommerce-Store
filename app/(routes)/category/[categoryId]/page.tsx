import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import React from "react";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import SidebarFilter from "@/components/ui/sidebar-filter";
import ClientCategoryPage from "./client-category-page";

export const revalidate = 0;

export default async function CategoryPage({ 
  params 
}: { 
  params: { categoryId: string } 
}) {
  const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11";

  try {
    const [category, sizes, colors, products] = await Promise.all([
      getCategory(params.categoryId),
      getSizes(),
      getColors(),
      getProducts({ 
        categoryId: params.categoryId, 
        storeId: storeId 
      })
    ]);

    return (
      <ClientCategoryPage 
        params={params}
        initialCategory={category}
        initialSizes={sizes}
        initialColors={colors}
        initialProducts={products}
      />
    );
  } catch (error) {
    console.error('Failed to fetch category data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">
          Erreur lors du chargement de la catégorie. Veuillez réessayer.
        </p>
      </div>
    );
  }
}
