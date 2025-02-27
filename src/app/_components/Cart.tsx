import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { CartItems } from './CartItems';

export const Cart = () => {
  return (
    <div>
      <div className="mb-10 text-center font-bold">
        <div className="text-center">
            <div className="flex items-center justify-center mb-3 mt-24">
                <h1 className='text-3xl'>My Cart</h1>
            </div>
        </div>
        <div className="">
            <CartItems/>
        </div>
            
        </div>
    </div>
  )
}

export default Cart
