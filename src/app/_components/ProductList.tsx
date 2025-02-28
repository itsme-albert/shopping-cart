import React from 'react';
import {useState, useEffect, useReducer, useContext} from 'react';
import {ProductItem} from './ProductItem';
import {CartProvider } from '../_context/CartContext'

const product = [
    {id: 1, name: 'IPHONE 16 PRO MAX 256GB DESERT TITANIUM APPLE', price: 86885, image: '/images/iphone16pro.png'},
    {id: 2, name: 'S25 ULTRA 12/256GB T.SBLU SAMSUNG SM-S938 GALAXY', price: 84990, image: '/images/s25ultra.png'},
    {id: 3, name: 'IPHONE 15 PRO 256GB WHITE TITNM APPLE', price: 68990, image: '/images/iphone15.png'},
    {id: 4, name: 'IS25+ 12/256GB MINT SAMSUNG SM-S936 GALAXY', price: 67990, image: '/images/s25plus.png'},
];

export const ProductList = () => {
    const [search, setSearch] = useState("");

    const filteredProducts = product.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className=''>
        <div>
            <div className="mb-10 text-center font-bold">
                <h1 className='text-3xl'>List of Products</h1>
            </div>
            <div className="search">
                <form className="max-w-md mx-auto">   
                    <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" required value={search} onChange={(e) => setSearch(e.target.value)} />

                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-orange-700 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-700">Search</button>
                    </div>
                </form>
            </div>
                <div className="grid grid-cols-4 gap-4 mt-14">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

