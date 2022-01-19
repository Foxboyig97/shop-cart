import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getcart, setLocCart } from "../../api/cart";
import { sleep } from "../../tools";
import { accSub } from "../../tools/numcompentued";


export const asynGetCart = createAsyncThunk(
    'cart/getcart',
    async () => {
        try {
            await sleep(500)
            return getcart()
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    goods: getcart() || []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearcart: (state) => {
            state.goods = []
            setLocCart([])
        },
        saveCart: (state, { payload }) => {
            state.goods = payload
        },

        //添加购物车
        addToShopCart: (state, { payload }) => {
            let sku = payload?.sku ? payload?.sku : payload?.good.sku
            let skuSize = payload?.skuSize ? payload.skuSize : payload?.good.skuSize
            let temGoods = []
            let cartList = getcart() || []
            let isHave = false;
            cartList && cartList.forEach(item => {
                if ((item.good.sku == sku) && (item.good.skuSize == skuSize)) {
                    item.count++;
                    isHave = true
                }
            });
            temGoods = isHave ? cartList : [...cartList, { good: payload, count: 1 }]
            state.goods = temGoods
            setLocCart(temGoods)
        },

        //减少数量
        reduceToShopCart: (state, { payload }) => {
            let temGoods = state.goods
            let skuSize = payload?.skuSize ? payload.skuSize : payload?.good.skuSize
            temGoods.forEach(item => {
                if (item.good.sku == payload.good.sku && item.good.skuSize == skuSize) {
                    item.count = Number(accSub(item.count, 1))
                }
            });
            state.goods = temGoods
            setLocCart(temGoods)
        },

        //删除商品
        deleteToShopCart: (state, { payload }) => {
            let temGoods = getcart()
            let skuSize = payload?.skuSize ? payload.skuSize : payload?.good.skuSize
            let array = temGoods.filter((item) => {
                if ((item.good.sku === payload?.good?.sku) && (item.good.skuSize === skuSize)) {
                    return false
                } else {
                    return true
                }
            });
            state.goods = array
            setLocCart(array)
        }
    },
    extraReducers: {}
})


export const { clearcart, saveCart, addToShopCart, reduceToShopCart, deleteToShopCart } = cartSlice.actions
export default cartSlice.reducer