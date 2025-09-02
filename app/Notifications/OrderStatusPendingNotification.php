<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderStatusPendingNotification extends Notification implements ShouldQueue
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
        return (new MailMessage)
            ->subject('Your Order Has Been Placed Successfully')
            ->greeting('Hello '.$notifiable->name.',')
            ->line('We’re pleased to inform you that your order has been placed successfully.')
            ->line('**Order Number:** '.$this->order->order_no)
            ->line('**Current Status:**  Pending')
            ->line('To complete your order, please make the payment using the bank details provided on the order page.')
            ->line('You can also track the progress of your order anytime from your account’s order page.')
            ->line('Thank you for shopping with us! We truly value your trust and look forward to serving you again.');
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
