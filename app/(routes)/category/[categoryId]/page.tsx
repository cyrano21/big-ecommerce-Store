import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import React from "react";
import { Product, Size, Color, Category } from "@/types";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import SidebarFilter from "@/components/ui/sidebar-filter";
import ClientCategoryPage from "./client-category-page";

export const revalidate = 0;

interface CategoryPageProps {
  params: { categoryId: string };
  initialProducts?: Product[];
  initialSizes?: Size[];
  initialColors?: Color[];
  initialCategory?: Category | null;
}

export default async function CategoryPage({ 
  params 
}: CategoryPageProps) {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;

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
