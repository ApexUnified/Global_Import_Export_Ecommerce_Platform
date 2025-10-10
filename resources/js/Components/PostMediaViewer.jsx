import { useState, useMemo, useEffect, useRef } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';
import { useSwipeable } from 'react-swipeable';
import useWindowSize from '@/Hooks/useWindowSize';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from './VideoPlayer';

export default function PostMediaViewer({
    viewablePost,
    selectedMediaIndex,
    onSelectMediaIndex,
    setMediaItems,
    mediaThumbRefs,
}) {
    const selected = selectedMediaIndex ?? 0;

    const MediaRef = useRef(null);

    // Cache for loaded URLs
    const loadedCache = useRef(new Set());

    const windowSize = useWindowSize();

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
                onSelectMediaIndex((prev) => (prev === 0 ? 0 : prev - 1));
            } else {
                onSelectMediaIndex((prev) => (prev === mediaItems.length - 1 ? prev : prev + 1));
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

    // Auto-scroll thumbnails
    useEffect(() => {
        if (mediaThumbRefs.current[selected]) {
            mediaThumbRefs.current[selected].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [selected]);

    const [direction, setDirection] = useState(0);

    useEffect(() => {
        setDirection(1);
    }, [selected]);

    // Preload
    useEffect(() => {
        const preload = (item) => {
            if (!item || loadedCache.current.has(item.url)) return;
            if (item.type === 'image') {
                const img = new Image();
                img.src = item.url;
                img.onload = () => loadedCache.current.add(item.url);
            } else {
                const video = document.createElement('video');
                video.src = item.url;
                video.preload = 'auto';
                video.oncanplaythrough = () => loadedCache.current.add(item.url);
            }
        };

        // preload current, next, and prev
        preload(mediaItems[selected]);
        preload(mediaItems[selected + 1]);
        preload(mediaItems[selected - 1]);
    }, [selected, mediaItems]);

    // Swiper
    const handlers = useSwipeable({
        onSwipedLeft: (e) => {
            if (mediaItems.length > 1) {
                e.event.stopPropagation();
                setDirection(1);
                onSelectMediaIndex((prev) => (prev + 1) % mediaItems.length);
            }
        },

        onSwipedRight: (e) => {
            if (mediaItems.length > 1) {
                e.event.stopPropagation();
                setDirection(-1);
                onSelectMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
            }
        },
        trackTouch: true,
        trackMouse: true,
        preventScrollOnSwipe: true,
    });

    return (
        <>
            <div
                className="relative mx-auto mb-5 mt-5 flex flex-col items-center lg:mt-0"
                ref={MediaRef}
            >
                {/* Big Viewer */}
                <div
                    className="bg-deepcharcoal relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                    style={{
                        height: windowSize.width >= 1024 ? '70vh' : '60vh',
                        minWidth: windowSize.width >= 1024 ? '30vw' : '100%',
                        maxWidth: windowSize.width >= 1024 ? '30vw' : '100%',
                        width: '100%',
                        position: 'relative',
                    }}
                    {...handlers}
                >
                    <div className="invisible h-full w-full">
                        {mediaItems[selected]?.type === 'image' ? (
                            <img
                                src={mediaItems[selected]?.url}
                                alt={`Media ${selected}`}
                                className="h-full w-full min-w-[300px] max-w-[300px] object-contain lg:min-w-[500px]"
                                loading="lazy"
                            />
                        ) : (
                            <video
                                src={mediaItems[selected]?.url}
                                className="h-full w-full min-w-[300px] max-w-[300px] rounded-xl object-contain lg:min-w-[500px]"
                            />
                        )}
                    </div>
                    {/* Animated layers */}
                    <AnimatePresence initial={false} custom={direction}>
                        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
                            {mediaItems.map((item, idx) => (
                                <motion.div
                                    key={item.url}
                                    initial={false}
                                    animate={{
                                        opacity: idx === selected ? 1 : 0,
                                        zIndex: idx === selected ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="absolute inset-0 flex h-full w-full items-center justify-center"
                                >
                                    {item.type === 'image' ? (
                                        <img
                                            src={item.url}
                                            alt={`Media ${idx}`}
                                            className="h-full w-full rounded-xl object-contain"
                                            onLoad={() => loadedCache.current.add(item.url)}
                                        />
                                    ) : (
                                        // <video
                                        //     src={item.url}
                                        //     controls
                                        //     preload="auto"
                                        //     className="object-contain w-full h-full rounded-xl"
                                        // />

                                        <VideoPlayer
                                            key={selectedMediaIndex}
                                            videoUrl={item.url}
                                            thumbnail={videoThumbnail}
                                            className="h-full w-full rounded-xl object-contain"
                                            fullscreen={true}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>

                {/* Thumbnails */}
                {windowSize.width > 1024 && mediaItems.length > 1 && (
                    <div className="mt-3 flex max-w-[28vw] gap-2 overflow-x-hidden px-2 scrollbar-none">
                        {mediaItems.map((item, idx) => (
                            <button
                                key={idx}
                                ref={(el) => (mediaThumbRefs.current[idx] = el)}
                                onClick={() => onSelectMediaIndex(idx)}
                                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all duration-200 ${
                                    selectedMediaIndex === idx
                                        ? 'border-indigo-600 ring-2 ring-indigo-400'
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
        </>
    );
}
