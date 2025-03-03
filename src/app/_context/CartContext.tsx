import React from 'react';
import { createContext, useReducer, useContext } from 'react';
import { CartPersist } from '../_cartpersist/CartPersist';
import { CartActionType, CartItem, CartState } from '../utils/cart';



const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'ADD':
      const existingItem = state.items.find((item: CartItem) => item.id === action.item.id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = state.items.map((item: CartItem) => 
          item.id === action.item.id ? {...item, quantity: item.quantity + action.item.quantity} : item);
      } else {
        updatedItems = [...state.items, action.item];
      }

      const updatedFromAdd = { ...state, items: updatedItems };
      localStorage.setItem("Cart", JSON.stringify(updatedFromAdd));
      return updatedFromAdd;

    case 'REMOVE_ITEM':
      const updatedItemsAfterRemove = state.items.filter((item: CartItem) => item.id !== action.id);
      const updatedFromRemove = { ...state, items: updatedItemsAfterRemove };
      localStorage.setItem('Cart', JSON.stringify(updatedFromRemove));
      return updatedFromRemove;

    case 'CHECKOUT':
      localStorage.removeItem('Cart');
      return { items: [] };

    case 'DECREMENT':
      return { 
        ...state, 
        items: state.items.map((item: CartItem) => 
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0) // Remove items with quantity 0
      };

    case 'INCREMENT':
      return { 
        ...state, 
        items: state.items.map((item: CartItem) => 
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };

    case 'CLEAR_CART':
      localStorage.removeItem('Cart');
      return { items: [] };

    default:
      return state;
  }
};

interface CartContextType {
  cartState: CartState;
  dispatch: React.Dispatch<CartActionType>;
}

const CartContextInstance = createContext<CartContextType | null>(null);

const getInitialCart = (): CartState => {
  const checkCart = localStorage.getItem("Cart") !== null;
  if (checkCart) {
    return JSON.parse(localStorage.getItem("Cart") || "null");
  }
  return { items: [] };
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, getInitialCart());
  CartPersist(cartState);

  return (
    <CartContextInstance.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContextInstance.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContextInstance);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};