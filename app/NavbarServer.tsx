import Navbar from "@/components/Navbar";
import getCategories from "@/actions/get-categories";

export default async function NavbarServer() {
  const categories = await getCategories();
  
  return <Navbar categories={categories} />;
}
