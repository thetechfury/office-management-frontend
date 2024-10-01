'use client';

import React, {useEffect} from 'react';
import Image from 'next/image';
import logo from '../assets/svg/logo.svg';
import Input from "@/app/components/input";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/navigation'
import {login} from "@/app/api/authentication";

const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 8 characters'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector(state => state.auth);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            const result = await dispatch(login(values));
            if (login.fulfilled.match(result)) {
                router.push('../dashboard'); // Redirect to dashboard upon successful login
            }
        },
        validationSchema: schema,
    });

    return (
        <div>
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
            <div className="absolute top-10 left-0 right-0">
                <div className="flex justify-center mb-12 mt-8">
                    <Image src={logo} alt="logo"/>
                </div>
                <div className="flex justify-center">
                    <div className="w-full md:w-8/12 lg:w-3/12">
                        <div className="bg-white shadow-lg border-slate-50 border rounded-lg mb-5">
                            <div className="p-6">
                                <div className="text-center m-5">
                                        <h1 className="text-4xl font-extrabold">Sign in</h1>
                                    <div>
                                    </div>
                                </div>
                                <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg mb-2"
                                        disabled={loading}
                                    >
                                        {loading ? 'signin your account ...' : 'signin'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
