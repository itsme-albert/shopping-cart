import { CartActionType, CartItem, CartState } from '../utils/cart';

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch (action.type) {
    case 'ADD':
      const existingItem = state.items.find((item: CartItem) => item.productId === action.item.productId);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item: CartItem) => 
          item.productId === action.item.productId ? {...item, quantity: item.quantity + action.item.quantity} : item);
      } else {
        updatedItems = [...state.items, action.item];
      }

      const updatedFromAdd = { ...state, items: updatedItems };
      localStorage.setItem("Cart", JSON.stringify(updatedFromAdd));
      return updatedFromAdd;

    case 'REMOVE_ITEM':
      const newItems = state.items.filter((item: CartItem) => item.productId !== action.productId);
      const updatedFromRemove = { ...state, items: newItems };
      localStorage.setItem('Cart', JSON.stringify(updatedFromRemove));
      return updatedFromRemove;

    case 'CHECKOUT':
      localStorage.removeItem('Cart');
      return { items: [] };

    case 'DECREMENT':
      return { 
        ...state, 
        items: state.items.map((item: CartItem) => 
          item.productId === action.productId ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0)
      };

    case 'INCREMENT':
      return { 
        ...state, 
        items: state.items.map((item: CartItem) => 
          item.productId === action.productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      };

    default:
      return state;
  }
};