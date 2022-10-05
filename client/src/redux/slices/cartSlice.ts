import { createSlice, PayloadAction } from '@reduxjs/toolkit';

function setCart() {
  if (!localStorage.getItem('cart')) {
    const items: [] = [];
    const count = 0;
    return { items, count };
  }

  const items: [] = JSON.parse(localStorage.getItem('cart') || '[]');
  const count: number = items.length || 0;

  return { items, count };
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
}

const initialState: CartState = {
  items: setCart().items || [],
  count: setCart().count || 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartProduct>) => {
      state.items = [...state.items, action.payload];
      state.count += 1;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.count -= 1;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
