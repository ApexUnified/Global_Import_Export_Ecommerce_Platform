import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function edit({ supplier }) {
    return (
        <>
            <AuthenticatedLayout>
                <Head title="Suppliers" />

                <BreadCrumb
                    header={'View Supplier'}
                    parent={'Suppliers'}
                    parent_link={route('dashboard.suppliers.index')}
                    child={'View Supplier'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Suppliers'}
                                    URL={route('dashboard.suppliers.index')}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                            />
                                        </svg>
                                    }
                                />
                            </div>

                            <div className="mx-auto mt-10 max-w-3xl px-4">
                                <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900 dark:text-white/80">
                                    <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:space-x-8">
                                        {/* Avatar */}
                                        <div className="mb-6 flex-shrink-0 text-center md:mb-0">
                                            <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-blue-500 bg-blue-100 text-5xl font-bold text-blue-800 dark:border-white dark:bg-white/10 dark:text-white">
                                                {supplier?.user?.avatar}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="w-full space-y-4">
                                            {/* Name */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={supplier?.user?.name}
                                                    readOnly
                                                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={supplier?.user?.email}
                                                    readOnly
                                                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={supplier?.user?.phone}
                                                    readOnly
                                                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Company */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={supplier?.company_name}
                                                    readOnly
                                                    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Roles */}
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Role(s)
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {supplier?.user?.roles &&
                                                    supplier?.user?.roles.length > 0 ? (
                                                        supplier?.user?.roles.map((role, index) => (
                                                            <span
                                                                key={index}
                                                                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-white"
                                                            >
                                                                {role.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-red-500">
                                                            No role assigned
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    );
}
