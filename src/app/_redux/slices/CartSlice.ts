import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../services/axiosInstance";
import { Cart, Product } from "@/app/_types/productTypes";
import { AxiosError } from "axios";
export const addCartToDataBase = createAsyncThunk(
    "cart/addCartToDataBase",
    async (cart: Cart, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/cart", cart, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
);

export const getCartFromDB = createAsyncThunk(
    "cart/getCartFromDataBase",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/cart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data;
        } catch (error: unknown) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError?.response?.data || "An unknown error occurred");
        }
    }
);
const slice = createSlice({
    name: "cart",
    initialState: {
        localCart: {
            products: [] as Product[],
            totalQuantity: 0,
            totalPrice: 0
        },
        // totalQuantity: 0,
        // totalPrice: 0,
        isAddToLocalCart: false,
        addToCartLoading: false,
        addtoCartError: null as Error | null,
        addToCartSuccess: false,
        addCartToDBSuccess: false,
        getcartFromDBLoading: false,
        getcartFromDBError: null as Error | null,
        getCartFromDBSuccess: false,
        actionToChangeCart: null as string | null,
    },

    reducers: {
        removeLocalCart: (state) => {
            state.localCart = {
                products: [] as Product[],
                totalQuantity: 0,
                totalPrice: 0
            }
        },

        chagngeIsAddToLocalCart: (state, action) => {
            state.isAddToLocalCart = action.payload
        },
        resetActionToChangeCart: (state) => {
            state.actionToChangeCart = null
        },
        addToCart: (state, action: PayloadAction<Product>) => {
            const { quantity, price, id } = action.payload;
            const totalProductPrice = price * (quantity ?? 0);
            const productIndex = state.localCart.products.findIndex((cartProduct) => cartProduct.id == id);
            if (productIndex !== -1) {
                const cartProductQuantity = state.localCart.products[productIndex].quantity;
                const updatedQuantity = (cartProductQuantity ?? 0) + 1;
                const cartProducts = state.localCart.products.map(
                    (cartProdcut) => cartProdcut.id == id
                        ? {
                            ...cartProdcut, price: cartProdcut.price,
                            quantity: (quantity ?? 0) + (cartProductQuantity ?? 0),
                            subTotalPrice: cartProdcut.price * updatedQuantity,

                        }
                        : cartProdcut
                );
                state.localCart = {
                    products: cartProducts,
                    totalQuantity: state.localCart.totalQuantity + 1,
                    totalPrice: state.localCart.totalPrice + totalProductPrice
                };
                state.addToCartSuccess = true;

            } else {
                state.localCart = {
                    products: [...state.localCart.products, action.payload as Product],
                    totalQuantity: state.localCart.totalQuantity + 1,
                    totalPrice: state.localCart.totalPrice + totalProductPrice
                }
                state.addToCartSuccess = true;
                // state.products.push(action.payload);
            }
            state.isAddToLocalCart = true;
            // state.totalQuantity++;
            // state.totalPrice += totalProductPrice;
        },
        changeQuantity: (state, action: PayloadAction<{ id: number, quantity: number, basePrice: number }>) => {
            console.log('action', action);

            const productId = action.payload.id;
            const productQuantity = action.payload.quantity;
            console.log("local from slice", state.localCart.products);
            // console.log("from db from slice" , state.cartFromDB.products);


            const cartProducts = state.localCart.products.map(
                (cartProduct) => cartProduct.id == productId
                    ? {
                        ...cartProduct,
                        quantity: productQuantity,
                        subTotalPrice: cartProduct.price * productQuantity,
                    }
                    : cartProduct
            )
            console.log("cartProducts", cartProducts);
            const totalQuantity = cartProducts.reduce((acc, current) => {
                console.log("acc, current", acc, current.quantity);

                return acc + (current.quantity ?? 0);
            }, 0);
            console.log("totalQuantity", totalQuantity);


            state.localCart = {
                products: cartProducts,
                totalQuantity: cartProducts.reduce((acc, current) => acc + (current.quantity ?? 0), 0),
                totalPrice: cartProducts.reduce((acc, current) => acc + (current.subTotalPrice ?? 0), 0),

            }
            console.log("from slice", state.localCart);
            state.actionToChangeCart = action.type;
            // state.products = cartproducts;
        },
        deleteFromCart: (state, action: PayloadAction<{ id: number }>) => {
            const productId = action.payload.id;
            const deletedProduct = state.localCart.products.find((product) => product.id == productId);
            const filteredProducts = state.localCart.products.filter((product) => product.id != productId);
            state.localCart = {
                products: filteredProducts,
                totalQuantity: state.localCart.totalQuantity - (deletedProduct?.quantity ?? 0),
                totalPrice: state.localCart.totalPrice - (deletedProduct?.subTotalPrice ?? 0)
            }
            state.actionToChangeCart = action.type;
            // state.totalPrice -= deletedProduct.subTotalPrice;
            // state.totalQuantity -= deletedProduct.quantity;
            // state.products = filteredProducts;
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(addCartToDataBase.pending, (state) => {
                state.addToCartLoading = true;
                state.addtoCartError = null;
            }).
            addCase(addCartToDataBase.rejected, (state, action) => {
                state.addToCartLoading = false;
                state.addtoCartError = action.payload as Error;
            }).
            addCase(addCartToDataBase.fulfilled, (state) => {
                state.addToCartLoading = false;
                state.addtoCartError = null;
                state.addCartToDBSuccess = true;
                state.isAddToLocalCart = false;

            }).
            addCase(getCartFromDB.pending, (state) => {
                state.getcartFromDBLoading = true;
                state.getcartFromDBError = null;
            }).
            addCase(getCartFromDB.rejected, (state, action) => {
                state.getcartFromDBLoading = false;
                state.getcartFromDBError = action.payload as Error;
            }).
            addCase(getCartFromDB.fulfilled, (state, action) => {
                state.getcartFromDBLoading = false;
                state.getcartFromDBError = null;
                state.getCartFromDBSuccess = true;
                state.localCart = action.payload.cart;
                state.addCartToDBSuccess = false;
                // state.isAddToLocalCart = false;
            })
    },
});

export const { addToCart, removeLocalCart, resetActionToChangeCart, changeQuantity, chagngeIsAddToLocalCart, deleteFromCart } = slice.actions;
export default slice.reducer;