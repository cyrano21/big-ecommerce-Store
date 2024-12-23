import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import CategoryPage from "./page";
import { Product, Size, Color, Category } from "@/types";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;

  if (!storeId) {
    throw new Error("NEXT_PUBLIC_STORE_ID is not defined in the environment variables");
  }

  const products: Product[] = await getProducts({
    categoryId: params.categoryId,
    storeId: storeId,
  });


  const sizes: Size[] = await getSizes();
  const colors: Color[] = await getColors();
  const category: Category | null = await getCategory(params.categoryId);
  if (!category) {
    // Handle the case where no category is found
    // You might want to:
    // - Redirect to a 404 page
    // - Throw an error
    return notFound(); // Next.js method to show a 404 page
  }

  return (
    <CategoryPage
      params={params}
      initialProducts={products}
      initialSizes={sizes}
      initialColors={colors}
      initialCategory={category} // Now this is safe
    />
  );
}
