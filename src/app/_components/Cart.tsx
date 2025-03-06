import React, { useState, useEffect } from 'react'
import { CartItems } from './CartItems';
import {useCart} from "../_context/CartContext"
import { CartItem } from '../utils/cart';
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/clerk-react';

export const Cart = () => {
  const {cartState, dispatch} = useCart();
  const {user} = useUser();
  const fetchedCart = useQuery(api.cart.fetchCart, user ? {clerkId: user.id} : "skip");
  const [total, setTotal] = useState(0)
  const deleteAllInCart = useMutation(api.cart.deleteAllInCart);

  const clearCart = () => {
    dispatch({ type: 'CHECKOUT' });
    deleteAllInCart();
    localStorage.removeItem('cartTotal');
    localStorage.removeItem('Cart');
  };

  useEffect(() => {
    const calculatedTotal = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity, 0);
    setTotal(calculatedTotal);
    localStorage.setItem('cartTotal', JSON.stringify(calculatedTotal));
  }, [cartState.items]);

  useEffect(() => {
    const savedTotal = localStorage.getItem('cartTotal');
    if (savedTotal) {
      setTotal(JSON.parse(savedTotal));
    }
  }, []);

  return (
    <div>
      <div className="mb-10 text-center font-bold">
        <div className="text-center">
            <div className=" mb-3 mt-24">
                <h1 className='text-3xl text-center'>My Cart</h1>
                  {fetchedCart && fetchedCart.length === 0 ? (
                    <p className='mt-2 text-gray-600'>Your cart is empty!</p>
                  ) : (
                    <div className="">
                          {fetchedCart && fetchedCart.map((item: CartItem) => (
                            <CartItems key={item.productId} item={item}/>
                          ))}
                        <div className="m-3 text-left text-lg">
                          <h1>Total: Php {total}</h1>
                        </div>
                      <button type="button" className='bg-orange-600 text-white p-3 rounded-sm mt-3' onClick={clearCart}>Check out</button>
                    </div>
                  )}
            </div>
        </div>
       
        </div>
    </div>
  )
}
