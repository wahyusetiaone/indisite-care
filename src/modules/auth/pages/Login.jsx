"use client";

import { useState } from "react";
import { useAuth } from "@/modules/auth/hook/useAuth";
import { Icon } from "@iconify/react";
import Link from "next/link";

const LoginLayer = () => {
    const { loginUser, loading, error } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol visibilitas password

    // Handler untuk toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState); // Toggle antara true dan false
    };

    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUser(username, password);
            window.location.href = "/";
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <section className='auth bg-base d-flex flex-wrap'>
            <div className='auth-left d-lg-block d-none'>
                <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
                    <img src='assets/images/auth/auth-img.png' alt='' />
                </div>
            </div>
            <div className='auth-right py-32 px-24 d-flex flex-column justify-content-center'>
                <div className='max-w-464-px mx-auto w-100'>
                    <div>
                        <Link href='/' className='mb-40 max-w-290-px'>
                            <img src='assets/images/logo.png' alt='' />
                        </Link>
                        <h4 className='mb-12'>Sign In to your Account</h4>
                        <p className='mb-32 text-secondary-light text-lg'>
                            Welcome back! please enter your detail
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Username input */}
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <Icon icon="bx:user" />
                            </span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Update state on change
                                className="form-control h-56-px bg-neutral-50 radius-12"
                                placeholder="Username"
                                required
                            />
                        </div>
                        {/* Password input */}
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"} // Toggle tipe input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    id="your-password"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            {/* Eye icon for toggle */}
                            <span
                                className={`toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light ${
                                    showPassword ? "ri-eye-off-line" : "ri-eye-line"
                                }`}
                                onClick={togglePasswordVisibility} // Toggle visibility saat di klik
                            />
                        </div>
                        {/* Submit button */}
                        <div>
                            <button
                                type="submit" // Submit the form
                                className="btn btn-primary w-100 h-56-px radius-12"
                                disabled={loading} // Disable if loading
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </div>
                        {/* Error handling */}
                        {error && (
                            <p className="text-danger mt-2 mb-0">{error}</p>
                        )}
                        <div className='mt-32 center-border-horizontal text-center'>
                            <span className='bg-base z-1 px-4'>Or sign in with</span>
                        </div>
                        <div className='mt-32 d-flex align-items-center gap-3'>
                            <button
                                type='button'
                                className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
                            >
                                <Icon
                                    icon='ic:baseline-facebook'
                                    className='text-primary-600 text-xl line-height-1'
                                />
                                Google
                            </button>
                            <button
                                type='button'
                                className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
                            >
                                <Icon
                                    icon='logos:google-icon'
                                    className='text-primary-600 text-xl line-height-1'
                                />
                                Google
                            </button>
                        </div>
                        <div className='mt-32 text-center text-sm'>
                            <p className='mb-0'>
                                Don’t have an account?{" "}
                                <Link href='/sign-up' className='text-primary-600 fw-semibold'>
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginLayer;