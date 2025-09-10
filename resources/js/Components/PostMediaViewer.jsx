import { useState, useMemo } from 'react';
import videoThumbnail from '../../../public/assets/images/video-thumb/general-video.png';

export default function PostMediaViewer({ viewablePost }) {
    const [selected, setSelected] = useState(0);

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

    if (mediaItems.length === 0) return null;

    return (
        <div className="w-full bg-gray-200 dark:bg-gray-900 md:w-1/2">
            {/* Big Viewer */}
            <div className="flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg bg-black/5 md:h-[70vh]">
                {mediaItems[selected].type === 'image' ? (
                    <img
                        src={mediaItems[selected].url}
                        alt={`Media ${selected}`}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <video
                        controls
                        src={mediaItems[selected].url}
                        className="object-contain w-full h-full"
                    />
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mx-5 mt-6 mb-5 overflow-x-auto">
                {mediaItems.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                            selected === idx ? 'border-blue-500' : 'border-transparent'
                        }`}
                    >
                        {item.type === 'image' ? (
                            <img
                                src={item.url}
                                alt={`Thumbnail ${idx}`}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="relative flex items-center justify-center w-full h-full bg-black">
                                <img
                                    src={videoThumbnail}
                                    alt={`Video thumbnail ${idx}`}
                                    className="object-cover w-full h-full opacity-80"
                                />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
