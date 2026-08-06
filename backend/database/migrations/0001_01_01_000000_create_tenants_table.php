<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('domain')->nullable()->unique();
            $table->string('primary_color')->default('#3b82f6');
            $table->enum('plan', ['Starter', 'Pro', 'Enterprise'])->default('Starter');
            $table->enum('status', ['active', 'suspended', 'trialing'])->default('active');
            $table->boolean('footer_attribution_enabled')->default(true); // Configurable attribution
            $table->boolean('white_label_enabled')->default(false);
            $table->json('settings')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};
