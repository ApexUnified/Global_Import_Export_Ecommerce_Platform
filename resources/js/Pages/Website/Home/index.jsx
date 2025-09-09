import MainLayout from '@/Layouts/Website/MainLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function index() {
    return (
        <MainLayout>
            <Head title="Home" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white/80 sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white/80">
                            Hey Welcome..!
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
