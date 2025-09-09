import Preloader from '@/Components/Preloader';
import Footer from '@/partials/Website/Footer';
import Header from '@/partials/Website/Header';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { ToastContainer, Bounce, toast } from 'react-toastify';

export default function MainLayout({ children }) {
    const { asset, generalSetting, flash } = usePage().props;

    // Application Logo Sate With Default Images
    const [ApplicationLogoLight, setApplicationLogoLight] = useState(
        asset + 'assets/images/Logo/256b.png',
    );
    const [ApplicationLogoDark, setApplicationLogoDark] = useState(
        asset + 'assets/images/Logo/256w.png',
    );

    // For Updating Application Logo
    useEffect(() => {
        // Assigning Application logos
        if (generalSetting?.app_main_logo_light) {
            setApplicationLogoLight(generalSetting.app_main_logo_light);
        }

        if (generalSetting?.app_main_logo_dark) {
            setApplicationLogoDark(generalSetting.app_main_logo_dark);
        }
    }, []);

    // Managing SidebarToggle State
    const [sidebarToggle, setSidebarToggle] = useState(() => {
        const saved = localStorage.getItem('sidebarToggle');
        if (saved === null) {
            return false;
        }
        try {
            const parsed = JSON.parse(saved);
            if (typeof parsed === 'boolean') {
                return parsed;
            }
            localStorage.removeItem('sidebarToggle');
            return false;
        } catch (error) {
            localStorage.removeItem('sidebarToggle');
            return false;
        }
    });

    // Managing Loader State
    const [loaded, setLoaded] = useState(true);

    // Managing Dark Mode State
    const [darkMode, setDarkMode] = useState(false);

    const notify = (type, message) => {
        toast[type](message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

            transition: Bounce,
        });
    };

    useEffect(() => {
        if (flash.success) {
            notify('success', flash.success);
        }
        if (flash.error) {
            notify('error', flash.error);
        }
        if (flash.info) {
            notify('info', flash.info);
        }
    }, [flash]);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-slate-100 scrollbar-thin dark:bg-gray-900">
                <Preloader loaded={loaded} setLoaded={setLoaded} />

                <ToastContainer
                    position={'bottom-center'}
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={'colored'}
                    transition={Bounce}
                />

                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    ApplicationLogoDark={ApplicationLogoDark}
                    ApplicationLogoLight={ApplicationLogoLight}
                    ApplicationName={generalSetting?.app_name}
                />

                <main className="flex-1 mb-10 overflow-y-auto">{children}</main>

                <div className="hidden lg:block">
                    <Footer
                        ApplicationLogoDark={ApplicationLogoDark}
                        ApplicationLogoLight={ApplicationLogoLight}
                        ApplicationName={generalSetting?.app_name}
                    />
                </div>
            </div>
        </>
    );
}
