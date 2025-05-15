"use client"
import { FormError } from '@/app/_types/productTypes';
import { Formik } from 'formik';
import React from 'react'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
function ContactForm() {
  return (
    <div className='col-12 col-lg-7 border-1 p-4 border-white shadow rounded'>
      <div >
        <Formik
          initialValues={{ name: "", email: '', phone: '', message: '' }}
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
            if (!values.phone) {
              errors.phone = 'Required'
            } else if (values.phone.length < 8) {
              errors.phone = 'phone must be at least 8 characters long'
            }
            if (!values.message) {
              errors.message = 'Required'
            }

            return errors;
          }}
          onSubmit={() => {
            toast.success("Message Sent Successfully");
            // dispatch(registerUser(values));
            // resetForm();

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
            <form className='flex flex-row flex-wrap col-12 col-lg-7' style={{ width: "100%", height: "100%" }} onSubmit={handleSubmit}>
              <div className='mt-3 flex flex-wrap gap-3'>
                <div className="form-floating mb-3 col-12 col-lg-6" >
                  <input
                    type="Name"
                    className={`form-control ${errors.name && `is-invalid`}`}
                    id="floatingInput"
                    placeholder="Your Name"
                    value={values.name}
                    disabled={isSubmitting}
                    name="name"
                    onChange={handleChange}
                    style={{ backgroundColor: "lightgray" }}
                  ></input>
                  <label htmlFor="floatingInput"> {errors.name ? errors.name : "Your Name"} </label>
                </div>
                <div className="form-floating mb-3 col-12 col-lg-6">
                  <input
                    type="Name"
                    className={`form-control ${errors.email && `is-invalid`}`}
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={values.email}
                    name="email"
                    disabled={isSubmitting}
                    style={{ backgroundColor: "lightgray" }}

                    onChange={handleChange}
                  ></input>
                  <label htmlFor="floatingInput"> {errors.email ? errors.email : "Your Email"} </label>
                </div>
                <div className="form-floating col-12 col-lg-6" >
                  <input
                    type="phone"
                    className={`form-control ${errors.phone && `is-invalid`}`}
                    id="floatingphone"
                    name="phone"
                    placeholder="Your Phone"
                    disabled={isSubmitting}
                    style={{ backgroundColor: "lightgray" }}
                    value={values.phone}
                    onChange={handleChange}
                  ></input>
                  <label htmlFor="floatingphone"> {errors.phone ? errors.phone : "Your Phone"} </label>
                </div>
                <div className="form-floating w-100">
                  <textarea disabled={isSubmitting} value={values.message} name="message" onChange={handleChange} style={{ resize: "none", backgroundColor: "lightgray", height: "200px" }} className={`form-control ${errors.phone && `is-invalid`}`}
                    placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                  <label htmlFor="floatingTextarea">{errors.message ? errors.message : "Your Message"}</label>
                </div>
                <div className='w-100 flex justify-end'>
                  <Button type='submit' variant="contained" className={`bg-danger text-white mt-5`} style={{ height: "50px" }}>Send Message</Button>

                </div>

              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>)
}

export default ContactForm