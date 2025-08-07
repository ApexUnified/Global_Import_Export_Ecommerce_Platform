import useDarkMode from '@/Hooks/useDarkMode';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

export default function SelectInput({
    Name,
    Id,
    CustomCss,
    Required = false,
    InputName,
    Error,
    items,
    Action,
    Value,
    itemKey,
    Multiple = false,
    Placeholder = true,
    isDisabled = false,
}) {
    const [options, setOptions] = useState([]);
    const isDarkMode = useDarkMode();
    const darkStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: '#111827',
            color: '#ffffff',
            borderColor: state.isFocused ? '#3b82f6' : '#4b5563',
            boxShadow: 'none', // <- important
            '&:hover': {
                borderColor: '#3b82f6',
            },
        }),

        menu: (base) => ({
            ...base,
            backgroundColor: '#1f2937',
            color: '#fff',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: '#111827',
            color: '#fff',
            '&:active': {
                backgroundColor: '#4b5563',
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: '#fff',
        }),
        input: (base) => ({
            ...base,
            color: '#fff',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#9ca3af',
        }),
    };
    const lightStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: '#ffffff', // white
            color: '#111827', // gray-900
            borderColor: state.isFocused ? '#2563eb' : '#d1d5db', // blue-600 or gray-300
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#2563eb',
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#ffffff', // white
            color: '#111827', // gray-900
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f3f4f6' : '#ffffff', // gray-100 hover
            color: '#111827', // gray-900
            '&:active': {
                backgroundColor: '#e5e7eb', // gray-200
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: '#111827', // gray-900
        }),
        input: (base) => ({
            ...base,
            color: '#111827', // gray-900
        }),
        placeholder: (base) => ({
            ...base,
            color: '#6b7280', // gray-500
        }),
    };

    useEffect(() => {
        const modified_options = items.map((item) => ({
            value: item.id ?? item[itemKey],
            label: item[itemKey].length > 50 ? item[itemKey].slice(0, 50) + '...' : item[itemKey],
        }));

        setOptions(modified_options);
    }, []);

    return (
        <>
            <div className={`${CustomCss} w-full`}>
                <label
                    htmlFor={Id}
                    className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                    {InputName}
                    {Required && <span className="text-red-500 dark:text-white"> *</span>}
                </label>

                <div className="relative">
                    <Select
                        name={Name}
                        inputId={Id}
                        options={options}
                        isDisabled={isDisabled}
                        value={options.find((opt) => opt.value === Value) || null}
                        onChange={(selectedOption) => {
                            if (Multiple) {
                                Action(selectedOption?.map((opt) => opt.value));
                            } else {
                                Action(selectedOption?.value);
                            }
                        }}
                        isMulti={Multiple}
                        isSearchable
                        required={Required}
                        {...(Placeholder && {
                            placeholder: `Select ${InputName} Or Search By its Name`,
                        })}
                        styles={isDarkMode ? darkStyles : lightStyles}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>

                <div className="h-5">
                    {Error && <p className="mt-1.5 text-red-500 dark:text-white">{Error}</p>}
                </div>
            </div>
        </>
    );
}
