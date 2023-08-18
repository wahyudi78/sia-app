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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->integer('nomor_induk');
            $table->date('tanggal_lahir');
            $table->string('agama');
            $table->string('alamat');
            $table->string('username')->unique();
            $table->string('password');
            $table->foreignId('ruangan_id')->nullable()->constrained()->nullOnDelete()->after('id');$table->integer('role');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::dropIfExists('users');
    }
};
