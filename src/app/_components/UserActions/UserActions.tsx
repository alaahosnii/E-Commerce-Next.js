"use client";
import React, { useEffect } from 'react';
// import { ThemeContext } from '@/app/_contexts/ThemeModeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import Image from 'next/image';
import { getLoggedInUser, logoutUser } from '@/app/_redux/slices/AuthSlice';
import { addCartToDataBase, getCartFromDB, removeLocalCart, resetActionToChangeCart } from '@/app/_redux/slices/CartSlice';
import { addFavoritesToDB, getFavoritesFromDB, removeLocalFavorite, resetIsChangeInLocalFavorite } from '@/app/_redux/slices/FavoriteSlice';
import { RootState } from "@/app/_redux/store";
import { AppDispatch } from '@/app/_redux/store';
import { useRouter } from 'next/navigation';
import "./UserActions.css"
// import { toast } from 'react-toastify';


const UserActions = () => {
    // const context = useContext(ThemeContext);
    // const theme = context?.theme;
    const cartState = useSelector((state: RootState) => state.cart);
    const authState = useSelector((state: RootState) => state.auth);
    // console.log(cartState);
    const favoriteState = useSelector((state: RootState) => state.favorite);
    const favorites = useSelector((state: RootState) => state.favorite.products);
    const isChangeInLocalFavorite = useSelector((state: RootState) => state.favorite.isChangeInLocalFavorite);

    const navigate = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(getLoggedInUser());
            dispatch(getCartFromDB());
            dispatch(getFavoritesFromDB());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.token]);
    useEffect(() => {
        if (favorites.length >= 0 && isChangeInLocalFavorite) {

            dispatch(addFavoritesToDB(favorites))
                .unwrap().then(() => {
                    dispatch(resetIsChangeInLocalFavorite());
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorites]);

    // useEffect(() => {
    //     if (authState.getLoggedInUserError) {
    //         toast.error(authState.getLoggedInUserError);
    //     }
    // }, [authState.getLoggedInUserError])

    useEffect(() => {
        console.log(cartState.isAddToLocalCart);

        if ((cartState.isAddToLocalCart || cartState.actionToChangeCart) && cartState.localCart.products.length >= 0) {

            dispatch(addCartToDataBase({
                products: cartState.localCart.products,
                totalQuantity: cartState.localCart.totalQuantity,
                totalPrice: cartState.localCart.totalPrice
            }));
            if (cartState.actionToChangeCart) {
                dispatch(resetActionToChangeCart());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartState.localCart]);

    useEffect(() => {
        if (cartState.addCartToDBSuccess) {

            dispatch(getCartFromDB());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartState.addCartToDBSuccess]);
    const logout = () => {
        dispatch(logoutUser());
        dispatch(removeLocalCart());
        dispatch(removeLocalFavorite());
    }
    return (
        <>
            <div className='relative'>
                <input type="text" placeholder='What are you looking for?' />
                <Image alt='search' src="/search_icon.png" height={16} width={16} className='absolute top-3 right-2' />
            </div>
            <div className='btn relative' onClick={() => navigate.push("/wishlist")}>
                <Image alt='love' src="/love_icon.png" height={20} width={20} />
                <div className="absolute top-0 start-8 text-white text-xs rounded-full w-5 h-5 bg-danger flex items-center justify-center">
                    {favoriteState.products.length}
                </div>
            </div>
            <div className='btn relative' onClick={() => navigate.push("/cart")}>
                <Image alt='cart' src="/cart_icon.png" height={25} width={25} />
                <div className="absolute top-0 start-8 text-white text-xs rounded-full w-5 h-5 bg-danger flex items-center justify-center">
                    {cartState.localCart.products.length}
                </div>
            </div>
            {authState.user &&
                <Dropdown align={"end"}>
                    <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none", padding: "0px" }} id="dropdown-basic">
                        <Image alt='user' src="/user_icon.png" height={30} width={30} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ backgroundColor: "rgba(0, 0, 0, 0.04)", backdropFilter: "blur(20px)" }}>
                        <Dropdown.Item className='custom-dropdown-item' style={{ color: "white" }}>
                            <div className='flex items-center gap-4'>
                                <Image alt='user' src="/user_icon.png" height={30} width={30} />
                                <p className='mb-0'>{authState.user.name}</p>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={logout} className='custom-dropdown-item' style={{ color: "white" }}>
                            <div className='flex items-center gap-4'>
                                <Image alt='logout' src="/logout_icon.png" height={30} width={30} />
                                <p className='mb-0'>Logout</p>
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            }
        </>
    );
};

export default UserActions;
