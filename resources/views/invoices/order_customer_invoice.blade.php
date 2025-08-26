<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice - {{ $order->order_no }}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

        *,
        :after,
        :before {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgba(59, 130, 246, .5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style:
        }

        ::backdrop {
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
            --tw-pan-x: ;
            --tw-pan-y: ;
            --tw-pinch-zoom: ;
            --tw-scroll-snap-strictness: proximity;
            --tw-gradient-from-position: ;
            --tw-gradient-via-position: ;
            --tw-gradient-to-position: ;
            --tw-ordinal: ;
            --tw-slashed-zero: ;
            --tw-numeric-figure: ;
            --tw-numeric-spacing: ;
            --tw-numeric-fraction: ;
            --tw-ring-inset: ;
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: rgba(59, 130, 246, .5);
            --tw-ring-offset-shadow: 0 0 #0000;
            --tw-ring-shadow: 0 0 #0000;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-blur: ;
            --tw-brightness: ;
            --tw-contrast: ;
            --tw-grayscale: ;
            --tw-hue-rotate: ;
            --tw-invert: ;
            --tw-saturate: ;
            --tw-sepia: ;
            --tw-drop-shadow: ;
            --tw-backdrop-blur: ;
            --tw-backdrop-brightness: ;
            --tw-backdrop-contrast: ;
            --tw-backdrop-grayscale: ;
            --tw-backdrop-hue-rotate: ;
            --tw-backdrop-invert: ;
            --tw-backdrop-opacity: ;
            --tw-backdrop-saturate: ;
            --tw-backdrop-sepia: ;
            --tw-contain-size: ;
            --tw-contain-layout: ;
            --tw-contain-paint: ;
            --tw-contain-style:
        }

        /*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/
        *,
        :after,
        :before {
            box-sizing: border-box;
            border: 0 solid #e5e7eb
        }

        :after,
        :before {
            --tw-content: ""
        }

        :host,
        html {
            line-height: 1.5;
            -webkit-text-size-adjust: 100%;
            -moz-tab-size: 4;
            -o-tab-size: 4;
            tab-size: 4;
            font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
            font-feature-settings: normal;
            font-variation-settings: normal;
            -webkit-tap-highlight-color: transparent
        }

        body {
            margin: 0;
            line-height: inherit
        }

        hr {
            height: 0;
            color: inherit;
            border-top-width: 1px
        }

        abbr:where([title]) {
            -webkit-text-decoration: underline dotted;
            text-decoration: underline dotted
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-size: inherit;
            font-weight: inherit
        }

        a {
            color: inherit;
            text-decoration: inherit
        }

        b,
        strong {
            font-weight: bolder
        }

        code,
        kbd,
        pre,
        samp {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
            font-feature-settings: normal;
            font-variation-settings: normal;
            font-size: 1em
        }

        small {
            font-size: 80%
        }

        sub,
        sup {
            font-size: 75%;
            line-height: 0;
            position: relative;
            vertical-align: baseline
        }

        sub {
            bottom: -.25em
        }

        sup {
            top: -.5em
        }

        table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse
        }

        button,
        input,
        optgroup,
        select,
        textarea {
            font-family: inherit;
            font-feature-settings: inherit;
            font-variation-settings: inherit;
            font-size: 100%;
            font-weight: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            color: inherit;
            margin: 0;
            padding: 0
        }

        button,
        select {
            text-transform: none
        }

        button,
        input:where([type=button]),
        input:where([type=reset]),
        input:where([type=submit]) {
            -webkit-appearance: button;
            background-color: transparent;
            background-image: none
        }

        :-moz-focusring {
            outline: auto
        }

        :-moz-ui-invalid {
            box-shadow: none
        }

        progress {
            vertical-align: baseline
        }

        ::-webkit-inner-spin-button,
        ::-webkit-outer-spin-button {
            height: auto
        }

        [type=search] {
            -webkit-appearance: textfield;
            outline-offset: -2px
        }

        ::-webkit-search-decoration {
            -webkit-appearance: none
        }

        ::-webkit-file-upload-button {
            -webkit-appearance: button;
            font: inherit
        }

        summary {
            display: list-item
        }

        blockquote,
        dd,
        dl,
        figure,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        p,
        pre {
            margin: 0
        }

        fieldset {
            margin: 0
        }

        fieldset,
        legend {
            padding: 0
        }

        menu,
        ol,
        ul {
            list-style: none;
            margin: 0;
            padding: 0
        }

        dialog {
            padding: 0
        }

        textarea {
            resize: vertical
        }

        input::-moz-placeholder,
        textarea::-moz-placeholder {
            opacity: 1;
            color: #9ca3af
        }

        input::placeholder,
        textarea::placeholder {
            opacity: 1;
            color: #9ca3af
        }

        [role=button],
        button {
            cursor: pointer
        }

        :disabled {
            cursor: default
        }

        audio,
        canvas,
        embed,
        iframe,
        img,
        object,
        svg,
        video {
            display: block;
            vertical-align: middle
        }

        img,
        video {
            max-width: 100%;
            height: auto
        }

        [hidden]:where(:not([hidden=until-found])) {
            display: none
        }

        [multiple],
        [type=date],
        [type=datetime-local],
        [type=email],
        [type=month],
        [type=number],
        [type=password],
        [type=search],
        [type=tel],
        [type=text],
        [type=time],
        [type=url],
        [type=week],
        input:where(:not([type])),
        select,
        textarea {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-color: #fff;
            border-color: #6b7280;
            border-width: 1px;
            border-radius: 0;
            padding: .5rem .75rem;
            font-size: 1rem;
            line-height: 1.5rem;
            --tw-shadow: 0 0 #0000
        }

        [multiple]:focus,
        [type=date]:focus,
        [type=datetime-local]:focus,
        [type=email]:focus,
        [type=month]:focus,
        [type=number]:focus,
        [type=password]:focus,
        [type=search]:focus,
        [type=tel]:focus,
        [type=text]:focus,
        [type=time]:focus,
        [type=url]:focus,
        [type=week]:focus,
        input:where(:not([type])):focus,
        select:focus,
        textarea:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            --tw-ring-inset: var(--tw-empty,
                    /*!*/
                    /*!*/
                );
            --tw-ring-offset-width: 0px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: #2563eb;
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
            border-color: #2563eb
        }

        input::-moz-placeholder,
        textarea::-moz-placeholder {
            color: #6b7280;
            opacity: 1
        }

        input::placeholder,
        textarea::placeholder {
            color: #6b7280;
            opacity: 1
        }

        ::-webkit-datetime-edit-fields-wrapper {
            padding: 0
        }

        ::-webkit-date-and-time-value {
            min-height: 1.5em;
            text-align: inherit
        }

        ::-webkit-datetime-edit {
            display: inline-flex
        }

        ::-webkit-datetime-edit,
        ::-webkit-datetime-edit-day-field,
        ::-webkit-datetime-edit-hour-field,
        ::-webkit-datetime-edit-meridiem-field,
        ::-webkit-datetime-edit-millisecond-field,
        ::-webkit-datetime-edit-minute-field,
        ::-webkit-datetime-edit-month-field,
        ::-webkit-datetime-edit-second-field,
        ::-webkit-datetime-edit-year-field {
            padding-top: 0;
            padding-bottom: 0
        }

        select {
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
            background-position: right .5rem center;
            background-repeat: no-repeat;

            background-size: 1.5em 1.5em;padding-right:2.5rem;-webkit-print-color-adjust:exact;print-color-adjust:exact}[multiple],[size]:where(select:not([size="1"])) {
                background-image: none;
                background-position: 0 0;
                background-repeat: unset;
                background-size: initial;
                padding-right: .75rem;
                -webkit-print-color-adjust: unset;
                print-color-adjust: unset
            }

            [type=checkbox],
            [type=radio] {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                display: inline-block;
                vertical-align: middle;
                background-origin: border-box;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
                flex-shrink: 0;
                height: 1rem;
                width: 1rem;
                color: #2563eb;
                background-color: #fff;
                border-color: #6b7280;
                border-width: 1px;
                --tw-shadow: 0 0 #0000
            }

            [type=checkbox] {
                border-radius: 0
            }

            [type=radio] {
                border-radius: 100%
            }

            [type=checkbox]:focus,
            [type=radio]:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
                --tw-ring-inset: var(--tw-empty,
                        /*!*/
                        /*!*/
                    );
                --tw-ring-offset-width: 2px;
                --tw-ring-offset-color: #fff;
                --tw-ring-color: #2563eb;
                --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)
            }

            [type=checkbox]:checked,
            [type=radio]:checked {
                border-color: transparent;
                background-color: currentColor;
                background-size: 100% 100%;
                background-position: 50%;
                background-repeat: no-repeat
            }

            [type=checkbox]:checked {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0'/%3E%3C/svg%3E")
            }

            @media (forced-colors:active) {
                [type=checkbox]:checked {
                    -webkit-appearance: auto;
                    -moz-appearance: auto;
                    appearance: auto
                }
            }

            [type=radio]:checked {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E")
            }

            @media (forced-colors:active) {
                [type=radio]:checked {
                    -webkit-appearance: auto;
                    -moz-appearance: auto;
                    appearance: auto
                }
            }

            [type=checkbox]:checked:focus,
            [type=checkbox]:checked:hover,
            [type=radio]:checked:focus,
            [type=radio]:checked:hover {
                border-color: transparent;
                background-color: currentColor
            }

            [type=checkbox]:indeterminate {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3E%3C/svg%3E");
                border-color: transparent;
                background-color: currentColor;
                background-size: 100% 100%;
                background-position: 50%;
                background-repeat: no-repeat
            }

            @media (forced-colors:active) {
                [type=checkbox]:indeterminate {
                    -webkit-appearance: auto;
                    -moz-appearance: auto;
                    appearance: auto
                }
            }

            [type=checkbox]:indeterminate:focus,
            [type=checkbox]:indeterminate:hover {
                border-color: transparent;
                background-color: currentColor
            }

            [type=file] {
                background: unset;
                border-color: inherit;
                border-width: 0;
                border-radius: 0;
                padding: 0;
                font-size: unset;
                line-height: inherit
            }

            [type=file]:focus {
                outline: 1px solid ButtonText;
                outline: 1px auto -webkit-focus-ring-color
            }

            * {
                scrollbar-color: auto;
                scrollbar-width: auto
            }

            .collapse {
                visibility: collapse
            }

            .relative {
                position: relative
            }

            .mx-auto {
                margin-left: auto;
                margin-right: auto
            }

            .mb-3 {
                margin-bottom: .75rem
            }

            .mb-4 {
                margin-bottom: 1rem
            }

            .mb-6 {
                margin-bottom: 1.5rem
            }

            .mb-8 {
                margin-bottom: 2rem
            }

            .mt-12 {
                margin-top: 3rem
            }

            .mt-2 {
                margin-top: .5rem
            }

            .mt-4 {
                margin-top: 1rem
            }

            .mt-6 {
                margin-top: 1.5rem
            }

            .mt-8 {
                margin-top: 2rem
            }

            .block {
                display: block
            }

            .flex {
                display: flex
            }

            .table {
                display: table
            }

            .hidden {
                display: none
            }

            .h-12 {
                height: 3rem
            }

            .h-14 {
                height: 3.5rem
            }

            .h-24 {
                height: 6rem
            }

            .h-32 {
                height: 8rem
            }

            .h-auto {
                height: auto
            }

            .min-h-screen {
                min-height: 100vh
            }

            .w-12 {
                width: 3rem
            }

            .w-14 {
                width: 3.5rem
            }

            .w-24 {
                width: 6rem
            }

            .w-32 {
                width: 8rem
            }

            .w-80 {
                width: 20rem
            }

            .w-full {
                width: 100%
            }

            .min-w-\[600px\] {
                min-width: 600px
            }

            .flex-1 {
                flex: 1 1 0%
            }

            .flex-shrink {
                flex-shrink: 1
            }

            .flex-shrink-0 {
                flex-shrink: 0
            }

            .border-collapse {
                border-collapse: collapse
            }

            .resize {
                resize: both
            }

            .flex-row {
                flex-direction: row
            }

            .flex-col {
                flex-direction: column
            }

            .items-start {
                align-items: flex-start
            }

            .items-center {
                align-items: center
            }

            .justify-end {
                justify-content: flex-end
            }

            .justify-center {
                justify-content: center
            }

            .justify-between {
                justify-content: space-between
            }

            .gap-4 {
                gap: 1rem
            }

            .gap-6 {
                gap: 1.5rem
            }

            .space-y-1>:not([hidden])~:not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(.25rem*(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(.25rem*var(--tw-space-y-reverse))
            }

            .overflow-x-auto {
                overflow-x: auto
            }

            .break-words {
                overflow-wrap: break-word
            }

            .break-all {
                word-break: break-all
            }

            .rounded-lg {
                border-radius: .5rem
            }

            .border {
                border-width: 1px
            }

            .border-2 {
                border-width: 2px
            }

            .border-b {
                border-bottom-width: 1px
            }

            .border-b-2 {
                border-bottom-width: 2px
            }

            .border-t {
                border-top-width: 1px
            }

            .border-dashed {
                border-style: dashed
            }

            .border-gray-200 {
                --tw-border-opacity: 1;
                border-color: rgb(229 231 235/var(--tw-border-opacity, 1))
            }

            .border-gray-300 {
                --tw-border-opacity: 1;
                border-color: rgb(209 213 219/var(--tw-border-opacity, 1))
            }

            .border-gray-400 {
                --tw-border-opacity: 1;
                border-color: rgb(156 163 175/var(--tw-border-opacity, 1))
            }

            .bg-gray-200 {
                --tw-bg-opacity: 1;
                background-color: rgb(229 231 235/var(--tw-bg-opacity, 1))
            }

            .bg-gray-50 {
                --tw-bg-opacity: 1;
                background-color: rgb(249 250 251/var(--tw-bg-opacity, 1))
            }

            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55/var(--tw-bg-opacity, 1))
            }

            .bg-white {
                --tw-bg-opacity: 1;
                background-color: rgb(255 255 255/var(--tw-bg-opacity, 1))
            }

            .p-4 {
                padding: 1rem
            }

            .p-5 {
                padding: 1.25rem
            }

            .p-6 {
                padding: 1.5rem
            }

            .p-8 {
                padding: 2rem
            }

            .px-2 {
                padding-left: .5rem;
                padding-right: .5rem
            }

            .py-2 {
                padding-top: .5rem;
                padding-bottom: .5rem
            }

            .py-3 {
                padding-top: .75rem;
                padding-bottom: .75rem
            }

            .py-4 {
                padding-top: 1rem;
                padding-bottom: 1rem
            }

            .text-left {
                text-align: left
            }

            .text-center {
                text-align: center
            }

            .text-right {
                text-align: right
            }

            .text-2xl {
                font-size: 1.5rem;
                line-height: 2rem
            }

            .text-3xl {
                font-size: 1.875rem;
                line-height: 2.25rem
            }

            .text-base {
                font-size: 1rem;
                line-height: 1.5rem
            }

            .text-lg {
                font-size: 1.125rem;
                line-height: 1.75rem
            }

            .text-sm {
                font-size: .875rem;
                line-height: 1.25rem
            }

            .text-xl {
                font-size: 1.25rem;
                line-height: 1.75rem
            }

            .text-xs {
                font-size: .75rem;
                line-height: 1rem
            }

            .font-bold {
                font-weight: 700
            }

            .font-medium {
                font-weight: 500
            }

            .font-semibold {
                font-weight: 600
            }

            .text-blue-600 {
                --tw-text-opacity: 1;
                color: rgb(37 99 235/var(--tw-text-opacity, 1))
            }

            .text-gray-500 {
                --tw-text-opacity: 1;
                color: rgb(107 114 128/var(--tw-text-opacity, 1))
            }

            .text-gray-600 {
                --tw-text-opacity: 1;
                color: rgb(75 85 99/var(--tw-text-opacity, 1))
            }

            .text-gray-700 {
                --tw-text-opacity: 1;
                color: rgb(55 65 81/var(--tw-text-opacity, 1))
            }

            .text-gray-900 {
                --tw-text-opacity: 1;
                color: rgb(17 24 39/var(--tw-text-opacity, 1))
            }

            .text-white {
                --tw-text-opacity: 1;
                color: rgb(255 255 255/var(--tw-text-opacity, 1))
            }

            .underline {
                text-decoration-line: underline
            }

            .shadow-lg {
                --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1);
                --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
                box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
            }

            .outline {
                outline-style: solid
            }

            .page-break {
                page-break-before: always
            }

            .hover\:bg-gray-50:hover {
                --tw-bg-opacity: 1;
                background-color: rgb(249 250 251/var(--tw-bg-opacity, 1))
            }

            @media (min-width:640px) {
                .sm\:mb-8 {
                    margin-bottom: 2rem
                }

                .sm\:mt-12 {
                    margin-top: 3rem
                }

                .sm\:mt-8 {
                    margin-top: 2rem
                }

                .sm\:block {
                    display: block
                }

                .sm\:h-14 {
                    height: 3.5rem
                }

                .sm\:h-32 {
                    height: 8rem
                }

                .sm\:w-14 {
                    width: 3.5rem
                }

                .sm\:w-32 {
                    width: 8rem
                }

                .sm\:w-80 {
                    width: 20rem
                }

                .sm\:p-5 {
                    padding: 1.25rem
                }

                .sm\:p-6 {
                    padding: 1.5rem
                }

                .sm\:text-2xl {
                    font-size: 1.5rem;
                    line-height: 2rem
                }

                .sm\:text-3xl {
                    font-size: 1.875rem;
                    line-height: 2.25rem
                }

                .sm\:text-base {
                    font-size: 1rem;
                    line-height: 1.5rem
                }

                .sm\:text-lg {
                    font-size: 1.125rem;
                    line-height: 1.75rem
                }

                .sm\:text-sm {
                    font-size: .875rem;
                    line-height: 1.25rem
                }
            }

            @media (min-width:1024px) {
                .lg\:flex-shrink-0 {
                    flex-shrink: 0
                }

                .lg\:flex-row {
                    flex-direction: row
                }

                .lg\:items-start {
                    align-items: flex-start
                }

                .lg\:justify-between {
                    justify-content: space-between
                }

                .lg\:gap-4 {
                    gap: 1rem
                }

                .lg\:p-8 {
                    padding: 2rem
                }

                .lg\:text-right {
                    text-align: right
                }

                .lg\:text-base {
                    font-size: 1rem;
                    line-height: 1.5rem
                }
            }
    </style>
</head>

<body>

    <div id="invoice" class="w-full min-h-screen mx-auto bg-white shadow-lg">
        {{-- Header --}}
        <div class="p-4 text-white bg-gray-800 sm:p-6 ">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
                <div class="flex-1">
                    <div class="flex items-center justify-center w-12 h-12 mb-4 rounded-lg sm:h-14 sm:w-14">
                        @php
                            $logoPath = $generalSetting?->app_main_logo_dark
                                ? $generalSetting->app_main_logo_dark
                                : public_path('assets/images/Logo/256w.png');

                            try {
                                if (filter_var($logoPath, FILTER_VALIDATE_URL)) {
                                    // If it's AWS URL, fetch and encode
        $logoData = @file_get_contents($logoPath);
    } else {
        // If it's local file
                                    $logoData = @file_get_contents($logoPath);
                                }

                                $logoBase64 = $logoData ? 'data:image/png;base64,' . base64_encode($logoData) : null;
                            } catch (\Exception $e) {
                                $logoBase64 = null;
                            }
                        @endphp

                        @if ($logoBase64)
                            <img src="{{ $logoBase64 }}" alt="Logo" width="56" height="56"
                                style="display:block;" />
                        @else
                            <span>Logo</span>
                        @endif
                    </div>
                    <h1 class="text-xl font-bold break-words sm:text-2xl">
                        {{ $generalSetting->app_name }}
                    </h1>
                    <div class="mt-2 space-y-1">
                        <p class="text-sm text-white break-all sm:text-base">
                            {{ $generalSetting->contact_email }}
                        </p>
                        <p class="text-sm text-white break-words sm:text-base">
                            {{ $generalSetting->contact_number }}
                        </p>
                    </div>
                </div>
                <div class="text-left lg:flex-shrink-0 lg:text-right">
                    <h2 class="text-2xl font-bold sm:text-3xl">INVOICE</h2>
                    <div class="mt-4 text-white rounded-lg">
                        <p class="text-sm">Invoice No:</p>
                        <p class="text-lg font-bold">#{{ $order->order_no }}</p>
                        <p class="mt-2 text-sm">Date: {{ $order->added_at }}</p>
                    </div>
                    <p class="text-sm">
                        Status: <span class="font-medium">{{ ucfirst($order->status) }}</span>
                    </p>
                </div>
            </div>
        </div>

        {{-- Customer Info --}}
        <div class="p-4 border-b border-gray-200 sm:p-6 lg:p-8">
            <h3 class="mb-4 text-lg font-semibold text-gray-700">Customer Details:</h3>
            <div class="p-4 rounded-lg bg-gray-50 sm:p-5">
                <div class="space-y-1">
                    <p class="text-sm font-semibold text-gray-900 break-words sm:text-base">
                        {{ $order->customer->user->name }}
                    </p>
                    <p class="text-sm text-gray-600 break-words sm:text-base">
                        {{ $order->customer->address_line1 }},
                        {{ $order->customer->address_line2 ?? '' }}
                    </p>
                    <p class="text-sm text-gray-600 break-words sm:text-base">
                        {{ $order->customer->city }}
                    </p>
                    <p class="mt-2 text-sm text-gray-600 break-all sm:text-base">
                        {{ $order->customer->user->email }}
                    </p>
                    <p class="mt-2 text-sm text-gray-600 break-all sm:text-base">
                        {{ $order->customer->user->phone }}
                    </p>
                </div>
            </div>
        </div>

        {{-- Items --}}
        <div class="p-4 sm:p-6 lg:p-8">

            {{-- Desktop Table View --}}
            <div class="hidden overflow-x-auto sm:block">
                <table class="w-full min-w-[600px]">
                    <thead>
                        <tr class="border-b-2 border-gray-300">
                            <th class="px-2 py-3 text-sm font-semibold text-left text-gray-700 lg:text-base">Product
                            </th>
                            <th class="px-2 py-3 text-sm font-semibold text-left text-gray-700 lg:text-base">Capacity
                            </th>
                            <th class="px-2 py-3 text-sm font-semibold text-right text-gray-700 lg:text-base">Price
                            </th>
                            <th class="px-2 py-3 text-sm font-semibold text-center text-gray-700 lg:text-base">Qty</th>
                            <th class="px-2 py-3 text-sm font-semibold text-right text-gray-700 lg:text-base">Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderItems as $item)
                            <tr class="border-b border-gray-200 hover:bg-gray-50">
                                <td class="px-2 py-4 text-sm text-gray-900 break-words lg:text-base">
                                    {{ $item->smartphone->model_name->name }}
                                </td>
                                <td class="px-2 py-4 text-sm text-gray-600 break-words lg:text-base">
                                    {{ $item->smartphone->capacity->name }}
                                </td>
                                <td class="px-2 py-4 text-sm text-right text-gray-900 lg:text-base">
                                    {{ $currency->symbol }}{{ number_format($item->unit_price, 2) }}
                                </td>
                                <td class="px-2 py-4 text-sm text-center text-gray-900 lg:text-base">
                                    {{ $item->quantity }}
                                </td>
                                <td class="px-2 py-4 text-sm font-semibold text-right text-gray-900 lg:text-base">
                                    {{ $currency->symbol }}{{ number_format($item->sub_total, 2) }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{-- Totals --}}
            <div class="flex justify-end mt-6 sm:mt-8">
                <div class="w-full sm:w-80">
                    <div class="p-4 rounded-lg sm:p-6">
                        <div class="flex justify-between py-2">
                            <span class="text-base font-semibold text-gray-900 sm:text-lg">Total:</span>
                            <span class="text-base font-bold text-blue-600 break-words sm:text-lg">
                                {{ $currency->symbol }}{{ number_format($order->amount, 2) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Footer with QR --}}
        <div class="p-4 text-center border-t bg-gray-50 page-break sm:p-6 lg:p-8">
            <div class="flex justify-center mt-8 mb-6 sm:mb-8 sm:mt-12">
                <div class="text-center">
                    <div
                        class="flex items-center justify-center w-24 h-24 mx-auto mb-3 bg-gray-200 border-2 border-gray-400 border-dashed sm:h-32 sm:w-32">
                        <img src="data:image/png;base64, {!! base64_encode(
                            QrCode::format('png')->size(120)->generate(route('orders.customer-order-invoice', $order->order_no)),
                        ) !!}" alt="QR" class="w-full h-auto">
                    </div>
                    <p class="text-xs text-gray-500 sm:text-sm">Scan To Verify Invoice</p>
                </div>
            </div>
        </div>

    </div>

</body>

</html>
