import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/Main-nav";
import getCategories from "@/actions/get-categories";
import NavbarAction from "./navbar-action";

export const revalidate = 0;

const navbarStyles = {
  wrapper: "bg-gradient-to-r from-purple-700 via-fuchsia-500 to-pink-500",
  container: "relative mx-auto max-w-7xl",
  innerContainer: "flex items-center justify-between py-4 px-6",
  logo: {
    wrapper: "flex items-center gap-x-2",
    text: "text-2xl font-bold text-white"
  }
};

const Navbar = async () => {
  try {
    const categories = await getCategories();
    
    return (
      <div className={navbarStyles.wrapper}>
        <div className="absolute inset-0 bg-[url('/nav-pattern.svg')] opacity-10"></div>
        <Container>
          <div className={navbarStyles.container}>
            <div className={navbarStyles.innerContainer}>
              <Link href="/" className={navbarStyles.logo.wrapper}>
                <p className={navbarStyles.logo.text}>
                  Store<span className="text-yellow-300">.</span>
                </p>
              </Link>
              <MainNav data={categories} />
              <NavbarAction />
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return (
      <div className={navbarStyles.wrapper}>
        <Container>
          <div className={navbarStyles.container}>
            <div className={navbarStyles.innerContainer}>
              <Link href="/" className={navbarStyles.logo.wrapper}>
                <p className={navbarStyles.logo.text}>
                  Store<span className="text-yellow-300">.</span>
                </p>
              </Link>
              <div className="text-red-500">Error loading categories</div>
              <NavbarAction />
            </div>
          </div>
        </Container>
      </div>
    );
  }
};
export default Navbar;
