"use client"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/_redux/store";
import { toast } from "react-toastify";
import { addCartToDataBase } from "@/app/_redux/slices/CartSlice";
import { useEffect } from "react";
const PaymentSuccessContent = () => {
    const router = useRouter();
    const authState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const id = toast.loading("Redirecting to Home Page ...", {
            autoClose: 5000
        });
        dispatch(addCartToDataBase({
            products: [],
            totalPrice: 0,
            totalQuantity: 0
        }));

        setTimeout(() => {
            toast.dismiss(id);
            router.push("/");
        }, 5000);
    }, []);
    return (
        <div className='d-flex gap-2'>
            <h3 className='mb-0 mt-3'>Congrats </h3>
            <h3 className='mb-0 mt-3 text-danger'>{authState.user && authState.user.name}</h3>
            <h3 className='mb-0 mt-3'>Your Payment was successful</h3>
        </div>
    )
}

export default PaymentSuccessContent;