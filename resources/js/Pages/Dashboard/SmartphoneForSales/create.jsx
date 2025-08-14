import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import SelectInput from '@/Components/SelectInput';
import Toast from '@/Components/Toast';
import Swal from 'sweetalert2';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
export default function create({ smartphones, additional_fee_lists }) {
    // Create Data Form Data
    const { data, setData, post, processing, errors, reset } = useForm({
        smartphone_id: '',
        selling_price: '',
        additional_fee: [],
    });

    const { currency } = usePage().props;
    const [file_error, setFileError] = useState(null);

    // Extra Cost Data Handling
    const [additionalFees, setAdditionalFees] = useState([]);
    const addAdditionalFee = () => {
        setAdditionalFees([...additionalFees, { type: '', amount: '' }]);
    };
    const removeAdditionalFee = (index) => {
        const updatedCosts = additionalFees.filter((_, i) => i !== index);
        setAdditionalFees(updatedCosts);
        setData('additional_fee', updatedCosts);
    };
    const handleChange = (index, field, value) => {
        const updatedCosts = [...additionalFees];
        updatedCosts[index][field] = value;
        setData('additional_fee', updatedCosts);
        setAdditionalFees(updatedCosts);
    };

    // Scanners
    const [smartphoneScannerOpen, setSmartphoneScannerOpen] = useState(false);

    useEffect(() => {
        if (errors?.file_error) {
            setFileError(errors.file_error);
        }
        const timeout = setTimeout(() => {
            setFileError(null);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [errors]);
    // Create Data Form Request
    const submit = (e) => {
        e.preventDefault();

        post(route('dashboard.smartphone-for-sales.store'));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Smartphone For Sales" />

                <BreadCrumb
                    header={'Create Smartphone For Sale'}
                    parent={'Smartphone For Sales'}
                    parent_link={route('dashboard.smartphone-for-sales.index')}
                    child={'Create Smartphone For Sale'}
                />

                {file_error != null && <Toast flash={{ info: file_error }} />}
                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Smartphone For Sales'}
                                    URL={route('dashboard.smartphone-for-sales.index')}
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
                                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                            />
                                        </svg>
                                    }
                                />
                            </div>

                            <form onSubmit={submit}>
                                <Card
                                    Content={
                                        <>
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div className="flex items-center">
                                                    <PrimaryButton
                                                        Type={'button'}
                                                        Id={'scan_smartphone'}
                                                        ClassName={
                                                            'dark:bg-gray-900 mt-2 dark:text-white p-2  rounded-lg text-center dark:hover:bg-gray-700 transition duration-200 ease-in-out hover:bg-blue-700 hover:text-white bg-slate-100'
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
                                                                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                                                                />
                                                            </svg>
                                                        }
                                                        Action={() =>
                                                            setSmartphoneScannerOpen(true)
                                                        }
                                                    />

                                                    <SelectInput
                                                        InputName={'Smartphone'}
                                                        Id={'smartphone_id'}
                                                        Name={'smartphone_id'}
                                                        Value={data.smartphone_id}
                                                        Error={errors.smartphone_id}
                                                        Required={true}
                                                        items={smartphones}
                                                        itemKey={'name'}
                                                        Placeholder={'Select Smartphone'}
                                                        Action={(value) => {
                                                            setData('smartphone_id', value);
                                                        }}
                                                    />
                                                </div>

                                                <div className="flex items-center">
                                                    <Input
                                                        CustomCss={'w-[40px] mt-5'}
                                                        Value={currency?.symbol}
                                                        readOnly={true}
                                                    />
                                                    <Input
                                                        InputName={'Selling Price'}
                                                        Id={'selling_price'}
                                                        Name={'selling_price'}
                                                        Value={data.selling_price}
                                                        Error={errors.selling_price}
                                                        Required={true}
                                                        Placeholder={'Enter Selling Price'}
                                                        Type={'number'}
                                                        Action={(e) => {
                                                            setData(
                                                                'selling_price',
                                                                e.target.value,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex w-full items-center justify-end">
                                                <PrimaryButton
                                                    Text={'Add Additional Fee'}
                                                    Type={'button'}
                                                    Id={'add_additional_fee'}
                                                    CustomClass={'w-[200px]'}
                                                    Action={addAdditionalFee}
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
                                                                d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                                                            />
                                                        </svg>
                                                    }
                                                />
                                            </div>

                                            {additionalFees.length > 0 && (
                                                <div
                                                    className="col-span-1 grid grid-cols-1 gap-5 overflow-x-auto scrollbar-thin dark:scrollbar-track-slate-900 dark:scrollbar-thumb-slate-700"
                                                    style={{ overflow: 'visible' }}
                                                >
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr>
                                                                <th className="border p-2 text-left text-gray-700 dark:border-gray-700 dark:text-gray-400">
                                                                    Type
                                                                </th>
                                                                <th className="border p-2 text-left text-gray-700 dark:border-gray-700 dark:text-gray-400">
                                                                    Amount
                                                                </th>
                                                                <th className="border p-2 text-center text-gray-700 dark:border-gray-700 dark:text-gray-400">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {additionalFees.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="border p-2 dark:border-gray-700">
                                                                        <SelectInput
                                                                            InputName={
                                                                                'Select Type'
                                                                            }
                                                                            Id={'type'}
                                                                            Name={'type'}
                                                                            Value={item.type}
                                                                            items={
                                                                                additional_fee_lists
                                                                            }
                                                                            itemKey={'name'}
                                                                            Action={(value) =>
                                                                                handleChange(
                                                                                    idx,
                                                                                    'type',
                                                                                    value,
                                                                                )
                                                                            }
                                                                            Error={
                                                                                errors[
                                                                                    `additional_fee.${idx}.type`
                                                                                ]
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className="border p-2 dark:border-gray-700">
                                                                        <Input
                                                                            InputName={'Amount'}
                                                                            Id={'amount'}
                                                                            Name={'amount'}
                                                                            Error={
                                                                                errors[
                                                                                    `additional_fee.${idx}.amount`
                                                                                ]
                                                                            }
                                                                            Value={item.amount}
                                                                            Required={true}
                                                                            Type={'number'}
                                                                            Placeholder={
                                                                                'Enter Amount'
                                                                            }
                                                                            Action={(e) =>
                                                                                handleChange(
                                                                                    idx,
                                                                                    'amount',
                                                                                    e.target.value,
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>

                                                                    <td className="border p-2 dark:border-gray-700">
                                                                        <div className="flex items-center justify-center">
                                                                            <PrimaryButton
                                                                                Type={'button'}
                                                                                Id={
                                                                                    'delete_additional_fee_' +
                                                                                    idx
                                                                                }
                                                                                Action={() =>
                                                                                    removeAdditionalFee(
                                                                                        idx,
                                                                                    )
                                                                                }
                                                                                CustomClass={
                                                                                    'w-[50px] bg-red-500 hover:bg-red-600'
                                                                                }
                                                                                Icon={
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        fill="none"
                                                                                        viewBox="0 0 24 24"
                                                                                        strokeWidth={
                                                                                            1.5
                                                                                        }
                                                                                        stroke="currentColor"
                                                                                        className="size-6"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                                                        />
                                                                                    </svg>
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )}

                                            <PrimaryButton
                                                Text={'Create Smartphone For Sale'}
                                                Type={'submit'}
                                                CustomClass={'w-[250px] '}
                                                Disabled={
                                                    processing ||
                                                    data.smartphone_id === '' ||
                                                    data.selling_price == 0 ||
                                                    data.selling_price === '' ||
                                                    (additionalFees.length > 0 &&
                                                        additionalFees.some(
                                                            (cost) =>
                                                                cost.type === '' ||
                                                                cost.amount == 0 ||
                                                                cost.amount === '',
                                                        ))
                                                }
                                                Spinner={processing}
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
                                        </>
                                    }
                                />
                            </form>
                        </>
                    }
                />

                {smartphoneScannerOpen && (
                    <>
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
                            <div className="fixed inset-0 backdrop-blur-[32px]"></div>

                            {/* Modal content */}
                            <div className="relative z-10 max-h-screen w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8">
                                <div className="text-center">
                                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                        Place The Camera On The Barcode
                                    </h2>

                                    {smartphoneScannerOpen && (
                                        <div className="flex items-center justify-center">
                                            <div className="rounded-2xl" style={{ marginTop: 20 }}>
                                                <BarcodeScannerComponent
                                                    width={400}
                                                    height={400}
                                                    onUpdate={(err, result) => {
                                                        if (result) {
                                                            axios
                                                                .get(
                                                                    route(
                                                                        'dashboard.inventories.getsmartphonebyupc',
                                                                        result.text,
                                                                    ),
                                                                )
                                                                .then((response) => {
                                                                    if (
                                                                        response.data.status ==
                                                                        false
                                                                    ) {
                                                                        Swal.fire({
                                                                            icon: 'info',
                                                                            title: 'Oops...',
                                                                            text: response.data
                                                                                .message,
                                                                        });
                                                                    } else {
                                                                        setData(
                                                                            'smartphone_id',
                                                                            response.data.smartphone
                                                                                .id,
                                                                        );
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    Swal.fire({
                                                                        icon: 'info',
                                                                        title: 'Oops...',
                                                                        text: error,
                                                                    });
                                                                });

                                                            setSmartphoneScannerOpen(false);
                                                        }
                                                    }}
                                                />

                                                <div className="flex items-center justify-center">
                                                    <PrimaryButton
                                                        Action={() => {
                                                            setSmartphoneScannerOpen(false);
                                                        }}
                                                        Text={'Close Scanner'}
                                                        Type={'button'}
                                                        CustomClass={'mt-4'}
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
                                                                    d="M6 18 18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </AuthenticatedLayout>
        </>
    );
}
