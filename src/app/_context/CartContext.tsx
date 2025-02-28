import React from 'react'
import { createContext, useReducer, useContext } from 'react';
import {CartPersist} from '../_cartpersist/CartPersist'

const cartReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'ADD':
      const existingItem = state.items.find((item:any) => item.id === action.item.id);
      let updatedItem;
      
      if(existingItem){
        updatedItem = state.items.map((item:any) => 
          item.id === action.item.id ? {...item, quantity: item.quantity + action.item.quantity} : item);
      }else{
        updatedItem = [...state.items, action.item];
      }

      const updatedFromAdd = {...state, items: updatedItem}
      localStorage.setItem("Cart", JSON.stringify(updatedFromAdd));
      return updatedFromAdd;

    case 'REMOVE':
      const updatedItems = state.items.filter((item:any) => item.id !== action.id);
      const updatedFromRemove = {...state, items: updatedItems};
      localStorage.setItem('Cart', JSON.stringify(updatedFromRemove));
      return updatedFromRemove;

    case 'CHECKOUT':
      localStorage.removeItem('Cart')
      return {items: []};

    case 'DECREMENT':
      return {...state, items: state.items.map((item:any) => item.id === action.id ? {...item, quantity: item.quantity - 1} : item)};

    case 'INCREMENT':
      return {...state, items: state.items.map((item:any) => item.id === action.id ? {...item, quantity: item.quantity + 1} : item)};

    default:
      return state;
  }
};

const CartContextInstance  = createContext<any>(null);

const getInitialCart = () => {
  const checkCart = localStorage.getItem("Cart") !== null;
  if (checkCart) {
    return JSON.parse(localStorage.getItem("Cart") || "null");
  }
  return { items: [] };
};

export const CartProvider = ({children}:{children:React.ReactNode}) => {
  const [cartState, dispatch] = useReducer(cartReducer, getInitialCart());
  CartPersist(cartState);

  return (
    <div>
      <CartContextInstance.Provider value={{cartState, dispatch}}>
        {children}
      </CartContextInstance.Provider>
    </div>
  )
};

export const useCart = () => useContext(CartContextInstance);

