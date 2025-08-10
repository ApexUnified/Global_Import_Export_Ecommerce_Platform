import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';

export default function index({ collaborators }) {
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
            { key: 'user.name', label: 'Collaborator Name' },
            { key: 'user.email', label: 'Collaborator Email' },
            { key: 'user.phone', label: 'Collaborator Phone' },
            {
                key: 'type',
                label: 'Collaborator Company',
                badge: (value) => 'rounded-lg bg-blue-500 p-2 text-white',
            },
            {
                key: 'referral_code',
                label: 'Collaborator Referral Code',
                badge: (value) => 'rounded-lg bg-blue-500 p-2 text-white',
            },

            {
                label: 'Collaborator Status',
                render: (item) => {
                    if (item.user.is_active != 1) {
                        return (
                            <span className="rounded-lg bg-red-500 p-2 text-white">In-Active</span>
                        );
                    }

                    return <span className="rounded-lg bg-green-500 p-2 text-white">Active</span>;
                },
            },
            { key: 'added_at', label: 'Added At' },
        ];

        const customActions = [
            {
                label: 'View',
                type: 'link',
                href: (item) => route('dashboard.collaborators.show', item?.id),
            },
        ];

        setActions(customActions);
        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Collaborators" />

                <BreadCrumb
                    header={'Collaborators'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Collaborators'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Create Collaborator'}
                                    URL={route('dashboard.collaborators.create')}
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
                                BulkDeleteRoute={'dashboard.collaborators.destroybyselection'}
                                SingleDeleteRoute={'dashboard.collaborators.destroy'}
                                EditRoute={'dashboard.collaborators.edit'}
                                SearchRoute={'dashboard.collaborators.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={collaborators}
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
