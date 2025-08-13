import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function index() {
    return (
        <AuthenticatedLayout>
            <Head title="Settings" />

            <BreadCrumb
                header={'Settings'}
                parent={'Dashboard'}
                parent_link={route('dashboard')}
                child={'Settings'}
            />

            <Card
                Content={
                    <>
                        <div className="grid grid-cols-1 gap-5 my-10 sm:grid-cols-2">
                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-10 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            General Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application settings including app name,
                                            contact information, and branding like logos—all from
                                            one place.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.general.setting')}
                                            Text={'Manage General Settings'}
                                            CustomClass="w-full md:w-[280px] "
                                            Icon={
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className={`size-6`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            SMTP Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Manage your application SMTP settings That Will Be Use
                                            For Sending Mails.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.smtp.setting')}
                                            Text={'Manage SMTP Settings'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
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
                                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Role Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Easily manage and configure and create roles across your
                                            application to control responsibilities.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.roles.index')}
                                            Text={'Manage Roles'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
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
                                                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Color Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Easily manage and configure and create Colors across
                                            your application to control SmartPhone Color Varients.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.colors.index')}
                                            Text={'Manage Colors'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
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
                                                        d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Model Name Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Easily manage and configure and create Mode Names across
                                            your application to control SmartPhone Model Name.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.model_names.index')}
                                            Text={'Manage Model Names'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
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
                                                        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 6.75h15m-15 10.5h15M5.25 3A2.25 2.25 0 003 5.25v2.25A2.25 2.25 0 005.25 9.75h13.5A2.25 2.25 0 0021 7.5V5.25A2.25 2.25 0 0018.75 3H5.25zm0 12A2.25 2.25 0 003 17.25v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 19.5v-2.25A2.25 2.25 0 0018.75 15H5.25z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Capacity Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Easily manage and configure and create Capacity across
                                            your application to control SmartPhone Capacity.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.capacities.index')}
                                            Text={'Manage Capacity'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
                                            Icon={
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 6.75h15m-15 10.5h15M5.25 3A2.25 2.25 0 003 5.25v2.25A2.25 2.25 0 005.25 9.75h13.5A2.25 2.25 0 0021 7.5V5.25A2.25 2.25 0 0018.75 3H5.25zm0 12A2.25 2.25 0 003 17.25v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 19.5v-2.25A2.25 2.25 0 0018.75 15H5.25z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Storage Location Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Easily manage and configure and create Storage Locations
                                            across your application to control Inventory Storage
                                            Locations.
                                        </p>

                                        <LinkButton
                                            URL={route(
                                                'dashboard.settings.storage_locations.index',
                                            )}
                                            Text={'Manage Storage Locations'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
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
                                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="flex items-center justify-center w-20 h-20 mb-3 bg-gray-100 rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className={`size-9 dark:border-white`}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-xl font-semibold text-center text-gray-800 dark:text-white">
                                            Currency Settings
                                        </h2>

                                        <p className="mb-6 leading-relaxed text-center text-gray-600 dark:text-white">
                                            Easily manage and configure and create Currencies across
                                            your application to control Currencies In The System.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.currencies.index')}
                                            Text={'Manage Currencies'}
                                            CustomClass="w-full md:w-[280px] mt-10 "
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
                                                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </>
                                }
                            />
                        </div>
                    </>
                }
            />
        </AuthenticatedLayout>
    );
}
