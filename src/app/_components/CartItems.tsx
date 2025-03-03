import React, { useEffect } from 'react'
import Image from 'next/image'
import { HiOutlineTrash } from "react-icons/hi2";
import {useCart} from '../_context/CartContext'
import { supabase } from '../lib/supabase';

type PropsItem = {
    item: {
        id: string,
        name: string,
        image:string,
        quantity: number,
        price: number,
    }
}

export const CartItems = ({item}:PropsItem) => {
    const {cartState, dispatch} = useCart()

    useEffect(() => {
        const handleInserts = (payload:any) => {
            console.log('Change received!', payload)
          }
      const fetchCart = async () => {
        supabase
        .channel('cart')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'cart' }, handleInserts)
        .subscribe()
      }
      fetchCart();
    }, [])

    const removeFromCart = async (item:any) => {
        dispatch({type: 'REMOVE', id: item.id})
        const {error} = await supabase
        .from('cart')
        .delete()
        .eq('id', item.id)
    };

    const minusQty = async () => {
        if(item.quantity > 1) {
            dispatch({type: 'DECREMENT', id: item.id})
            const {error} = await supabase
            .from('cart')
            .update({quantity: item.quantity - 1})
            .eq('id', item.id)
            console.log(error)
            console.log(item)
        }
    }
    const plusQty = async (item:any) => {
        dispatch({type: 'INCREMENT', id: item.id})
        const {error} = await supabase
        .from('cart')
        .update({quantity: item.quantity + 1})
        .eq('id', item.id)
        console.log(error)
        console.log(item)
    }

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
                                    <button type="button" className="px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={minusQty}>
                                        -
                                    </button>
                                    <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                        {item.quantity}
                                    </button>
                                    <button type="button" className="px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={()=>plusQty(item)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button aria-label='Remove Item' className="text-center" onClick={()=>removeFromCart(item)}><HiOutlineTrash className='text-red-600 text-2xl'/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

