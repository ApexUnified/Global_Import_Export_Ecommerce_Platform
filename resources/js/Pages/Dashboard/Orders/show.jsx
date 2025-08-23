import Card from '@/Components/Card';
import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';

export default function show({ order }) {
    // Currency
    const { currency } = usePage().props;

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-500 text-yellow-800 ',
            paid: 'bg-blue-500 text-white ',
            shipped: 'bg-pink-500 text-white ',
            arrived_locally: 'bg-stone-500 text-white ',
            delivered: 'bg-green-500 text-white ',
        };
        return colors[status] || colors.pending;
    };

    const handleFileDownload = async (fileName, fileUrl) => {
        try {
            const response = await fetch(fileUrl, { mode: 'cors' });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Download failed - CORS issue',
                text: error,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open(fileUrl, '_blank');
                }
            });
        }
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title={`Orders`} />

                <BreadCrumb
                    header={'View Order'}
                    parent={'Orders'}
                    parent_link={route('dashboard.orders.index')}
                    child={'View Order'}
                />

                <div className="space-y-6">
                    <Card
                        Content={
                            <div className="p-6">
                                <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                    <div className="mb-4 lg:mb-0">
                                        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white/90">
                                            Order: {order.order_no}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-white/90">
                                            <span>Placed on {order.added_at}</span>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                                            >
                                                {order.status.charAt(0).toUpperCase() +
                                                    order.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4 lg:flex-nowrap">
                                        {order.status !== 'pending' && (
                                            <>
                                                <PrimaryButton
                                                    CustomClass={'w-[250px] '}
                                                    Text={'Customer Invoice'}
                                                    Action={() =>
                                                        (window.location.href = route(
                                                            'orders.customer-order-invoice',
                                                            order.order_no,
                                                        ))
                                                    }
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
                                                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                            />
                                                        </svg>
                                                    }
                                                />

                                                <PrimaryButton
                                                    CustomClass={'w-[250px] '}
                                                    Text={'Shipping Invoice'}
                                                    Action={() =>
                                                        (window.location.href = route(
                                                            'orders.shipping-invoice',
                                                            order.order_no,
                                                        ))
                                                    }
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
                                                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                            />
                                                        </svg>
                                                    }
                                                />
                                            </>
                                        )}

                                        <LinkButton
                                            Text={'Back To Orders'}
                                            URL={route('dashboard.orders.index')}
                                            Icon={
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                    />
                                                </svg>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Order Items */}
                            <Card
                                Content={
                                    <div className="p-6">
                                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white/90">
                                            Order Items
                                        </h2>
                                        <div className="space-y-4">
                                            {order.order_items && order.order_items.length > 0 ? (
                                                order.order_items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center space-x-4 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900"
                                                    >
                                                        <img
                                                            src={
                                                                item?.smartphone
                                                                    ?.smartphone_image_urls[0]
                                                            }
                                                            alt="Smartphone"
                                                            className="h-[100px] w-[100px] rounded-lg object-cover"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white/90">
                                                                {item?.smartphone?.model_name
                                                                    ?.name || 'N/A'}
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-white/90">
                                                                UPC/EAN:{' '}
                                                                {item?.smartphone?.upc || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <div className="my-3 text-right">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                                                                {currency?.symbol}
                                                                {item.unit_price ?? 0}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-white/90">
                                                                Qty: {item.quantity ?? 0}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-semibold text-gray-900 dark:text-white/90">
                                                                {currency?.symbol}
                                                                {item.sub_total ?? 0}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-8 text-center">
                                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                        <svg
                                                            className="h-8 w-8 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2-2m0 0L5 3m0 0v.01M19 3v.01"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-white/90">
                                                        No items found
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-white/90">
                                                        This order doesn't have any items yet.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                            />

                            {/* Payment Proof And Courier Invoice */}
                            {/* Payment Proof And Courier Invoice */}

                            <Card
                                Content={
                                    <div className="p-6">
                                        <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white/90">
                                            Payment Proof & Courier Invoice
                                        </h2>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {/* Payment Proof */}
                                            <div className="space-y-3">
                                                <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-white/80">
                                                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                                                    Payment Proof
                                                </h3>

                                                {order.payment_proof ? (
                                                    <div className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                                        {/* File Icon */}
                                                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                                                            <svg
                                                                className="h-8 w-8 text-green-600 dark:text-green-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>

                                                        {/* File Info */}
                                                        <div className="mb-4 text-center">
                                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white/90">
                                                                Payment Screenshot
                                                            </p>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex justify-center space-x-2">
                                                            <button
                                                                onClick={() =>
                                                                    (window.location.href =
                                                                        order.payment_proof)
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                                            >
                                                                <svg
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleFileDownload(
                                                                        'Payment Proof',
                                                                        order.payment_proof,
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                                            >
                                                                <svg
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/50">
                                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                                            <svg
                                                                className="h-6 w-6 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-500 dark:text-white/60">
                                                            No payment proof
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-400 dark:text-white/50">
                                                            Payment proof Upload pending
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Courier Invoice */}
                                            <div className="space-y-3">
                                                <h3 className="flex items-center text-sm font-medium text-gray-700 dark:text-white/80">
                                                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                                    Courier Invoice
                                                </h3>

                                                {order.courier_invoice ? (
                                                    <div className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                                        {/* PDF Icon */}
                                                        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                                                            <svg
                                                                className="h-8 w-8 text-blue-600 dark:text-blue-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M16 3v6a2 2 0 002 2h2"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="1.5"
                                                                    d="M9 15h6m-6-3h6"
                                                                />
                                                            </svg>
                                                        </div>

                                                        {/* File Info */}
                                                        <div className="mb-4 text-center">
                                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white/90">
                                                                Courier Invoice
                                                            </p>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="flex justify-center space-x-2">
                                                            <button
                                                                onClick={() =>
                                                                    (window.location.href =
                                                                        order.courier_invoice)
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                                                            >
                                                                <svg
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleFileDownload(
                                                                        'Courier Invoice',
                                                                        order.courier_invoice,
                                                                    )
                                                                }
                                                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-600 transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
                                                            >
                                                                <svg
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/50">
                                                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                                            <svg
                                                                className="h-6 w-6 text-gray-400"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M16 3v6a2 2 0 002 2h2"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-500 dark:text-white/60">
                                                            No invoice available
                                                        </p>
                                                        <p className="mt-1 text-xs text-gray-400 dark:text-white/50">
                                                            Invoice Upload Pending
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Customer Information */}
                            <Card
                                Content={
                                    <div className="p-6">
                                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white/90">
                                            Customer Information
                                        </h2>
                                        <div className="flex items-start space-x-4">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 text-white">
                                                <span className="text-3xl">
                                                    {order?.customer?.user?.avatar ?? 'N/A'}
                                                </span>
                                            </div>

                                            <div className="flex-1">
                                                <p className="flex items-center whitespace-normal break-words text-sm text-gray-600 dark:text-white/90">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="mr-2 h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                        />
                                                    </svg>

                                                    <span className="min-w-0 whitespace-normal break-all">
                                                        {order.customer?.user?.name || 'N/A'}
                                                    </span>
                                                </p>
                                                <div className="mt-1 space-y-1">
                                                    <p className="flex items-center whitespace-normal break-words text-sm text-gray-600 dark:text-white/90">
                                                        <svg
                                                            className="mr-2 h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <span className="min-w-0 whitespace-normal break-all">
                                                            {order.customer?.user?.email || 'N/A'}
                                                        </span>
                                                    </p>
                                                    {order.customer?.user?.phone && (
                                                        <p className="flex items-center text-sm text-gray-600 dark:text-white/90">
                                                            <svg
                                                                className="mr-2 h-4 w-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                                />
                                                            </svg>
                                                            {order.customer.user?.phone ?? 'N/A'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Addresses */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Card
                                    Content={
                                        <div className="p-6">
                                            <h3 className="text-md mb-3 flex items-center font-semibold text-gray-900 dark:text-white/90">
                                                <svg
                                                    className="mr-2 h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                    />
                                                </svg>
                                                Shipping Address 1
                                            </h3>
                                            <address className="text-sm not-italic text-gray-600 dark:text-white/90">
                                                {order?.customer?.state || 'N/A'},{' '}
                                                {order?.customer?.city || 'N/A'}
                                                <br />
                                                {order?.customer?.address_line1},{' '}
                                                {order?.customer?.postal_code || ''}
                                                <br />
                                                {order?.customer?.country || ''}
                                            </address>
                                        </div>
                                    }
                                />

                                {order.customer?.address_line2 && (
                                    <Card
                                        Content={
                                            <div className="p-6">
                                                <h3 className="text-md mb-3 flex items-center font-semibold text-gray-900 dark:text-white/90">
                                                    <svg
                                                        className="mr-2 h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                        />
                                                    </svg>
                                                    Shipping Address 2
                                                </h3>
                                                <address className="text-sm not-italic text-gray-600 dark:text-white/90">
                                                    {order?.customer?.state || 'N/A'},{' '}
                                                    {order?.customer?.city || 'N/A'}
                                                    <br />
                                                    {order?.customer?.address_line2},{' '}
                                                    {order?.customer?.postal_code || ''}
                                                    <br />
                                                    {order?.customer?.country || ''}
                                                </address>
                                            </div>
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <Card
                                Content={
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white/90">
                                            Order Summary
                                        </h3>

                                        {/* Products */}
                                        <div className="mb-4 space-y-2">
                                            {order?.order_items?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between text-sm text-gray-700 dark:text-white/90"
                                                >
                                                    <div>
                                                        <span className="font-medium">
                                                            {item.smartphone?.model_name?.name}
                                                        </span>
                                                        <div className="text-xs text-gray-500">
                                                            UPC: {item.smartphone?.upc} | Capacity:{' '}
                                                            {item.smartphone?.capacity?.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Qty: {item.quantity}
                                                        </div>
                                                    </div>

                                                    <span className="font-medium">
                                                        {currency?.symbol}
                                                        {item.sub_total}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Summary */}
                                        <div className="space-y-3">
                                            <div className="border-t pt-3">
                                                <div className="flex justify-between">
                                                    <span className="text-base font-semibold text-gray-900 dark:text-white/90">
                                                        Total
                                                    </span>
                                                    <span className="text-base font-bold text-indigo-600 dark:text-white/90">
                                                        {currency?.symbol}
                                                        {order?.amount ?? 0}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            />

                            {/* Distributor & Payment Information */}
                            <Card
                                Content={
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white/90">
                                            Distributor & Payment
                                        </h3>

                                        {/* Distributor Information */}
                                        <div className="mb-6">
                                            <h4 className="mb-3 flex items-center text-sm font-medium text-gray-900 dark:text-white/90">
                                                <svg
                                                    className="mr-2 h-4 w-4 text-gray-600 dark:text-white/90"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4"
                                                    />
                                                </svg>
                                                Distributor
                                            </h4>
                                            <div className="space-y-2">
                                                <p className="flex items-center whitespace-normal break-words text-sm text-gray-600 dark:text-white/90">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="mr-2 h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                                        />
                                                    </svg>
                                                    <span className="min-w-0 whitespace-normal break-all">
                                                        {order?.order_items[0]?.smartphone?.category
                                                            ?.distributor?.user?.name || 'N/A'}
                                                    </span>
                                                </p>
                                                <p className="flex items-center whitespace-normal break-words text-sm text-gray-600 dark:text-white/90">
                                                    <svg
                                                        className="mr-2 h-4 w-4 flex-shrink-0"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {
                                                        <span className="min-w-0 whitespace-normal break-all">
                                                            {order?.order_items[0]?.smartphone
                                                                ?.category?.distributor?.user
                                                                ?.email || 'N/A'}
                                                        </span>
                                                    }
                                                </p>

                                                <p className="flex items-center whitespace-normal break-words text-sm text-gray-600 dark:text-white/90">
                                                    <svg
                                                        className="mr-2 h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>

                                                    <span className="min-w-0 whitespace-normal break-all">
                                                        {order?.order_items[0]?.smartphone?.category
                                                            ?.distributor?.user?.phone || 'N/A'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Bank Account Information */}
                                        <div className="mb-6 rounded-lg border bg-gray-50 p-4 dark:bg-gray-900">
                                            <h4 className="mb-3 flex items-center text-sm font-medium text-gray-900 dark:text-white/90">
                                                <svg
                                                    className="mr-2 h-4 w-4 text-gray-600 dark:text-white/90"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                                    />
                                                </svg>
                                                Bank Account Details
                                            </h4>
                                            <div className="grid grid-cols-1 gap-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="mx-3 text-gray-600 dark:text-white/90">
                                                        Account No:
                                                    </span>
                                                    <span className="min-w-0 whitespace-normal break-all font-medium text-gray-900 dark:text-white/90">
                                                        {order?.order_items[0]?.smartphone?.category
                                                            ?.distributor?.bank_account_no || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Method */}
                                        {order.status !== 'pending' && (
                                            <div className="my-3 flex items-center space-x-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                                    <svg
                                                        className="h-4 w-4 text-green-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                                                        Bank Transfered
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Cash Collected Status */}
                                        {order.is_cash_collected == 1 && (
                                            <div className="my-3 flex items-center space-x-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                                    <svg
                                                        className="h-4 w-4 text-green-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white/90">
                                                        Cash Collected
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
