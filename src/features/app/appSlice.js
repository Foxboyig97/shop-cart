import { createSlice } from "@reduxjs/toolkit";
import { asyncShopList, saveProducts } from "../shop/shoplistSlice";

const initialState = {
    loading: false,
};

export const appSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    },
    extraReducers: {
        [asyncShopList.pending]: (state) => {
            state.loading = true
        },
        [asyncShopList.fulfilled]: (state) => {
            state.loading = false
        },
        [saveProducts.pending]: (state) => {
            state.loading = true
        },
        [saveProducts.fulfilled]: (state) => {
            state.loading = false
        },
    }
})


export const { hideLoading, showLoading } = appSlice.actions
export default appSlice.reducer