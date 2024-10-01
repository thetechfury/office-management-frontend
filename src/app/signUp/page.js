'use client';

import React, {useEffect} from 'react';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from 'react-redux';
import MainDiv from "@/app/components/mainDiv/mainDiv";
import {useRouter} from 'next/navigation'
import {signup} from "@/app/api/authentication";

const schema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    termsCheckbox: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

export default function SignUp() {
    const {user,loading, error} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            termsCheckbox: false,
        },
        onSubmit: async (values) => {
            const result = await dispatch(signup(values));
            if (signup.fulfilled.match(result)) {
                router.push('../dashboard'); // Redirect to dashboard upon successful login
            }
        },
        validationSchema: schema,
    });
    useEffect(() => {
        if (!user) {
                router.push('../signin'); // Redirect to signin if not logged in
        }
    }, [user, router]);
    return (
        <MainDiv>
            <div className="bg-custom-image bg-cover fixed top-0 left-0 right-0 h-[32rem]">
                <figure className="absolute right-0 bottom-0 left-0">
                    <svg
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 1921 273"
                    >
                        <polygon fill="#fff" points="0,273 1921,273 1921,0 "/>
                    </svg>
                </figure>
            </div>
            <div className="flex justify-center relative">
                <div className="w-full md:w-8/12 lg:w-4/12">
                    <div className="bg-white shadow-lg border-slate-50 border rounded-lg mb-5">
                        <div className="p-6">
                            <div className="text-center">
                                <div className="mb-5">
                                    <h1 className="text-4xl font-extrabold">Create a new account</h1>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainDiv>
    )
        ;
}
