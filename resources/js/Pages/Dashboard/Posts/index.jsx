import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';

export default function index({ posts }) {
    // Bulk Delete Form Data
    const { props } = usePage();
    const {
        data: BulkselectedIds,
        setData: setBulkSelectedIds,
        delete: BulkDelete,
        reset: resetBulkSelectedIds,
    } = useForm({
        ids: [],
    });

    // Single Delete Form Data
    const {
        data: SingleSelectedId,
        setData: setSingleSelectedId,
        delete: SingleDelete,
        reset: resetSingleSelectedId,
    } = useForm({
        id: null,
    });

    const [columns, setColumns] = useState([]);
    const [actions, setActions] = useState([]);
    useEffect(() => {
        const columns = [
            { key: 'title', label: 'Post Title' },
            { key: 'location_name', label: 'Location Name' },
            { key: 'floor', label: 'Floor' },
            { key: 'tag', label: 'Tag' },
            {
                label: 'Post Type',
                render: (item) => {
                    return (
                        <span className="p-2 text-white bg-blue-500 rounded-lg">
                            {item.post_type.charAt(0).toUpperCase() +
                                item.post_type.slice(1).toLowerCase()}
                        </span>
                    );
                },
            },

            {
                label: 'Status',
                render: (item) => {
                    if (item.status === 1) {
                        return (
                            <span className="p-3 text-white bg-green-500 rounded-lg">Active</span>
                        );
                    } else {
                        return (
                            <span className="p-2 text-white bg-red-500 rounded-lg">In Active</span>
                        );
                    }
                },
            },

            { key: 'added_at', label: 'Added At' },
        ];

        const customActions = [
            {
                label: 'Edit',
                type: 'link',
                href: (item) => route('dashboard.posts.edit', item.slug),
            },
        ];

        setActions(customActions);
        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Posts" />

                <BreadCrumb
                    header={'Posts'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Posts'}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={'Create Post'}
                                    URL={route('dashboard.posts.create')}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 4.5v15m7.5-7.5h-15"
                                            />
                                        </svg>
                                    }
                                />
                            </div>

                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={BulkDelete}
                                SingleDeleteMethod={SingleDelete}
                                BulkDeleteRoute={'dashboard.posts.destroybyselection'}
                                SingleDeleteRoute={'dashboard.posts.destroy'}
                                SearchRoute={'dashboard.posts.index'}
                                Search={false}
                                items={posts}
                                props={props}
                                columns={columns}
                                customActions={actions}
                            />
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    );
}
