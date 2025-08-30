import Card from '@/Components/Card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';

export default function index({ supplier_commissions }) {
    // Bulk Delete Form Data
    const { props } = usePage();
    const { currency } = usePage().props;
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
                label: 'Supplier Name',
                render: (item) => {
                    return (
                        <Link
                            className="text-blue-500 underline"
                            href={route('dashboard.suppliers.show', item.supplier?.id)}
                        >
                            {item.supplier?.user?.name}
                        </Link>
                    );
                },
            },
            {
                key: 'order.order_no',
                label: 'Order No.',
            },

            {
                label: 'Commission Rate',
                render: (item) => {
                    return (
                        <span className="rounded-lg bg-blue-500 p-2 text-sm text-white">
                            {item.commission_rate}%
                        </span>
                    );
                },
            },

            {
                label: 'Commission Amount',
                render: (item) => {
                    return (
                        <span className="rounded-lg bg-blue-500 p-2 text-sm text-white">
                            {currency?.symbol} {item.commission_amount}
                        </span>
                    );
                },
            },

            {
                label: 'Commission Status',
                render: (item) => {
                    return (
                        <span
                            className={`${item.status == 'paid' ? 'bg-green-500' : 'bg-red-500'} rounded-lg p-2 text-white`}
                        >
                            {item.status == 'paid' ? 'Paid' : 'Un-Paid'}
                        </span>
                    );
                },
            },

            { key: 'paid_at', label: 'Paid At' },
            { key: 'added_at', label: 'Added At' },
        ];

        const customActions = [
            {
                label: 'View',
                type: 'link',
                href: (item) => route('dashboard.suppliers.show', item?.supplier?.id),
            },
        ];

        setActions(customActions);
        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Supplier Commissions" />

                <BreadCrumb
                    header={'Supplier Commissions'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Supplier Commissions'}
                />

                <Card
                    Content={
                        <>
                            <Table
                                setBulkSelectedIds={setBulkSelectedIds}
                                setSingleSelectedId={setSingleSelectedId}
                                SingleSelectedId={SingleSelectedId}
                                resetBulkSelectedIds={resetBulkSelectedIds}
                                resetSingleSelectedId={resetSingleSelectedId}
                                BulkDeleteMethod={BulkDelete}
                                SingleDeleteMethod={SingleDelete}
                                BulkDeleteRoute={
                                    'dashboard.commissions.supplier-commissions.destroybyselection'
                                }
                                SingleDeleteRoute={
                                    'dashboard.commissions.supplier-commissions.destroy'
                                }
                                EditRoute={'dashboard.commissions.supplier-commissions.edit'}
                                SearchRoute={'dashboard.commissions.supplier-commissions.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={supplier_commissions}
                                props={props}
                                customActions={actions}
                                columns={columns}
                            />
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    );
}
