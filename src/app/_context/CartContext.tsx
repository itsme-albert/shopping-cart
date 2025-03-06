import React from 'react';
import { createContext, useReducer, useContext } from 'react';
import { CartPersist } from '../_cartpersist/CartPersist';
import { CartActionType, CartState } from '../utils/cart';
import { ClerkProvider, SignedIn,SignedOut,SignIn  } from "@clerk/clerk-react";
import { HandleUser } from '../utils/handleUser';
import { cartReducer } from '../_reducer/CartReducer'

interface CartContextType {
  cartState: CartState;
  dispatch: React.Dispatch<CartActionType>;
}

const CartContextInstance = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, {items: []});
  CartPersist(cartState);

  return (
      <ClerkProvider publishableKey="pk_test_cG9zaXRpdmUteWV0aS03NS5jbGVyay5hY2NvdW50cy5kZXYk">
            <CartContextInstance.Provider value={{ cartState, dispatch }}>
                <SignedIn>
                  <HandleUser />
                  {children} 
                </SignedIn>

                <SignedOut>
                  <SignIn routing="hash" />
                </SignedOut>
            </CartContextInstance.Provider>
        </ClerkProvider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContextInstance);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};