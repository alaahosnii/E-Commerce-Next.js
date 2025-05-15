"use client"
import React, { useEffect, useState } from 'react'
import styles from './ProductComponent.module.css'
import Image from 'next/image'
import { Product } from '@/app/_types/productTypes'
import { useRouter } from "next/navigation"
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/_redux/store'
import { addToCart } from '@/app/_redux/slices/CartSlice'
import { addToFavorite } from '@/app/_redux/slices/FavoriteSlice'
import { removeFromFavorite } from '@/app/_redux/slices/FavoriteSlice'
interface ProductImageContainerProps {
    product: Product
    isWishList?: boolean
    isFlashSale?: boolean
}

function ProductImageContainer({ product, isWishList = false, isFlashSale = false }: ProductImageContainerProps) {
    const navigate = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const favorites = useSelector((state: RootState) => state.favorite.products);
    const [isFavorite, setIsFavorite] = useState(false);
    // const isFavorite = favorites.find((favorite) => favorite.id === product.id);
    useEffect(() => {
        setIsFavorite(favorites.find((favorite) => favorite.id === product.id) ? true : false);
    }, [favorites])
    const addProductToCart = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (authState.token) {
            dispatch(
                addToCart({
                    ...product,
                    quantity: 1,
                    subTotalPrice: product.price
                })
            );
            toast.success("Product added to cart", {
                autoClose: 3000
            });
        } else {
            const id = toast.error(
                <div className='flex items-center justify-between w-full'>Login to add to cart
                    <Button
                        onClick={() => {
                            toast.dismiss(id);
                        }}
                        variant="contained"
                        className={` bg-red-500 text-white flex items-center justify-center`}
                        style={{ height: "30px" }}
                    >Login
                    </Button>
                </div>,

                {
                    autoClose: 5000,
                    closeButton: false
                })
        }

    }

    const toggleFavorite = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        if (authState.user) {
            if (isFavorite) {
                removeProductFromFavorite();
            } else {
                addProductToFavorite();
            }
        } else {
            const id = toast.error(
                <div className='d-flex align-items-center justify-content-between w-100'>Login to add to wishlist
                    <Button
                        onClick={() => {
                            toast.dismiss(id);
                            return navigate.push("/login")
                        }}
                        variant="contained"
                        className={`bg-danger text-white d-flex align-items-center justify-content-center`}
                        style={{ height: "30px" }}
                    >Login
                    </Button>
                </div>,

                {
                    autoClose: 5000,
                    closeButton: false
                })
        }

    }
    const addProductToFavorite = () => {

        dispatch(addToFavorite(product));
    }
    const removeProductFromFavorite = () => {
        dispatch(removeFromFavorite(product));
    }
    return (
        <div onClick={() => navigate.push(`/products/${product.id}`)} className={`productImgContainer relative`}>
            {isWishList ? (
                <Image
                    src="/delete_icon.png"
                    alt='deleteIcon'
                    className={styles.favoriteImg}
                    width={34}
                    height={34}
                />
            ) : (
                <Image
                    src={isFavorite ? "/heart_filled.png" : "/fav_icon.png"}
                    onClick={toggleFavorite}
                    alt='favoriteIcon'
                    className={styles.favoriteImg}
                    width={34}
                    height={34}
                />
            )}
            <Image src={product.imageUrl} width={115} height={180} alt={product.name} />
            {!isWishList && (
                <Image
                    src="/preview_icon.png"
                    alt='previewIcon'
                    className={styles.previewIcon}
                    width={34}
                    height={34}
                />
            )}
            <div onClick={addProductToCart} className={`${isWishList ? "addToCartBoxInWishlist" : "addToCartBox"} bg-black w-full absolute bottom-0 text-white flex justify-center items-center`}>
                <Image alt='cart' src="/white_cart.png" height={20} width={20} />
                <p className='mb-0 ms-2'>Add to Cart</p>
            </div>
            {isFlashSale && (
                <div className='absolute top-0 start-0 ms-2 mt-2 bg-red-500 text-white py-1 px-2 rounded'>
                    - {product.salePercentage}%
                </div>
            )}
        </div>
    )
}

export default ProductImageContainer 