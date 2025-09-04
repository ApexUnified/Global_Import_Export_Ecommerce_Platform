import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function edit({ meta_setting }) {
    // Edit Data Form Data
    const { data, setData, put, processing, errors, reset } = useForm({
        meta_app_id: meta_setting?.meta_app_id || '',
        meta_app_secret: meta_setting?.meta_app_secret || '',
    });

    // Edit Data Form Request
    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.settings.meta-settings.update', meta_setting.id));
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Settings - Meta Settings" />

                <BreadCrumb
                    header={'Settings - Edit Meta Setting'}
                    parent={'Meta Settings'}
                    parent_link={route('dashboard.settings.meta-settings.index')}
                    child={'Edit Meta Setting'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Meta Settings'}
                                    URL={route('dashboard.settings.meta-settings.index')}
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
                                                    InputName={'Meta APP ID'}
                                                    Error={errors.meta_app_id}
                                                    Value={data.meta_app_id}
                                                    Action={(e) =>
                                                        setData('meta_app_id', e.target.value)
                                                    }
                                                    Placeholder={'Enter Meta APP ID'}
                                                    Id={'meta_app_id'}
                                                    Name={'meta_app_id'}
                                                    Type={'text'}
                                                    Required={true}
                                                />

                                                <Input
                                                    InputName={'Meta APP Secret'}
                                                    Error={errors.meta_app_secret}
                                                    Value={data.meta_app_secret}
                                                    Action={(e) =>
                                                        setData('meta_app_secret', e.target.value)
                                                    }
                                                    Placeholder={'Enter Meta APP Secret'}
                                                    Id={'meta_app_secret'}
                                                    Name={'meta_app_secret'}
                                                    Type={'text'}
                                                    Required={true}
                                                />
                                            </div>

                                            <PrimaryButton
                                                Text={'Update Meta Setting'}
                                                Type={'submit'}
                                                CustomClass={'w-[250px] '}
                                                Disabled={
                                                    processing ||
                                                    data.meta_app_id == '' ||
                                                    data.meta_app_secret == ''
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
                                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
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
