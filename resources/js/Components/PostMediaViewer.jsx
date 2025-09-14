import { useState, useMemo, useEffect, useRef } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';
import { useSwipeable } from 'react-swipeable';
import useWindowSize from '@/Hooks/useWindowSize';

export default function PostMediaViewer({ viewablePost, selectedMediaIndex, onSelectMediaIndex }) {
    const selected = selectedMediaIndex ?? 0;

    const thumbRefs = useRef([]);
    const MediaRef = useRef(null);

    //  Cache for loaded URLs
    const loadedCache = useRef(new Set());

    const [loading, setLoading] = useState(true);
    const windowSize = useWindowSize();

    // Swiper
    const handlers = useSwipeable({
        onSwipedLeft: () =>
            onSelectMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1)),
        onSwipedRight: () =>
            onSelectMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1)),
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: false,
    });

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
        <div
            className="relative mx-auto mt-5 flex flex-col items-center justify-center lg:mt-0 lg:items-start lg:justify-start"
            ref={MediaRef}
        >
            {/* Big Viewer */}
            <div
                className="relative flex items-center justify-center rounded-lg"
                style={{ maxHeight: '50vh' }}
                {...handlers}
            >
                {mediaItems[selected]?.type === 'image' ? (
                    <img
                        src={mediaItems[selected]?.url}
                        alt={`Media ${selected}`}
                        className="h-full max-h-[50vh] w-auto max-w-[50vw] rounded-2xl object-contain"
                    />
                ) : (
                    <video
                        controls
                        controlsList="nodownload"
                        src={mediaItems[selected]?.url}
                        className="h-full max-h-[50vh] min-h-[50vh] w-auto max-w-[50vw] rounded-2xl bg-gray-200 object-cover dark:bg-gray-900"
                    />
                )}

                {loading && (
                    <div className="absolute inset-0 animate-pulse rounded-2xl bg-gray-300 blur-sm dark:bg-gray-700" />
                )}
            </div>

            {/* Thumbnails */}
            {windowSize.width > 1024 && mediaItems.length > 1 && (
                <div className="mt-2 flex flex-row gap-2 overflow-x-auto p-2">
                    {mediaItems.map((item, idx) => (
                        <button
                            key={idx}
                            ref={(el) => (thumbRefs.current[idx] = el)}
                            onClick={() => onSelectMediaIndex(idx)}
                            className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                                selectedMediaIndex === idx
                                    ? 'z-10 scale-105 border-blue-800 shadow-lg shadow-blue-500/50'
                                    : 'border-transparent opacity-70 hover:opacity-100'
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
