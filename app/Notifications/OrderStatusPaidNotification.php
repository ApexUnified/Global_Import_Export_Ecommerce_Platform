<?php

namespace App\Notifications;

use App\Models\Order;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Cache;

class OrderStatusPaidNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        private Order $order
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        $pdf = Pdf::loadView('invoices.order_customer_invoice', [
            'order' => $this->order,
            'currency' => Cache::get('currency'),
            'generalSetting' => Cache::get('general_config'),
        ]);

        return (new MailMessage)
            ->subject('Payment Received – Thank You for Your Order')
            ->greeting('Hello '.$notifiable->name.',')
            ->line('Thank you for your payment! We’ve successfully received your payment for your order.')
            ->line('**Order Number:** '.$this->order->order_no)
            ->line('**Current Status:**  Paid')
            ->line('Your order is now being processed and will be prepared for shipment shortly.')
            ->line('You can track the progress of your order anytime from your account’s order page.')
            ->line('We truly appreciate your trust in us and look forward to delivering your order soon.')
            ->attachData($pdf->output(), "invoice-{$this->order->order_no}.pdf", [
                'mime' => 'application/pdf',
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
