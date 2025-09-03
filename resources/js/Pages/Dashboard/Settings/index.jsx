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
                        <div className="my-3 flex flex-wrap justify-end gap-4">
                            <LinkButton
                                Text={'Back To Dashboard'}
                                URL={route('dashboard')}
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

                        <div className="my-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            General Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            SMTP Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                            <svg
                                                viewBox="0 0 16 16"
                                                className="size-9 fill-black"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                            >
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g
                                                    id="SVGRepo_tracerCarrier"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                ></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    {' '}
                                                    <path d="M4.51 7.687c0 .197.02.357.058.475.042.117.096.245.17.384a.233.233 0 01.037.123c0 .053-.032.107-.1.16l-.336.224a.255.255 0 01-.138.048c-.054 0-.107-.026-.16-.074a1.652 1.652 0 01-.192-.251 4.137 4.137 0 01-.165-.315c-.415.491-.936.737-1.564.737-.447 0-.804-.129-1.064-.385-.261-.256-.394-.598-.394-1.025 0-.454.16-.822.484-1.1.325-.278.756-.416 1.304-.416.18 0 .367.016.564.042.197.027.4.07.612.118v-.39c0-.406-.085-.689-.25-.854-.17-.166-.458-.246-.868-.246-.186 0-.377.022-.574.07a4.23 4.23 0 00-.575.181 1.525 1.525 0 01-.186.07.326.326 0 01-.085.016c-.075 0-.112-.054-.112-.166v-.262c0-.085.01-.15.037-.186a.399.399 0 01.15-.113c.185-.096.409-.176.67-.24.26-.07.537-.101.83-.101.633 0 1.096.144 1.394.432.293.288.442.726.442 1.314v1.73h.01zm-2.161.811c.175 0 .356-.032.548-.096.191-.064.362-.182.505-.342a.848.848 0 00.181-.341c.032-.129.054-.283.054-.465V7.03a4.43 4.43 0 00-.49-.09 3.996 3.996 0 00-.5-.033c-.357 0-.618.07-.793.214-.176.144-.26.347-.26.614 0 .25.063.437.196.566.128.133.314.197.559.197zm4.273.577c-.096 0-.16-.016-.202-.054-.043-.032-.08-.106-.112-.208l-1.25-4.127a.938.938 0 01-.049-.214c0-.085.043-.133.128-.133h.522c.1 0 .17.016.207.053.043.032.075.107.107.208l.894 3.535.83-3.535c.026-.106.058-.176.1-.208a.365.365 0 01.214-.053h.425c.102 0 .17.016.213.053.043.032.08.107.101.208l.841 3.578.92-3.578a.458.458 0 01.107-.208.346.346 0 01.208-.053h.495c.085 0 .133.043.133.133 0 .027-.006.054-.01.086a.76.76 0 01-.038.133l-1.283 4.127c-.032.107-.069.177-.111.209a.34.34 0 01-.203.053h-.457c-.101 0-.17-.016-.213-.053-.043-.038-.08-.107-.101-.214L8.213 5.37l-.82 3.439c-.026.107-.058.176-.1.213-.043.038-.118.054-.213.054h-.458zm6.838.144a3.51 3.51 0 01-.82-.096c-.266-.064-.473-.134-.612-.214-.085-.048-.143-.101-.165-.15a.378.378 0 01-.031-.149v-.272c0-.112.042-.166.122-.166a.3.3 0 01.096.016c.032.011.08.032.133.054.18.08.378.144.585.187.213.042.42.064.633.064.336 0 .596-.059.777-.176a.575.575 0 00.277-.508.52.52 0 00-.144-.373c-.095-.102-.276-.193-.537-.278l-.772-.24c-.388-.123-.676-.305-.851-.545a1.275 1.275 0 01-.266-.774c0-.224.048-.422.143-.593.096-.17.224-.32.384-.438.16-.122.34-.213.553-.277.213-.064.436-.091.67-.091.118 0 .24.005.357.021.122.016.234.038.346.06.106.026.208.052.303.085.096.032.17.064.224.096a.46.46 0 01.16.133.289.289 0 01.047.176v.251c0 .112-.042.171-.122.171a.552.552 0 01-.202-.064 2.427 2.427 0 00-1.022-.208c-.303 0-.543.048-.708.15-.165.1-.25.256-.25.475 0 .149.053.277.16.379.106.101.303.202.585.293l.756.24c.383.123.66.294.825.513.165.219.244.47.244.748 0 .23-.047.437-.138.619a1.436 1.436 0 01-.388.47c-.165.133-.362.23-.591.299-.24.075-.49.112-.761.112z"></path>{' '}
                                                    <g
                                                        fill="#F90"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                    >
                                                        {' '}
                                                        <path d="M14.465 11.813c-1.75 1.297-4.294 1.986-6.481 1.986-3.065 0-5.827-1.137-7.913-3.027-.165-.15-.016-.353.18-.235 2.257 1.313 5.04 2.109 7.92 2.109 1.941 0 4.075-.406 6.039-1.239.293-.133.543.192.255.406z"></path>{' '}
                                                        <path d="M15.194 10.98c-.223-.287-1.479-.138-2.048-.069-.17.022-.197-.128-.043-.24 1-.705 2.645-.502 2.836-.267.192.24-.053 1.89-.99 2.68-.143.123-.281.06-.218-.1.213-.53.687-1.72.463-2.003z"></path>{' '}
                                                    </g>{' '}
                                                </g>
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            AWS Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure, create AWS Setting across
                                            your application to control Connectivity With AWS
                                            Globally In The System.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.aws-settings.index')}
                                            Text={'Manage AWS Settings'}
                                            CustomClass="w-full md:w-[300px] mt-10 "
                                            Icon={
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    className="size-6 fill-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                >
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g
                                                        id="SVGRepo_tracerCarrier"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    ></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        {' '}
                                                        <path d="M4.51 7.687c0 .197.02.357.058.475.042.117.096.245.17.384a.233.233 0 01.037.123c0 .053-.032.107-.1.16l-.336.224a.255.255 0 01-.138.048c-.054 0-.107-.026-.16-.074a1.652 1.652 0 01-.192-.251 4.137 4.137 0 01-.165-.315c-.415.491-.936.737-1.564.737-.447 0-.804-.129-1.064-.385-.261-.256-.394-.598-.394-1.025 0-.454.16-.822.484-1.1.325-.278.756-.416 1.304-.416.18 0 .367.016.564.042.197.027.4.07.612.118v-.39c0-.406-.085-.689-.25-.854-.17-.166-.458-.246-.868-.246-.186 0-.377.022-.574.07a4.23 4.23 0 00-.575.181 1.525 1.525 0 01-.186.07.326.326 0 01-.085.016c-.075 0-.112-.054-.112-.166v-.262c0-.085.01-.15.037-.186a.399.399 0 01.15-.113c.185-.096.409-.176.67-.24.26-.07.537-.101.83-.101.633 0 1.096.144 1.394.432.293.288.442.726.442 1.314v1.73h.01zm-2.161.811c.175 0 .356-.032.548-.096.191-.064.362-.182.505-.342a.848.848 0 00.181-.341c.032-.129.054-.283.054-.465V7.03a4.43 4.43 0 00-.49-.09 3.996 3.996 0 00-.5-.033c-.357 0-.618.07-.793.214-.176.144-.26.347-.26.614 0 .25.063.437.196.566.128.133.314.197.559.197zm4.273.577c-.096 0-.16-.016-.202-.054-.043-.032-.08-.106-.112-.208l-1.25-4.127a.938.938 0 01-.049-.214c0-.085.043-.133.128-.133h.522c.1 0 .17.016.207.053.043.032.075.107.107.208l.894 3.535.83-3.535c.026-.106.058-.176.1-.208a.365.365 0 01.214-.053h.425c.102 0 .17.016.213.053.043.032.08.107.101.208l.841 3.578.92-3.578a.458.458 0 01.107-.208.346.346 0 01.208-.053h.495c.085 0 .133.043.133.133 0 .027-.006.054-.01.086a.76.76 0 01-.038.133l-1.283 4.127c-.032.107-.069.177-.111.209a.34.34 0 01-.203.053h-.457c-.101 0-.17-.016-.213-.053-.043-.038-.08-.107-.101-.214L8.213 5.37l-.82 3.439c-.026.107-.058.176-.1.213-.043.038-.118.054-.213.054h-.458zm6.838.144a3.51 3.51 0 01-.82-.096c-.266-.064-.473-.134-.612-.214-.085-.048-.143-.101-.165-.15a.378.378 0 01-.031-.149v-.272c0-.112.042-.166.122-.166a.3.3 0 01.096.016c.032.011.08.032.133.054.18.08.378.144.585.187.213.042.42.064.633.064.336 0 .596-.059.777-.176a.575.575 0 00.277-.508.52.52 0 00-.144-.373c-.095-.102-.276-.193-.537-.278l-.772-.24c-.388-.123-.676-.305-.851-.545a1.275 1.275 0 01-.266-.774c0-.224.048-.422.143-.593.096-.17.224-.32.384-.438.16-.122.34-.213.553-.277.213-.064.436-.091.67-.091.118 0 .24.005.357.021.122.016.234.038.346.06.106.026.208.052.303.085.096.032.17.064.224.096a.46.46 0 01.16.133.289.289 0 01.047.176v.251c0 .112-.042.171-.122.171a.552.552 0 01-.202-.064 2.427 2.427 0 00-1.022-.208c-.303 0-.543.048-.708.15-.165.1-.25.256-.25.475 0 .149.053.277.16.379.106.101.303.202.585.293l.756.24c.383.123.66.294.825.513.165.219.244.47.244.748 0 .23-.047.437-.138.619a1.436 1.436 0 01-.388.47c-.165.133-.362.23-.591.299-.24.075-.49.112-.761.112z"></path>{' '}
                                                        <g
                                                            fill="#F90"
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                        >
                                                            {' '}
                                                            <path d="M14.465 11.813c-1.75 1.297-4.294 1.986-6.481 1.986-3.065 0-5.827-1.137-7.913-3.027-.165-.15-.016-.353.18-.235 2.257 1.313 5.04 2.109 7.92 2.109 1.941 0 4.075-.406 6.039-1.239.293-.133.543.192.255.406z"></path>{' '}
                                                            <path d="M15.194 10.98c-.223-.287-1.479-.138-2.048-.069-.17.022-.197-.128-.043-.24 1-.705 2.645-.502 2.836-.267.192.24-.053 1.89-.99 2.68-.143.123-.281.06-.218-.1.213-.53.687-1.72.463-2.003z"></path>{' '}
                                                        </g>{' '}
                                                    </g>
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0px"
                                                y="0px"
                                                className="size-9"
                                                viewBox="0 0 48 48"
                                            >
                                                <path
                                                    fill="#48b564"
                                                    d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"
                                                ></path>
                                                <path
                                                    fill="#fcc60e"
                                                    d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"
                                                ></path>
                                                <path
                                                    fill="#2c85eb"
                                                    d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"
                                                ></path>
                                                <path
                                                    fill="#ed5748"
                                                    d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"
                                                ></path>
                                                <path
                                                    fill="#5695f6"
                                                    d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"
                                                ></path>
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Google Map Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure, create Google Map Setting
                                            across your application to control Connectivity With
                                            Google Maps Globally In The System.
                                        </p>

                                        <LinkButton
                                            URL={route(
                                                'dashboard.settings.google-map-settings.index',
                                            )}
                                            Text={'Manage Google Map Settings'}
                                            CustomClass="w-full md:w-[300px] mt-10 "
                                            Icon={
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    x="0px"
                                                    y="0px"
                                                    className="size-6"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        fill="#48b564"
                                                        d="M35.76,26.36h0.01c0,0-3.77,5.53-6.94,9.64c-2.74,3.55-3.54,6.59-3.77,8.06	C24.97,44.6,24.53,45,24,45s-0.97-0.4-1.06-0.94c-0.23-1.47-1.03-4.51-3.77-8.06c-0.42-0.55-0.85-1.12-1.28-1.7L28.24,22l8.33-9.88	C37.49,14.05,38,16.21,38,18.5C38,21.4,37.17,24.09,35.76,26.36z"
                                                    ></path>
                                                    <path
                                                        fill="#fcc60e"
                                                        d="M28.24,22L17.89,34.3c-2.82-3.78-5.66-7.94-5.66-7.94h0.01c-0.3-0.48-0.57-0.97-0.8-1.48L19.76,15	c-0.79,0.95-1.26,2.17-1.26,3.5c0,3.04,2.46,5.5,5.5,5.5C25.71,24,27.24,23.22,28.24,22z"
                                                    ></path>
                                                    <path
                                                        fill="#2c85eb"
                                                        d="M28.4,4.74l-8.57,10.18L13.27,9.2C15.83,6.02,19.69,4,24,4C25.54,4,27.02,4.26,28.4,4.74z"
                                                    ></path>
                                                    <path
                                                        fill="#ed5748"
                                                        d="M19.83,14.92L19.76,15l-8.32,9.88C10.52,22.95,10,20.79,10,18.5c0-3.54,1.23-6.79,3.27-9.3	L19.83,14.92z"
                                                    ></path>
                                                    <path
                                                        fill="#5695f6"
                                                        d="M28.24,22c0.79-0.95,1.26-2.17,1.26-3.5c0-3.04-2.46-5.5-5.5-5.5c-1.71,0-3.24,0.78-4.24,2L28.4,4.74	c3.59,1.22,6.53,3.91,8.17,7.38L28.24,22z"
                                                    ></path>
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Role Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Color Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Model Name Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Capacity Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Storage Location Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Currency Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
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

                            <Card
                                CustomCss={
                                    'flex justify-center items-center flex-col max-w-lg mx-auto min-h-[400px]'
                                }
                                Content={
                                    <>
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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
                                                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Additional Fee list Settings
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure and create Additional Fee
                                            lists across your application to control Additional Fee
                                            lists In The System.
                                        </p>

                                        <LinkButton
                                            URL={route(
                                                'dashboard.settings.additional_fee_lists.index',
                                            )}
                                            Text={'Manage Additional Fee lists'}
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
                                                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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
                                                    d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Reward Point Setting
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure and create Reward Point
                                            Setting across your application to control Reward Points
                                            In The System.
                                        </p>

                                        <LinkButton
                                            URL={route(
                                                'dashboard.settings.reward-point-setting.index',
                                            )}
                                            Text={'Manage Reward Point Setting'}
                                            CustomClass="w-full md:w-[300px] mt-10 "
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
                                                        d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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
                                                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Commission Setting
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure and create Commission
                                            Setting across your application to control Commissions
                                            In The System.
                                        </p>

                                        <LinkButton
                                            URL={route(
                                                'dashboard.settings.commission-settings.index',
                                            )}
                                            Text={'Manage Commission Setting'}
                                            CustomClass="w-full md:w-[300px] mt-10 "
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
                                                        d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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
                                                    d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Countries
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure and create Countries across
                                            your application to control Countries In The System.
                                        </p>

                                        <LinkButton
                                            URL={route('dashboard.settings.countries.index')}
                                            Text={'Manage Countries'}
                                            CustomClass="w-full md:w-[300px] mt-10 "
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
                                                        d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
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
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
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
                                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                                />
                                            </svg>
                                        </div>

                                        <h2 className="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
                                            Special Countries
                                        </h2>

                                        <p className="mb-6 text-center leading-relaxed text-gray-600 dark:text-white">
                                            Easily manage and configure, create Special Countries
                                            across your application to control Meta OAUTH For Push
                                            Notifications Outside Of The System.
                                        </p>

                                        <LinkButton
                                            URL={route(
                                                'dashboard.settings.special-countries.index',
                                            )}
                                            Text={'Manage Special Countries'}
                                            CustomClass="w-full md:w-[300px] mt-10 "
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
                                                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
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
