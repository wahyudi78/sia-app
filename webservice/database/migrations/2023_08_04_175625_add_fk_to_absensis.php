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
        Schema::table('absensis', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete()->after('id');
            $table->foreignId('jadwal_id')->nullable()->constrained()->nullOnDelete()->after('id');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('absensis', function (Blueprint $table) {
             $table->dropForeign(['user_id']);
             $table->dropColumn(['user_id']);
             $table->dropForeign(['jadwal_id']);
             $table->dropColumn(['jadwal_id']);
             
        });
    }
};
