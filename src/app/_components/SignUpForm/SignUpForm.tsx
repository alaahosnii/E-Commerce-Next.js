"use client"
import React from 'react'
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { changeRegisterStatus, registerUser } from '@/app/_redux/slices/AuthSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/app/_redux/store';
import { RootState } from '@/app/_redux/store';
import Link from 'next/link';
import { FormError, User } from '@/app/_types/productTypes';

function SignUpForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const { registerError, registerStatus } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (registerStatus) {
      navigate.push("/login");
      return () => {
        dispatch(changeRegisterStatus());
      }
    }
  }, [registerStatus, navigate, dispatch]);

  return (
    <div>
      <Formik
        initialValues={{ name: "", email: '', password: '' }}
        validate={values => {
          const errors: FormError = {};
          if (!values.name) {
            errors.name = 'Required';
          } else if (values.name.length < 3) {
            errors.name = 'Name must be at least 3 characters long'
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required'
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long'
          }

          return errors;
        }}
        onSubmit={(values) => {
          const user: User = {
            name: values.name,
            email: values.email,
            password: values.password,
          }
          dispatch(registerUser(user));

        }}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className='flex flex-col' style={{ width: "70%" }} onSubmit={handleSubmit}>
            <div className='mt-3'>
              <div className="form-floating mb-3 " >
                <input
                  type="Name"
                  className={`form-control ${errors.name && `is-invalid`}`}
                  id="floatingInput"
                  placeholder="username"
                  value={values.name}
                  disabled={isSubmitting}
                  name="name"
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.name ? errors.name : "User Name"} </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="Name"
                  className={`form-control ${errors.email && `is-invalid`}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={values.email}
                  name="email"
                  disabled={isSubmitting}
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.email ? errors.email : "Email"} </label>
              </div>
              <div className="form-floating" >
                <input
                  type="password"
                  className={`form-control ${errors.password && `is-invalid`}`}
                  id="floatingPassword"
                  name="password"
                  placeholder="Password"
                  disabled={isSubmitting}

                  value={values.password}
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.password ? errors.password : "Password"} </label>
              </div>

            </div>

            {registerError && <p className='text-red-500 mb-3 mt-3'> {registerError.message} </p>}
            <Button type='submit' variant="contained" className={`bg-danger text-white ${!registerError && "mt-5"}`} style={{ height: "50px" }}>Create Account</Button>
            <div className='flex justify-center gap-2 items-center mt-4'>
              <p className='mb-0'>Already have an account?</p>
              <Link href="/login" className="text-black text-decoration-none cursor-pointer border-b-2 border-[#555555]">Login</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm