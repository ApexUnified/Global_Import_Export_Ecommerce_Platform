<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('aws_settings', function (Blueprint $table) {
            $table->id();
            $table->longText('aws_access_key_id');
            $table->longText('aws_secret_access_key');
            $table->string('aws_region');
            $table->string('aws_bucket')->unique();
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aws_settings');
    }
};
