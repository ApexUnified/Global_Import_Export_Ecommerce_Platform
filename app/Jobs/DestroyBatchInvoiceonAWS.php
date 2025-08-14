<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Str;

class DestroyBatchInvoiceonAWS implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        private array $files
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if (isset($this->files['invoices'])) {
            foreach ($this->files['invoices'] as $invoice) {

                $relative_path = Str::after($invoice, '.com/');

                if (Storage::disk('s3')->exists($relative_path)) {
                    Storage::disk('s3')->delete($relative_path);
                }
            }
        }
    }
}
