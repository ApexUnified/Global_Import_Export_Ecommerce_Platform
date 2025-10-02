import { Link, usePage } from '@inertiajs/react';
import React from 'react';

export default function Footer({ ApplicationName, ApplicationLogoDark, ApplicationLogoLight }) {
    const { auth } = usePage().props;
    return (
        <footer className="mt-10 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Logo & About */}
                    <div>
                        <div className="flex items-center space-x-2">
                            <img
                                src={ApplicationLogoLight}
                                alt="YesBigShop"
                                className="h-8 dark:hidden"
                            />
                            <img
                                src={ApplicationLogoDark}
                                alt="YesBigShop"
                                className="hidden h-8 dark:block"
                            />
                            <span className="text-lg font-bold text-gray-800 dark:text-white/80">
                                {ApplicationName}
                            </span>
                        </div>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            Your trusted marketplace for 100% authentic smartphones. No gray market,
                            no tricks, just genuine devices delivered with care.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80">
                                Shop
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link
                                        href={route('home')}
                                        className={`py-2 text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-white/60 ${route().current() === 'home' ? 'text-blue-600 dark:text-blue-500' : 'text-gray-700 dark:text-white/80'}`}
                                        prefetch
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white/60"
                                    >
                                        Products
                                    </a>
                                </li>

                                {auth.user && (
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white/60"
                                        >
                                            My Orders
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80">
                                Support
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white/60"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white/60"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white/60"
                                    >
                                        Data Deletion Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Social + Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80">
                            Stay Connected
                        </h3>
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                            Follow us for updates and exclusive offers.
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white/60"
                            >
                                {/* Facebook Icon */}
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.25 0-1.64.78-1.64 1.58V12h2.78l-.44 2.98h-2.34v7.02C18.34 21.25 22 17.1 22 12.07z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-500 hover:text-pink-600 dark:text-gray-300 dark:hover:text-white/60"
                            >
                                {/* Instagram Icon */}
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.77 0 5-2.24 5-5V7c0-2.76-2.23-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.64 0-3-1.35-3-3V7c0-1.65 1.36-3 3-3h10zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 2c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.36-3 3-3zm4.5-3a1.5 1.5 0 11-.001 2.999A1.5 1.5 0 0116.5 6z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-600">
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} {ApplicationName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
