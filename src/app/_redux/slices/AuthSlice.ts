import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance";
import { Error, LoginData, User } from "@/app/_types/productTypes";
import { AxiosError } from "axios";

type AuthError = {
    error: Error
}
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user: LoginData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/login", user);
            console.log("response", response);

            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            console.log("Login error:", axiosError?.response?.data || axiosError.message);

            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user: User, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/register", user);
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
);

export const getLoggedInUser = createAsyncThunk(
    "auth/getLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/loggedInUser", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data.user;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
)


export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (updatedUser: User, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch("/auth/updateUser", updatedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            console.log("update error", axiosError);
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
)

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/auth/refreshToken" , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as User | null,
        isLoginLoading: false,
        isRegisterLoading: false,
        loginError: null as Error | null,
        registerError: null as Error | null,
        registerStatus: false,
        getLoggedInUserError: null as Error | null,
        getLoggedInUserLoading: false,
        token: null as string | null,
        updateUserError: null as Error | null,
        updateUserLoading: false,
        updateUserSuccess: false
    },

    reducers: {

        resetLoginError: (state) => {
            if (state.loginError) {
                state.loginError = null;
            }
        },
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },

        changeRegisterStatus: (state) => {
            state.registerStatus = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoginLoading = true;
                state.loginError = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);      
                localStorage.setItem("token", action.payload.token);
                state.token = action.payload.token;
                state.isLoginLoading = false;
                state.loginError = null;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                const error = action.payload as AuthError;

                state.isLoginLoading = false;
                state.loginError = error.error;
            })
            .addCase(registerUser.pending, (state) => {
                state.isRegisterLoading = true;
                state.registerError = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isRegisterLoading = false;
                state.registerError = null;
                state.registerStatus = action.payload.status;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isRegisterLoading = false;
                state.registerError = action.payload as Error;
            })
            .addCase(getLoggedInUser.pending, (state) => {
                state.getLoggedInUserLoading = true;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.token = localStorage.getItem("token");
                state.user = action.payload;
                state.getLoggedInUserLoading = false;
                state.getLoggedInUserError = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.getLoggedInUserError = action.payload as Error;
                state.getLoggedInUserLoading = false;
            })
            .addCase(updateUser.pending, (state) => {
                state.updateUserLoading = true;
                state.updateUserError = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateUserLoading = false;
                state.updateUserError = action.payload as Error;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token);
                state.updateUserLoading = false;
                state.updateUserSuccess = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
    }
});

export const { logoutUser, resetLoginError, changeRegisterStatus } = authSlice.actions;
export default authSlice.reducer;