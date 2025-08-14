import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';
import { useEffect, useState } from 'react';

export default function index({ batches }) {
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

    const { currency } = usePage().props;

    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const columns = [
            { key: 'batch_name', label: 'Batch Name' },
            {
                key: 'total_quantity',
                label: 'Total Quantity',
                badge: (value) => 'rounded-lg bg-blue-500 p-2 text-sm text-white',
            },
            {
                label: 'Base Purchase Unit Price',
                render: (item) => {
                    return (
                        <span className="text-sm">
                            {currency?.symbol}
                            {item.base_purchase_unit_price}
                        </span>
                    );
                },
            },
            { key: 'supplier.user.name', label: 'Supplier Name' },
            {
                label: 'Total batch Cost',
                render: (item) => {
                    return (
                        <span className="text-sm">
                            {currency?.symbol}
                            {item.total_batch_cost}
                        </span>
                    );
                },
            },
            {
                label: 'Final Unit Price',
                render: (item) => {
                    return (
                        <span className="rounded-lg bg-blue-500 p-2 text-sm text-white">
                            {currency?.symbol}
                            {item.final_unit_price}
                        </span>
                    );
                },
            },

            { key: 'added_at', label: 'Purchase Date' },
        ];

        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="batches" />

                <BreadCrumb
                    header={'batches'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'batches'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Create batch'}
                                    URL={route('dashboard.batches.create')}
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
                                BulkDeleteRoute={'dashboard.batches.destroybyselection'}
                                SingleDeleteRoute={'dashboard.batches.destroy'}
                                EditRoute={'dashboard.batches.edit'}
                                SearchRoute={'dashboard.batches.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={batches}
                                props={props}
                                columns={columns}
                            />
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    );
}
