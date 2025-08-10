import Card from '@/Components/Card';
import Input from '@/Components/Input';
import LinkButton from '@/Components/LinkButton';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BreadCrumb from '@/Components/BreadCrumb';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import SelectInput from '@/Components/SelectInput';

export default function edit({ collaborator }) {
    // Create Data Form Data
    const { data, setData, put, processing, errors, reset } = useForm({
        name: collaborator?.user?.name || '',
        email: collaborator?.user?.email || '',
        phone: collaborator?.user?.phone || '',
        password: '',
        password_confirmation: '',
        is_active: collaborator?.user?.is_active ?? 1,
        type: collaborator?.type || '',
    });

    const [togglePassword, setTogglePassword] = useState(false);
    const [togglePasswordConfirmation, setTogglePasswordConfirmation] = useState(false);

    // Edit Data Form Request
    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.collaborators.update', collaborator.id));
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="Collaborators" />

                <BreadCrumb
                    header={'Edit Collaborator'}
                    parent={'Collaborators'}
                    parent_link={route('dashboard.collaborators.index')}
                    child={'Edit Collaborator'}
                />

                <Card
                    Content={
                        <>
                            <div className="my-3 flex flex-wrap justify-end">
                                <LinkButton
                                    Text={'Back To Collaborators'}
                                    URL={route('dashboard.collaborators.index')}
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
                                                    InputName={'Collaborator Name'}
                                                    Error={errors.name}
                                                    Value={data.name}
                                                    Action={(e) => setData('name', e.target.value)}
                                                    Placeholder={'Enter Collaborator Name'}
                                                    Id={'name'}
                                                    Name={'name'}
                                                    Type={'text'}
                                                    Required={true}
                                                />

                                                <Input
                                                    InputName={'Collaborator Email'}
                                                    Error={errors.email}
                                                    Value={data.email}
                                                    Action={(e) => setData('email', e.target.value)}
                                                    Placeholder={'Enter Collaborator Email'}
                                                    Id={'email'}
                                                    Name={'email'}
                                                    Type={'email'}
                                                    Required={true}
                                                />

                                                <div className="mb-5">
                                                    <Input
                                                        InputName={'Collaborator Phone'}
                                                        Error={errors.phone}
                                                        Value={data.phone}
                                                        Action={(e) =>
                                                            setData('phone', e.target.value)
                                                        }
                                                        Placeholder={'Enter Collaborator Phone'}
                                                        Id={'phone'}
                                                        Name={'phone'}
                                                        Type={'text'}
                                                        Required={true}
                                                    />
                                                </div>

                                                <SelectInput
                                                    InputName={'Collaborator Type'}
                                                    Error={errors.type}
                                                    Id={'type'}
                                                    Name={'type'}
                                                    Value={data.type}
                                                    Action={(value) => setData('type', value)}
                                                    Placeholder={'Select Collaborator Type'}
                                                    Required={true}
                                                    items={[
                                                        { name: 'Company' },
                                                        { name: 'Indivisual' },
                                                    ]}
                                                    itemKey={'name'}
                                                />

                                                <Input
                                                    InputName={'Collaborator Password'}
                                                    Error={errors.password}
                                                    Value={data.password}
                                                    Action={(e) =>
                                                        setData('password', e.target.value)
                                                    }
                                                    Placeholder={'Enter Collaborator Password'}
                                                    Id={'password'}
                                                    Name={'password'}
                                                    Type={'password'}
                                                    Required={data.password_confirmation !== ''}
                                                    ShowPasswordToggle={togglePassword}
                                                    setShowPasswordToggle={setTogglePassword}
                                                />

                                                <Input
                                                    InputName={'Collaborator Password Confirmation'}
                                                    Error={errors.password_confirmation}
                                                    Value={data.password_confirmation}
                                                    Action={(e) =>
                                                        setData(
                                                            'password_confirmation',
                                                            e.target.value,
                                                        )
                                                    }
                                                    Placeholder={
                                                        'Enter Collaborator Password Confirmation'
                                                    }
                                                    Id={'password_confirmation'}
                                                    Name={'password_confirmation'}
                                                    Type={'password'}
                                                    Required={data.password !== ''}
                                                    ShowPasswordToggle={togglePasswordConfirmation}
                                                    setShowPasswordToggle={
                                                        setTogglePasswordConfirmation
                                                    }
                                                />

                                                <SelectInput
                                                    InputName={'Active Status'}
                                                    Id={'is_active'}
                                                    Name={'is_active'}
                                                    Value={data.is_active}
                                                    items={[
                                                        {
                                                            id: 1,
                                                            name: 'Active',
                                                        },
                                                        {
                                                            id: 0,
                                                            name: 'In-Active',
                                                        },
                                                    ]}
                                                    Error={errors.is_active}
                                                    Placeholder={'Select Active Status'}
                                                    Required={true}
                                                    itemKey={'name'}
                                                    Action={(value) => setData('is_active', value)}
                                                />
                                            </div>

                                            <PrimaryButton
                                                Text={'Update Collaborator'}
                                                Type={'submit'}
                                                CustomClass={'w-[200px] '}
                                                Disabled={
                                                    processing ||
                                                    data.name.trim() === '' ||
                                                    data.email.trim() === '' ||
                                                    data.is_active === '' ||
                                                    data.phone.trim() === '' ||
                                                    data.type.trim() === '' ||
                                                    (data.password.trim() !== '' &&
                                                        data.password_confirmation.trim() === '') ||
                                                    (data.password.trim() === '' &&
                                                        data.password_confirmation.trim() !== '') ||
                                                    (data.password.trim() !== '' &&
                                                        data.password_confirmation.trim() !== '' &&
                                                        data.password.trim() !==
                                                            data.password_confirmation.trim()) ||
                                                    (data.name.trim() ===
                                                        collaborator?.user?.name.trim() &&
                                                        data.email.trim() ===
                                                            collaborator?.user?.email.trim() &&
                                                        data.phone.trim() ===
                                                            collaborator?.user?.phone.trim() &&
                                                        data.is_active ===
                                                            collaborator?.user?.is_active &&
                                                        data.type.trim() ===
                                                            collaborator.type.trim() &&
                                                        data.password.trim() === '' &&
                                                        data.password_confirmation.trim() === '')
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
