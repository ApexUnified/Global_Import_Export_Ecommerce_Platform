import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm, usePage } from '@inertiajs/react';
import Table from '@/Components/Table';

import { useEffect, useState } from 'react';
import getContrastingColor from '@/Hooks/useColorContraster';

export default function index({ smartphones }) {
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
            { key: 'model_name.name', label: 'Model Name' },
            {
                key: 'capacity.name',
                label: 'Capacity',
                badge: (value) => 'p-2 bg-blue-500 rounded-lg text-white',
            },
            {
                label: 'Colors',
                render: (item) => {
                    return (
                        <div className="flex items-center gap-2">
                            {item.colors.map((color) => {
                                return (
                                    <span
                                        key={color.id}
                                        className="p-2 text-white rounded-lg"
                                        style={{
                                            backgroundColor: color.code,
                                            color: getContrastingColor(color.code),
                                        }}
                                    >
                                        {color.name}
                                    </span>
                                );
                            })}
                        </div>
                    );
                },
            },
            {
                key: 'upc',
                label: 'UPC/EAN',
                badge: (value) => 'p-2 bg-blue-500 rounded-lg text-white',
            },
            {
                label: 'Selling Price',
                render: (item) => {
                    return (
                        <span className="p-2 text-white bg-blue-500 rounded-lg">
                            {currency?.symbol}
                            {item.selling_price}
                        </span>
                    );
                },
            },
            { key: 'added_at', label: 'Added At' },
        ];

        setColumns(columns);
    }, []);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Smart Phones" />

                <BreadCrumb
                    header={'Smart Phones'}
                    parent={'Dashboard'}
                    parent_link={route('dashboard')}
                    child={'Smart Phones'}
                />

                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={'Create Smart Phone'}
                                    URL={route('dashboard.smartphones.create')}
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
                                BulkDeleteRoute={'dashboard.smartphones.destroybyselection'}
                                SingleDeleteRoute={'dashboard.smartphones.destroy'}
                                EditRoute={'dashboard.smartphones.edit'}
                                SearchRoute={'dashboard.smartphones.index'}
                                Search={true}
                                DefaultSearchInput={true}
                                items={smartphones}
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
