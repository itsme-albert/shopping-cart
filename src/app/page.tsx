"use client"

import { useState } from "react";
import { ProductList } from "./_components/ProductList";
import { Cart } from "./_components/Cart";
import { FaOpencart } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";
import { CartProvider } from "./_context/CartContext";
import { api } from "../../convex/_generated/api";
import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";

const convex = new ConvexReactClient("https://befitting-mockingbird-971.convex.cloud");

export default function Home(){
  return (
    <ConvexProvider client={convex}>
      <CartProvider>
        <MainPage />
      </CartProvider>
    </ConvexProvider>
  );
}

function MainPage() {
  const [cartVisible, setCartVisible] = useState(false);
  const countCartItem = useQuery(api.cart.countCartItem);
  
  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  };

  return (
      <div className="bg-white min-h-screen">
        <div className="sticky top-0 z-50">
          <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <FaOpencart className="text-2xl" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  {" "}
                  Tech-Shop
                </span>
              </a>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  aria-label="View Cart"
                  type="button"
                  className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none"
                  onClick={toggleCart}
                >
                  <RiShoppingCartFill className="text-black text-3xl" />
                  <span className="sr-only">Notifications</span>
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                      {countCartItem ?? 0}
                    </div>
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row h-full">
          <CartProvider >
            <div className="m-10 mt-24 w-full md:w-12/12">
              <ProductList />
            </div>
            <div
              className={`fixed top-0 right-0 h-full w-3/12 bg-white border-l-2 border-gray-200 transition-transform duration-300 ease-in-out transform ${
                cartVisible ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <Cart />
            </div>
          </CartProvider>
        </div>
      </div>
  );
}
