import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const persistProductConfig = {
  key: 'products',
  storage,
  whitelist: ['items', 'categories']
};

const persistCartConfig = {
  key: 'cart',
  storage,
  whitelist: ['items']
};

const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated']
};

const persistedProductReducer = persistReducer(persistProductConfig, productReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    products: persistedProductReducer,
    cart: persistedCartReducer,
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export const persistor = persistStore(store);
