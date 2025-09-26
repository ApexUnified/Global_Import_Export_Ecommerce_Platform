import React, { useEffect } from 'react';

export default function Preloader({ loaded, setLoaded }) {
    useEffect(() => {
        if (loaded) {
            const timeout = setTimeout(() => {
                setLoaded(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, []);

    return (
        <>
            {loaded && (
                <div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white dark:bg-gray-900">
                    <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
                </div>
            )}
        </>
    );
}
