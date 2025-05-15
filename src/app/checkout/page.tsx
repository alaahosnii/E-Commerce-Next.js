"use client"
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductInCheckOut from '../_components/ProductInCheckOut/ProductInCheckOut';
import Spacer from '../_components/Spacer/Spacer';
import { Button, Form } from 'react-bootstrap';
import styles from "./CheckOut.module.css";
import { getClientSecret } from '../_redux/slices/paymentSlice';
import { Id, toast } from 'react-toastify';
import { RootState, AppDispatch } from '../_redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { paymentRequestBody } from '../_types/productTypes';
function CheckOut() {
  const router = useRouter();
  const cartState = useSelector((state: RootState) => state.cart);
  const { clientSecret, getClientSecretError, getClientSecretLoading } = useSelector((state: RootState) => state.payment);
  const dispatch = useDispatch<AppDispatch>();
  const [toastId, setToastId] = useState<Id | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  useEffect(() => {
    if (getClientSecretLoading) {
      const id = toast.loading("You will be redirected to the payment page ...");
      setToastId(id);
    }
  }, [getClientSecretLoading]);

  useEffect(() => {
    if (getClientSecretError && toastId) {
      toast.update(toastId!, {
        toastId: toastId,
        render: getClientSecretError.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [getClientSecretError, toastId]);

  useEffect(() => {
    if (clientSecret && toastId) {
      toast.dismiss(toastId!);
      console.log(clientSecret);
      window.location.href = `https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_BL3QVsbDLDfraKVEtrDhZtprz0HR7pHo&clientSecret=${clientSecret}`
    }
  }, [clientSecret, toastId]);

  const paymentData: paymentRequestBody = {
    apartment: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    phone: "",
    email: "",
    state: "",
    amount: cartState.localCart.totalPrice
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  }
  return (
    <div className='container'>
      <div className='flex gap-2 mt-4'>
        <div onClick={() => router.push("/")} className='homeNav'>Home</div>
        <div style={{ color: "grey" }}>/</div>
        <div className='homeNav'>Cart</div>
        <div style={{ color: "grey" }}>/</div>
        <div>Checkout</div>
      </div>
      <Formik
        initialValues={paymentData}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          dispatch(getClientSecret(values));
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex mt-5 justify-between'>
              <div className='col-4'>
                <h3 className='mb-0'>Billing Details</h3>
                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="streetAddress">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    onChange={handleChange}
                    value={values.streetAddress}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="apartment">Apartment No.</label>
                  <input
                    type="text"
                    name="apartment"
                    onChange={handleChange}
                    value={values.apartment}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="state">Town/City</label>
                  <input
                    type="text"
                    name="state"
                    onChange={handleChange}
                    value={values.state}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                    style={{ width: "100%" }}
                  />
                </div>

                <div className='mt-3'>
                  <label style={{ color: "grey", marginBottom: "5px" }} htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    style={{ width: "100%" }}
                  />
                </div>

                {errors.firstName && errors.firstName}
              </div>
              <div className='col-5'>
                {
                  cartState.localCart.products.map((product) => <ProductInCheckOut key={product.id} product={product} />)
                }
                <div className='flex align-items-center mt-5 mb-2 justify-between'>
                  <p className='mb-0'>Subtotal:</p>
                  <p className='mb-0'>${cartState.localCart.totalPrice}</p>
                </div>
                <Spacer direaction={"horizontal"} />
                <div className='flex align-items-center mt-4 mb-2 justify-between'>
                  <p className='mb-0'>Shipping:</p>
                  <p className='mb-0'>Free</p>
                </div>
                <Spacer direaction={"horizontal"} />
                <div className='flex align-items-center mt-3 mb-2 justify-between'>
                  <p className='mb-0'>Total:</p>
                  <p className='mb-0'>${cartState.localCart.totalPrice}</p>
                </div>
                <div className='flex justify-between mt-4'>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    value={`Credit Card`}
                    onChange={handleRadioChange}
                    id={`radio1`}
                    checked={paymentMethod === "Credit Card"}
                    label={"Credit Card"}
                    className={`${styles.customRadio}`}
                  />
                  <Image src="/credits.png" height={100} width={200} alt="credits" />
                </div>
                <div className='mt-4'>
                  <Form.Check // prettier-ignore
                    type={"radio"}
                    value={`Cash on Delivery`}
                    onChange={handleRadioChange}
                    id={`radio2`}
                    checked={paymentMethod === "Cash on Delivery"}
                    label={"Cash on Delivery"}
                    className={`${styles.customRadio}`}
                  />
                </div>
                <Button type='submit' variant="contained" className={`bg-danger text-white mt-5`} style={{ height: "50px", width: "100%" }}>Place Order</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CheckOut