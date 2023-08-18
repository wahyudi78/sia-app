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
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('pembayaran');
            $table->string('bulan');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete()->after('id');
            $table->integer('order_id');
            $table->bigInteger('total');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $table->dropForeign(['user_id']);
        $table->dropColumn(['user_id']);
        Schema::dropIfExists('pembayarans');
    }
};
