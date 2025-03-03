import { useEffect } from 'react';

// We need to use the correct interface matching our cart structure
interface CartItem {
  id: string | number;
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
    // Only update localStorage if the items array exists
    if (cartState && cartState.items && cartState.items.length > 0) {
      localStorage.setItem("Cart", JSON.stringify(cartState));
    }
  }, [cartState]);

  return cartState;
};