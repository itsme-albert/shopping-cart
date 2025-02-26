import React from 'react'
import { HiOutlineTrash } from "react-icons/hi2";

export const CartItems = () => {
  return (
    <div className='text-center justify-center'>
        <div className="border-gray-700">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                    <img className="w-16 h-16 rounded-lg mr-5" src="/docs/images/products/apple-watch.png" alt="product image" />
                    <div>
                        <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">Product Name</h5>
                        <div className="flex items-center mt-2.5">
                            <span className="text-md text-gray-900 dark:text-white">Php 400</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button aria-label='Remove Item' className="text-center"><HiOutlineTrash className='text-red-600 text-2xl'/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

