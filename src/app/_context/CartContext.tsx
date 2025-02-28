import React from 'react'
import { createContext, useReducer, useContext } from 'react';

const cartReducer = (state:any, action:any) => {
  switch (action.type) {
    case 'ADD':
      return {...state, items:[...state.items, action.item]};
    case 'REMOVE':
      return {...state, items: state.items.filter((item:any) => item.id !== action.id)}
    case 'CHECKOUT':
      return [];
    default:
      return state;
  }
};

const CartContextInstance  = createContext<any>(null);

export const CartContext = ({children}:{children:React.ReactNode}) => {
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

