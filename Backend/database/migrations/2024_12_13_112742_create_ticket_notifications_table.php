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
        Schema::create('ticket_notifications', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_notification_id');
            $table->unsignedBigInteger('ticket_id');
            $table->foreign('ticket_id')->references('id')->on('ticket_hdrs')->onDelete('cascade');
            $table->unsignedBigInteger('from_user');
            $table->foreign('from_user')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('to_user');
            $table->foreign('to_user')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_notifications');
    }
};
