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
                <div className="dark:bg-deepcharcoal fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white">
                    <div className="h-20 w-20 animate-spin rounded-full border-4 border-solid border-indigo-500 border-t-transparent"></div>
                </div>
            )}
        </>
    );
}
