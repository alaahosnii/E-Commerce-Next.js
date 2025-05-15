import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance";
import { paymentRequestBody } from "@/app/_types/productTypes";
import { AxiosError } from "axios";
export const getClientSecret = createAsyncThunk(
    "payment/getClientSecret",
    async (paymentData: paymentRequestBody, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/payment/clientSecret", {
                params: paymentData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data);
        }
    }
)

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        clientSecret: null as string | null,
        getClientSecretError: null as Error | null,
        getClientSecretLoading: false
    },
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(getClientSecret.pending, (state) => {
                state.getClientSecretLoading = true;
                state.getClientSecretError = null;
            })
            .addCase(getClientSecret.rejected, (state, action) => {
                state.getClientSecretLoading = false;
                state.getClientSecretError = action.payload as Error;
            })
            .addCase(getClientSecret.fulfilled, (state, action) => {
                state.getClientSecretLoading = false;
                state.getClientSecretError = null;
                state.clientSecret = action.payload.clientSecret
            });
    }
})

export default paymentSlice.reducer;