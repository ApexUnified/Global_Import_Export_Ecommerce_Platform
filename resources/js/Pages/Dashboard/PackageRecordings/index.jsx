import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';
import can from '@/Hooks/can';

export default function index({ package_recordings }) {
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
            { key: 'order.customer.user.name', label: 'Customer Name' },
            {
                label: 'Order No.',
                render: (item) => {
                    return (
                        <Link
                            className="text-blue-500"
                            href={route('dashboard.orders.show', item?.order?.id)}
                        >
                            {item?.order?.order_no}
                        </Link>
                    );
                },
            },
            { key: 'opened_at', label: 'Opened At' },
            {
                label: 'Opened',
                render: (item) => {
                    if (item.is_opened != 1) {
                        return (
                            <span className="rounded-lg bg-red-500 p-2 text-white">
                                Not Opened Yet
                            </span>
                        );
                    }

                    return <span className="rounded-lg bg-green-500 p-2 text-white">Opened</span>;
                },
            },
            { key: 'added_at', label: 'Added At' },
        ];

        const customActions = [
            {
                label: 'View',
                type: 'link',
                href: (item) => route('dashboard.orders.show', item?.order?.id),
            },
        ];

        setActions(customActions);

        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Package Recordings" />

                <BreadCrumb
                    header={'Package Recordings'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Package Recordings'}
                />

                <Card
                    Content={
                        <>
                            {can('Package Recordings Create') && (
                                <div className="my-3 flex flex-wrap justify-end">
                                    <LinkButton
                                        Text={'Create Package Recording'}
                                        URL={route('dashboard.package-recordings.create')}
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
                                BulkDeleteRoute={'dashboard.package-recordings.destroybyselection'}
                                SingleDeleteRoute={'dashboard.package-recordings.destroy'}
                                SearchRoute={'dashboard.package-recordings.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={package_recordings}
                                DeleteAction={can('Package Recordings Delete')}
                                canSelect={can('Package Recordings Delete')}
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
