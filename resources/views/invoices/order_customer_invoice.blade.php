<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice - {{ $order->order_no }}</title>
</head>

<body style="margin: 0; line-height: 1.5; font-family: notosanskr; box-sizing: border-box;">

    <div id="invoice"
        style="width: 100%; min-height: 100vh; margin-left: auto; margin-right: auto;
           background-color: #ffffff;
          ">
        {{-- Header --}}
        <div style="padding: 1rem; color: rgb(255, 255, 255); background-color: rgb(31, 41, 55);">
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <div style="flex: 1 1 0%;">
                    <div
                        style="display: flex; align-items: center; justify-content: center; width: 3rem; height: 3rem; margin-bottom: 1rem; border-radius: .5rem;">
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
                    <h1
                        style="font-size: 1.25rem; line-height: 1.75rem; font-weight: 700; overflow-wrap: break-word; margin: 0;">
                        {{ $generalSetting->app_name }}
                    </h1>
                    <div style="margin-top: .5rem;">
                        <p
                            style="font-size: .875rem; line-height: 1.25rem; color: rgb(255, 255, 255); word-break: break-all; margin: 0; margin-bottom: .25rem;">
                            {{ $generalSetting->contact_email }}
                        </p>
                        <p
                            style="font-size: .875rem; line-height: 1.25rem; color: rgb(255, 255, 255); overflow-wrap: break-word; margin: 0;">
                            {{ $generalSetting->contact_number }}
                        </p>
                    </div>
                </div>
                <div style="text-align: left;">
                    <h2 style="font-size: 1.5rem; line-height: 2rem; font-weight: 700; margin: 0;">INVOICE</h2>
                    <div style="margin-top: 1rem; color: rgb(255, 255, 255); border-radius: .5rem;">
                        <p style="font-size: .875rem; line-height: 1.25rem; margin: 0;">Invoice No:</p>
                        <p style="font-size: 1.125rem; line-height: 1.75rem; font-weight: 700; margin: 0;">
                            #{{ $order->order_no }}</p>
                        <p style="margin-top: .5rem; font-size: .875rem; line-height: 1.25rem; margin-bottom: 0;">Date:
                            {{ $order->added_at }}</p>
                    </div>
                    <p style="font-size: .875rem; line-height: 1.25rem; margin: 0;">
                        Status: <span style="font-weight: 500;">{{ ucfirst($order->status) }}</span>
                    </p>
                </div>
            </div>
        </div>

        {{-- Customer Info --}}
        <div style="padding: 1rem; border-bottom-width: 1px; border-color: rgb(229, 231, 235);">
            <h3
                style="margin-bottom: 1rem; font-size: 1.125rem; line-height: 1.75rem; font-weight: 600; color: rgb(55, 65, 81); margin-top: 0;">
                Customer Details:</h3>
            <div style="padding: 1rem; border-radius: .5rem; background-color: rgb(249, 250, 251);">
                <div>
                    <p
                        style="font-size: .875rem; line-height: 1.25rem; font-weight: 600; color: rgb(17, 24, 39); overflow-wrap: break-word; margin: 0; margin-bottom: .25rem;">
                        {{ $order->customer->user->name }}
                    </p>
                    <p
                        style="font-size: .875rem; line-height: 1.25rem; color: rgb(75, 85, 99); overflow-wrap: break-word; margin: 0; margin-bottom: .25rem;">
                        {{ $order->customer->address_line1 }},
                        {{ $order->customer->address_line2 ?? '' }}
                    </p>
                    <p
                        style="font-size: .875rem; line-height: 1.25rem; color: rgb(75, 85, 99); overflow-wrap: break-word; margin: 0; margin-bottom: .25rem;">
                        {{ $order->customer->city }}
                    </p>
                    <p
                        style="margin-top: .5rem; font-size: .875rem; line-height: 1.25rem; color: rgb(75, 85, 99); word-break: break-all; margin-bottom: .25rem;">
                        {{ $order->customer->user->email }}
                    </p>
                    <p
                        style="margin-top: .5rem; font-size: .875rem; line-height: 1.25rem; color: rgb(75, 85, 99); word-break: break-all; margin-bottom: 0;">
                        {{ $order->customer->user->phone }}
                    </p>
                </div>
            </div>
        </div>

        {{-- Items --}}
        <div style="padding: 1rem;">

            {{-- Desktop Table View --}}
            <div style="overflow-x: auto;">
                <table
                    style="width: 100%; min-width: 600px; text-indent: 0; border-color: inherit; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom-width: 2px; border-color: rgb(209, 213, 219);">
                            <th
                                style="padding-left: .5rem; padding-right: .5rem; padding-top: .75rem; padding-bottom: .75rem; font-size: .875rem; line-height: 1.25rem; font-weight: 600; text-align: left; color: rgb(55, 65, 81);">
                                Product</th>
                            <th
                                style="padding-left: .5rem; padding-right: .5rem; padding-top: .75rem; padding-bottom: .75rem; font-size: .875rem; line-height: 1.25rem; font-weight: 600; text-align: left; color: rgb(55, 65, 81);">
                                Capacity</th>
                            <th
                                style="padding-left: .5rem; padding-right: .5rem; padding-top: .75rem; padding-bottom: .75rem; font-size: .875rem; line-height: 1.25rem; font-weight: 600; text-align: right; color: rgb(55, 65, 81);">
                                Price</th>
                            <th
                                style="padding-left: .5rem; padding-right: .5rem; padding-top: .75rem; padding-bottom: .75rem; font-size: .875rem; line-height: 1.25rem; font-weight: 600; text-align: center; color: rgb(55, 65, 81);">
                                Qty</th>
                            <th
                                style="padding-left: .5rem; padding-right: .5rem; padding-top: .75rem; padding-bottom: .75rem; font-size: .875rem; line-height: 1.25rem; font-weight: 600; text-align: right; color: rgb(55, 65, 81);">
                                Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderItems as $item)
                            <tr style="border-bottom-width: 1px; border-color: rgb(229, 231, 235);">
                                <td
                                    style="padding-left: .5rem; padding-right: .5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: .875rem; line-height: 1.25rem; color: rgb(17, 24, 39); overflow-wrap: break-word;">
                                    {{ $item->smartphone->model_name->name }}
                                </td>
                                <td
                                    style="padding-left: .5rem; padding-right: .5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: .875rem; line-height: 1.25rem; color: rgb(75, 85, 99); overflow-wrap: break-word;">
                                    {{ $item->smartphone->capacity->name }}
                                </td>
                                <td
                                    style="padding-left: .5rem; padding-right: .5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: .875rem; line-height: 1.25rem; text-align: right; color: rgb(17, 24, 39);">
                                    {{ $currency->symbol }}{{ number_format($item->unit_price, 2) }}
                                </td>
                                <td
                                    style="padding-left: .5rem; padding-right: .5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: .875rem; line-height: 1.25rem; text-align: center; color: rgb(17, 24, 39);">
                                    {{ $item->quantity }}
                                </td>
                                <td
                                    style="padding-left: .5rem; padding-right: .5rem; padding-top: 1rem; padding-bottom: 1rem; font-size: .875rem; line-height: 1.25rem; text-align: right; color: rgb(17, 24, 39);">
                                    {{ $currency->symbol }}{{ number_format($item->sub_total, 2) }}
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{-- Totals --}}
            <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
                <div style="width: 20rem;">
                    <div style="padding: 1rem;">
                        <div
                            style="display: flex; justify-content: space-between; padding-top: .5rem; padding-bottom: .5rem;">
                            <span
                                style="font-size: 1rem; line-height: 1.5rem; font-weight: 600; color: rgb(17, 24, 39);">Total:</span>
                            <span
                                style="font-size: 1rem; line-height: 1.5rem; font-weight: 700; color: rgb(37, 99, 235); overflow-wrap: break-word;">
                                {{ $currency->symbol }}{{ number_format($order->amount, 2) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- Footer with QR --}}


        <div
            style="padding: 1rem; text-align: center; border-top: 1px solid #000; background-color: rgb(249, 250, 251);  page-break-before: auto;">
            <div style="display: flex; justify-content: center; margin-top: 2rem; margin-bottom: 1.5rem;">
                <div style="text-align: center;">
                    <div
                        style="display: flex; align-items: center; justify-content: center; width: 6rem; height: 6rem; margin: 0 auto .75rem auto; background-color: rgb(229, 231, 235); border: 2px dashed rgb(156, 163, 175);">
                        <img src="data:image/png;base64, {!! base64_encode(
                            QrCode::format('png')->size(120)->generate(route('orders.customer-order-invoice', $order->order_no)),
                        ) !!}" alt="QR"
                            style="width: 100%; height: auto;">
                    </div>
                    <p style="font-size: .75rem; line-height: 1rem; color: rgb(107, 114, 128); margin: 0;">Scan To
                        Verify Invoice</p>
                </div>
            </div>
        </div>



    </div>

</body>

</html>
