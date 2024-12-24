import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import ClientCategoryPage from "./client-category-page";
import { notFound } from 'next/navigation';
import { Product, Size, Color, Category } from "@/types";

interface PageProps {
  params: {
    categoryId: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
  initialProducts?: Product[];
  initialSizes?: Size[];
  initialColors?: Color[];
  initialCategory?: Category | null;
}

const CategoryPage = async ({ 
  params, 
  initialCategory, 
  initialSizes, 
  initialColors, 
  initialProducts 
}: PageProps) => {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  
  const category = initialCategory as Category | null || await getCategory(params.categoryId);
  if (!category) {
    return notFound();
  }

  const sizes = initialSizes || await getSizes();
  const colors = initialColors || await getColors();
  const products = initialProducts || await getProducts({ 
    categoryId: params.categoryId,
    storeId: storeId 
  });

  return (
    <ClientCategoryPage 
      params={params}
      initialCategory={category}
      initialSizes={sizes}
      initialColors={colors}
      initialProducts={products}
    />
  );
};

export default CategoryPage;
