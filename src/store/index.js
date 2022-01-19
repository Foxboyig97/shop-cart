import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'
import shopReducer from '../features/shop/shoplistSlice'
import appRducer from '../features/app/appSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        shop: shopReducer,
        app: appRducer
    },
});
export default store