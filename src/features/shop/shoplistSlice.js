import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getcart } from "../../api/cart";
import { getShopList } from "../../api/soplist";
import { sleep } from "../../tools";

export const asyncShopList = createAsyncThunk(
    'shop/shopList',
    async () => {
        try {
            await sleep(500)
            return getShopList()
        } catch (error) {
            console.log(error);
        }
    }
)

export const saveProducts = createAsyncThunk(
    'shop/saveShopList',
    async (data) => {
        try {
            await sleep(500)
            return data
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    status: false,
    products: [],
    selectProducts: []
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        clearList: (state) => {
            state.products = []
        },
    },
    extraReducers: {
        [asyncShopList.fulfilled]: (state, { payload }) => {
            state.products = payload.products
        },
        [saveProducts.fulfilled]: (state, { payload }) => {
            state.products = payload
        },
    }
})


export const { clearList } = shopSlice.actions
export default shopSlice.reducer