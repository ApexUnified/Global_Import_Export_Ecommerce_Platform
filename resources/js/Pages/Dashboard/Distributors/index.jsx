import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';
import can from '@/Hooks/can';

export default function index({ distributors }) {
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
            {
                label: 'Distributor Name',
                render: (item) => {
                    return (
                        <Link
                            href={route('dashboard.distributors.show', item?.id)}
                            className="cursor-pointer text-blue-500 underline"
                        >
                            {item.user.name}
                        </Link>
                    );
                },
            },
            { key: 'user.email', label: 'Distributor Email' },
            { key: 'user.phone', label: 'Distributor Phone' },

            {
                label: 'Distributor Address',
                render: (item) => {
                    return (
                        <span className="w-[200px] text-wrap break-words">
                            {item.address ?? 'N/A'}
                        </span>
                    );
                },
            },

            {
                label: 'Commission Rate',
                render: (item) => {
                    if (item.commission_rate) {
                        return (
                            <span className="rounded-lg bg-blue-500 p-2 text-white">
                                {item.commission_rate}%
                            </span>
                        );
                    } else {
                        return 'Default';
                    }
                },
            },

            {
                key: 'bank_account_no',
                label: 'Distributor Bank Account No',
            },

            {
                label: 'Distributor Status',
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
                href: (item) => route('dashboard.distributors.show', item?.id),
            },
        ];

        setActions(customActions);
        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Distributors" />

                <BreadCrumb
                    header={'Distributors'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Distributors'}
                />

                <Card
                    Content={
                        <>
                            {can('Distributors Create') && (
                                <div className="my-3 flex flex-wrap justify-end">
                                    <LinkButton
                                        Text={'Create Distributor'}
                                        URL={route('dashboard.distributors.create')}
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
                            )}

                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={BulkDelete}
                                SingleDeleteMethod={SingleDelete}
                                BulkDeleteRoute={'dashboard.distributors.destroybyselection'}
                                SingleDeleteRoute={'dashboard.distributors.destroy'}
                                EditRoute={
                                    can('Distributors Edit') ? 'dashboard.distributors.edit' : null
                                }
                                SearchRoute={'dashboard.distributors.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={distributors}
                                props={props}
                                columns={columns}
                                customActions={actions}
                                DeleteAction={can('Distributors Delete')}
                                canSelect={can('Distributors Delete')}
                            />
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    );
}
