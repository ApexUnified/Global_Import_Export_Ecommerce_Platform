import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import SelectInput from '@/Components/SelectInput';
import FileUploaderInput from '@/Components/FileUploaderInput';
import TipTapEditor from '@/Components/TipTapEditor';
import Toast from '@/Components/Toast';

export default function edit({ post_data }) {
    // Edit Data Form Data
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: post_data.title || '',
        content: post_data.content || '',
        images: [],
        videos: [],
        floor: post_data.floor || '',
        tag: post_data.tag || '',
        post_type: post_data.post_type || '',
        status: post_data.status || 1,
    });

    // Edit Data Form Request
    const submit = (e) => {
        e.preventDefault();

        if (data?.images?.length === post_data?.images?.length) {
            setData('images', []);
        }

        if (data?.videos?.length === post_data?.videos?.length) {
            setData('videos', []);
        }

        post(route('dashboard.posts.update', post_data.slug), {
            onSuccess: () => {
                setShowProgressModal(false);
                reset();
            },
            onError: () => {
                setShowProgressModal(false);
            },
        });
    };

    const [file_error, setFileError] = useState(null);
    const [showProgressModal, setShowProgressModal] = useState(false);

    useEffect(() => {
        if (errors?.file_error) {
            setFileError(errors?.file_error);
        }
    }, [errors]);

    useEffect(() => {
        if (file_error != null) {
            setFileError(null);
        }
    }, [data?.images, data?.videos]);

    useEffect(() => {
        if ((data?.images?.length > 0 || data?.videos?.length > 0) && processing) {
            setShowProgressModal(true);
        } else {
            setShowProgressModal(false);
        }
    }, [processing, data?.images, data?.videos]);

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Posts" />

                <BreadCrumb
                    header={'Edit Post'}
                    parent={'Posts'}
                    parent_link={route('dashboard.posts.index')}
                    child={'Edit Post'}
                />

                {file_error != null && <Toast flash={{ info: file_error }} />}
                <Card
                    Content={
                        <>
                            <div className="flex flex-wrap justify-end my-3">
                                <LinkButton
                                    Text={'Back To Posts'}
                                    URL={route('dashboard.posts.index')}
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
                                                    InputName={'Post Title'}
                                                    Error={errors.title}
                                                    Value={data.title}
                                                    Action={(e) => setData('title', e.target.value)}
                                                    Placeholder={'Enter Post Title'}
                                                    Id={'title'}
                                                    Name={'title'}
                                                    Type={'text'}
                                                    Required={true}
                                                />

                                                <SelectInput
                                                    InputName={'Post Type'}
                                                    Id={'post_type'}
                                                    Name={'post_type'}
                                                    Error={errors.post_type}
                                                    Value={data.post_type}
                                                    Required={true}
                                                    Action={(e) =>
                                                        setData('post_type', e.target.value)
                                                    }
                                                    items={[
                                                        { name: 'Review' },
                                                        { name: 'Inquiry' },
                                                    ]}
                                                    itemKey={'name'}
                                                />

                                                <FileUploaderInput
                                                    Label={
                                                        'Drag & Drop your Post Image or <span class="filepond--label-action">Browse</span>'
                                                    }
                                                    Error={errors.images}
                                                    Id={'images'}
                                                    InputName={'Post Images'}
                                                    acceptedFileTypes={['image/*']}
                                                    MaxFileSize={'10MB'}
                                                    onUpdate={(files) => {
                                                        if (files.length > 0) {
                                                            const newFiles = files
                                                                .filter((f) => f.isNew)
                                                                .map((f) => f.file);

                                                            setData('images', newFiles);
                                                        } else {
                                                            setData('images', null);
                                                        }
                                                    }}
                                                    MaxFiles={35}
                                                    Multiple={true}
                                                    DefaultFile={post_data?.post_image_urls}
                                                />

                                                <FileUploaderInput
                                                    Label={
                                                        'Drag & Drop your Post Video or <span class="filepond--label-action">Browse</span>'
                                                    }
                                                    Error={errors.videos}
                                                    Id={'videos'}
                                                    InputName={'Post Videos'}
                                                    acceptedFileTypes={['video/*']}
                                                    MaxFileSize={'1000MB'}
                                                    onUpdate={(files) => {
                                                        if (files.length > 0) {
                                                            const newFiles = files
                                                                .filter((f) => f.isNew)
                                                                .map((f) => f.file);

                                                            setData('videos', newFiles);
                                                        } else {
                                                            setData('videos', null);
                                                        }
                                                    }}
                                                    MaxFiles={5}
                                                    Multiple={true}
                                                    DefaultFile={post_data?.post_video_urls}
                                                />

                                                <Input
                                                    InputName={'Tag'}
                                                    Error={errors.tag}
                                                    Value={data.tag}
                                                    Action={(e) => setData('tag', e.target.value)}
                                                    Placeholder={'Enter Tag'}
                                                    Id={'tag'}
                                                    Name={'tag'}
                                                    Type={'text'}
                                                    Required={false}
                                                />

                                                <Input
                                                    InputName={'Floor'}
                                                    Error={errors.floor}
                                                    Value={data.floor}
                                                    Action={(e) => setData('floor', e.target.value)}
                                                    Placeholder={'Enter Floor'}
                                                    Id={'floor'}
                                                    Name={'floor'}
                                                    Type={'text'}
                                                    Required={false}
                                                />

                                                <SelectInput
                                                    InputName={'Post Status'}
                                                    Id={'status'}
                                                    Name={'status'}
                                                    Error={errors.status}
                                                    Value={data.status}
                                                    Required={true}
                                                    Action={(e) =>
                                                        setData('status', e.target.value)
                                                    }
                                                    items={[
                                                        { id: 1, name: 'Active' },
                                                        { id: 0, name: 'In Active' },
                                                    ]}
                                                    itemKey={'name'}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <TipTapEditor
                                                    Label={'Content'}
                                                    Id={'content'}
                                                    Value={data.content}
                                                    Required={true}
                                                    Action={(value) => {
                                                        if (value == '<p></p>')
                                                            setData('content', '');
                                                        else setData('content', value);
                                                    }}
                                                />
                                            </div>

                                            <PrimaryButton
                                                Text={'Update Post'}
                                                Type={'submit'}
                                                CustomClass={'w-[200px] '}
                                                Disabled={
                                                    processing ||
                                                    data.title.trim() === '' ||
                                                    data.content.trim() === '' ||
                                                    data.status === ''
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

                {showProgressModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto sm:p-6">
                        <div className="fixed inset-0 backdrop-blur-[32px]"></div>

                        {/* Modal content */}
                        <div className="relative z-10 w-full max-w-lg max-h-screen p-6 overflow-y-auto bg-white shadow-xl rounded-2xl dark:bg-gray-800 sm:p-8">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Please Wait While We Are Uploading Your Files
                                </h2>

                                <div className="flex items-center justify-center mt-5">
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
        </>
    );
}
