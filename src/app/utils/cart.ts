export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }
  
  export interface CartState {
    items: CartItem[];
  }
  
  export type CartActionType = 
    | { type: 'ADD'; item: CartItem }
    | { type: 'REMOVE_ITEM'; id: string | number }
    | { type: 'CLEAR_CART' }
    | { type: 'INCREMENT'; id: string | number }
    | { type: 'DECREMENT'; id: string | number }
    | { type: 'CHECKOUT' };