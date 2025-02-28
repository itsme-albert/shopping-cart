import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { CartItems } from './CartItems';
import {useCart} from "../_context/CartContext"

export const Cart = () => {
  const {cartState, dispatch} = useCart();

  const clearCart = () => {
    dispatch({type: 'CHECKOUT'})
  };
  return (
    <div>
      <div className="mb-10 text-center font-bold">
        <div className="text-center">
            <div className=" mb-3 mt-24">
                <h1 className='text-3xl text-center'>My Cart</h1>
                  {cartState.items.length === 0 ? (
                    <p className='mt-2 text-gray-600'>Your cart is empty!</p>
                  ) : (
                    <div className="">
                          {cartState.items.map((item:any) => (
                            <CartItems key={item.id} item={item}/>
                          ))}
                    <button onClick={clearCart}>Check out</button>
                    </div>
                  )}
            </div>
        </div>
        </div>
    </div>
  )
}
