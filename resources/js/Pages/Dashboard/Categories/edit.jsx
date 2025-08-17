import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import SelectInput from '@/Components/SelectInput';
import FileUploaderInput from '@/Components/FileUploaderInput';

export default function edit({ category, distributors }) {
    // Create Data Form Data
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        name: category.name || '',
        short_description: category.short_description || '',
        thumbnail: category.thumbnail || '',
        is_active: category.is_active ?? 1,
        is_thumbnail_removed: false,
        distributor_id: category.distributor_id || '',
    });

    // Edit Data Form Request
    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.categories.update', category.id));
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Categories" />

                <BreadCrumb
                    header={'Edit Category'}
                    parent={'Categories'}
                    parent_link={route('dashboard.categories.index')}
                    child={'Edit Category'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Categories'}
                                    URL={route('dashboard.categories.index')}
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
                                                    InputName={'Category Name'}
                                                    Error={errors.name}
                                                    Value={data.name}
                                                    Action={(e) => setData('name', e.target.value)}
                                                    Placeholder={'Enter Category Name'}
                                                    Id={'name'}
                                                    Name={'name'}
                                                    Type={'text'}
                                                    Required={true}
                                                />

                                                <SelectInput
                                                    InputName={'Category Distributor'}
                                                    Id={'distributor_id'}
                                                    Name={'distributor_id'}
                                                    Error={errors.distributor_id}
                                                    items={distributors}
                                                    itemKey={'name'}
                                                    Value={data.distributor_id}
                                                    Required={true}
                                                    Action={(value) =>
                                                        setData('distributor_id', value)
                                                    }
                                                />

                                                <SelectInput
                                                    InputName={'Category Status'}
                                                    Id={'is_active'}
                                                    Name={'is_active'}
                                                    Error={errors.is_active}
                                                    items={[
                                                        { id: 1, name: 'Active' },
                                                        { id: 0, name: 'In-Active' },
                                                    ]}
                                                    itemKey={'name'}
                                                    Value={data.is_active}
                                                    Required={true}
                                                    Action={(value) => setData('is_active', value)}
                                                />

                                                <div>
                                                    <label
                                                        htmlFor="short_description"
                                                        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                    >
                                                        Category Short Description{' '}
                                                        <span className="text-red-500 dark:text-white">
                                                            *
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        id="short_description"
                                                        rows="3"
                                                        className="dark:bg-dark-900 shadow-theme-xs focus:ring-3 focus:outline-hidden mb-2 w-full min-w-0 max-w-full rounded-lg border border-gray-300 bg-transparent py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-300 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-blue-800"
                                                        placeholder="Enter Category Short Description here..."
                                                        value={data.short_description}
                                                        onChange={(e) =>
                                                            setData(
                                                                'short_description',
                                                                e.target.value,
                                                            )
                                                        }
                                                    ></textarea>
                                                    {errors.short_description && (
                                                        <span className="ml-2 text-red-500 dark:text-white">
                                                            {errors.short_description}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-span-1 grid gap-4">
                                                <FileUploaderInput
                                                    InputName={'Category Thumbnail'}
                                                    Id={'thumbnail'}
                                                    Label={
                                                        'Drag & Drop your Category Thumbnail or <span class="filepond--label-action">Browse</span>'
                                                    }
                                                    Error={errors.thumbnail}
                                                    MaxFileSize={'5MB'}
                                                    MaxFiles={1}
                                                    Multiple={false}
                                                    Required={true}
                                                    acceptedFileTypes={['image/*']}
                                                    DefaultFile={
                                                        category.thumbnail_url && [
                                                            category.thumbnail_url,
                                                        ]
                                                    }
                                                    onUpdate={(file) => {
                                                        if (file.length > 0) {
                                                            if (file[0].isNew) {
                                                                setData('thumbnail', file[0].file);
                                                                setData(
                                                                    'is_thumbnail_removed',
                                                                    false,
                                                                );
                                                            }
                                                        } else {
                                                            setData('is_thumbnail_removed', true);
                                                            setData('thumbnail', '');
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <PrimaryButton
                                                Text={'Update Category'}
                                                Type={'submit'}
                                                CustomClass={'w-[200px] '}
                                                Disabled={
                                                    processing ||
                                                    data.name.trim() == '' ||
                                                    data.short_description.trim() === '' ||
                                                    data.thumbnail === '' ||
                                                    data.distributor_id === '' ||
                                                    (data.name.trim() == category.name &&
                                                        data.short_description.trim() ==
                                                            category.short_description &&
                                                        data.is_active == category.is_active &&
                                                        data.thumbnail == category.thumbnail &&
                                                        data.distributor_id ==
                                                            category.distributor_id)
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
