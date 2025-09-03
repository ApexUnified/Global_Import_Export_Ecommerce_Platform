import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function edit({ google_map_setting }) {
    // Edit Data Form Data
    const { data, setData, put, processing, errors, reset } = useForm({
        google_map_api_key: google_map_setting?.google_map_api_key || '',
        google_map_id: google_map_setting?.google_map_id || '',
    });

    // Edit Data Form Request
    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.settings.google-map-settings.update', google_map_setting?.id));
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Google Map Settings" />

                <BreadCrumb
                    header={'Edit Google Map Setting'}
                    parent={'Google Map Settings'}
                    parent_link={route('dashboard.settings.google-map-settings.index')}
                    child={'Edit Google Map Setting'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Google Map Settings'}
                                    URL={route('dashboard.settings.google-map-settings.index')}
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
                                                    InputName={'Google Map API Key'}
                                                    Error={errors.google_map_api_key}
                                                    Value={data.google_map_api_key}
                                                    Action={(e) =>
                                                        setData(
                                                            'google_map_api_key',
                                                            e.target.value,
                                                        )
                                                    }
                                                    Placeholder={'Enter Google Map API Key'}
                                                    Id={'google_map_api_key'}
                                                    Name={'google_map_api_key'}
                                                    Type={'text'}
                                                    Required={true}
                                                />

                                                <Input
                                                    InputName={'Google Map ID'}
                                                    Error={errors.google_map_id}
                                                    Value={data.google_map_id}
                                                    Action={(e) =>
                                                        setData('google_map_id', e.target.value)
                                                    }
                                                    Placeholder={'Enter Google Map ID'}
                                                    Id={'google_map_id'}
                                                    Name={'google_map_id'}
                                                    Type={'text'}
                                                    Required={true}
                                                />
                                            </div>

                                            <PrimaryButton
                                                Text={'Update Google Map Setting'}
                                                Type={'submit'}
                                                CustomClass={'w-[250px] '}
                                                Disabled={
                                                    processing ||
                                                    data.google_map_api_key == '' ||
                                                    data.google_map_id == ''
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
