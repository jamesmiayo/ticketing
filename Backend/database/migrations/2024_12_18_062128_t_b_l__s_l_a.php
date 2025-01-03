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
        Schema::create('TBL_SLA', function (Blueprint $table) {
            $table->id(); 
            $table->string('SLA_ID')->unique(); 
            $table->string('priority_label')->nullable(); 
            $table->string('priority_color')->nullable(); 
            $table->time('response_time')->nullable(); 
            $table->timestamps(); 
            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('TBL_SLA');
    }
};