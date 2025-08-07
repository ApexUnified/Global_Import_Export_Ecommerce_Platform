import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import SelectInput from '@/Components/SelectInput';

export default function edit({ user }) {
    return (
        <>
            <AuthenticatedLayout>
                <Head title="Users" />

                <BreadCrumb
                    header={'View User'}
                    parent={'Users'}
                    parent_link={route('dashboard.users.index')}
                    child={'View User'}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={'Back To Users'}
                                    URL={route('dashboard.users.index')}
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

                            <div className="max-w-3xl px-4 mx-auto mt-10">
                                <div className="p-8 bg-white shadow-xl rounded-2xl dark:bg-gray-900 dark:text-white/80">
                                    <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:space-x-8">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0 mb-6 text-center md:mb-0">
                                            <div className="flex items-center justify-center text-5xl font-bold text-blue-800 bg-blue-100 border-4 border-blue-500 rounded-full h-36 w-36 dark:border-white dark:bg-white/10 dark:text-white">
                                                {user.avatar}
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="w-full space-y-4">
                                            {/* Name */}
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.name}
                                                    readOnly
                                                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user.email}
                                                    readOnly
                                                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user.phone}
                                                    readOnly
                                                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                                />
                                            </div>

                                            {/* Roles */}
                                            <div>
                                                <label className="block mb-1 text-sm font-medium text-gray-600 dark:text-white/70">
                                                    Role(s)
                                                </label>
                                                <div className="flex flex-wrap gap-2">
                                                    {user.roles && user.roles.length > 0 ? (
                                                        user.roles.map((role, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-white"
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
