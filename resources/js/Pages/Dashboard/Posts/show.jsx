import React, { useEffect, useRef, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import Card from '@/Components/Card';
import dummyImage from '../../../../../public/assets/images/thumbnail.jpg';
import DummyLogo from '../../../../../public/assets/images/Logo/Favicon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { createPortal } from 'react-dom';
import Toast from '@/Components/Toast';
export default function view({ post }) {
    const { generalSetting } = usePage().props;

    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const iconRef = useRef(null);
    const dropDownRef = useRef(null);

    const [customToastMessage, setCustomToastMessage] = useState({});

    const handleToggle = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + 6,
                left: rect.right - 180,
            });
            setShowDropdown((prev) => !prev);
        }
    };

    useEffect(() => {
        const handleResize = () => setShowDropdown(false);
        const handleClickOutside = (e) => {
            if (
                iconRef.current &&
                dropDownRef.current &&
                !iconRef.current.contains(e.target) &&
                !dropDownRef.current.contains(e.target)
            ) {
                setShowDropdown(false);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Posts" />
                <BreadCrumb
                    header="View Post"
                    parent="Posts"
                    parent_link={route('dashboard.posts.index')}
                    child="View Posts"
                />

                {customToastMessage.message != '' && <Toast flash={customToastMessage} />}
                <Card
                    Content={
                        <>
                            <div className="flex flex-col w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg md:flex-row">
                                {((Array.isArray(post?.post_video_urls) &&
                                    post.post_video_urls.length > 0) ||
                                    (Array.isArray(post?.post_image_urls) &&
                                        post.post_image_urls.length > 0)) && (
                                    <div className="w-full bg-gray-100 dark:bg-gray-900 md:w-1/2">
                                        <div className="flex h-[500px] items-center justify-center">
                                            {/* Images Crosel */}

                                            <Swiper
                                                modules={[Navigation, Pagination]}
                                                spaceBetween={10}
                                                slidesPerView={1}
                                                navigation
                                                loop={true}
                                                pagination={{ clickable: true }}
                                                className="w-full h-96"
                                            >
                                                {Array.isArray(post?.post_image_urls) &&
                                                    post.post_image_urls.map(
                                                        (img, index) =>
                                                            img && (
                                                                <SwiperSlide key={`img-${index}`}>
                                                                    <img
                                                                        src={img}
                                                                        alt={`Image ${index + 1}`}
                                                                        className="object-contain w-full h-full rounded-lg select-none"
                                                                    />
                                                                </SwiperSlide>
                                                            ),
                                                    )}
                                                {Array.isArray(post?.post_video_urls) &&
                                                    post.post_video_urls.map(
                                                        (vid, index) =>
                                                            vid && (
                                                                <SwiperSlide key={`vid-${index}`}>
                                                                    <video
                                                                        controls
                                                                        className="object-cover w-full h-full rounded-lg select-none"
                                                                    >
                                                                        <source
                                                                            src={vid}
                                                                            type="video/mp4"
                                                                        />
                                                                        Your browser does not
                                                                        support the video tag.
                                                                    </video>
                                                                </SwiperSlide>
                                                            ),
                                                    )}

                                                {/* Customize navigation buttons via CSS or Tailwind */}
                                                <style>{`
                                                    .swiper-button-next,
                                                    .swiper-button-prev {
                                                        @apply rounded-full bg-black/40 p-2 text-white;
                                                        width: 36px;
                                                        height: 36px;
                                                        top: 50%;
                                                        transform: translateY(-50%);
                                                    }

                                                    .swiper-button-next::after,
                                                    .swiper-button-prev::after {
                                                        font-size: 16px;
                                                        font-weight: bold;
                                                        color: #fff;
                                                        background-color: rgba(0, 0, 0, 0.5);
                                                        padding: 10px;
                                                        border-radius: 50%;

                                                        width: 36px;
                                                        height: 36px;
                                                        text-align: center;
                                                    }

                                                    .swiper-button-next {
                                                        right: 10px;
                                                    }

                                                    .swiper-button-prev {
                                                        left: 10px;
                                                    }
                                                `}</style>
                                            </Swiper>

                                            {/* Video Example */}
                                            {/* <video controls className="object-cover w-full h-full">
                                    <source src="/path/to/video.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video> */}
                                        </div>
                                    </div>
                                )}

                                {/* Content Section */}
                                <div
                                    className={`mx-auto w-full space-y-4 rounded-lg p-10 dark:bg-gray-900/90 ${
                                        (Array.isArray(post?.post_video_urls) &&
                                            post.post_video_urls.length > 0) ||
                                        (Array.isArray(post?.post_image_urls) &&
                                            post.post_image_urls.length > 0 &&
                                            'md:w-1/2')
                                    }`}
                                >
                                    {/* Author */}
                                    <div className="flex flex-wrap items-center justify-between space-x-3">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={generalSetting?.app_favicon_url ?? DummyLogo}
                                                className="w-10 h-10 rounded-full"
                                                alt="Profile"
                                            />
                                            <span className="text-lg font-semibold dark:text-white/80">
                                                {generalSetting.app_name
                                                    .split(' ')
                                                    .map((word) => word[0])
                                                    .join('')}
                                            </span>
                                        </div>

                                        <div
                                            className="cursor-pointer"
                                            onClick={() => handleToggle()}
                                            ref={iconRef}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6 dark:text-white"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                />
                                            </svg>
                                        </div>

                                        {showDropdown && (
                                            <>
                                                {createPortal(
                                                    <div
                                                        onClick={(e) => e.stopPropagation()}
                                                        ref={dropDownRef}
                                                        className="fixed z-[99999] w-44 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:w-48"
                                                        style={{
                                                            top: `${dropdownPos.top}px`,
                                                            left: `${dropdownPos.left}px`,
                                                        }}
                                                    >
                                                        <ul
                                                            className="py-1 overflow-y-scroll text-sm text-gray-700 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-500 dark:text-gray-200 dark:scrollbar-thumb-white"
                                                            style={{ maxHeight: '180px' }}
                                                        >
                                                            <li>
                                                                <button className="flex items-center w-full gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
                                                                            d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                                                                        />
                                                                    </svg>
                                                                    QR Code
                                                                </button>
                                                            </li>

                                                            <li>
                                                                <button className="flex items-center w-full gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
                                                                    Bookmark
                                                                </button>
                                                            </li>

                                                            <li>
                                                                <button
                                                                    className="flex items-center w-full gap-1 px-3 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                    onClick={(e) => {
                                                                        navigator.clipboard.writeText(
                                                                            (
                                                                                route(
                                                                                    'dashboard.posts.show',
                                                                                    post?.slug,
                                                                                ) +
                                                                                `?planet=earth${post?.latitude != null ? '&lat=' + post?.latitude : ''}` +
                                                                                `${post?.longitude != null ? '&lng=' + post?.longitude : ''}` +
                                                                                `${post?.location_name != null ? '&location_name=' + post?.location_name : ''}` +
                                                                                `&timestamp=${post?.created_at}` +
                                                                                `${post?.floor != null ? '&floor=' + post?.floor : ''}`
                                                                            ).trim(),
                                                                        );
                                                                        setCustomToastMessage({
                                                                            success:
                                                                                'Copied to clipboard',
                                                                        });
                                                                        setShowDropdown(false);
                                                                        setTimeout(
                                                                            () =>
                                                                                setCustomToastMessage(
                                                                                    {},
                                                                                ),
                                                                            3000,
                                                                        );
                                                                    }}
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
                                                                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                                        />
                                                                    </svg>
                                                                    Copy Link
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>,
                                                    document.body,
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div
                                        className="my-12 text-gray-800 text-md dark:text-white/80"
                                        dangerouslySetInnerHTML={{ __html: post?.content }}
                                    />

                                    <div>
                                        <span className="text-xs font-semibold text-blue-600 dark:text-white/80">
                                            {post?.tag}
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="flex flex-wrap gap-2 text-xs text-gray-700 dark:text-white/80">
                                        <span className="px-2 py-1 bg-gray-100 rounded-full dark:bg-gray-500">
                                            {post?.added_at + ' ' + post?.created_at_time}
                                        </span>

                                        {post.location_name && (
                                            <span className="px-2 py-1 bg-gray-100 rounded-full dark:bg-gray-500">
                                                {post?.location_name}
                                            </span>
                                        )}
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
