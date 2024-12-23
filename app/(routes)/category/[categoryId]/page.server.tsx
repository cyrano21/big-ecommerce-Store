import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import CategoryPage from "./page";

export const revalidate = 0;

export default async function Page({ params }: { params: { categoryId: string } }) {
  const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11";

  const products = await getProducts({
    categoryId: params.categoryId,
    storeId: storeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  return (
    <CategoryPage 
      params={params}
      initialProducts={products}
      initialSizes={sizes}
      initialColors={colors}
      initialCategory={category}
    />
  );
}
