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

export default function create({ suppliers }) {
    // Create Data Form Data
    const { data, setData, post, processing, errors, reset } = useForm({
        batch_name: '',
        total_quantity: '',
        base_purchase_unit_price: '',
        supplier_id: '',
        extra_costs: [],
    });

    const { currency } = usePage().props;
    const [file_error, setFileError] = useState(null);

    // Extra Cost Data Handling
    const [extraCosts, setExtraCosts] = useState([]);
    const addExtraCost = () => {
        setExtraCosts([...extraCosts, { cost_type: '', amount: '' }]);
    };
    const removeExtraCost = (index) => {
        const updatedCosts = extraCosts.filter((_, i) => i !== index);
        setExtraCosts(updatedCosts);
        setData('extra_costs', updatedCosts);
    };
    const handleChange = (index, field, value) => {
        const updatedCosts = [...extraCosts];
        updatedCosts[index][field] = value;
        setData('extra_costs', updatedCosts);
        setExtraCosts(updatedCosts);
    };

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

        post(route('dashboard.batches.store'));
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Batches" />

                <BreadCrumb
                    header={'Create Batch'}
                    parent={'Batches'}
                    parent_link={route('dashboard.batches.index')}
                    child={'Create Batch'}
                />

                {file_error != null && <Toast flash={{ info: file_error }} />}
                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Batches'}
                                    URL={route('dashboard.batches.index')}
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
                                                <Input
                                                    InputName={'Batch Name'}
                                                    Id={'batch_name'}
                                                    Name={'batch_name'}
                                                    Value={data.batch_name}
                                                    Error={errors.batch_name}
                                                    Required={true}
                                                    Type={'text'}
                                                    Placeholder={'Enter Batch Name'}
                                                    Action={(e) => {
                                                        setData('batch_name', e.target.value);
                                                    }}
                                                />

                                                <Input
                                                    InputName={'Total Quantity'}
                                                    Id={'total_quantity'}
                                                    Name={'total_quantity'}
                                                    Value={data.total_quantity}
                                                    Error={errors.total_quantity}
                                                    Required={true}
                                                    Placeholder={'Enter Total Quantity'}
                                                    Type={'number'}
                                                    Action={(e) => {
                                                        setData('total_quantity', e.target.value);
                                                    }}
                                                />

                                                <div className="flex items-center">
                                                    <Input
                                                        CustomCss={'w-[40px] mt-5'}
                                                        Value={currency?.symbol}
                                                        readOnly={true}
                                                    />
                                                    <Input
                                                        InputName={'Base Purchase Unit Price'}
                                                        Error={errors.base_purchase_unit_price}
                                                        Value={data.base_purchase_unit_price}
                                                        Action={(e) =>
                                                            setData(
                                                                'base_purchase_unit_price',
                                                                e.target.value,
                                                            )
                                                        }
                                                        Placeholder={
                                                            'Enter Base Purchase Unit Price'
                                                        }
                                                        Id={'base_purchase_unit_price'}
                                                        Name={'base_purchase_unit_price'}
                                                        Type={'number'}
                                                        Decimal={true}
                                                        Required={true}
                                                    />
                                                </div>

                                                <SelectInput
                                                    InputName={'Supplier'}
                                                    Name={'supplier_id'}
                                                    Id={'supplier_id'}
                                                    Error={errors.supplier_id}
                                                    Value={data.supplier_id}
                                                    items={suppliers}
                                                    itemKey={'name'}
                                                    Placeholder={'Select Supplier'}
                                                    Required={true}
                                                    Action={(value) =>
                                                        setData('supplier_id', value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex w-full items-center justify-end">
                                                <PrimaryButton
                                                    Text={'Add Extra Cost'}
                                                    Type={'button'}
                                                    Id={'add_extra_cost'}
                                                    CustomClass={'w-[200px] '}
                                                    Action={addExtraCost}
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

                                            {extraCosts.length > 0 && (
                                                <div className="col-span-1 grid grid-cols-1 gap-5">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                            <tr>
                                                                <th className="border p-2 text-left text-gray-700 dark:border-gray-700 dark:text-gray-400">
                                                                    Cost Type
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
                                                            {extraCosts.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className="border p-2 dark:border-gray-700">
                                                                        <Input
                                                                            InputName={'Cost Type'}
                                                                            Id={'cost_type'}
                                                                            Name={'cost_type'}
                                                                            Error={
                                                                                errors[
                                                                                    `extra_costs.${idx}.cost_type`
                                                                                ]
                                                                            }
                                                                            Value={item.cost_type}
                                                                            Required={true}
                                                                            Type={'text'}
                                                                            Placeholder={
                                                                                'Enter Cost Type'
                                                                            }
                                                                            Action={(e) =>
                                                                                handleChange(
                                                                                    idx,
                                                                                    'cost_type',
                                                                                    e.target.value,
                                                                                )
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
                                                                                    `extra_costs.${idx}.amount`
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
                                                                                    'delete_extra_cost'
                                                                                }
                                                                                Action={() =>
                                                                                    removeExtraCost(
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
                                                Text={'Create Batch'}
                                                Type={'submit'}
                                                CustomClass={'w-[250px] '}
                                                Disabled={
                                                    processing ||
                                                    data.batch_name.trim() === '' ||
                                                    data.total_quantity == 0 ||
                                                    data.total_quantity === '' ||
                                                    data.base_purchase_unit_price === '' ||
                                                    data.base_purchase_unit_price == 0 ||
                                                    data.supplier_id === '' ||
                                                    (data.extra_costs.length > 0 &&
                                                        data.extra_costs.some(
                                                            (cost) =>
                                                                cost.cost_type === '' ||
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
            </AuthenticatedLayout>
        </>
    );
}
