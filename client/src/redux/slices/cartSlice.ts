import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function setCart() {
  if (!localStorage.getItem('cart')) {
    const items: [] = [];
    const count = 0;
    const paid = false;
    return { items, count, paid };
  }

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  const items: [] = cart.items;
  const count: number = items.length || 0;
  const paid: boolean = cart.paid;

  return { items, count, paid };
}

export type CartProduct = {
  productId: string;
  id: string;
  image: string;
  name: string;
  size: string;
  variant: string;
  price: number;
};

export interface CartState {
  items: CartProduct[];
  count: number;
  paid: boolean;
}

const initialState: CartState = {
  items: setCart().items || [],
  count: setCart().count || 0,
  paid: setCart().paid || false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartProduct>) => {
      state.items = [...state.items, action.payload];
      state.count += 1;
      state.paid = false;
      localStorage.setItem(
        'cart',
        JSON.stringify({ items: state.items, paid: state.paid })
      );
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.count -= 1;
      localStorage.setItem('cart', JSON.stringify({ items: state.items }));
    },
    emptyCart: (state: CartState) => {
      state.items = [];
      state.count = 0;
      state.paid = false;
      localStorage.setItem(
        'cart',
        JSON.stringify({ items: state.items, paid: state.paid })
      );
    },
    setPaid: (state: CartState, action: PayloadAction<boolean>) => {
      state.paid = action.payload;
      localStorage.setItem(
        'cart',
        JSON.stringify({ items: state.items, paid: state.paid })
      );
    },
  },
});

export const { addToCart, removeFromCart, emptyCart, setPaid } =
  cartSlice.actions;

export default cartSlice.reducer;
