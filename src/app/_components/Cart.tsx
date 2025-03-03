import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { CartItems } from './CartItems';
import {useCart} from "../_context/CartContext"
import { supabase } from '../lib/supabase';

export const Cart = () => {
  const {cartState, dispatch} = useCart();
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data: cartState, error } = await supabase
        .from('cart')
        .select('*')
        .order('id', { ascending: false });
        
      if (error) {
        console.error(error);
      } else {
        dispatch({ type: 'SET_CART', result: cartState });
      }
      if (cartState) {
        setCart(cartState);
      }
    };
    fetchCart();

    const handleInserts = (result: any) => {
      console.log('Change received!', result);
      fetchCart();
    };

    const subscription = supabase
      .channel('cart')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cart' }, handleInserts)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [cart]);

  const clearCart = async () => {
    dispatch({type: 'CHECKOUT'})
    const {error} = await supabase
    .from('cart')
    .delete()
    .eq('status', 'inCart')
    console.log(error)
  };
  return (
    <div>
      <div className="mb-10 text-center font-bold">
        <div className="text-center">
            <div className=" mb-3 mt-24">
                <h1 className='text-3xl text-center'>My Cart</h1>
                  {cart.length === 0 ? (
                    <p className='mt-2 text-gray-600'>Your cart is empty!</p>
                  ) : (
                    <div className="">
                          {cart.map((item:any) => (
                            <CartItems key={item.id} item={item}/>
                          ))}
                    <button className='bg-orange-600 text-white p-3 rounded-sm mt-3' onClick={clearCart}>Check out</button>
                    </div>
                  )}
            </div>
        </div>
        </div>
    </div>
  )
}
