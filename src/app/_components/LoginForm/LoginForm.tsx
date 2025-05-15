"use client"
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Id, toast } from 'react-toastify';
import { loginUser, resetLoginError } from '@/app/_redux/slices/AuthSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/app/_redux/store';
import { FormError, LoginData } from '@/app/_types/productTypes';


function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useRouter();
  const { loginError, isLoginLoading, user } = useSelector((state: RootState) => state.auth);
  const [id, setId] = useState<Id>();
  if (isLoginLoading) {
    console.log("loading");
  }

  useEffect(() => {

    dispatch(resetLoginError());

  }, [dispatch])
  useEffect(() => {
    if (isLoginLoading) {
      const idd: Id = toast.loading("Loading...");
      setId(idd);
    }
  }, [isLoginLoading, dispatch]);

  useEffect(() => {
    if (loginError) {
      console.log("loginError", loginError.message);

      toast.update(
        id!,
        {
          render: loginError.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      )
    }


  }, [loginError]);
  useEffect(() => {
    if (user && id) {
      toast.dismiss(id);
      navigate.push("/");
    }
  }, [user, navigate, id]);
  const loginData: LoginData = {
    email: "",
    password: ""
  }
  return (
    <div>
      <Formik
        initialValues={loginData}
        validate={values => {
          const errors: FormError = {};

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
          dispatch(loginUser(values));
        }}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form className='d-flex flex-column' style={{ width: "70%" }} onSubmit={handleSubmit}>
            <div className='mt-3'>
              <div className="form-floating mb-3">
                <input
                  type="Name"
                  className={`form-control ${errors.email && `is-invalid`}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={values.email}
                  name="email"
                  disabled={isLoginLoading}
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
                  disabled={isLoginLoading}
                  value={values.password}
                  onChange={handleChange}
                ></input>
                <label htmlFor="floatingInput"> {errors.password ? errors.password : "Password"} </label>
              </div>

            </div>

            {loginError && <p className='text-danger mb-3 mt-3'> {loginError.message} </p>}
            {/* {errors.password && touched.password && errors.password} */}
            <Button type='submit' variant="contained" className={`${!loginError && "mt-5"} bg-danger text-white`} style={{ height: "50px" }}>Log in</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm