import PostMediaViewer from '@/Components/PostMediaViewer';
import PostsGrid from '@/Components/PostsGrid';
import useDarkMode from '@/Hooks/useDarkMode';
import useWindowSize from '@/Hooks/useWindowSize';
import MainLayout from '@/Layouts/Website/MainLayout';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';
import videoThumbnail from '../../../../../public/assets/images/video-thumb/general-video.png';
import { useSwipeable } from 'react-swipeable';
import VideoPlayer from '@/Components/VideoPlayer';
import { createPortal } from 'react-dom';

export default function index({ all_posts, next_page_url }) {
    const [viewablePost, setViewablePost] = useState('');

    const [posts, setPosts] = useState(all_posts || []);

    const [nextPageUrl, setNextPageUrl] = useState(next_page_url);

    const [selectedPostIndex, setSelectedPostIndex] = useState(0);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

    const loaderRef = useRef(null);

    const { auth } = usePage().props;
    const [showQrCode, setShowQrCode] = useState(false);

    // Checking Dark Mode
    const isDarkMode = useDarkMode();

    const windowSize = useWindowSize();
    const [showDetails, setShowDetails] = useState(false);

    // Set Media items For Media Viewer In the bottom bar
    const [mediaItems, setMediaItems] = useState([]);
    const thumbRefs = useRef([]);
    const mediaThumbRefs = useRef([]);

    const generateURL = (post) => {
        return (
            `?slug=${post?.slug}&planet=earth${post?.latitude != null ? '&lat=' + post?.latitude : ''}` +
            `${post?.longitude != null ? '&lng=' + post?.longitude : ''}` +
            `${post?.location_name != null ? '&location_name=' + post?.location_name : ''}` +
            `&timestamp=${post?.created_at}` +
            `${post?.floor_id != null ? '&floor=' + post?.floor?.name : ''}`
        );
    };

    // Tracking Post Viewer Width

    // Desktop Post Viewer
    const [isDesktopPostViewer, setIsDesktopPostViewer] = useState(false);

    // Mobile Post Viewer
    const [isMobilePostViewer, setIsMobilePostViewer] = useState(false);

    const setPostViewerBasedOnWidth = (windowSize) => {
        if (windowSize.width < 1024) {
            setIsDesktopPostViewer(false);
            setIsMobilePostViewer(true);
        }

        if (windowSize.width > 1024) {
            setIsMobilePostViewer(false);
            setIsDesktopPostViewer(true);
        }
    };

    useEffect(() => {
        if (viewablePost != '') setPostViewerBasedOnWidth(windowSize);
    }, [windowSize.width]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');

        if (slug) {
            const post = posts.find((post) => post.slug === slug);
            if (post) {
                setViewablePost(post);
                setPostViewerBasedOnWidth(windowSize);
            } else {
                fetchSinglePost(slug);
                setPostViewerBasedOnWidth(windowSize);
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
        const handlePopState = () => {
            if (viewablePost !== '') {
                setViewablePost('');
                window.history.replaceState({}, '', window.location.pathname);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            document.body.classList.remove('overflow-hidden');
            window.removeEventListener('popstate', handlePopState);
        };
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

                setPosts((prev) => {
                    let newPosts = prev;
                    const exists = prev.some((p) => p.id === data.post.id);

                    if (!exists) {
                        newPosts = [data.post, ...prev];
                    }

                    const idx = newPosts.findIndex((p) => p.id === data.post.id);
                    if (idx !== -1) {
                        setSelectedPostIndex(idx);
                    }

                    return newPosts;
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

    const mediaMobileref = useRef(null);
    // Mouse wheel navigation For Mobile Media Navigation
    useEffect(() => {
        if (!mediaMobileref.current) return;

        if (viewablePost != '' && mediaItems.length > 0) {
            const mediaEl = mediaMobileref.current;

            const handleWheel = (event) => {
                if (event.ctrlKey || event.metaKey) return;
                event.preventDefault();

                if (event.deltaY < 0) {
                    setSelectedMediaIndex((prev) => (prev === 0 ? 0 : prev - 1));
                } else {
                    setSelectedMediaIndex((prev) =>
                        prev === mediaItems.length - 1 ? prev : prev + 1,
                    );
                }
            };

            mediaEl.addEventListener('wheel', handleWheel, { passive: false });
            return () => {
                mediaEl.removeEventListener('wheel', handleWheel, { passive: false });
            };
        }
    }, [mediaItems.length, viewablePost]);

    // Auto-scroll thumbnails For Mobile Media Navigation
    useEffect(() => {
        if (thumbRefs.current[selectedPostIndex]) {
            thumbRefs.current[selectedPostIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [selectedPostIndex]);

    useEffect(() => {
        if (viewablePost) {
            const images = Array.isArray(viewablePost.post_image_urls)
                ? viewablePost.post_image_urls.map((url) => ({ type: 'image', url }))
                : [];
            const videos = Array.isArray(viewablePost.post_video_urls)
                ? viewablePost.post_video_urls.map((url) => ({ type: 'video', url }))
                : [];

            const allMedia = [...images, ...videos];
            setMediaItems(allMedia);
            setSelectedMediaIndex(allMedia.length > 0 ? 0 : -1);
        }
    }, [viewablePost]);

    // Auto Select Post From Mobile Post Container Logic
    const mobilePostContainerRef = useRef(null);
    useEffect(() => {
        if (isMobilePostViewer && viewablePost && mobilePostContainerRef.current) {
            const index = posts.findIndex((p) => p.id === viewablePost.id);
            if (index !== -1) {
                mobilePostContainerRef.current.scrollTo({
                    top: index * window.innerHeight,
                    behavior: 'instant',
                });
            }
        }
    }, [isMobilePostViewer]);

    // Mobile Post Elipsis Dropdown
    const [showElipsisDropdown, setElipsisShowDropdown] = useState(false);
    const elipsisDropDownRef = useRef(null);
    const elipsisButtonRef = useRef(null);

    // Checking Outside Click Of Elipsis Dropdown
    useEffect(() => {
        const handleResize = () => setElipsisShowDropdown(false);
        const handleClickOutside = (e) => {
            // Working But Too Greedy
            // if (elipsisButtonRef.current && !e.target.closest('[data-elipsis-button]')) {
            //     console.log('BUTTON LOGIC RUNS');
            //     setElipsisShowDropdown(false);
            // }

            // if (
            //     elipsisDropDownRef &&
            //     !e.target.closest('[data-elipsis-button]') &&
            //     e.target.closest('[data-elipsis-dropdown]')
            // ) {
            //     setElipsisShowDropdown(true);
            // }

            const clickedButton = e.target.closest('[data-elipsis-button]');
            const clickedDropdown = e.target.closest('[data-elipsis-dropdown]');

            if (clickedButton) {
                setElipsisShowDropdown((prev) => !prev);
                return;
            }

            if (clickedDropdown) {
                return;
            }

            setElipsisShowDropdown(false);
        };
        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Not Using For Now
    // const postSwipeForMobileBottomContent = useSwipeable({
    //     onSwipedLeft: () => {
    //         let nextIndex =
    //             selectedPostIndex === posts.length - 1 ? selectedPostIndex : selectedPostIndex + 1;

    //         // Update current index
    //         setSelectedPostIndex(nextIndex);

    //         // Debounce like wheel
    //         if (PostSwipeTimeout.current) clearTimeout(PostSwipeTimeout.current);
    //         PostSwipeTimeout.current = setTimeout(() => {
    //             if (posts[nextIndex]) {
    //                 const post = posts[nextIndex];
    //                 setViewablePost(post);
    //                 window.history.replaceState({}, '', generateURL(post));
    //             }

    //             if (nextIndex >= posts.length - 5 && nextPageUrl) {
    //                 fetchMorePosts();
    //             }
    //         }, 500);
    //     },

    //     onSwipedRight: () => {
    //         let nextIndex = selectedPostIndex === 0 ? 0 : selectedPostIndex - 1;

    //         // Update current index
    //         setSelectedPostIndex(nextIndex);

    //         // Debounce like wheel
    //         if (PostSwipeTimeout.current) clearTimeout(PostSwipeTimeout.current);
    //         PostSwipeTimeout.current = setTimeout(() => {
    //             if (posts[nextIndex]) {
    //                 const post = posts[nextIndex];
    //                 setViewablePost(post);
    //                 window.history.replaceState({}, '', generateURL(post));
    //             }

    //             if (nextIndex >= posts.length - 5 && nextPageUrl) {
    //                 fetchMorePosts();
    //             }
    //         }, 500);
    //     },

    //     trackTouch: true,
    //     trackMouse: true,
    //     preventScrollOnSwipe: true,
    // });

    // const outerHandlers = useSwipeable({
    //     onSwipedLeft: () => {
    //         let nextIndex =
    //             selectedPostIndex === posts.length - 1 ? selectedPostIndex : selectedPostIndex + 1;

    //         // Update current index
    //         setSelectedPostIndex(nextIndex);

    //         // Debounce like wheel
    //         if (PostSwipeTimeout.current) clearTimeout(PostSwipeTimeout.current);
    //         PostSwipeTimeout.current = setTimeout(() => {
    //             if (posts[nextIndex]) {
    //                 const post = posts[nextIndex];
    //                 setViewablePost(post);
    //                 window.history.replaceState({}, '', generateURL(post));
    //             }

    //             if (nextIndex >= posts.length - 5 && nextPageUrl) {
    //                 fetchMorePosts();
    //             }
    //         }, 500);
    //     },

    //     onSwipedRight: () => {
    //         let nextIndex = selectedPostIndex === 0 ? 0 : selectedPostIndex - 1;

    //         // Update current index
    //         setSelectedPostIndex(nextIndex);

    //         // Debounce like wheel
    //         if (PostSwipeTimeout.current) clearTimeout(PostSwipeTimeout.current);
    //         PostSwipeTimeout.current = setTimeout(() => {
    //             if (posts[nextIndex]) {
    //                 const post = posts[nextIndex];
    //                 setViewablePost(post);
    //                 window.history.replaceState({}, '', generateURL(post));
    //             }

    //             if (nextIndex >= posts.length - 5 && nextPageUrl) {
    //                 fetchMorePosts();
    //             }
    //         }, 500);
    //     },

    //     trackTouch: true,
    //     trackMouse: true,
    //     preventScrollOnSwipe: true,
    // });

    // const mediaMobileHandlers = useSwipeable({
    //     onSwipedLeft: (e) => {
    //         setSelectedMediaIndex((prev) => (prev === mediaItems.length - 1 ? prev : prev + 1));
    //     },

    //     onSwipedRight: (e) => {
    //         setSelectedMediaIndex((prev) => (prev === 0 ? 0 : prev - 1));
    //     },

    //     trackTouch: true,
    //     trackMouse: true,
    //     preventScrollOnSwipe: true,
    // });

    // // Bottom Bar Hiding State
    // const [isVisible, setIsVisible] = useState(
    //     (!showDetails &&
    //         Array.isArray(viewablePost?.post_video_urls) &&
    //         !viewablePost.post_video_urls.length > 0) ||
    //         (Array.isArray(viewablePost?.post_image_urls) &&
    //             !viewablePost.post_image_urls.length > 0),
    // );

    // useEffect(() => {
    //     if (!showDetails) {
    //         // Make it visible immediately → triggers fade-in
    //         setIsVisible(true);
    //     } else {
    //         // Delay unmount until fadeOutUp finishes
    //         const timer = setTimeout(() => setIsVisible(false), 500); // 500ms = animation time
    //         return () => clearTimeout(timer);
    //     }
    // }, [showDetails]);

    return (
        <MainLayout>
            <Head title="Posts" />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 dark:from-gray-500 dark:via-gray-600 dark:to-gray-800">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative py-16 sm:py-24">
                    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Latest Posts
                            </h1>
                            <p className="max-w-2xl mx-auto mt-4 text-lg leading-7 text-gray-200 sm:mt-6 sm:text-xl sm:leading-8">
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
                    <div className="columns-1 gap-1 [column-fill:_balance] min-[300px]:columns-2 lg:columns-4">
                        {posts.map((post, index) => {
                            const url = generateURL(post);
                            return (
                                <article
                                    key={post?.id}
                                    className="relative mb-1 overflow-hidden transition-all duration-300 rounded-none shadow-md cursor-pointer group break-inside-avoid hover:-translate-y-1 hover:shadow-xl"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => {
                                        setViewablePost(post);

                                        if (windowSize.width > 1024) {
                                            setIsDesktopPostViewer(true);
                                        } else {
                                            setIsMobilePostViewer(true);
                                        }

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
                                                className="absolute text-white right-3 top-3 opacity-80 hover:opacity-100"
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
                                        <div className="relative flex flex-col justify-between p-5 text-white bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 dark:from-gray-500 dark:via-gray-600 dark:to-gray-800">
                                            {/* Share Button */}
                                            <button
                                                className="absolute text-white right-3 top-3 opacity-80 hover:opacity-100"
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
                                                <h2 className="mb-2 line-clamp-2 text-[10px] font-semibold text-white drop-shadow-lg sm:text-[9px] md:text-[10px] lg:text-lg">
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
                                            <div className="mt-2 flex items-center justify-between text-[7px] font-bold text-gray-200 drop-shadow-sm sm:text-[7px] md:text-[8px] lg:text-xs">
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
                        <div className="flex items-center justify-center py-5 text-center text-white rounded-lg bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-600 dark:from-gray-500 dark:via-gray-600 dark:to-gray-800 dark:text-white/80">
                            <h1 className="font-bold text-md">No Posts Found</h1>
                        </div>
                    )}

                    {/* Loader */}
                    {posts?.length > 0 && (
                        <>
                            {nextPageUrl && (
                                <div
                                    ref={loaderRef}
                                    className="flex items-center justify-center gap-2 py-10 text-center text-gray-700 transition-all duration-100 animate-pulse dark:text-white/80"
                                >
                                    <div className="flex items-center justify-center">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-200 animate-spin fill-blue-600 dark:text-gray-600"
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

            {/* Desktop Post View Modal */}
            {viewablePost != '' && isDesktopPostViewer && (
                <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800">
                    <div
                        className="fixed inset-0 backdrop-blur-[32px]"
                        onClick={() => {
                            setViewablePost('');
                            window.history.replaceState({}, '', window.location.pathname);
                        }}
                    ></div>

                    {/* Modal content */}
                    <div className="relative z-10 w-screen h-screen p-6 overflow-hidden shadow-xl scrollbar-none sm:p-8 lg:overflow-y-auto">
                        {windowSize.width > 1024 && viewablePost != '' && (
                            <>
                                {/* Close Button */}
                                <div className="flex items-center justify-end">
                                    <button
                                        onClick={() => {
                                            setViewablePost('');
                                            window.history.replaceState(
                                                {},
                                                '',
                                                window.location.pathname,
                                            );

                                            setIsDesktopPostViewer(false);
                                            setIsMobilePostViewer(false);
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
                            </>
                        )}

                        {/* Scrollable Posts  */}

                        {/* Post Content */}
                        <div className="flex flex-col justify-center lg:flex-row">
                            {/* Media Section - Shows on top for mobile, left for desktop */}
                            <div
                                className={`translate-y-3 transform transition-all duration-500 ease-in-out`}
                            >
                                {((Array.isArray(viewablePost?.post_video_urls) &&
                                    viewablePost.post_video_urls.length > 0) ||
                                    (Array.isArray(viewablePost?.post_image_urls) &&
                                        viewablePost.post_image_urls.length > 0)) && (
                                    <PostMediaViewer
                                        viewablePost={viewablePost}
                                        selectedMediaIndex={selectedMediaIndex}
                                        onSelectMediaIndex={setSelectedMediaIndex}
                                        setMediaItems={setMediaItems}
                                        mediaThumbRefs={mediaThumbRefs}
                                    />
                                )}
                            </div>

                            {/* Content Section */}
                            {viewablePost && (
                                <div
                                    className={`w-full bg-transparent ${
                                        (Array.isArray(viewablePost?.post_video_urls) &&
                                            viewablePost.post_video_urls.length > 0) ||
                                        (Array.isArray(viewablePost?.post_image_urls) &&
                                            viewablePost.post_image_urls.length > 0)
                                            ? 'lg:w-1/2' // when media exists, take half width on desktop
                                            : 'lg:w-[80%]' // when no media, take full width
                                    }`}
                                >
                                    {((!viewablePost?.post_video_urls?.length &&
                                        !viewablePost?.post_image_urls?.length) ||
                                        windowSize.width > 1024) && (
                                        <div className="w-full p-2 mx-auto space-y-4 md:px-10">
                                            {/* Author Header */}
                                            <div className="flex flex-wrap items-center justify-between space-x-3 space-y-4">
                                                <div className="flex items-center">
                                                    <span className="text-[13px] font-semibold dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]">
                                                        {viewablePost?.user?.name.length > 30
                                                            ? viewablePost?.user?.name.substring(
                                                                  0,
                                                                  30,
                                                              ) + '...'
                                                            : viewablePost?.user?.name}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 cursor-pointer">
                                                    {/* QR Button */}
                                                    <button onClick={() => setShowQrCode(true)}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-4 md:size-5 lg:size-6"
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

                                                    {/* Bookmark Button */}
                                                    {auth?.user && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.put(
                                                                    route(
                                                                        'website.posts.bookmark',
                                                                        viewablePost?.id,
                                                                    ),
                                                                    { post_id: viewablePost?.id },
                                                                    {
                                                                        onSuccess: () => {
                                                                            viewablePost.is_bookmarked =
                                                                                !viewablePost.is_bookmarked;
                                                                        },
                                                                        onError: (e) =>
                                                                            toast.error(e.message),
                                                                    },
                                                                );
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill={
                                                                    viewablePost?.is_bookmarked
                                                                        ? isDarkMode
                                                                            ? '#fff'
                                                                            : '#0340D1'
                                                                        : 'none'
                                                                }
                                                                stroke={
                                                                    viewablePost?.is_bookmarked
                                                                        ? isDarkMode
                                                                            ? '#fff'
                                                                            : '#0340D1'
                                                                        : 'currentColor'
                                                                }
                                                                strokeWidth={1.5}
                                                                viewBox="0 0 24 24"
                                                                className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-4 md:size-5 lg:size-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}

                                                    {/* Copy Link Button */}
                                                    <button
                                                        onClick={(e) => {
                                                            const url =
                                                                route('website.posts.index') +
                                                                generateURL(viewablePost);
                                                            navigator.clipboard.writeText(
                                                                url.trim(),
                                                            );
                                                            toast.success('Copied to clipboard');
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-4 md:size-5 lg:size-6"
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
                                            <p className="mt-2 whitespace-normal break-words text-[15px] font-semibold text-gray-800 dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]">
                                                {viewablePost?.title}
                                            </p>

                                            <div
                                                className="prose max-h-[400px] max-w-[70vw] overflow-auto break-words text-[15px] text-gray-800 dark:prose-invert dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]"
                                                dangerouslySetInnerHTML={{
                                                    __html: viewablePost?.content,
                                                }}
                                            />

                                            {/* Tag */}
                                            <div>
                                                <span className="text-[10px] font-semibold text-blue-600 dark:text-white/80 sm:text-[11px] md:text-[12px] lg:text-[15px]">
                                                    {viewablePost?.tag}
                                                </span>
                                            </div>

                                            <hr className="border-gray-200 dark:border-gray-700" />

                                            {/* Post Meta Info */}
                                            <div className="my-2 flex flex-wrap gap-2 text-[10px] text-gray-700 dark:text-white/80 sm:text-[11px] md:text-[12px] lg:text-[15px]">
                                                <span className="p-1 bg-gray-100 rounded-full dark:bg-gray-700">
                                                    {viewablePost?.added_at}{' '}
                                                    {viewablePost?.created_at_time}
                                                </span>

                                                {viewablePost?.location_name && (
                                                    <span className="p-1 bg-gray-100 rounded-full dark:bg-gray-700">
                                                        {viewablePost?.location_name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Scrollable Posts  */}
                            {windowSize.width > 1024 && (
                                <PostsGrid
                                    posts={posts}
                                    onSelect={(post) => {
                                        setViewablePost(post);
                                        window.history.replaceState({}, '', generateURL(post));
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

            {/* Mobile Post View */}
            {viewablePost !== '' && isMobilePostViewer && (
                <div className="fixed inset-0 z-50 bg-black">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70"></div>

                    {/* Scrollable Container */}
                    <div
                        className="relative z-10 w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-none"
                        onScroll={(e) => {
                            setElipsisShowDropdown(false);
                            const scrollTop = e.currentTarget.scrollTop;
                            const index = Math.round(scrollTop / window.innerHeight);

                            if (index !== selectedPostIndex && posts[index]) {
                                setSelectedPostIndex(index);

                                const post = posts[index];
                                setViewablePost(post);
                                window.history.replaceState({}, '', generateURL(post));

                                // load more when near bottom
                                if (index >= posts.length - 5 && nextPageUrl) {
                                    fetchMorePosts();
                                }
                            }
                        }}
                        ref={mobilePostContainerRef}
                    >
                        {posts.map((post, index) => (
                            <div
                                key={post.id}
                                className="relative w-full h-screen overflow-hidden snap-start"
                            >
                                {/* Top Bar */}
                                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 text-white bg-black/50 backdrop-blur-sm">
                                    <button
                                        onClick={() => {
                                            setViewablePost('');
                                            setIsDesktopPostViewer(false);
                                            setIsMobilePostViewer(false);
                                            window.history.replaceState(
                                                {},
                                                '',
                                                window.location.pathname,
                                            );
                                        }}
                                        className="p-1 rounded-full hover:bg-gray-300/20"
                                    >
                                        {/* back icon */}
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
                                                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                            />
                                        </svg>
                                    </button>

                                    <div className="flex items-center space-x-3">
                                        {/* Elipsis button */}
                                        <button
                                            ref={elipsisButtonRef}
                                            data-elipsis-button
                                            className="p-1 rounded-full hover:bg-gray-300/20"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="pointer-events-none size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                    className="pointer-events-none"
                                                />
                                            </svg>
                                        </button>

                                        {/* Elipsis Dropdown Menu */}
                                        {showElipsisDropdown && isMobilePostViewer && (
                                            <>
                                                <div
                                                    ref={elipsisDropDownRef}
                                                    data-elipsis-dropdown
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="absolute right-0 z-50 mt-2 bg-black border border-gray-900 rounded-lg shadow-xl top-full w-44 sm:w-48"
                                                >
                                                    <ul
                                                        className="py-1 overflow-y-scroll text-sm text-gray-700 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-500 dark:text-gray-200 dark:scrollbar-thumb-white"
                                                        style={{ maxHeight: '180px' }}
                                                    >
                                                        <li>
                                                            <button
                                                                onClick={(e) => {
                                                                    setShowQrCode(true);
                                                                    setElipsisShowDropdown(false);
                                                                }}
                                                                className="flex items-center w-full gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
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

                                                        {auth?.user && (
                                                            <li>
                                                                <button
                                                                    className="flex items-center w-full gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        router.put(
                                                                            route(
                                                                                'website.posts.bookmark',
                                                                                viewablePost?.id,
                                                                            ),
                                                                            {
                                                                                post_id:
                                                                                    viewablePost?.id,
                                                                            },
                                                                            {
                                                                                onSuccess: () => {
                                                                                    viewablePost.is_bookmarked =
                                                                                        !viewablePost.is_bookmarked;
                                                                                },
                                                                                onError: (e) => {
                                                                                    toast.error(
                                                                                        e.message,
                                                                                    );
                                                                                },

                                                                                onFinish: () => {
                                                                                    setElipsisShowDropdown(
                                                                                        false,
                                                                                    );
                                                                                },
                                                                            },
                                                                        );
                                                                    }}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill={
                                                                            post?.is_bookmarked
                                                                                ? '#FFFFFF'
                                                                                : 'none'
                                                                        }
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
                                                        )}

                                                        <li>
                                                            <button
                                                                className="flex items-center w-full gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
                                                                onClick={(e) => {
                                                                    const url =
                                                                        route(
                                                                            'website.posts.index',
                                                                        ) +
                                                                        generateURL(viewablePost);
                                                                    navigator.clipboard.writeText(
                                                                        url.trim(),
                                                                    );

                                                                    toast.success(
                                                                        'Copied to clipboard',
                                                                    );

                                                                    setElipsisShowDropdown(false);
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
                                                </div>
                                            </>
                                        )}

                                        {/* Filter button */}
                                        <button className="p-1 rounded-full hover:bg-gray-300/20">
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
                                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Media Viewer */}
                                <div className="flex items-center justify-center h-full text-white">
                                    {Array.isArray(post.post_image_urls) &&
                                    post.post_image_urls.length > 0 ? (
                                        <img
                                            src={post.post_image_urls[0]}
                                            alt="Post"
                                            className="absolute inset-0 object-cover w-full h-full"
                                        />
                                    ) : (
                                        Array.isArray(post.post_video_urls) &&
                                        post.post_video_urls.length > 0 && (
                                            // <video
                                            //     src={post.post_video_urls[0]}
                                            //     controls
                                            //     className="pointer-events-none max-h-[80vh] w-auto rounded-md object-contain"
                                            // />

                                            <VideoPlayer
                                                videoUrl={post.post_video_urls[0]}
                                                thumbnail={videoThumbnail}
                                                className="absolute inset-0 object-cover w-full h-full"
                                            />
                                        )
                                    )}
                                </div>

                                {/* Bottom Overlay */}
                                <div
                                    className={`absolute ${
                                        (Array.isArray(post.post_image_urls) &&
                                            post.post_image_urls.length > 0) ||
                                        (Array.isArray(post.post_video_urls) &&
                                            post.post_video_urls.length > 0)
                                            ? 'bottom-0 right-0'
                                            : 'right-10 top-10'
                                    } left-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 p-4`}
                                >
                                    {/* Username */}
                                    <div className="flex items-center mb-2 space-x-2">
                                        <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full">
                                            {/* avatar */}
                                        </div>
                                        <span className="text-xs font-medium text-white/80">
                                            {post.user?.name.length > 30
                                                ? post.user?.name.substring(0, 30) + '...'
                                                : post.user?.name}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    {(Array.isArray(post.post_image_urls) &&
                                        post.post_image_urls.length > 0) ||
                                    (Array.isArray(post.post_video_urls) &&
                                        post.post_video_urls.length > 0) ? (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: post?.content }}
                                            className={`prose overflow-hidden break-words text-xs text-white/80 transition-all duration-100 ease-in-out [-webkit-box-orient:vertical] [display:-webkit-box] ${
                                                showDetails
                                                    ? '[-webkit-line-clamp:5]'
                                                    : '[-webkit-line-clamp:3]'
                                            }`}
                                            onClick={() => setShowDetails(!showDetails)}
                                            style={{ maxHeight: showDetails ? '10rem' : '4rem' }}
                                        ></div>
                                    ) : (
                                        <div
                                            dangerouslySetInnerHTML={{ __html: post?.content }}
                                            className={`prose overflow-hidden break-words text-xs text-white/80 transition-all duration-100 ease-in-out [-webkit-box-orient:vertical] [-webkit-line-clamp:5] [display:-webkit-box]`}
                                        ></div>
                                    )}

                                    {/* Learn More Button */}
                                    {showDetails && (
                                        <div className="flex items-center justify-end mt-2">
                                            <button className="rounded-md bg-white p-1 text-[10px] font-semibold hover:bg-white/80">
                                                Learn More
                                            </button>
                                        </div>
                                    )}

                                    {!showDetails &&
                                        Array.isArray(post.post_image_urls) &&
                                        post.post_image_urls.length < 1 &&
                                        Array.isArray(post.post_video_urls) &&
                                        post.post_video_urls.length < 1 && (
                                            <div className="flex items-center justify-end mt-2">
                                                <button className="rounded-md bg-white p-1 text-[10px] font-semibold hover:bg-white/80">
                                                    Learn More
                                                </button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Bar Logic Will Be Used Later If Needed */}
            {/* {windowSize.width < 1024 &&
                viewablePost != '' &&
                ((Array.isArray(viewablePost?.post_video_urls) &&
                    viewablePost.post_video_urls.length > 0) ||
                    (Array.isArray(viewablePost?.post_image_urls) &&
                        viewablePost.post_image_urls.length > 0)) && (
                    <div
                        className={`fixed bottom-0 left-0 right-0 z-50 transform rounded-t-2xl shadow-lg transition-transform duration-300 scrollbar-none ${
                            showDetails
                                ? 'max-h-[80vh] translate-y-0 overflow-y-auto bg-gray-200 dark:bg-gray-950'
                                : 'max-h-[30vh] translate-y-[50%] bg-white dark:bg-gray-800'
                        }`}
                    >
                        <div
                            className={`me-2 flex items-center justify-between gap-2 px-2 ${showDetails && 'p-2'}`}
                            {...handlers}
                        >
                            <span
                                className="cursor-pointer text-[15px] font-semibold hover:underline dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]"
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                {viewablePost?.user?.name.length > 30
                                    ? viewablePost?.user?.name.substring(0, 30) + '...'
                                    : viewablePost?.user?.name}
                            </span>

                            <button
                                onClick={() => {
                                    setShowDetails(!showDetails);
                                }}
                                className={`${showDetails && 'rounded-2xl bg-blue-600 p-2 text-white dark:bg-gray-800 dark:text-white'} `}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5 dark:text-white/80 dark:hover:text-white sm:size-5 md:size-5 lg:size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </button>

                            {/* <button
                                onClick={() => {
                                    setViewablePost('');
                                    window.history.pushState({}, '', window.location.pathname);

                                    setShowDetails(false);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-5 md:size-5 lg:size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button> */}
            {/* </div> */}

            {/* Content */}
            {/* <div className="w-full p-2 mx-auto md:px-7"> */}
            {/* Post Content */}

            {/* <p
                                className="mt-2 cursor-pointer whitespace-normal break-words text-[15px] font-semibold text-gray-800 hover:underline dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]"
                                onClick={() => setShowDetails(!showDetails)}
                            >
                                {viewablePost?.title}
                            </p> */}

            {/* <div
                                className={`prose max-h-[150px] max-w-none cursor-pointer ${showDetails ? 'overflow-y-auto' : 'overflow-hidden'} break-words text-[15px] text-gray-800 dark:prose-invert dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]`}
                                dangerouslySetInnerHTML={{
                                    __html: showDetails
                                        ? viewablePost?.content
                                        : viewablePost?.content.substring(0, 200) + '...',
                                }}
                                {...postSwipeForMobileBottomContent}
                            /> */}

            {/* Tag */}
            {/* <div>
                                <span className="text-[12px] font-semibold text-blue-600 dark:text-white/80 sm:text-[13px] md:text-[14px] lg:text-[15px]">
                                    {viewablePost?.tag}
                                </span>
                            </div> */}

            {/* <hr className="border-gray-200 dark:border-gray-700" /> */}

            {/* Post Meta Info */}
            {/* <div className="flex flex-wrap justify-between gap-2 my-2">
                                <div>
                                    <span className="rounded-full bg-gray-100 p-1 text-[12px] text-gray-700 dark:bg-gray-700 dark:text-white/80 sm:text-[13px] md:text-[14px] lg:text-[15px]">
                                        {viewablePost?.added_at} {viewablePost?.created_at_time}
                                    </span>

                                    {viewablePost?.location_name && (
                                        <span className="rounded-full bg-gray-100 p-1 text-[12px] text-gray-700 dark:bg-gray-700 dark:text-white/80 sm:text-[13px] md:text-[14px] lg:text-[15px]">
                                            {viewablePost?.location_name}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    {showDetails && (
                                        <div className="flex items-center gap-2 cursor-pointer">
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
                                                    className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-5 md:size-5 lg:size-6"
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
                                                        className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-5 md:size-5 lg:size-6"
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
                                                    className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-5 md:size-5 lg:size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div> */}

            {/* {mediaItems.length > 1 && (
                                <div
                                    className="mt-3 flex max-w-[100vw] gap-2 overflow-x-auto px-2 scrollbar-none"
                                    ref={mediaMobileref}
                                >
                                    <div
                                        {...mediaMobileHandlers}
                                        className="flex gap-2 overflow-x-hidden scrollbar-none"
                                    >
                                        {mediaItems.map((item, idx) => (
                                            <button
                                                key={idx}
                                                ref={(el) => (mediaThumbRefs.current[idx] = el)}
                                                onClick={() => setSelectedMediaIndex(idx)}
                                                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all duration-200 ${
                                                    selectedMediaIndex === idx
                                                        ? 'border-blue-600 ring-2 ring-blue-400'
                                                        : 'border-gray-300 hover:border-gray-500'
                                                }`}
                                            >
                                                {item.type === 'image' ? (
                                                    <img
                                                        src={item.url}
                                                        alt={`Image ${idx}`}
                                                        className="object-cover w-full h-full"
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <img
                                                        src={videoThumbnail}
                                                        alt={`Video ${idx}`}
                                                        className="object-cover w-full h-full opacity-80"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )} */}

            {/* QR CODE */}
            {showQrCode && (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden scrollbar-none sm:p-6">
                        <div
                            className="fixed inset-0 backdrop-blur-[32px]"
                            onClick={() => setShowQrCode(false)}
                        ></div>

                        {/* Modal content */}
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="qrCodeTitle"
                            className={`relative z-10 max-h-screen w-full max-w-lg overflow-y-auto rounded-2xl ${isDesktopPostViewer ? 'bg-white dark:bg-gray-800' : 'bg-gray-950'} p-6 shadow-xl sm:p-8`}
                        >
                            <div className="flex justify-end mt-1">
                                <button onClick={() => setShowQrCode(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5 hover:text-black/80 dark:text-white/80 dark:hover:text-white sm:size-5 md:size-6 lg:size-7"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="text-center">
                                <h2
                                    id="qrCodeTitle"
                                    className="mb-2 text-[15px] font-semibold text-gray-900 dark:text-gray-100 sm:text-[11px] md:text-[12px] lg:text-[13px]"
                                >
                                    Scan QR Code
                                </h2>

                                <div className="flex items-center justify-center text-center">
                                    <QRCode
                                        className="sm:size-50 size-30 md:size-40 lg:size-60"
                                        value={generateURL(viewablePost)}
                                        viewBox="0 0 256 256"
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
