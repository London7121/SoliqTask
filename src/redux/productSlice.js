import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    loading: false,
    error: null
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
      state.items = state.items.filter(p => p.categoryId !== action.payload);
    },
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

export const { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  addCategory, 
  deleteCategory,
  setProducts,
  setCategories
} = productSlice.actions;

export default productSlice.reducer;
