import { RootState } from '@/app/_redux/store';
import { useDispatch } from 'react-redux';
import React from 'react'
import { useSelector } from 'react-redux';
import { changeQuantity, deleteFromCart } from '@/app/_redux/slices/CartSlice';
import { Product } from '@/app/_types/productTypes';
import styles from './CartItemContent.module.css';
import Image from 'next/image';

interface CartItemContentProps {
    product: Product;
}
export default function CartItemContent({ product }: CartItemContentProps) {
    const cartState = useSelector((state: RootState) => state.cart);
    // console.log(userCart);

    const quantity = cartState.localCart.products.find((cartProduct) => cartProduct.id == product.id)?.quantity;
    console.log(`quantity ${quantity}`)

    const dispatch = useDispatch();
    const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        console.log(product.id);
        console.log(parseInt(e.target.value));
        console.log(product.price);


        dispatch(changeQuantity({
            id: product.id,
            quantity: parseInt(e.target.value),
            basePrice: product.price
        }))
    }


    const deleteProduct = () => {
        dispatch(deleteFromCart({ id: product.id }));
    }
    return (
        <div className='shadow p-4 mb-5 bg-white rounded w-100 d-flex align-items-center'>
            <div className='col-3 text-center d-flex align-items-center justify-content-center'>
                <div className='d-flex w-75 align-items-center'>
                    <div className='position-relative' >
                        <Image className={`me-3 ${styles.img}`} src={product.imageUrl} width={40} height={40} alt={product.name} />
                        <div onClick={() => deleteProduct()} className="btn text-white position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger">
                            X
                        </div>
                    </div>
                    <p className={`${styles.p} mb-0 `}>{product.name}</p>
                </div>

            </div>
            <div className='col-3 text-center'>
                <p className={`${styles.p} mb-0`}> {`$${product.price.toFixed(2)}`} </p>
            </div>
            <div className='col-3 text-center'>
                <input type='number' min={1} className={`${styles.input}`} onChange={handleQuantity} value={quantity} />
            </div>
            <div className='col-3 text-center'>
                <p className={`${styles.p} mb-0`}>{`$${(product.subTotalPrice ?? 0).toFixed(2)}`}</p>
            </div>
        </div>)
}
