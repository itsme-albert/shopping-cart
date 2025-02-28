import React from 'react'
import { createContext, useReducer } from 'react';

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

const cartcontext = createContext<any>(null);

export const CartContext = ({children}:{children:React.ReactNode}) => {
  const [cartState, dispatch] = useReducer(cartReducer, {items: []});
  return (
    <div>
      <cartcontext.Provider value={{cartState, dispatch}}>
        {children}
      </cartcontext.Provider>
    </div>
  )
}

