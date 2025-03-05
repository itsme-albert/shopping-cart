export interface CartItem {
    productId: number;
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
    | { type: 'REMOVE_ITEM'; productId: string | number }
    | { type: 'INCREMENT'; productId: string | number }
    | { type: 'DECREMENT'; productId: string | number }
    | { type: 'CHECKOUT' };