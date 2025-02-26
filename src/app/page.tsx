'use client';
import Image from "next/image";
import { useState } from "react";
import {ProductList} from "./components/ProductList";
import {Cart} from "./components/Cart";
import { FaOpencart } from "react-icons/fa";
import { RiShoppingCartFill } from "react-icons/ri";


export default function Home() {
  const [cartVisible, setCartVisible] = useState(false);

  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 z-50">
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <FaOpencart className='text-2xl'/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> Tech-Shop</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button aria-label='View Cart' type="button" className="text-white" onClick={toggleCart}><RiShoppingCartFill className='text-black text-3xl'/></button>
            </div>
            </div>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row h-full">
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
      </div>
    </div>
  );
}
