import React from "react";
import Container from "@/components/ui/container";
import getBillboard from "../../actions/get-billboard";
import Billboard from "@/components/billboard";
import getProducts from "../../actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const storeId = "c9be10a3-5539-46cc-befc-c005d28eeb11"; // Remplacez par votre storeId réel
  const products = await getProducts({ isFeatured: true, storeId });
  const billboard = await getBillboard("b3009913-e3fc-4b99-a217-d80ef1eed9f2");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div
          className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 font-bold text-2xl text-gray-800"
          style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}
        >
          <ProductList title="Produits populaires" items={products} />
        </div>
      </div>
    </Container>
  );
};
export default HomePage;
