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
                                <span
                                    className={`menu-group-title ${sidebarToggle ? 'lg:hidden' : ''}`}
                                >
                                    MENU
                                </span>

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
