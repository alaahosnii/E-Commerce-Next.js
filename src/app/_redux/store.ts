import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import cartSlice from "./slices/CartSlice";
import favoriteSlice from "./slices/FavoriteSlice";
import authSlice from "./slices/AuthSlice";
import paymentSlice from "./slices/paymentSlice";
const store = configureStore({
    reducer: {
        "products": productsSlice,
        "cart": cartSlice,
        "favorite": favoriteSlice,
        "auth": authSlice,
        "payment": paymentSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;