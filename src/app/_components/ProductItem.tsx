import React from 'react'
import { MdOutlineStar } from "react-icons/md";
import Image from 'next/image'

export const ProductItem = ({product}: {product:{id:number, name:string, price:number, image:string}}) => {
    const addToCart = () => {
        console.log('Added to cart');
    }

  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <Image width={350} height={350} src={product.image} alt='' className="p-8 rounded-t-lg"/>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <MdOutlineStar className='text-yellow-400'/>
                        <MdOutlineStar className='text-yellow-400'/>
                        <MdOutlineStar className='text-yellow-400'/>
                        <MdOutlineStar className='text-yellow-400'/>
                        <MdOutlineStar className='text-gray-300'/>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">Php {product.price}</span>
                    <button className="text-white focus:ring-4 focus:outline-none bg-orange-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={addToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}
