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
import Swal from 'sweetalert2';
import axios from 'axios';

export default function create() {
    // Create Data Form Data
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        images: [],
        videos: [],
        floor: '',
        tag: '',
        latitude: '',
        longitude: '',
        post_type: '',
        status: 1,
    });

    // Location Get Success state
    const [LocationGotSuccessMessage, setLocationGotSuccessMessage] = useState(null);

    useEffect(() => {
        console.log(data.latitude, data.longitude);
    }, [data.latitude, data.longitude]);

    // location Detector State
    const [locationDetector, setLocationDetector] = useState('');

    useEffect(() => {
        setLocationGotSuccessMessage(null);

        if (locationDetector == '') {
            setData('latitude', '');
            setData('longitude', '');
        }

        if (locationDetector !== '' && locationDetector == 0) {
            autoLocationDetector();
        }

        if (locationDetector !== '' && locationDetector == 1) {
            setAutoCompletionLocationModalOpen(true);
        }
    }, [locationDetector]);

    //1: Automatic Locaiton Detection With JS
    const autoLocationDetector = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setData('latitude', position.coords.latitude);
            setData('longitude', position.coords.longitude);
        });

        setLocationGotSuccessMessage('Location Got Successfully');
        setTimeout(() => {
            setLocationGotSuccessMessage(null);
        }, 1000);
    };

    //2: Auto Completion Location Model State
    const [autoCompletionLocationModalOpen, setAutoCompletionLocationModalOpen] = useState(false);

    // Auto Completion Location States
    const [autoCompletionLocationSearch, setAutoCompletionLocationSearch] = useState('');
    const [autoCompletionInfoMessage, setAutoCompletionInfoMessage] = useState('');

    const [autoCompletionLoading, setAutoCompletionLoading] = useState(false);

    const [autoCompletionResults, setAutoCompletionResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [selectedPlaceId, setSelectedPlaceId] = useState('');

    const [fetchingLatlngProcessing, setFetchingLatlngProcessing] = useState(false);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setShowDropdown(false);
            setAutoCompletionLoading(false);
            setAutoCompletionInfoMessage('');
            setAutoCompletionResults([]);
            setAutoCompletionInfoMessage('');

            if (autoCompletionLocationSearch != '' && autoCompletionLocationSearch?.length < 3) {
                setAutoCompletionInfoMessage('Please Enter More Details To Search');
            }
            if (autoCompletionLocationSearch?.length > 2) {
                setAutoCompletionLoading(false);
                setShowDropdown(false);
                setAutoCompletionResults([]);
                autoCompletions();
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [autoCompletionLocationSearch]);

    useEffect(() => {
        if (selectedPlaceId != '' && selectedPlaceId != '') {
            Swal.fire({
                icon: 'info',
                title: 'Do You Want To Proceed With This Location?',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Yes',
            }).then((result) => {
                if (!result.isConfirmed) {
                    setSelectedPlaceId('');
                }

                if (result.isConfirmed) {
                    setAutoCompletionLocationModalOpen(false);
                    setFetchingLatlngProcessing(true);

                    try {
                        axios
                            .post(route('dashboard.posts.google.location.placedetails'), {
                                place_id: selectedPlaceId,
                            })
                            .then((res) => {
                                setData('latitude', res.data.data.lat);
                                setData('longitude', res.data.data.lng);
                                setSelectedPlaceId('');
                                setFetchingLatlngProcessing(false);
                                setLocationGotSuccessMessage('Location Got Successfully');
                                setAutoCompletionLocationSearch('');
                                setTimeout(() => {
                                    setLocationGotSuccessMessage(null);
                                }, 1000);
                            });
                    } catch (e) {
                        setFetchingLatlngProcessing(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: e.message || 'Something went wrong',
                        });
                    }
                }
            });
        }
    }, [selectedPlaceId]);

    // Fetch AutocompletionLocationsFrom Google
    const autoCompletions = () => {
        try {
            if (autoCompletionLocationSearch != '' && selectedPlaceId == '') {
                setAutoCompletionLoading(true);
                setShowDropdown(true);
                axios
                    .post(route('dashboard.posts.google.location.autocomplete'), {
                        search: autoCompletionLocationSearch, // send in request body
                    })
                    .then((res) => {
                        const predictions = res.data.data.predictions || [];

                        setAutoCompletionResults(predictions);
                        setAutoCompletionLoading(false);
                        setAutoCompletionInfoMessage(
                            predictions.length > 0 ? '' : 'No Results Found',
                        );
                    });
            }
        } catch (e) {
            autoCompletionLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.message || 'Something went wrong',
            });
        }
    };

    // Create Data Form Request
    const submit = (e) => {
        e.preventDefault();
        setLocationGotSuccessMessage(null);
        post(route('dashboard.posts.store'), {
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
                    header={'Create Post'}
                    parent={'Posts'}
                    parent_link={route('dashboard.posts.index')}
                    child={'Create Post'}
                />

                {file_error != null && <Toast flash={{ info: file_error }} />}
                {LocationGotSuccessMessage != null && (
                    <Toast flash={{ success: LocationGotSuccessMessage }} />
                )}
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

                                                <SelectInput
                                                    InputName={'Location Detection Method'}
                                                    Id={'location_detection_method'}
                                                    Name={'location_detection_method'}
                                                    Value={locationDetector}
                                                    Required={true}
                                                    Action={(e) =>
                                                        setLocationDetector(e.target.value)
                                                    }
                                                    items={[
                                                        { id: 0, name: 'Automatic Detection' },
                                                        { id: 1, name: 'Google Auto Completion' },
                                                        { id: 2, name: 'Google Map Search' },
                                                    ]}
                                                    itemKey={'name'}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <TipTapEditor
                                                    Label={'Content'}
                                                    Id={'content'}
                                                    Required={true}
                                                    Value={data.content}
                                                    Action={(value) => {
                                                        if (value == '<p></p>')
                                                            setData('content', '');
                                                        else setData('content', value);
                                                    }}
                                                />
                                            </div>

                                            <PrimaryButton
                                                Text={'Create Post'}
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
                                            className="w-8 h-8 text-gray-200 animate-spin fill-blue-600 dark:text-gray-600"
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
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {autoCompletionLocationModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto sm:p-6">
                        <div
                            className="fixed inset-0 backdrop-blur-[32px]"
                            onClick={() => setAutoCompletionLocationModalOpen(false)}
                        ></div>

                        {/* Modal content */}
                        <div className="relative z-10 max-h-[95vh] w-full max-w-4xl overflow-visible rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800 sm:p-8">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Please Search And Select Your Location
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-1">
                                <div className="relative">
                                    <Input
                                        InputName={'Location'}
                                        Id={'location'}
                                        Type="text"
                                        Value={autoCompletionLocationSearch}
                                        Action={(e) =>
                                            setAutoCompletionLocationSearch(e.target.value)
                                        }
                                        Required={true}
                                        Error={autoCompletionInfoMessage}
                                        placeholder="Search Location"
                                    />

                                    {showDropdown && (
                                        <ul className="relative z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60 dark:border-gray-600 dark:bg-gray-700">
                                            {autoCompletionLoading ? (
                                                <li className="flex items-center justify-center px-4 py-4">
                                                    <div className="w-5 h-5 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
                                                </li>
                                            ) : (
                                                autoCompletionResults.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600"
                                                        onClick={() => {
                                                            setSelectedPlaceId(item.place_id);
                                                            setShowDropdown(false);
                                                            setAutoCompletionLocationSearch(
                                                                item.description,
                                                            );
                                                        }}
                                                    >
                                                        {item.description}
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {fetchingLatlngProcessing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto sm:p-6">
                        <div className="fixed inset-0 backdrop-blur-[32px]"></div>

                        {/* Modal content */}
                        <div className="relative z-10 w-full max-w-lg max-h-screen p-6 overflow-y-auto bg-white shadow-xl rounded-2xl dark:bg-gray-800 sm:p-8">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                                    Please Wait While We Are Setting up Location
                                </h2>

                                <div className="flex items-center justify-center mt-5">
                                    <div role="status">
                                        <svg
                                            aria-hidden="true"
                                            className="w-8 h-8 text-gray-200 animate-spin fill-blue-600 dark:text-gray-600"
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
                                        <span className="sr-only">Loading...</span>
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
