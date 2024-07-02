'use client';

import React from 'react';
import Image from 'next/image';
import logo from '../assets/svg/logo.svg';
import Input from "@/app/components/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../slices/authSlice';
import Link from 'next/link';
const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  termsCheckbox: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name:"",
      email: "",
      password: "",
      confirmPassword: "",
      termsCheckbox: false,
    },
    onSubmit: (values) => {
      dispatch(signup(values));
    },
    validationSchema: schema,
  });

  return (
      <div>
        <div className="bg-custom-image bg-cover">
          <div className="flex justify-center mb-8 mt-8">
            <Image src={logo} alt="logo"/>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full md:w-8/12 lg:w-4/12">
            <div className="bg-white shadow-lg border-slate-50 border rounded-lg mb-5">
              <div className="p-6">
                <div className="text-center">
                <div className="mb-5">
                  <h1 className="text-4xl font-extrabold">Create your account</h1>
                  <p>Already have an account?{" "}
                    <Link href="../signin" className="text-blue-500 cursor-pointer">Sign in here</Link>
                  </p>
                </div>
                <a className="btn btn-lg btn-block btn-white mb-4" href="#">
                                <span className="flex justify-center items-center">
                        <img className="w-5 h-5 mr-2"
                             src="@@autopath/assets/svg/brands/google.svg" alt="Image Description"
                        />
                        Sign up with Google
                      </span>
                </a>
                <div className="flex justify-center leading-[0] mt-8">
                  <div className="h-[0.50px] w-full bg-gray-400"></div>
                  <div className="block text-gray-400 mb-4">OR</div>
                  <div className="h-[1px] w-full bg-gray-400"></div>
                </div>
                </div>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <Input
                          type="text"
                          name="first_name"
                          label="First name"
                          placeholder="Mark"
                          required={true}
                          value={formik.values.first_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : null}
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                          type="text"
                          name="last_name"
                          label="Last name"
                          placeholder="Williams"
                          required={true}
                          value={formik.values.last_name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : null}
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                        type="email"
                        name="email"
                        label="Your email"
                        placeholder="Markwilliams@example.com"
                        required={true}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    />
                  </div>
                  <div>
                    <div className="relative">
                      <Input
                          type="password"
                          name="password"
                          label="Password"
                          placeholder="8+ characters required"
                          required={true}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.password && formik.errors.password ? formik.errors.password : null}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-3">
                        <a className="cursor-pointer text-gray-500">
                          <i className="tio-visible-outlined"/>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Input
                          type="password"
                          name="confirmPassword"
                          label="Confirm password"
                          placeholder="8+ characters required"
                          required={true}
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center px-3">
                        <a className="cursor-pointer text-gray-500">
                          <i className="tio-visible-outlined"/>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <input
                          type="checkbox"
                          name="termsCheckbox"
                          className="form-checkbox"
                          required
                          checked={formik.values.termsCheckbox}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          data-msg="Please accept our Terms and Conditions."
                      />
                      <label className="ml-2 text-gray-600" htmlFor="termsCheckbox">
                        I accept the <a href="#" className="text-blue-500">Terms and Conditions</a>
                      </label>
                      {formik.touched.termsCheckbox && formik.errors.termsCheckbox ? (
                          <div className="text-red-500">{formik.errors.termsCheckbox}</div>
                      ) : null}
                    </div>
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  <button
                      type="submit"
                      className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg mb-2"
                      disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create an account'}
                  </button>
                  <button type="submit" className="w-full py-3 bg-transparent text-blue-500">
                    or Start your 30-day trial <i className="tio-chevron-right"/>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
  )
      ;
}
