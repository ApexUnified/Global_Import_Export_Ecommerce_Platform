import { useState, useMemo, useEffect, useRef } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';

export default function PostMediaViewer({ viewablePost, selectedMediaIndex, onSelectMediaIndex }) {
    const selected = selectedMediaIndex ?? 0;

    const thumbRefs = useRef([]);
    const MediaRef = useRef(null);

    //  Cache for loaded URLs
    const loadedCache = useRef(new Set());

    const [loading, setLoading] = useState(true);

    // Combine images + videos into one array with type
    const mediaItems = useMemo(() => {
        const images =
            viewablePost?.images?.map((img) => ({
                type: 'image',
                url: img.url,
            })) || [];

        const videos =
            viewablePost?.videos?.map((vid) => ({
                type: 'video',
                url: vid.url,
            })) || [];

        return [...images, ...videos];
    }, [viewablePost]);

    // Changing Post Images On Mouse Wheel
    useEffect(() => {
        const mediaEl = MediaRef.current;
        if (!mediaEl) return;

        const handleWheel = (event) => {
            if (event.ctrlKey || event.metaKey) return;
            event.preventDefault();

            if (event.deltaY < 0) {
                onSelectMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
            } else {
                onSelectMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
            }
        };

        // attach directly to the container
        mediaEl.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            mediaEl.removeEventListener('wheel', handleWheel, { passive: false });
        };
    }, [mediaItems.length]);
    if (mediaItems.length === 0) return null;

    // Reset when post changes
    useEffect(() => {
        onSelectMediaIndex(0);
    }, [viewablePost]);

    useEffect(() => {
        const current = mediaItems[selected];
        if (!current) return;

        if (loadedCache.current.has(current.url)) {
            setLoading(false);
            return;
        }

        setLoading(true);

        if (current.type === 'image') {
            const img = new Image();
            img.src = current.url;

            if (img.complete) {
                setLoading(false);
                loadedCache.current.add(current.url);
            } else {
                img.onload = () => {
                    setLoading(false);
                    loadedCache.current.add(current.url);
                };
                img.onerror = () => setLoading(false);
            }
        } else {
            const video = document.createElement('video');
            video.src = current.url;
            video.preload = 'metadata';

            video.onloadeddata = () => {
                setLoading(false);
                loadedCache.current.add(current.url);
            };
            video.onerror = () => setLoading(false);
        }
    }, [mediaItems, selected]);

    // Auto-scroll to keep selected thumbnail in view
    useEffect(() => {
        if (thumbRefs.current[selected]) {
            thumbRefs.current[selected].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [selected]);

    return (
        <div className="h-[80%] w-full bg-gray-200 dark:bg-gray-900 lg:w-[50%]" ref={MediaRef}>
            {/* Big Viewer */}
            <div className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-black/5 lg:h-[70vh]">
                {mediaItems[selected]?.type === 'image' ? (
                    <div className="relative h-full w-full">
                        <img
                            src={mediaItems[selected]?.url}
                            alt={`Media ${selected}`}
                            className="h-full w-full object-contain"
                        />

                        {loading && (
                            <div className="absolute inset-0 animate-pulse bg-gray-300 blur-sm dark:bg-gray-700" />
                        )}
                    </div>
                ) : (
                    <div className="relative h-full w-full">
                        <video
                            controls
                            controlsList="nodownload "
                            src={mediaItems[selected]?.url}
                            className="h-full w-full object-contain"
                        />

                        {loading && (
                            <div className="absolute inset-0 animate-pulse bg-gray-300 blur-sm dark:bg-gray-700" />
                        )}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            <div className="hide-y-scrollbar flex flex-row gap-2 overflow-x-auto overflow-y-hidden border-gray-700 p-2 lg:overflow-y-auto lg:overflow-x-hidden">
                {mediaItems.map((item, idx) => (
                    <button
                        key={idx}
                        ref={(el) => (thumbRefs.current[idx] = el)}
                        onClick={() => onSelectMediaIndex(idx)}
                        className={`relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border-2 transition lg:h-20 lg:w-20 ${
                            selectedMediaIndex === idx
                                ? 'z-10 scale-105 border-blue-800 shadow-lg shadow-blue-500/50'
                                : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                        {item.type === 'image' ? (
                            <img
                                src={item.url}
                                alt={`Image ${idx}`}
                                className="flex h-full w-full items-center justify-center bg-gray-200 object-cover text-[5px] text-gray-700 dark:bg-gray-800 dark:text-white/80 lg:text-[10px]"
                                loading="lazy"
                            />
                        ) : (
                            <div className="relative flex h-full w-full items-center justify-center bg-black">
                                <img
                                    src={videoThumbnail}
                                    alt={`Video  ${idx}`}
                                    className="flex h-full w-full items-center justify-center bg-gray-200 object-cover text-[5px] text-gray-700 opacity-80 dark:bg-gray-800 dark:text-white/80 lg:text-[10px]"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
