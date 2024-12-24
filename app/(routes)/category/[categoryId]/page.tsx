import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import ClientCategoryPage from "./client-category-page";
import { notFound } from 'next/navigation';
import { Product, Size, Color, Category } from "@/types";

type CategoryPageProps = {
  params: { categoryId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const CategoryPage = async ({ 
  params, 
}: CategoryPageProps) => {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  
  const category = await getCategory(params.categoryId);
  if (!category) {
    return notFound();
  }

  const sizes = await getSizes();
  const colors = await getColors();
  const products = await getProducts({ 
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
