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
        Schema::create('purchased_numbers', function (Blueprint $table) {
            $table->id()->primary();
            $table->unsignedBigInteger('purchase_id');
            $table->unsignedBigInteger('number_id');
            $table->timestamps();
            
            $table->foreign('purchase_id')->references('id')->on('purchase')->onDelete('cascade');
            $table->foreign('number_id')->references('id')->on('numbers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchased_numbers');
    }
};
