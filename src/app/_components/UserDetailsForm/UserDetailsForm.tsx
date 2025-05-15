"use client"
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Id, toast } from 'react-toastify';
import { updateUser } from '@/app/_redux/slices/AuthSlice';
import { AppDispatch, RootState } from '@/app/_redux/store';
import { FormError, User } from '@/app/_types/productTypes';
function UserDetailsForm() {
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.user;
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [id, setId] = useState<Id | 0>(0);
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    if (authState.updateUserLoading) {
      const idd = toast.loading("Updating...");
      setId(idd);
    }
  }, [authState.updateUserLoading]);

  useEffect(() => {
    if (authState.updateUserError) {

      toast.update(
        id,
        {
          render: authState.updateUserError ? authState.updateUserError.message : "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.updateUserError]);

  useEffect(() => {
    if (authState.updateUserSuccess && id) {
      toast.update(
        id,
        {
          render: "Updated Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true
        }
      );
    }
  }, [authState.updateUserSuccess, id]);
  return (
    <div className='col-12 col-md-7 border-1 p-4 border-white shadow rounded' style={{ height: "fit-content" }}>
      <p className='font-bold text-red-500'>Edit Your Profile</p>
      <div >
        <Formik
          initialValues={{ name: "", email: '', address: "", password: '', newPass: '', confirmPass: '' }}
          enableReinitialize
          validate={values => {
            const errors: FormError = {};
            if ((values.password != user?.password) && values.password) {
              errors.password = 'Password Is Incorrect';
            } else {
              if (!values.password) {
                setPasswordMatch(false);
              } else {
                setPasswordMatch(true);
              }
              // setPasswordMatch(true);
            }
            if (values.newPass != values.confirmPass) {
              errors.confirmPass = 'Password does not match';
            }

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            let updatedUser: User = {
              name: values.name,
              email: values.email,
              address: values.address,
              password: values.password,
              newPass: values.newPass,
              confirmPass: values.confirmPass
            }
            for (const key in values) {
              const keyName = key as keyof typeof values;
              if (keyName) {
                updatedUser = {
                  ...updatedUser,
                  [keyName == "confirmPass" ? "password" : keyName == "newPass" ? "password" : keyName]: keyName == "confirmPass" ? values.newPass : keyName == "newPass" ? values.newPass : values[keyName as keyof typeof values]
                }

              }
            }
            if (values.name || values.email || values.address || values.password || values.newPass || values.confirmPass) {
              console.log(updatedUser);
              dispatch(updateUser(updatedUser));
              resetForm();
            }
          }}
        // validateOnChange={false}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form className='flex flex-row flex-wrap' style={{ width: "100%", height: "100%" }} onSubmit={handleSubmit}>
              <div className='mt-3 flex w-100 flex-col gap-3'>
                <div className='flex gap-3'>
                  <div className="form-floating mb-3 w-100" >
                    <input
                      type="Name"
                      className={`form-control ${errors.name && `is-invalid`}`}
                      id="floatingInput"
                      placeholder="Name"
                      value={values.name}
                      disabled={!editable}
                      name="name"
                      onChange={handleChange}
                      style={{ backgroundColor: "#F5F5F5" }}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.name ? errors.name : "Name"} </label>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <div className="form-floating mb-3 w-50" >
                    <input
                      type="Name"
                      className={`form-control ${errors.name && `is-invalid`}`}
                      id="floatingInput"
                      placeholder="Email"
                      value={values.email}
                      disabled={!editable}
                      name="email"
                      onChange={handleChange}
                      style={{ backgroundColor: "#F5F5F5" }}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.email ? errors.email : "Email"} </label>
                  </div>
                  <div className="form-floating mb-3 w-50">
                    <input
                      type="Name"
                      className={`form-control ${errors.email && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='Address'
                      value={values.address}
                      name="address"
                      disabled={!editable}
                      style={{ backgroundColor: "#F5F5F5" }}

                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.address ? errors.address : "Address"} </label>
                  </div>
                </div>
                <div><p className='mb-0'>Password Changes</p></div>
                <div className='flex flex-wrap w-100'>
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="Name"
                      className={`form-control ${errors.password && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='Current Password'
                      value={values.password}
                      name="password"
                      disabled={!editable}
                      style={{ backgroundColor: "#F5F5F5" }}

                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.password ? errors.password : "Current Password"} </label>
                  </div>
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="Name"
                      className={`form-control ${errors.newPass && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='New Password'
                      value={values.newPass}
                      name="newPass"
                      disabled={!editable || !passwordMatch}
                      style={{ backgroundColor: "#F5F5F5" }}
                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.newPass ? errors.newPass : "New Password"} </label>
                  </div>
                  <div className="form-floating mb-3 w-100">
                    <input
                      type="Name"
                      className={`form-control ${errors.confirmPass && `is-invalid`}`}
                      id="floatingInput"
                      placeholder='Confirm New Password'
                      value={values.confirmPass}
                      name="confirmPass"
                      disabled={!editable || !passwordMatch}
                      style={{ backgroundColor: "#F5F5F5" }}
                      onChange={handleChange}
                    ></input>
                    <label htmlFor="floatingInput"> {errors.confirmPass ? errors.confirmPass : "Confirm New Password"} </label>
                  </div>
                </div>
                <div className='flex w-100 justify-end'>
                  <Button onClick={() => !(errors.password || errors.newPass || errors.confirmPass) && setEditable((prev) => !prev)} type='submit' variant="contained" className={`${!editable ? "bg-secondary" : "bg-danger"}  text-white mt-5`} style={{ height: "50px", width: "140px" }}>Edit</Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>)
}

export default UserDetailsForm