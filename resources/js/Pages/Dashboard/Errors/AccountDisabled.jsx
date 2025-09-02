import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React from 'react';

export default function AccountDisabled() {
    const { post, processing } = useForm({});

    return (
        <>
            <Head title="Account Disabled" />

            <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 h-10 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01M5.07 5.07l13.86 13.86M12 4a8 8 0 100 16 8 8 0 000-16z"
                            />
                        </svg>
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-800">Account Disabled</h1>

                    <p className="mt-3 leading-relaxed text-gray-600">
                        Your account has been{' '}
                        <span className="font-semibold">disabled by the administrator</span>. Please
                        contact support if you believe this is a mistake.
                    </p>

                    <div className="mt-4">
                        <PrimaryButton
                            Text={' ← Logout'}
                            Type={'button'}
                            Spinner={processing}
                            Disabled={processing}
                            Action={() => post(route('logout'))}
                            Id={'logout'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
