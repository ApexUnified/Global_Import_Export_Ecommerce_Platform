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

import VideoPlayer from '@/Components/VideoPlayer';
import { createPortal } from 'react-dom';
import axios from 'axios';
import SearchDropdown from '@/Components/searchDropdown';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

export default function index() {
    const [isPostLoaded, setIsPostLoaded] = useState(false);
    const [posts, setPosts] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [postPreferences, setPostPreferences] = useState({
        text: true,
        videos: true,
        images: true,
    });

    const [prefsLoaded, setPrefsLoaded] = useState(false);
    const [isPrefChanged, setIsPrefChanged] = useState(false);

    useEffect(() => {
        const cookieValue = getCookie('post_preferences');
        if (cookieValue) {
            try {
                const parsed = JSON.parse(decodeURIComponent(cookieValue));
                setPostPreferences(parsed);
            } catch (e) {
                console.error('Failed to parse post_preferences cookie', e);
            }
        }

        setPrefsLoaded(true);
    }, []);

    const fetchPosts = () => {
        axios
            .get(route('website.posts.index'), {
                params: postPreferences,
            })
            .then((res) => {
                setPosts(res.data.posts);
                setNextPageUrl(res.data.next_page_url);
            })
            .finally(() => {
                setIsPostLoaded(true);
            });
    };

    useEffect(() => {
        if (!prefsLoaded) return;
        fetchPosts();
    }, [prefsLoaded]);

    const [viewablePost, setViewablePost] = useState('');

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

    // Tracking Post Viewer Width

    // Desktop Post Viewer
    const [isDesktopPostViewer, setIsDesktopPostViewer] = useState(false);

    // Mobile Post Viewer
    const [isMobilePostViewer, setIsMobilePostViewer] = useState(false);

    // Mobile Post Gallery
    const [isMobilePostGallery, setIsMobilePostGallery] = useState(false);

    // Filter Setting
    const [isPostFilterSetting, setIsPostFilterSetting] = useState(false);

    // useEffect(() => {
    //
    // },[]);

    // All Refs
    const thumbRefs = useRef([]);
    const mediaThumbRefs = useRef([]);
    const mediaMobileref = useRef(null);
    const mobilePostContainerRef = useRef(null);
    const elipsisDropDownRef = useRef(null);
    const elipsisButtonRef = useRef(null);
    const postsRefs = useRef([]);

    const generateURL = (post) => {
        return (
            `?slug=${post?.slug}&planet=earth${post?.latitude != null ? '&lat=' + post?.latitude : ''}` +
            `${post?.longitude != null ? '&lng=' + post?.longitude : ''}` +
            `${post?.location_name != null ? '&location_name=' + post?.location_name : ''}` +
            `&timestamp=${post?.created_at}` +
            `${post?.floor_id != null ? '&floor=' + post?.floor?.name : ''}`
        );
    };

    // For Now Not Needed
    // const openFullscreen = () => {
    //     const elem = document.documentElement; // whole page
    //     if (elem.requestFullscreen) {
    //         elem.requestFullscreen();
    //     } else if (elem.webkitRequestFullscreen) {
    //         // Safari
    //         elem.webkitRequestFullscreen();
    //     } else if (elem.msRequestFullscreen) {
    //         // older IE/Edge
    //         elem.msRequestFullscreen();
    //     }
    // };

    // const closeFullscreen = () => {
    //     if (document.exitFullscreen) {
    //         document.exitFullscreen();
    //     } else if (document.webkitExitFullscreen) {
    //         document.webkitExitFullscreen();
    //     } else if (document.msExitFullscreen) {
    //         document.msExitFullscreen();
    //     }
    // };

    // Auto Select Post From Mobile Post Container Logic

    const scrollToPost = (post) => {
        const index = posts.findIndex((p) => p.id === post.id);
        if (index !== -1 && postsRefs.current[index]) {
            postsRefs.current[index].scrollIntoView({ block: 'start', behavior: 'instant' });
        }
    };

    // When mobile viewer opens
    useEffect(() => {
        if (isMobilePostViewer && viewablePost) {
            scrollToPost(viewablePost);
        }
    }, [isMobilePostViewer]);

    // When fullscreen toggles
    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
            scrollToPost(viewablePost);
        } else {
            if (viewablePost !== '') {
                setViewablePost('');
                setIsDesktopPostViewer(false);
                setIsMobilePostViewer(false);
                setIsMobilePostGallery(false);
                window.history.replaceState({}, '', window.location.pathname);
            }
        }
    };

    const setPostViewerBasedOnWidth = (windowSize) => {
        if (windowSize.width < 1024) {
            if (showQrCode) setShowQrCode(false);

            setIsDesktopPostViewer(false);
            setIsMobilePostViewer(true);
        }

        if (windowSize.width > 1024) {
            if (showQrCode) setShowQrCode(false);

            setIsMobilePostViewer(false);
            setIsDesktopPostViewer(true);
        }
    };

    useEffect(() => {
        if (viewablePost != '') setPostViewerBasedOnWidth(windowSize);
    }, [windowSize.width]);

    useEffect(() => {
        if (!posts || !isPostLoaded) return;

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
    }, [isPostLoaded, posts]);

    // Stopping Overflow Of Body When Modal is Open
    useEffect(() => {
        if (viewablePost !== '') {
            setSelectedMediaIndex(0);
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
            // if (document.fullscreenElement) closeFullscreen();
        }
        const handlePopState = () => {
            if (viewablePost !== '') {
                setViewablePost('');
                window.history.replaceState({}, '', window.location.pathname);
                // if (document.fullscreenElement) closeFullscreen();
                setIsDesktopPostViewer(false);
                setIsMobilePostViewer(false);
            }
        };

        window.addEventListener('popstate', handlePopState);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.body.classList.remove('overflow-hidden');
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [viewablePost]);

    // Fetch more posts
    const fetchMorePosts = async () => {
        if (!nextPageUrl) return;

        try {
            const params = new URLSearchParams(nextPageUrl.split('?')[1]);
            Object.entries(postPreferences).forEach(([key, value]) => {
                params.set(key, value);
            });

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
            const queryString = new URLSearchParams(postPreferences).toString();
            const res = await fetch(route('website.posts.getsingle', slug) + `?${queryString}`);
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

    // Mobile Post Elipsis Dropdown
    const [showElipsisDropdown, setElipsisShowDropdown] = useState(false);

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

    const handlePostPreferences = (type, value) => {
        if (postPreferences)
            setPostPreferences((prev) => {
                const updated = { ...prev, [type]: value };

                const allFalse = Object.values(updated).every((v) => v === false);

                if (allFalse) {
                    toast.info('Atleast One Filter Should Be Enabled');
                    return prev;
                }
                setIsPrefChanged(true);
                return updated;
            });
    };

    const [searchDropdown, setSearchDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const ApplyFilter = () => {
        document.cookie = `post_preferences=${JSON.stringify(postPreferences)};path=/;max-age=31536000;SameSite=Lax;`;
        setIsPostFilterSetting(false);
        window.history.replaceState({}, '', window.location.pathname);
        setSearchDropdown(false);
        setSearchQuery('');
        setViewablePost('');
        setIsDesktopPostViewer(false);
        setIsMobilePostViewer(false);
        setIsPostLoaded(false);
        setPosts(null);
        setNextPageUrl(null);
        fetchPosts();
        setIsPrefChanged(false);
    };

    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleKeyPress = (e) => {
            searchInputRef.current?.focus();
        };

        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);
    return (
        <MainLayout>
            <Head title="Posts" />

            {!isPostLoaded && (
                <div className="flex animate-pulse items-center justify-center gap-2 py-10 text-center text-gray-700 transition-all duration-100 dark:text-white/80">
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
                    Please Wait While We Load Posts...
                </div>
            )}

            {isPostLoaded && (
                <>
                    {/* Masonry Layout */}
                    <div className="pb-20 sm:pb-20">
                        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                            {/* Search Bar */}
                            {windowSize.width > 1024 && (
                                <div className="sticky top-0 z-[50] w-full bg-white/90 backdrop-blur-md transition-all duration-300 dark:bg-[#111827]/90">
                                    <div className="mx-auto py-2 sm:py-3">
                                        <div className="flex w-full items-center rounded-lg border border-gray-300 p-2 shadow-md focus-within:ring-2 focus-within:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:shadow-white/20 dark:focus-within:ring-white/80">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="ml-2 size-6 text-gray-500 dark:text-gray-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                />
                                            </svg>

                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="What happened...?"
                                                className="ml-2 flex-1 border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none focus:outline-none focus:ring-0 dark:text-gray-200"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    if (e.target.value.length > 0) {
                                                        setSearchDropdown(true);
                                                        setSearchQuery(e.target.value);
                                                    } else {
                                                        setSearchDropdown(false);
                                                        setSearchQuery('');
                                                    }
                                                }}
                                            />

                                            <button
                                                className="mr-2 rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                onClick={() => setIsPostFilterSetting(true)}
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
                                                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Search Dropdown */}
                                        <SearchDropdown
                                            searchDropdown={searchDropdown}
                                            setSearchDropdown={setSearchDropdown}
                                            setSearchQuery={setSearchQuery}
                                            searchQuery={searchQuery}
                                            postPreferences={postPreferences}
                                            page={'posts'}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Post Filter For Mobile */}
                            {windowSize.width < 1024 && (
                                <div className="mx-3 my-5 flex items-center justify-end">
                                    <button
                                        className="rounded-lg bg-white p-2 hover:bg-gray-300/20 dark:bg-gray-700 dark:text-white/80"
                                        onClick={() => setIsPostFilterSetting(true)}
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
                                                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Compact Masonry */}
                            <div className="columns-1 gap-1 [column-fill:_balance] min-[300px]:columns-2 lg:columns-4">
                                {posts.map((post, index) => {
                                    const url = generateURL(post);
                                    return (
                                        <article
                                            key={post?.id}
                                            className="group relative mb-1 cursor-pointer break-inside-avoid overflow-hidden rounded-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                            onClick={() => {
                                                setViewablePost(post);

                                                if (windowSize.width > 1024) {
                                                    setIsDesktopPostViewer(true);
                                                } else {
                                                    setIsMobilePostViewer(true);
                                                    // openFullscreen();
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
                                                        className="absolute right-3 top-3 text-white opacity-80 hover:opacity-100"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const url =
                                                                route('website.posts.index') +
                                                                generateURL(post);
                                                            navigator.clipboard.writeText(
                                                                url.trim(),
                                                            );

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
                                                            navigator.clipboard.writeText(
                                                                url.trim(),
                                                            );

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

                    {/* Desktop Post View Modal */}
                    {viewablePost != '' &&
                        isDesktopPostViewer &&
                        createPortal(
                            <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800">
                                <div
                                    className="fixed inset-0 backdrop-blur-[32px]"
                                    onClick={() => {
                                        setViewablePost('');
                                        window.history.replaceState(
                                            {},
                                            '',
                                            window.location.pathname,
                                        );
                                    }}
                                ></div>

                                {/* Modal content */}
                                <div className="relative z-10 h-screen overflow-hidden p-6 shadow-xl scrollbar-none sm:p-8 lg:overflow-y-auto">
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
                                                    <div className="mx-auto w-full space-y-4 p-2 md:px-10">
                                                        {/* Author Header */}
                                                        <div className="flex flex-wrap items-center justify-between space-x-3 space-y-4">
                                                            <div className="flex items-center">
                                                                <span className="text-[13px] font-semibold dark:text-white/80 sm:text-[16px] md:text-[17px] lg:text-[20px]">
                                                                    {viewablePost?.user?.name
                                                                        .length > 30
                                                                        ? viewablePost?.user?.name.substring(
                                                                              0,
                                                                              30,
                                                                          ) + '...'
                                                                        : viewablePost?.user?.name}
                                                                </span>
                                                            </div>

                                                            <div className="flex cursor-pointer items-center gap-2">
                                                                {/* QR Button */}
                                                                <button
                                                                    onClick={() =>
                                                                        setShowQrCode(true)
                                                                    }
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
                                                                                {
                                                                                    post_id:
                                                                                        viewablePost?.id,
                                                                                },
                                                                                {
                                                                                    onSuccess:
                                                                                        () => {
                                                                                            viewablePost.is_bookmarked =
                                                                                                !viewablePost.is_bookmarked;
                                                                                        },
                                                                                    onError: (e) =>
                                                                                        toast.error(
                                                                                            e.message,
                                                                                        ),
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
                                                                            route(
                                                                                'website.posts.index',
                                                                            ) +
                                                                            generateURL(
                                                                                viewablePost,
                                                                            );
                                                                        navigator.clipboard.writeText(
                                                                            url.trim(),
                                                                        );
                                                                        toast.success(
                                                                            'Copied to clipboard',
                                                                        );
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
                                                            <span className="rounded-full bg-gray-100 p-1 dark:bg-gray-700">
                                                                {viewablePost?.added_at}{' '}
                                                                {viewablePost?.created_at_time}
                                                            </span>

                                                            {viewablePost?.location_name && (
                                                                <span className="rounded-full bg-gray-100 p-1 dark:bg-gray-700">
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
                                                    window.history.replaceState(
                                                        {},
                                                        '',
                                                        generateURL(post),
                                                    );
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
                            </div>,
                            document.body,
                        )}

                    {/* Mobile Post View */}
                    {viewablePost !== '' &&
                        isMobilePostViewer &&
                        createPortal(
                            <>
                                <div className="fixed inset-0 z-50 bg-black">
                                    {/* Backdrop */}
                                    <div className="absolute inset-0 bg-black/70"></div>

                                    {/* Scrollable Container */}
                                    <div
                                        className="relative z-10 h-[100dvh] w-full snap-y snap-mandatory overflow-y-scroll scrollbar-none"
                                        onScroll={(e) => {
                                            setElipsisShowDropdown(false);
                                            const scrollTop = e.currentTarget.scrollTop;
                                            const index = Math.round(
                                                scrollTop / window.innerHeight,
                                            );

                                            if (index !== selectedPostIndex && posts[index]) {
                                                setSelectedPostIndex(index);

                                                const post = posts[index];
                                                setViewablePost(post);
                                                window.history.replaceState(
                                                    {},
                                                    '',
                                                    generateURL(post),
                                                );

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
                                                ref={(el) => (postsRefs.current[index] = el)}
                                                className="relative h-[100dvh] w-full snap-start overflow-hidden"
                                            >
                                                {/* Top Bar */}
                                                <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-black/50 px-4 py-3 text-white backdrop-blur-sm">
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
                                                        className="rounded-full p-1 hover:bg-gray-300/20"
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
                                                            className="rounded-full p-1 hover:bg-gray-300/20"
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
                                                        {showElipsisDropdown &&
                                                            isMobilePostViewer && (
                                                                <>
                                                                    <div
                                                                        ref={elipsisDropDownRef}
                                                                        data-elipsis-dropdown
                                                                        onClick={(e) =>
                                                                            e.stopPropagation()
                                                                        }
                                                                        className="absolute right-0 top-full z-[99999] mt-2 w-44 rounded-lg border border-gray-900 bg-black shadow-xl sm:w-48"
                                                                    >
                                                                        <ul
                                                                            className="overflow-y-scroll py-1 text-sm text-gray-200 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white"
                                                                            style={{
                                                                                maxHeight: '180px',
                                                                            }}
                                                                        >
                                                                            <li>
                                                                                <button
                                                                                    onClick={(
                                                                                        e,
                                                                                    ) => {
                                                                                        setShowQrCode(
                                                                                            true,
                                                                                        );
                                                                                        setElipsisShowDropdown(
                                                                                            false,
                                                                                        );
                                                                                    }}
                                                                                    className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
                                                                                >
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth={
                                                                                            1.5
                                                                                        }
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
                                                                                        className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
                                                                                        onClick={(
                                                                                            e,
                                                                                        ) => {
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
                                                                                                    onSuccess:
                                                                                                        () => {
                                                                                                            viewablePost.is_bookmarked =
                                                                                                                !viewablePost.is_bookmarked;
                                                                                                        },
                                                                                                    onError:
                                                                                                        (
                                                                                                            e,
                                                                                                        ) => {
                                                                                                            toast.error(
                                                                                                                e.message,
                                                                                                            );
                                                                                                        },

                                                                                                    onFinish:
                                                                                                        () => {
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
                                                                                            strokeWidth={
                                                                                                1.5
                                                                                            }
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
                                                                                    className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
                                                                                    onClick={(
                                                                                        e,
                                                                                    ) => {
                                                                                        const url =
                                                                                            route(
                                                                                                'website.posts.index',
                                                                                            ) +
                                                                                            generateURL(
                                                                                                viewablePost,
                                                                                            );
                                                                                        navigator.clipboard.writeText(
                                                                                            url.trim(),
                                                                                        );

                                                                                        toast.success(
                                                                                            'Copied to clipboard',
                                                                                        );

                                                                                        setElipsisShowDropdown(
                                                                                            false,
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth={
                                                                                            1.5
                                                                                        }
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
                                                        <button
                                                            className="rounded-full p-1 hover:bg-gray-300/20"
                                                            onClick={() =>
                                                                setIsPostFilterSetting(true)
                                                            }
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
                                                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Media Viewer */}
                                                <div className="relative flex h-full w-full items-center justify-center text-white">
                                                    {/* Blurred Background */}
                                                    {Array.isArray(post.post_image_urls) &&
                                                    post.post_image_urls.length > 0 ? (
                                                        <>
                                                            <img
                                                                src={post.post_image_urls[0]}
                                                                alt="Post background blur"
                                                                className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
                                                            />
                                                            <img
                                                                src={post.post_image_urls[0]}
                                                                alt="Post main"
                                                                className="relative z-10 max-h-full max-w-full object-contain"
                                                            />
                                                        </>
                                                    ) : (
                                                        Array.isArray(post.post_video_urls) &&
                                                        post.post_video_urls.length > 0 && (
                                                            <>
                                                                <VideoPlayer
                                                                    videoUrl={
                                                                        post.post_video_urls[0]
                                                                    }
                                                                    thumbnail={videoThumbnail}
                                                                    className="relative z-10 max-h-full max-w-full object-contain"
                                                                />
                                                            </>
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
                                                    } left-0 z-[10] bg-gradient-to-t from-black/80 via-black/50 to-black/30 p-4`}
                                                >
                                                    {/* Username */}
                                                    <div className="mb-2 flex items-center space-x-2">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-gray-900">
                                                            {viewablePost.user?.avatar}
                                                        </div>
                                                        <span className="text-xs font-medium text-white/80">
                                                            {post.user?.name.length > 6
                                                                ? post.user?.name.substring(0, 6) +
                                                                  '...'
                                                                : post.user?.name}
                                                        </span>
                                                    </div>

                                                    {/* Content */}
                                                    {(Array.isArray(post.post_image_urls) &&
                                                        post.post_image_urls.length > 0) ||
                                                    (Array.isArray(post.post_video_urls) &&
                                                        post.post_video_urls.length > 0) ? (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: post?.content,
                                                            }}
                                                            className={`prose overflow-hidden break-words text-xs text-white/80 transition-all duration-100 ease-in-out [-webkit-box-orient:vertical] [display:-webkit-box] ${
                                                                showDetails
                                                                    ? '[-webkit-line-clamp:5]'
                                                                    : '[-webkit-line-clamp:3]'
                                                            }`}
                                                            onClick={() =>
                                                                setShowDetails(!showDetails)
                                                            }
                                                            style={{
                                                                maxHeight: showDetails
                                                                    ? '10rem'
                                                                    : '4rem',
                                                            }}
                                                        ></div>
                                                    ) : (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: post?.content,
                                                            }}
                                                            className={`prose overflow-hidden break-words text-xs text-white/80 transition-all duration-100 ease-in-out [-webkit-box-orient:vertical] [-webkit-line-clamp:5] [display:-webkit-box]`}
                                                        ></div>
                                                    )}

                                                    {/* Learn More Button */}
                                                    {showDetails && (
                                                        <div className="my-5 flex items-center justify-end">
                                                            <button
                                                                className="rounded-md bg-white p-1 text-[10px] font-semibold hover:bg-white/80"
                                                                onClick={() =>
                                                                    setIsMobilePostGallery(true)
                                                                }
                                                            >
                                                                Learn More
                                                            </button>
                                                        </div>
                                                    )}

                                                    {!showDetails &&
                                                        Array.isArray(post.post_image_urls) &&
                                                        post.post_image_urls.length < 1 &&
                                                        Array.isArray(post.post_video_urls) &&
                                                        post.post_video_urls.length < 1 && (
                                                            <div className="mt-2 flex items-center justify-end">
                                                                <button
                                                                    className="rounded-md bg-white p-1 text-[10px] font-semibold hover:bg-white/80"
                                                                    onClick={() =>
                                                                        setIsMobilePostGallery(true)
                                                                    }
                                                                >
                                                                    Learn More
                                                                </button>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>,
                            document.body,
                        )}

                    {/* Mobile Post Gallery */}
                    {isMobilePostGallery &&
                        isMobilePostViewer &&
                        createPortal(
                            <>
                                <div className="fixed inset-0 z-50 bg-black">
                                    {/* Elipsis Dropdown Menu */}
                                    {showElipsisDropdown && isMobilePostViewer && (
                                        <>
                                            <div
                                                ref={elipsisDropDownRef}
                                                data-elipsis-dropdown
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute right-0 top-12 z-[9999] mt-2 w-44 rounded-lg border border-gray-900 bg-black shadow-xl sm:w-48"
                                            >
                                                <ul
                                                    className="overflow-y-scroll py-1 text-sm text-gray-200 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white"
                                                    style={{ maxHeight: '180px' }}
                                                >
                                                    <li>
                                                        <button
                                                            onClick={(e) => {
                                                                setShowQrCode(true);
                                                                setElipsisShowDropdown(false);
                                                            }}
                                                            className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
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
                                                                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
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
                                                                        viewablePost?.is_bookmarked
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
                                                            className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-950 hover:text-white"
                                                            onClick={(e) => {
                                                                const url =
                                                                    route('website.posts.index') +
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

                                    {/* Backdrop */}
                                    <div className="absolute inset-0 bg-black/70"></div>

                                    <div className="relative z-10 flex h-[100dvh] w-full flex-col bg-black text-white">
                                        {/* Top Bar */}
                                        <div className="flex items-center justify-between bg-black/50 px-4 py-3 backdrop-blur-sm">
                                            {/* Left side */}
                                            <div className="flex items-center space-x-2">
                                                {/* Close */}
                                                <button
                                                    onClick={() => setIsMobilePostGallery(false)}
                                                    className="rounded-full p-1 hover:bg-gray-300/20"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18 18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Right side */}

                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs text-gray-900">
                                                        {viewablePost.user?.avatar}
                                                    </div>
                                                    <span className="text-xs font-medium text-white/80">
                                                        {viewablePost.user?.name.length > 6
                                                            ? viewablePost.user?.name.substring(
                                                                  0,
                                                                  6,
                                                              ) + '...'
                                                            : viewablePost.user?.name}
                                                    </span>
                                                </div>

                                                {/* Ellipsis */}
                                                <button
                                                    className="rounded-full p-1 hover:bg-gray-300/20"
                                                    ref={elipsisButtonRef}
                                                    data-elipsis-button
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="h-6 w-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Media Section (fixed height) */}
                                        {mediaItems.length > 0 && (
                                            <div className="relative h-[60vh] w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-none">
                                                <div className="flex h-full w-full">
                                                    {mediaItems?.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="relative flex h-full w-full flex-shrink-0 snap-center snap-always items-center justify-center text-white"
                                                        >
                                                            {item.type === 'image' ? (
                                                                <>
                                                                    <img
                                                                        src={item.url}
                                                                        alt="Post background blur"
                                                                        className="absolute inset-0 z-0 h-full w-full scale-110 object-cover blur-lg"
                                                                    />
                                                                    <img
                                                                        src={item.url}
                                                                        alt={`Media ${idx}`}
                                                                        className="relative z-10 max-h-full max-w-full rounded-xl object-contain"
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {/* <img
                                                    src={videoThumbnail}
                                                    alt="Post background blur"
                                                    className="absolute inset-0 z-0 object-cover w-full h-full scale-110 blur-lg"
                                                /> */}

                                                                    <VideoPlayer
                                                                        key={idx}
                                                                        videoUrl={item.url}
                                                                        thumbnail={videoThumbnail}
                                                                        className="relative z-10 max-h-full max-w-full rounded-xl object-contain"
                                                                        fullscreen={true}
                                                                    />
                                                                </>
                                                            )}

                                                            <div className="absolute bottom-3 right-3 z-[9999] rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                                                                {idx + 1} / {mediaItems.length}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Scrollable Bottom Section */}
                                        <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-none">
                                            <h2 className="text-sm font-semibold">
                                                {viewablePost?.title || 'Post Title'}
                                            </h2>

                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: viewablePost?.content,
                                                }}
                                                className="prose break-words text-xs text-white/80"
                                            ></div>

                                            {/* Tags */}
                                            {viewablePost?.tag && (
                                                <div className="flex flex-wrap gap-2 text-[11px] text-blue-400">
                                                    {viewablePost?.tag}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3">
                                                {/* Location */}
                                                {viewablePost?.location_name && (
                                                    <span className="rounded-full bg-gray-900 px-2 py-1 text-[10px]">
                                                        {viewablePost?.location_name}
                                                    </span>
                                                )}

                                                <span className="w-38 rounded-full bg-gray-900 px-2 py-1 text-[10px]">
                                                    {viewablePost?.added_at +
                                                        ' ' +
                                                        viewablePost?.created_at_time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>,
                            document.body,
                        )}

                    {/* Post Filter Setting */}
                    {isPostFilterSetting && (
                        <>
                            {createPortal(
                                windowSize.width > 1024 ? (
                                    //  PC VERSION
                                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                                            onClick={() => setIsPostFilterSetting(false)}
                                        />

                                        {/* Modal Card */}
                                        <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:text-white/80">
                                            {/* Header */}
                                            <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
                                                <h2 className="text-lg font-semibold">
                                                    Filter Setting
                                                </h2>
                                                <button
                                                    onClick={() => setIsPostFilterSetting(false)}
                                                    className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="mt-4 space-y-6">
                                                {/* Location */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">
                                                        Show content near current location
                                                    </span>
                                                    <label className="relative inline-flex cursor-pointer items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="peer sr-only"
                                                            defaultChecked
                                                        />
                                                        <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                    </label>
                                                </div>

                                                {/* Filters */}
                                                <div>
                                                    <h3 className="mb-3 text-sm font-medium text-gray-500">
                                                        Filters
                                                    </h3>
                                                    <div className="space-y-5">
                                                        {/* Text */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Text</span>
                                                            <label className="relative inline-flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer sr-only"
                                                                    checked={postPreferences.text}
                                                                    onChange={(e) =>
                                                                        handlePostPreferences(
                                                                            'text',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                            </label>
                                                        </div>

                                                        {/* Images */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Images</span>
                                                            <label className="relative inline-flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer sr-only"
                                                                    checked={postPreferences.images}
                                                                    onChange={(e) =>
                                                                        handlePostPreferences(
                                                                            'images',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                            </label>
                                                        </div>

                                                        {/* Videos */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Videos</span>
                                                            <label className="relative inline-flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer sr-only"
                                                                    checked={postPreferences.videos}
                                                                    onChange={(e) =>
                                                                        handlePostPreferences(
                                                                            'videos',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {isPrefChanged && (
                                                        <div className="flex items-center justify-center">
                                                            <button
                                                                type="submit"
                                                                className="mt-5 flex w-[200px] items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-500/80"
                                                                onClick={() => ApplyFilter()}
                                                            >
                                                                Apply Filter
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    //  MOBILE VERSION
                                    <div className="fixed inset-0 z-50 bg-black">
                                        {/* Backdrop */}
                                        <div className="absolute inset-0 bg-black/70"></div>

                                        {/* Fullscreen slide-over */}
                                        <div className="relative z-10 flex h-[100dvh] w-full flex-col bg-white text-black dark:bg-gray-900 dark:text-white/80">
                                            {/* Top Bar */}
                                            <div className="relative flex items-center border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                                                <button
                                                    onClick={() => setIsPostFilterSetting(false)}
                                                    className="absolute left-4 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                                                            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                                        />
                                                    </svg>
                                                </button>

                                                <h2 className="mx-auto text-base font-semibold">
                                                    Filter Setting
                                                </h2>
                                            </div>

                                            {/* Content */}
                                            <div className="my-4 flex-1 space-y-6 p-4">
                                                {/* Location Section */}
                                                <div className="space-y-4">
                                                    {/* Show content near current location */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm">
                                                            Show content near current location
                                                        </span>
                                                        <label className="relative inline-flex cursor-pointer items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="peer sr-only"
                                                                defaultChecked
                                                            />
                                                            <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Feed Settings */}
                                                <div>
                                                    <h3 className="mb-3 text-sm font-medium text-gray-500">
                                                        Filters
                                                    </h3>
                                                    <div className="space-y-5">
                                                        {/* Text */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Text</span>
                                                            <label className="relative inline-flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer sr-only"
                                                                    checked={postPreferences.text}
                                                                    onChange={(e) =>
                                                                        handlePostPreferences(
                                                                            'text',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                            </label>
                                                        </div>

                                                        {/* Images */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Images</span>
                                                            <label className="relative inline-flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer sr-only"
                                                                    checked={postPreferences.images}
                                                                    onChange={(e) =>
                                                                        handlePostPreferences(
                                                                            'images',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                            </label>
                                                        </div>

                                                        {/* Videos */}
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">Videos</span>
                                                            <label className="relative inline-flex cursor-pointer items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="peer sr-only"
                                                                    checked={postPreferences.videos}
                                                                    onChange={(e) =>
                                                                        handlePostPreferences(
                                                                            'videos',
                                                                            e.target.checked,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="peer h-5 w-9 rounded-full bg-gray-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-4"></div>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {isPrefChanged && (
                                                        <div className="flex items-center justify-center">
                                                            <button
                                                                type="submit"
                                                                className="mt-5 flex w-[200px] items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500/80"
                                                                onClick={() => ApplyFilter()}
                                                            >
                                                                Apply Filter
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ),
                                document.body,
                            )}
                        </>
                    )}

                    {/* QR CODE */}
                    {showQrCode &&
                        createPortal(
                            <div className="fixed inset-0 z-[100] flex items-center justify-center">
                                {/* Overlay */}
                                <div
                                    className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                                    onClick={() => setShowQrCode(false)}
                                ></div>

                                {/* Modal */}
                                <div
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="qrCodeTitle"
                                    className={`relative z-[101] w-full max-w-sm rounded-2xl p-6 shadow-xl sm:max-w-md ${
                                        isDesktopPostViewer
                                            ? 'bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                                            : 'bg-gray-950 text-white/80'
                                    }`}
                                >
                                    <div className="flex justify-end">
                                        <button onClick={() => setShowQrCode(false)}>✕</button>
                                    </div>
                                    <div className="text-center">
                                        <h2
                                            id="qrCodeTitle"
                                            className="mb-3 text-base font-semibold"
                                        >
                                            Scan QR Code
                                        </h2>
                                        <div className="flex justify-center">
                                            <QRCode
                                                className="size-40 sm:size-52 md:size-60"
                                                value={generateURL(viewablePost)}
                                                viewBox="0 0 256 256"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>,
                            document.body,
                        )}
                </>
            )}
        </MainLayout>
    );
}
