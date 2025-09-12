import React, { useRef, useEffect, useState } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';

export default function PostsGrid({
    posts,
    onSelect,
    nextPageUrl,
    fetchMorePosts,
    fetchSinglePost,
    selectedPostIndex,
    onSelectIndex,
}) {
    const loaderRef = useRef(null);
    const selected = selectedPostIndex ?? 0;
    const thumbRefs = useRef([]);
    const containerRef = useRef(null);

    // Find Post From Slug If Refreshed
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');

        if (slug) {
            const postIndex = posts.findIndex((p) => p.slug === slug);
            if (postIndex !== -1) {
                onSelectIndex(postIndex);
            } else {
                fetchSinglePost(slug);
            }
        }
    }, [posts, onSelectIndex, selected]);

    // Infinite scroll loader
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

    // Auto-scroll to keep selected thumbnail in view
    useEffect(() => {
        if (thumbRefs.current[selected]) {
            thumbRefs.current[selected].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [selected]);

    // Mouse wheel handler
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            if (e.ctrlKey || e.metaKey) return;
            e.preventDefault();

            let nextIndex;
            if (e.deltaY > 0) {
                nextIndex = selectedPostIndex === posts.length - 1 ? 0 : selectedPostIndex + 1;
            } else {
                nextIndex = selectedPostIndex === 0 ? posts.length - 1 : selectedPostIndex - 1;
            }

            // console.log(nextIndex);
            // console.log(posts.length);

            onSelectIndex(nextIndex);

            if (posts[nextIndex]) {
                onSelect(posts[nextIndex]);
            }

            if (nextIndex >= posts.length - 2 && nextPageUrl) {
                fetchMorePosts();
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [posts.length, nextPageUrl, fetchMorePosts]);

    return (
        <div
            className={`${
                (Array.isArray(posts[selected]?.post_video_urls) &&
                    posts[selected].post_video_urls.length > 0) ||
                (Array.isArray(posts[selected]?.post_image_urls) &&
                    posts[selected].post_image_urls.length > 0)
                    ? 'lg:h-[85vh]'
                    : 'lg:h-[60vh]'
            } overflow-hidden`}
        >
            <div
                ref={containerRef}
                className="hide-y-scrollbar flex flex-row gap-2 overflow-x-auto overflow-y-hidden border-gray-700 p-2 lg:w-28 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden"
            >
                {posts.map((post, idx) => (
                    <button
                        key={post.id}
                        ref={(el) => (thumbRefs.current[idx] = el)}
                        onClick={() => {
                            onSelectIndex(idx);
                            onSelect(post);
                        }}
                        className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border-2 text-xs transition lg:h-20 lg:w-20 ${
                            selected === idx
                                ? 'z-10 scale-105 border-blue-800 shadow-lg shadow-blue-500/50'
                                : 'border-gray-700 border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                        {post.images?.length > 0 ? (
                            <img
                                src={post.images[0].url}
                                alt={
                                    post.title.length > 20
                                        ? post.title.slice(0, 20) + '...'
                                        : post.title
                                }
                                loading="lazy"
                                className="h-full w-full object-cover text-[5px] text-gray-700 dark:text-white/80 lg:text-[10px]"
                            />
                        ) : post.videos?.length > 0 ? (
                            <img
                                src={videoThumbnail}
                                alt={
                                    post.title.length > 20
                                        ? post.title.slice(0, 20) + '...'
                                        : post.title
                                }
                                loading="lazy"
                                className="h-full w-full object-cover text-[5px] text-gray-700 dark:text-white/80 lg:text-[10px]"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-[5px] text-gray-700 dark:bg-gray-800 dark:text-white/80 lg:text-[10px]">
                                {post.title.length > 20
                                    ? post.title.slice(0, 20) + '...'
                                    : post.title}
                            </div>
                        )}
                    </button>
                ))}

                {/* Loader */}
                {nextPageUrl && (
                    <div
                        ref={loaderRef}
                        className="flex animate-pulse items-center justify-center py-6 text-xs text-gray-500 dark:text-white/60"
                    >
                        Loading more...
                    </div>
                )}
            </div>
        </div>
    );
}
