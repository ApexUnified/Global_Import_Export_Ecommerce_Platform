import React from 'react';
import { Head, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/Website/MainLayout';
import GlobalSearch from '@/Components/GlobalSearch';

const index = ({ floors, google_map_api_key }) => {
    return (
        <MainLayout>
            <Head title="Search" />

            <GlobalSearch
                floors={floors}
                google_map_api_key={google_map_api_key}
                additional_filters={true}
                OnPostFilterChange={(e) => {
                    router.reload();
                }}
            />
        </MainLayout>
    );
};

export default index;
