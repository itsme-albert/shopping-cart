import { useEffect } from 'react';

interface CartItem {
  productId: string | number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

export const CartPersist = (cartState: CartState) => {
  useEffect(() => {
    if (cartState && cartState.items && cartState.items.length > 0) {
      localStorage.setItem("Cart", JSON.stringify(cartState));
    }
  }, [cartState]);

  return cartState;
};