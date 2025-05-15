"use client"
import React, { useState } from 'react'
import "./RightSide.css"
import Spacer from '../Spacer/Spacer'
import { Product, Size } from '@/app/_types/productTypes'
import Image from 'next/image'
import SizeCard from '../SizeCard/SizeCard'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../_redux/slices/CartSlice';
import { AppDispatch } from '@/app/_redux/store'
import { toast } from 'react-toastify'

function RightSide({ product }: {
    product: Product
}) {
    const dispatch = useDispatch<AppDispatch>();
    const sizesList: Size[] = [

        {
            id: 1,
            sizeNumber: "XS",
            selected: false,
        },
        {
            id: 2,
            sizeNumber: "S",
            selected: false,
        },
        {
            id: 3,
            sizeNumber: "M",
            selected: false,
        },
        {
            id: 4,
            sizeNumber: "L",
            selected: false,
        },
        {
            id: 5,
            sizeNumber: "XL",
            selected: false,
        },
    ];
    const [quantity, setQuantity] = useState(1);
    const [sizes, setSizesList] = useState(sizesList);

    const onSizeSelected = (size: Size) => {
        const newSizes = sizes.map((item) => item.id == size.id ? { ...item, selected: item.selected ? false : true }
            : item.selected ? { ...item, selected: false } : item
        );
        setSizesList(newSizes);
    }

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    }

    const decrementQuantity = () => {
        setQuantity((prev) => prev == 1 ? 1 : prev - 1);
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            ...product,
            quantity: quantity,
            subTotalPrice: product.price * quantity
        }));
        toast.success("Product added to cart", {
            autoClose: 3000
        });
    }

    // const favoriteProduct = useSelector((state) => state.favorite.products).find((favProduct) => favProduct.id == product.id);
    // const dispatch = useDispatch();
    // const toggleFavorite = () => {

    //   if (favoriteProduct) {
    //     removeProductFromFavorite(product);
    //   } else {
    //     addProductToFavorite(product);
    //   }
    // }
    // const addProductToFavorite = () => {

    //   dispatch(addToFavorite(product));
    // }
    // const removeProductFromFavorite = () => {
    //   dispatch(removeFromFavorite(product));
    // }

    return (
        <div className='m-top'>
            <h5> {product?.name} </h5>
            <div className='gap-2 flex-col flex lg:flex-row mt-1 lg:items-center'>
                <div className='flex'>
                    <Image alt='star' src="/star.png" width={17} height={17} />
                    <Image className='ms-1' alt='star' src="/star.png" width={17} height={17} />
                    <Image className='ms-1' alt='star' src="/star.png" width={17} height={17} />
                    <Image className='ms-1' alt='star' src="/star.png" width={17} height={17} />
                    <Image className='ms-1' alt='star' src="/star.png" width={17} height={17} />
                </div>
                <div className='flex'>
                    <div className=' text-gray-400'>
                        (150 Reviews) |
                    </div>
                    <div style={{ color: "rgba(0, 255, 102, 1)" }} className='ms-2'>In Stock</div>

                </div>
            </div>
            <div className=' text-lg mt-3'>${product?.price}</div>
            <div>
                <p className='mt-3'>{product?.description}</p>
            </div>
            <Spacer direaction={"horizontal"} />
            <div className='flex mt-3 gap-2 items-center'>
                <p className='text-lg mb-0'>Size:</p>
                {sizes.map((size) => <SizeCard key={size.id} size={size} onSelect={onSizeSelected} />)}
            </div>
            <div className='flex mt-4 gap-3 justify-between' style={{ height: "41px" }}>
                <div className='gap-4 border-1 border-e-0 border-black rounded flex items-center justify-between'>
                    <button onClick={decrementQuantity} style={{ height: "41px", width: "41px", backgroundColor: "transparent" }} className='justify-center hover:cursor-pointer flex items-center  border-1 border-s-0 border-t-0 border-bottom-0 border-black h-100'>
                        <Image alt='minus' src="/minus.png" height={16} width={16} />
                    </button>
                    {quantity}
                    <button onClick={incrementQuantity} style={{ height: "41px", width: "41px", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }} className=' hover:cursor-pointer flex items-center justify-center bg-red-500  border-1  border-red-500 border-s-0  border-b-0  h-100'>
                        <Image alt='plus' src="/plus.png" height={16} width={16} />
                    </button>
                </div>
                <button onClick={handleAddToCart} type="button" className='col bg-red-600 text-white rounded flex items-center justify-center'>Add To Cart</button>
                <button type='button' className='favBtn'>
                    <Image alt='heart' src="/love_icon.png" width={16} height={16} />
                </button>
            </div>
            <div className='border-1 border-black rounded mt-4' style={{ height: "180px" }}>
                <div className='flex border-b-1 border-black items-center p-3' style={{ height: "50%" }}>
                    <Image alt='delivery' src="/delivery_icon.png" height={40} width={40} />
                    <div className='flex flex-col ms-3 gap-2'>
                        <h6 className='mb-0'>Free Delivery</h6>
                        <p className='mb-0' style={{ fontSize: "13px" }}>Enter your postal code for Delivery Availability</p>
                    </div>
                </div>

                <div className='flex items-center p-3' style={{ height: "50%" }}>
                    <Image alt='return' src="/return_icon.png" height={40} width={40} />
                    <div className='flex flex-col ms-3 gap-2'>
                        <h6 className='mb-0'>Return Delivery</h6>
                        <p className='mb-0' style={{ fontSize: "13px" }}>Free 30 Days Delivery Returns. Details</p>
                    </div>
                </div>

            </div>
        </div>)
}

export default RightSide