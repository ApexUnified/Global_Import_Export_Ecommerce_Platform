import { useState, useMemo, useEffect, useRef } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';
import { useSwipeable } from 'react-swipeable';
import useWindowSize from '@/Hooks/useWindowSize';

export default function PostMediaViewer({
    viewablePost,
    selectedMediaIndex,
    onSelectMediaIndex,
    setMediaItems,
    thumbRefs,
}) {
    const selected = selectedMediaIndex ?? 0;

    const MediaRef = useRef(null);

    // Cache for loaded URLs
    const loadedCache = useRef(new Set());

    const [loading, setLoading] = useState(true);
    const windowSize = useWindowSize();

    // Swiper
    const handlers = useSwipeable({
        onSwipedLeft: () =>
            onSelectMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1)),
        onSwipedRight: () =>
            onSelectMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1)),

        delta: 10,
        velocity: 0.2,
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: false,
    });

    // Combine images + videos into one array
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

    // Mouse wheel navigation
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

        setMediaItems(mediaItems);

        mediaEl.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            mediaEl.removeEventListener('wheel', handleWheel, { passive: false });
        };
    }, [mediaItems.length]);

    if (mediaItems.length === 0) return null;

    // Reset on post change
    useEffect(() => {
        onSelectMediaIndex(0);
    }, [viewablePost]);

    // Preload
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

    // Auto-scroll thumbnails
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
        <div
            className="relative mx-auto mb-5 mt-5 flex flex-col items-center justify-center lg:mt-0 lg:items-start lg:justify-start"
            ref={MediaRef}
        >
            {/* Big Viewer */}
            <div
                className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-black"
                style={{
                    height: windowSize.width >= 1024 ? '70vh' : '60vh',
                    maxWidth: windowSize.width >= 1024 ? '50vw' : '100%', // limit width on large screens
                    width: '100%',
                }}
                {...handlers}
            >
                {mediaItems[selected]?.type === 'image' ? (
                    <img
                        src={mediaItems[selected]?.url}
                        alt={`Media ${selected}`}
                        className="h-full w-full object-contain transition-all duration-300"
                    />
                ) : (
                    <video
                        controls
                        src={mediaItems[selected]?.url}
                        className="h-full w-full rounded-xl object-contain transition-all duration-300"
                    />
                )}

                {loading && (
                    <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded-xl bg-gray-300 dark:bg-gray-700" />
                )}
            </div>

            {/* Thumbnails */}
            {windowSize.width > 1024 && mediaItems.length > 1 && (
                <div className="mt-3 flex max-w-[40vw] gap-2 overflow-x-auto px-2 scrollbar-none">
                    {mediaItems.map((item, idx) => (
                        <button
                            key={idx}
                            ref={(el) => (thumbRefs.current[idx] = el)}
                            onClick={() => onSelectMediaIndex(idx)}
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
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src={videoThumbnail}
                                    alt={`Video ${idx}`}
                                    className="h-full w-full object-cover opacity-80"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
