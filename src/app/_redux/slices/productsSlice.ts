import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";
import { Product } from "@/app/_types/productTypes";
import { AxiosError } from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/products");
            return data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
)
const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [] as Product[],
        loading: false,
        error: null as Error | null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as Error;
            });
    }
});

export default productsSlice.reducer;