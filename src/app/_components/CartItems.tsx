import React from 'react'
import Image from 'next/image'
import { HiOutlineTrash } from "react-icons/hi2";
import {useCart} from '../_context/CartContext'

type PropsItem = {
    item: {
        id: string,
        name: string,
        image:string,
        price: number,
    }
}

export const CartItems = ({item}:PropsItem) => {
    const {dispatch} = useCart()

    const removeFromCart = () => {
        dispatch({type: 'REMOVE', id: item.id})
    };
    return (
        <div className='text-center justify-center'>
            <div className="border-gray-700">
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                         <Image width={100} height={100} src={item.image} alt='' className=" rounded-t-lg"/>
                        <div>
                            <h5 className="text-sm text-left tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                            <div className="flex items-center mt-2.5">
                                <span className="text-md text-gray-900 dark:text-white">Php {item.price}</span>
                                <div className="inline-flex rounded-md shadow-xs ml-3" role="group">
                                    <button type="button" className="px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                        -
                                    </button>
                                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                        0
                                    </button>
                                    <button type="button" className="px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button aria-label='Remove Item' className="text-center" onClick={removeFromCart}><HiOutlineTrash className='text-red-600 text-2xl'/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

