import PostMediaViewer from '@/Components/PostMediaViewer';
import PostsGrid from '@/Components/PostsGrid';
import PrimaryButton from '@/Components/PrimaryButton';
import useDarkMode from '@/Hooks/useDarkMode';
import useWindowSize from '@/Hooks/useWindowSize';
import MainLayout from '@/Layouts/Website/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

export default function index({ all_posts, next_page_url }) {
    const [viewablePost, setViewablePost] = useState('');

    const [posts, setPosts] = useState(all_posts || []);

    const [nextPageUrl, setNextPageUrl] = useState(next_page_url);

    const [selectedPostIndex, setSelectedPostIndex] = useState(0);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    const loaderRef = useRef(null);

    const { generalSetting, auth } = usePage().props;
    const [showQrCode, setShowQrCode] = useState(false);

    // Checking Dark Mode

    const isDarkMode = useDarkMode();
    const windowSize = useWindowSize();

    const generateURL = (post) => {
        return (
            `?slug=${post?.slug}&planet=earth${post?.latitude != null ? '&lat=' + post?.latitude : ''}` +
            `${post?.longitude != null ? '&lng=' + post?.longitude : ''}` +
            `${post?.location_name != null ? '&location_name=' + post?.location_name : ''}` +
            `&timestamp=${post?.created_at}` +
            `${post?.floor_id != null ? '&floor=' + post?.floor?.name : ''}`
        );
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');

        if (slug) {
            const post = posts.find((post) => post.slug === slug);
            if (post) {
                setViewablePost(post);
            } else {
                fetchSinglePost(slug);
            }
        }
    }, []);

    // Stopping Overflow Of Body When Modal is Open
    useEffect(() => {
        if (viewablePost !== '') {
            setSelectedMediaIndex(0);
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => document.body.classList.remove('overflow-hidden');
    }, [viewablePost]);

    // Fetch more posts
    const fetchMorePosts = async () => {
        if (!nextPageUrl) return;

        try {
            const params = new URLSearchParams(nextPageUrl.split('?')[1]);

            const res = await fetch(route('website.posts.getmore') + `?${params.toString()}`);
            const data = await res.json();

            setPosts((prev) => {
                const ids = new Set(prev.map((p) => p.id));
                const newOnes = data.posts.filter((p) => !ids.has(p.id));
                return [...prev, ...newOnes];
            });

            setNextPageUrl(data.next_page_url);
        } catch (err) {
            toast.error('Error fetching posts:', err);
        }
    };

    const fetchSinglePost = async (slug) => {
        try {
            const res = await fetch(route('website.posts.getsingle', slug));
            const data = await res.json();

            if (data.status) {
                setViewablePost(data.post);

                //  Only add if not already in posts
                setPosts((prev) => {
                    const exists = prev.some((p) => p.id === data.post.id);
                    return exists ? prev : [data.post, ...prev];
                });

                // Update selected index to the position of this post
                setPosts((prev) => {
                    const idx = prev.findIndex((p) => p.id === data.post.id);
                    if (idx !== -1) {
                        setSelectedPostIndex(idx);
                    }
                    return prev;
                });
            } else {
                toast.error('Post Not Found');
            }
        } catch (err) {
            toast.error('Error fetching post:', err);
        }
    };

    // Infinite Scroll Observer
    useEffect(() => {
        if (!loaderRef.current || !nextPageUrl) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchMorePosts();
                }
            },
            { threshold: 1 },
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [nextPageUrl]);

    return (
        <MainLayout>
            <Head title="Posts" />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-gray-500 dark:via-gray-600 dark:to-gray-800">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Latest Posts
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-gray-200 sm:mt-6 sm:text-xl sm:leading-8">
                                Explore the latest updates, buying guides, and tips on smartphones,
                                from unboxings and tutorials to industry news, everything you need
                                to stay informed before making your next purchase.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900"></div>
            </div>

            {/* Masonry Layout */}
            <div className="py-12 sm:py-16">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Compact Masonry */}
                    <div className="columns-1 gap-1 [column-fill:_balance] min-[300px]:columns-2 lg:columns-3">
                        {posts.map((post, index) => {
                            const url = generateURL(post);
                            return (
                                <article
                                    key={post?.id}
                                    className="group relative mb-1 cursor-pointer break-inside-avoid overflow-hidden rounded-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => {
                                        setViewablePost(post);
                                        setSelectedPostIndex(index ?? 0);
                                        setSelectedMediaIndex(0);
                                        window.history.pushState({}, '', url);
                                    }}
                                >
                                    {post?.images ? (
                                        <div className="relative">
                                            <img
                                                src={post?.images[0]?.url}
                                                alt={post?.title}
                                                loading="lazy"
                                                className="w-full object-cover text-[10px] text-gray-700 transition-all duration-500 group-hover:scale-105 dark:text-white/80"
                                            />

                                            {/* Share Button */}
                                            <button
                                                className="absolute right-3 top-3 text-white opacity-80 hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const url =
                                                        route('website.posts.index') +
                                                        generateURL(post);
                                                    navigator.clipboard.writeText(url.trim());

                                                    toast.success(
                                                        'Shareable Link Copied To Clipboard',
                                                    );
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-3 lg:size-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Title + Meta */}
                                            <div className="absolute inset-x-0 bottom-0 p-4">
                                                <h2 className="line-clamp-2 text-[8px] font-semibold text-white drop-shadow-lg sm:text-[9px] md:text-[10px] lg:text-lg">
                                                    {post?.title}
                                                </h2>
                                                <div className="mt-1 flex items-center justify-between text-[6px] font-bold text-gray-200 drop-shadow-sm sm:text-[7px] md:text-[8px] lg:text-xs">
                                                    <span className="text-white drop-shadow-md">
                                                        {post?.tag}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-white drop-shadow-md lg:gap-2">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-2 md:size-3 lg:size-4"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                            />
                                                        </svg>
                                                        {post?.added_at}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Text-only */
                                        <div className="relative flex flex-col justify-between bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-5 text-white dark:from-gray-500 dark:via-gray-600 dark:to-gray-800">
                                            {/* Share Button */}
                                            <button
                                                className="absolute right-3 top-3 text-white opacity-80 hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const url =
                                                        route('website.posts.index') +
                                                        generateURL(post);
                                                    navigator.clipboard.writeText(url.trim());

                                                    toast.success(
                                                        'Shareable Link Copied To Clipboard',
                                                    );
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-3 lg:size-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                                                    />
                                                </svg>
                                            </button>

                                            <div>
                                                <h2 className="mb-2 line-clamp-2 text-[8px] font-semibold text-white drop-shadow-lg sm:text-[9px] md:text-[10px] lg:text-lg">
                                                    {post?.title}
                                                </h2>
                                                <p className="line-clamp-4 text-[10px] opacity-90 lg:text-sm">
                                                    {post.content.length > 200 ? (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html:
                                                                    post?.content.substring(
                                                                        0,
                                                                        200,
                                                                    ) + '...',
                                                            }}
                                                        ></span>
                                                    ) : (
                                                        <span
                                                            dangerouslySetInnerHTML={{
                                                                __html: post?.content,
                                                            }}
                                                        ></span>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-[6px] font-bold text-gray-200 drop-shadow-sm sm:text-[7px] md:text-[8px] lg:text-xs">
                                                <span className="text-white drop-shadow-md">
                                                    {post?.tag}
                                                </span>
                                                <span className="flex items-center gap-1 text-white drop-shadow-md lg:gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="size-2 md:size-3 lg:size-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                    {post?.added_at}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>

                    {posts?.length === 0 && (
                        <div className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-600 py-5 text-center text-white dark:from-gray-500 dark:via-gray-600 dark:to-gray-800 dark:text-white/80">
                            <h1 className="text-md font-bold">No Posts Found</h1>
                        </div>
                    )}

                    {/* Loader */}
                    {posts?.length > 0 && (
                        <>
                            {nextPageUrl && (
                                <div
                                    ref={loaderRef}
                                    className="flex animate-pulse items-center justify-center gap-2 py-10 text-center text-gray-700 transition-all duration-100 dark:text-white/80"
                                >
                                    <div className="flex items-center justify-center">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                    Loading more...
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Post View Modal */}
            {viewablePost != '' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
                    <div
                        className="fixed inset-0 backdrop-blur-[32px]"
                        onClick={() => {
                            setViewablePost('');
                            window.history.pushState({}, '', window.location.pathname);
                        }}
                    ></div>

                    {/* Modal content */}
                    <div
                        className={`relative z-10 ${
                            (Array.isArray(viewablePost?.post_video_urls) &&
                                viewablePost.post_video_urls.length > 0) ||
                            (Array.isArray(viewablePost?.post_image_urls) &&
                                viewablePost.post_image_urls.length > 0)
                                ? 'h-[95vh]'
                                : 'h-[80vh]'
                        } max-w-screen-3xl w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8`}
                    >
                        {/* Close Button */}
                        <div className="flex items-center justify-end">
                            <button
                                onClick={() => {
                                    setViewablePost('');
                                    window.history.pushState({}, '', window.location.pathname);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 hover:text-black/80 dark:text-white/80 dark:hover:text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable Posts  */}

                        {/* Post Content */}
                        <div className="mx-auto flex flex-col overflow-hidden rounded-lg lg:flex-row">
                            {windowSize.width < 1024 && (
                                <PostsGrid
                                    posts={posts}
                                    onSelect={(post) => {
                                        setViewablePost(post);
                                        window.history.pushState({}, '', generateURL(post));
                                    }}
                                    selectedPostIndex={selectedPostIndex}
                                    onSelectIndex={setSelectedPostIndex}
                                    nextPageUrl={nextPageUrl}
                                    fetchSinglePost={fetchSinglePost}
                                    fetchMorePosts={fetchMorePosts}
                                />
                            )}

                            {/* Media Section - Shows on top for mobile, left for desktop */}
                            {((Array.isArray(viewablePost?.post_video_urls) &&
                                viewablePost.post_video_urls.length > 0) ||
                                (Array.isArray(viewablePost?.post_image_urls) &&
                                    viewablePost.post_image_urls.length > 0)) && (
                                <PostMediaViewer
                                    viewablePost={viewablePost}
                                    selectedMediaIndex={selectedMediaIndex}
                                    onSelectMediaIndex={setSelectedMediaIndex}
                                />
                            )}

                            {/* Content Section - Shows below media on mobile, right side on desktop */}
                            <div
                                className={`w-full bg-transparent ${
                                    (Array.isArray(viewablePost?.post_video_urls) &&
                                        viewablePost.post_video_urls.length > 0) ||
                                    (Array.isArray(viewablePost?.post_image_urls) &&
                                        viewablePost.post_image_urls.length > 0)
                                        ? 'lg:w-1/2'
                                        : 'lg:w-full'
                                }`}
                            >
                                <div className="mx-auto w-full space-y-4 p-6 md:p-10">
                                    {/* Author Header */}
                                    <div className="flex flex-wrap items-center justify-between space-x-3 space-y-3">
                                        <div className="flex items-center space-x-3 space-y-3">
                                            <img
                                                src={generalSetting?.app_favicon ?? DummyLogo}
                                                className="h-10 w-10 rounded-full"
                                                alt="Profile"
                                            />
                                            <span className="text-lg font-semibold dark:text-white/80">
                                                {generalSetting?.app_name.length > 20
                                                    ? generalSetting?.app_name
                                                          .split(' ')
                                                          .map((word) => word[0])
                                                          .join('')
                                                    : generalSetting?.app_name}
                                            </span>
                                        </div>

                                        <div className="flex cursor-pointer items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setShowQrCode(true);
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6 hover:text-black/80 dark:text-white/80 dark:hover:text-white"
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
                                            </button>

                                            {auth?.user && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.put(
                                                            route(
                                                                'website.posts.bookmark',
                                                                viewablePost?.id,
                                                            ),
                                                            {
                                                                post_id: viewablePost?.id,
                                                            },
                                                            {
                                                                onSuccess: () => {
                                                                    viewablePost.is_bookmarked =
                                                                        !viewablePost.is_bookmarked;
                                                                },
                                                                onError: (e) => {
                                                                    toast.error(e.message);
                                                                },
                                                            },
                                                        );
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill={
                                                            viewablePost?.is_bookmarked
                                                                ? isDarkMode
                                                                    ? '#ffff'
                                                                    : '#0340D1'
                                                                : 'none'
                                                        }
                                                        stroke={
                                                            viewablePost?.is_bookmarked
                                                                ? isDarkMode
                                                                    ? '#ffff'
                                                                    : '#0340D1'
                                                                : 'currentColor'
                                                        }
                                                        strokeWidth={1.5}
                                                        viewBox="0 0 24 24"
                                                        className="size-6 hover:text-black/80 dark:text-white/80 dark:hover:text-white"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                                        />
                                                    </svg>
                                                </button>
                                            )}

                                            <button
                                                onClick={(e) => {
                                                    const url =
                                                        route('website.posts.index') +
                                                        generateURL(viewablePost);
                                                    navigator.clipboard.writeText(url.trim());

                                                    toast.success('Copied to clipboard');
                                                }}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6 hover:text-black/80 dark:text-white/80 dark:hover:text-white"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Post Content */}

                                    <p className="whitespace- text-md mt-8 break-all font-semibold text-gray-800 dark:text-white/80">
                                        {viewablePost?.title}
                                    </p>

                                    <div
                                        className="prose max-w-none text-gray-800 dark:prose-invert dark:text-white/80"
                                        dangerouslySetInnerHTML={{ __html: viewablePost?.content }}
                                    />

                                    {/* Tag */}
                                    <div>
                                        <span className="text-xs font-semibold text-blue-600 dark:text-white/80">
                                            {viewablePost?.tag}
                                        </span>
                                    </div>

                                    <hr className="border-gray-200 dark:border-gray-700" />

                                    {/* Post Meta Info */}
                                    <div className="flex flex-wrap gap-2 text-xs text-gray-700 dark:text-white/80">
                                        <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-500">
                                            {viewablePost?.added_at} {viewablePost?.created_at_time}
                                        </span>

                                        {viewablePost?.location_name && (
                                            <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-500">
                                                {viewablePost?.location_name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Posts  */}
                            {windowSize.width > 1024 && (
                                <PostsGrid
                                    posts={posts}
                                    onSelect={(post) => {
                                        setViewablePost(post);
                                        window.history.pushState({}, '', generateURL(post));
                                    }}
                                    selectedPostIndex={selectedPostIndex}
                                    onSelectIndex={setSelectedPostIndex}
                                    nextPageUrl={nextPageUrl}
                                    fetchMorePosts={fetchMorePosts}
                                    fetchSinglePost={fetchSinglePost}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* QR CODE */}
            {showQrCode && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
                        <div
                            className="fixed inset-0 backdrop-blur-[32px]"
                            onClick={() => setShowQrCode(false)}
                        ></div>

                        {/* Modal content */}
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="qrCodeTitle"
                            className="relative z-10 max-h-screen w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8"
                        >
                            <div className="text-center">
                                <h2
                                    id="qrCodeTitle"
                                    className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100"
                                >
                                    Scan QR Code
                                </h2>

                                <div className="flex items-center justify-center">
                                    <div className="mx-auto w-full max-w-xs">
                                        <QRCode
                                            className="h-auto w-full"
                                            value={generateURL(viewablePost)}
                                            viewBox="0 0 256 256"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-center">
                                    <PrimaryButton
                                        Action={() => setShowQrCode(false)}
                                        Text="Close"
                                        Type="button"
                                        CustomClass="w-full max-w-xs"
                                        Icon={
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </MainLayout>
    );
}
