import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance";
import { Product } from "@/app/_types/productTypes";
import { AxiosError } from "axios";
export const addFavoritesToDB = createAsyncThunk(
    "favorite/addFavoritesToDB",
    async (products: Product[], { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/favorites", products, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);

export const getFavoritesFromDB = createAsyncThunk(
    "favorite/getFavoritesFromDB",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/favorites", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
);

const slice = createSlice({
    name: "favorite",
    initialState: {
        products: [] as Product[],
        addFavoritesToDBError: null as Error | null,
        addFavoritesToDBLoading: false,
        getFavoritesFromDBError: null as Error | null,
        getFavoritesFromDBLoading: false,
        addFavoritesToDBSuccess: false,
        getFavoritesFromDBSuccess: false,
        isChangeInLocalFavorite: false
    },

    reducers: {
        resetIsChangeInLocalFavorite: (state) => {
            state.isChangeInLocalFavorite = false
        },
        removeLocalFavorite: (state) => {
            state.products = [];
        },
        addToFavorite: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
            state.isChangeInLocalFavorite = true
        },
        removeFromFavorite: (state, action: PayloadAction<Product>) => {
            const filtered = state.products.filter((product) => product.id != action.payload.id);
            state.products = filtered;
            state.isChangeInLocalFavorite = true
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(addFavoritesToDB.pending, (state) => {
                state.addFavoritesToDBLoading = true;
                state.addFavoritesToDBError = null;
            })
            .addCase(addFavoritesToDB.rejected, (state, action) => {
                state.addFavoritesToDBLoading = false;
                state.addFavoritesToDBError = action.payload as Error;
            })
            .addCase(addFavoritesToDB.fulfilled, (state) => {
                state.addFavoritesToDBLoading = false;
                state.addFavoritesToDBError = null;
                state.addFavoritesToDBSuccess = true;
            })
            .addCase(getFavoritesFromDB.pending, (state) => {
                state.getFavoritesFromDBLoading = true;
                state.getFavoritesFromDBError = null;
            })
            .addCase(getFavoritesFromDB.rejected, (state, action) => {
                state.getFavoritesFromDBLoading = false;
                state.getFavoritesFromDBError = action.payload as Error;
            })
            .addCase(getFavoritesFromDB.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.getFavoritesFromDBLoading = false;
                state.getFavoritesFromDBError = null;
                state.getFavoritesFromDBSuccess = true;
            });
    }
});

export const { addToFavorite, removeLocalFavorite, resetIsChangeInLocalFavorite, removeFromFavorite } = slice.actions;
export default slice.reducer;