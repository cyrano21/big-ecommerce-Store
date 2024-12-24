import getCategory from "@/actions/get-category";
import CategoryPage from "./page";
import { Category } from "@/types";
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

  const category: Category | null = await getCategory(params.categoryId);
  if (!category) {
    return notFound();
  }

  return (
    <CategoryPage 
      params={params}
    />
  );
}
