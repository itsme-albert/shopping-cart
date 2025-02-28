import React from 'react'
import { createContext, useReducer, useContext } from 'react';

const cartReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'ADD':
      return {...state, items:[...state.items, action.item]};
    case 'REMOVE':
      return {...state, items: state.items.filter((item:any) => item.id !== action.id)};
    case 'CHECKOUT':
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

export const CartProvider = ({children}:{children:React.ReactNode}) => {
  const [cartState, dispatch] = useReducer(cartReducer, {items: []});
  return (
    <div>
      <CartContextInstance.Provider value={{cartState, dispatch}}>
        {children}
      </CartContextInstance.Provider>
    </div>
  )
};

export const useCart = () => useContext(CartContextInstance);

