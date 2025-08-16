import { Link } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import useWindowSize from '@/Hooks/useWindowSize';

export default function Sidebar({
    sidebarToggle,
    setSidebarToggle,
    ApplicationLogoLight,
    ApplicationLogoDark,
}) {
    // For Managing Sidebar Navlinks Selection State
    const [selected, setSelected] = useState(null);

    const { width } = useWindowSize();

    const isLargeScreen = width >= 1025;
    const prevIsLargeScreenRef = useRef(isLargeScreen);

    // Always read from localStorage on initial load
    useEffect(() => {
        const saved = localStorage.getItem('sidebarToggle');
        if (saved !== null) {
            setSidebarToggle(JSON.parse(saved));
        } else {
            setSidebarToggle(false);
            localStorage.setItem('sidebarToggle', JSON.stringify(false));
        }
    }, []);

    // Save sidebarToggle to localStorage on change
    useEffect(() => {
        localStorage.setItem('sidebarToggle', JSON.stringify(sidebarToggle));
    }, [sidebarToggle]);

    // Hide sidebar when resizing to small screen
    useEffect(() => {
        if (prevIsLargeScreenRef.current && !isLargeScreen && sidebarToggle) {
            setSidebarToggle(false);
        }
        prevIsLargeScreenRef.current = isLargeScreen;
    }, [isLargeScreen, sidebarToggle]);

    return (
        <>
            <aside
                className={`${
                    sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
                } sidebar fixed left-0 top-0 z-[12] flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-900 lg:static lg:translate-x-0`}
            >
                <div
                    className={`flex items-center ${sidebarToggle ? 'justify-center' : 'justify-between'} sidebar-header gap-2 pb-7 pt-8`}
                >
                    <Link href={route('dashboard')}>
                        <span className={`logo ${sidebarToggle ? 'hidden' : ''}`}>
                            <img
                                className="h-[80px] w-auto object-contain dark:hidden"
                                src={ApplicationLogoLight}
                                alt="Logo"
                            />

                            <img
                                className="hidden h-[80px] w-auto object-contain dark:block"
                                src={ApplicationLogoDark}
                                alt="Logo"
                            />
                        </span>
                    </Link>

                    <button
                        className={`${sidebarToggle ? 'bg-gray-100 dark:bg-gray-800 lg:bg-transparent dark:lg:bg-transparent' : ''} z-99999 flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400 lg:hidden lg:h-11 lg:w-11 lg:border`}
                        onClick={() => setSidebarToggle(!sidebarToggle)}
                    >
                        <svg
                            className={`${sidebarToggle ? 'block lg:hidden' : 'hidden'} fill-current`}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>

                <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto duration-300 ease-linear">
                    <nav>
                        <div>
                            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
                                <svg
                                    className={`menu-group-icon mx-auto fill-current ${sidebarToggle ? 'hidden lg:block' : 'hidden'}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
                                        fill=""
                                    />
                                </svg>
                            </h3>

                            <ul className="mb-6 flex flex-col gap-4">
                                <li>
                                    <Link
                                        href={route('dashboard')}
                                        className={`menu-item group ${route().current() === 'dashboard' ? 'menu-item-active' : 'menu-item-inactive'}`}
                                    >
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
                                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Dashboard
                                        </span>

                                        <svg
                                            className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Posts') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Posts');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.posts.') || selected === 'Posts' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Posts
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.posts.') || (selected === 'Posts' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Posts' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.posts.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.posts.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Posts List
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route('dashboard.posts.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.posts.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Post
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Floors') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Floors');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.floors.') || selected === 'Floors' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Floors
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.floors.') || (selected === 'Floors' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Floors' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.floors.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.floors.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Floors List
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route('dashboard.floors.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.floors.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Floor
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Bookmarks') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Bookmarks');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.bookmarks.') || selected === 'Bookmarks' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Bookmarks
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.bookmarks.') || (selected === 'Bookmarks' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Bookmarks' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.bookmarks.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.bookmarks.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Bookmarks List
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Users') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Users');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.users.') || selected === 'Users' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Users
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.users.') || (selected === 'Users' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Users' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.users.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.users.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Users List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('dashboard.users.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.users.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create User
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Suppliers') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Suppliers');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.suppliers.') || selected === 'Suppliers' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Suppliers
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.suppliers.') || (selected === 'Suppliers' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Suppliers' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.suppliers.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.suppliers.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Suppliers List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('dashboard.suppliers.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.suppliers.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Supplier
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Collaborators') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Collaborators');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.collaborators.') || selected === 'Collaborators' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Collaborators
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.collaborators.') || (selected === 'Collaborators' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Collaborators' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.collaborators.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.collaborators.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Collaborators List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('dashboard.collaborators.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.collaborators.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Collaborator
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Categories') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Categories');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.categories.') || selected === 'Categories' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 6h.008v.008H6V6Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Categories
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.categories.') || (selected === 'Categories' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Categories' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.categories.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.categories.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Categories List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('dashboard.categories.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.categories.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Category
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Smart Phones') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Smart Phones');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.smartphones.') || selected === 'Smart Phones' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Smart Phones
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.smartphones.') || (selected === 'Smart Phones' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Smart Phones' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.smartphones.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.smartphones.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Smart Phones List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('dashboard.smartphones.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.smartphones.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Smart Phone
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Batches') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Batches');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.batches.') || selected === 'Batches' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Batches
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.batches.') || (selected === 'Batches' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Batches' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.batches.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.batches.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Batches List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route('dashboard.batches.create')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.batches.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Batch
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Inventories') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Inventories');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.inventories.') || selected === 'Inventories' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Inventories
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.inventories.') || (selected === 'Inventories' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Inventories' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route('dashboard.inventories.index')}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.inventories.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Inventories List
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        onClick={() => {
                                            if (selected === 'Smartphone For Sales') {
                                                setSelected(null);
                                            } else {
                                                setSelected('Smartphone For Sales');
                                            }
                                        }}
                                        className={`menu-item group cursor-pointer ${route().current().includes('dashboard.smartphone-for-sales.') || selected === 'Smartphone For Sales' ? 'menu-item-active' : 'menu-item-inactive'} `}
                                    >
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
                                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                                            />
                                        </svg>

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Smartphone For Sales
                                        </span>

                                        <svg
                                            className={`menu-item-arrow absolute right-2.5 top-1/2 -translate-y-1/2 stroke-current ${route().current().includes('dashboard.smartphone-for-sales.') || (selected === 'Smartphone For Sales' && 'menu-item-arrow-active')} ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <div
                                        className={`translate transform overflow-hidden ${selected === 'Smartphone For Sales' ? 'block' : 'hidden'}`}
                                    >
                                        <ul
                                            className={`menu-dropdown mt-2 flex flex-col gap-1 pl-9 ${sidebarToggle ? 'lg:hidden' : 'flex'} `}
                                        >
                                            <li>
                                                <Link
                                                    href={route(
                                                        'dashboard.smartphone-for-sales.index',
                                                    )}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.smartphone-for-sales.index' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Smartphone For Sales List
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    href={route(
                                                        'dashboard.smartphone-for-sales.create',
                                                    )}
                                                    className={`menu-dropdown-item group ${route().current() === 'dashboard.smartphone-for-sales.create' ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                                                >
                                                    Create Smartphone For Sale
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <Link
                                        href={route('dashboard.settings.index')}
                                        className={`menu-item group ${route().current().includes('dashboard.settings') ? 'menu-item-active' : 'menu-item-inactive'}`}
                                    >
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

                                        <span
                                            className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}
                                        >
                                            Settings
                                        </span>

                                        <svg
                                            className={`menu-item-arrow ${sidebarToggle ? 'lg:hidden' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585"
                                                stroke=""
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
}
