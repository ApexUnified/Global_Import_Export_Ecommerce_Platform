import { useState, useMemo, useEffect, useRef } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';

export default function PostMediaViewer({ viewablePost }) {
    const [selected, setSelected] = useState(0);
    const thumbRefs = useRef([]);

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
        const handleWheel = (event) => {
            if (event.ctrlKey || event.metaKey) return;

            event.preventDefault();
            if (event.deltaY < 0) {
                setSelected((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
            } else {
                setSelected((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel, { passive: false });
        };
    }, [viewablePost]);

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

    if (mediaItems.length === 0) return null;

    return (
        <div className="w-full bg-gray-200 dark:bg-gray-900 lg:w-[70%]">
            {/* Big Viewer */}
            <div className="flex h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-black/5 lg:h-[70vh]">
                {mediaItems[selected].type === 'image' ? (
                    <img
                        src={mediaItems[selected].url}
                        alt={`Media ${selected}`}
                        className="h-full w-full object-contain"
                    />
                ) : (
                    <video
                        controls
                        src={mediaItems[selected].url}
                        className="h-full w-full object-contain"
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div className="mx-5 mb-5 mt-6 flex gap-2 overflow-x-auto lg:overflow-x-hidden">
                {mediaItems.map((item, idx) => (
                    <button
                        key={idx}
                        ref={(el) => (thumbRefs.current[idx] = el)}
                        onClick={() => setSelected(idx)}
                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                            selected === idx ? 'border-blue-500' : 'border-transparent'
                        }`}
                    >
                        {item.type === 'image' ? (
                            <img
                                src={item.url}
                                alt={`Thumbnail ${idx}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="relative flex h-full w-full items-center justify-center bg-black">
                                <img
                                    src={videoThumbnail}
                                    alt={`Video thumbnail ${idx}`}
                                    className="h-full w-full object-cover opacity-80"
                                />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
