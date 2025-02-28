import React from 'react'
import { HiOutlineTrash } from "react-icons/hi2";
import {useCart} from '../_context/CartContext'

type PropsItem = {
    item: {
        id: string,
        name: string,
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
                        <img className="w-16 h-16 rounded-lg mr-5" src="/docs/images/products/apple-watch.png" alt="product image" />
                        <div>
                            <h5 className="text-lg tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                            <div className="flex items-center mt-2.5">
                                <span className="text-md text-gray-900 dark:text-white">Php {item.price}</span>
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

