import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';
import SelectInput from '@/Components/SelectInput';

export default function index({ orders }) {
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

    // Toggle Cash Collected Status
    const { put } = useForm({});
    const toggleCashCollectedStatus = (id) => {
        put(route('dashboard.orders.updatecashcollectedstatus', id));
    };

    const [columns, setColumns] = useState([]);
    const [actions, setActions] = useState([]);
    useEffect(() => {
        const columns = [
            {
                label: 'Order No',
                render: (item) => {
                    return (
                        <Link
                            href={route('dashboard.orders.show', item?.id)}
                            className="text-blue-500 underline cursor-pointer"
                        >
                            {item.order_no}
                        </Link>
                    );
                },
            },
            { key: 'customer.user.email', label: 'Customer Name' },
            { key: 'customer.user.email', label: 'Customer Email' },
            { key: 'customer.user.phone', label: 'Customer Phone' },

            {
                label: 'Cash Collected Status',
                render: (item) => {
                    if (item.status !== 'pending') {
                        if (item.is_cash_collected === 1) {
                            return (
                                <>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={item.is_cash_collected}
                                            onChange={() => toggleCashCollectedStatus(item.id)}
                                            checked={item.is_cash_collected === 1}
                                            className="sr-only peer"
                                        />
                                        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-green-500 dark:peer-focus:ring-green-800 rtl:peer-checked:after:-translate-x-full"></div>
                                        <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                                            Yes
                                        </span>
                                    </label>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={item.is_cash_collected}
                                            onChange={() => toggleCashCollectedStatus(item.id)}
                                            checked={false}
                                            className="sr-only peer"
                                        />
                                        <div className="peer relative h-6 w-11 rounded-full bg-red-500 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-red-500 dark:peer-checked:bg-red-500 dark:peer-focus:ring-red-800 rtl:peer-checked:after:-translate-x-full"></div>
                                        <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
                                            No
                                        </span>
                                    </label>
                                </>
                            );
                        }
                    } else {
                        return 'Not Applicable';
                    }
                },
            },

            {
                label: 'Status',
                render: (item) => {
                    if (item.status === 'pending') {
                        return (
                            <span className="p-2 text-yellow-800 bg-yellow-500 rounded-lg">
                                Pending
                            </span>
                        );
                    } else if (item.status === 'paid') {
                        return <span className="p-2 text-white bg-blue-500 rounded-lg">Paid</span>;
                    } else if (item.status === 'shipped') {
                        return (
                            <span className="p-2 text-white bg-pink-500 rounded-lg">Shipped</span>
                        );
                    } else if (item.status === 'arrived_locally') {
                        return (
                            <span className="p-1 text-white rounded-lg bg-stone-500">
                                Arried Locally
                            </span>
                        );
                    } else if (item.status === 'delivered') {
                        return (
                            <span className="p-2 text-white bg-green-500 rounded-lg">
                                Delivered
                            </span>
                        );
                    } else {
                        return 'N/A';
                    }
                },
            },

            {
                label: 'Total Amount',
                render: (item) => {
                    return (
                        <span className="p-2 text-white bg-gray-500 rounded-lg">
                            {currency?.symbol}
                            {item.amount}
                        </span>
                    );
                },
            },

            { key: 'added_at', label: 'Added At' },
        ];

        const customActions = [
            {
                label: 'View',
                type: 'link',
                href: (item) => route('dashboard.orders.show', item?.id),
            },
        ];

        setActions(customActions);
        setColumns(columns);
    }, []);

    const [status, setStatus] = useState(props.status ?? '');
    const [parentSearched, setParentSearched] = useState(false);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Orders" />

                <BreadCrumb
                    header={'Orders'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Orders'}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={'Create Order'}
                                    URL={route('dashboard.orders.create')}
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
                                BulkDeleteRoute={'dashboard.orders.destroybyselection'}
                                SingleDeleteRoute={'dashboard.orders.destroy'}
                                EditRoute={'dashboard.orders.edit'}
                                SearchRoute={'dashboard.orders.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={orders}
                                props={props}
                                columns={columns}
                                customActions={actions}
                                searchProps={{ status: status }}
                                ParentSearched={parentSearched}
                                customSearch={
                                    <>
                                        <div className="relative">
                                            <SelectInput
                                                CustomCss={'w-auto md:w-[250px]'}
                                                InputName={'Status'}
                                                items={[
                                                    { id: 'pending', name: 'Pending' },
                                                    { id: 'paid', name: 'Paid' },
                                                    { id: 'shipped', name: 'Shipped' },
                                                    {
                                                        id: 'arrived_locally',
                                                        name: 'Arrived Locally',
                                                    },
                                                    { id: 'delivered', name: 'Delivered' },
                                                ]}
                                                itemKey={'name'}
                                                Value={status}
                                                Action={(value) => {
                                                    setStatus(value);
                                                    setParentSearched(true);
                                                }}
                                            />
                                        </div>
                                    </>
                                }
                            />
                        </>
                    }
                />
            </AuthenticatedLayout>
        </>
    );
}
