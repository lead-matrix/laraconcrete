<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('estimates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tenant_id')->index();
            $table->string('estimate_number');
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('project_title');
            $table->enum('status', ['Draft', 'Sent', 'Approved', 'Declined', 'Invoiced'])->default('Draft');
            $table->decimal('direct_cost_total', 12, 2)->default(0.00);
            $table->decimal('overhead_multiplier', 5, 2)->default(1.15);
            $table->decimal('target_profit_margin_pct', 5, 2)->default(35.00);
            $table->decimal('calculated_price', 12, 2)->default(0.00);
            $table->decimal('deposit_required_pct', 5, 2)->default(30.00);
            $table->foreign('tenant_id')->references('id')->on('tenants')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('estimate_line_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('estimate_id')->index();
            $table->string('description');
            $table->enum('category', ['Materials', 'Labor', 'Equipment', 'Subcontractor', 'Permits']);
            $table->decimal('quantity', 10, 2);
            $table->string('unit');
            $table->decimal('unit_cost', 10, 2);
            $table->decimal('total_cost', 12, 2);
            $table->foreign('estimate_id')->references('id')->on('estimates')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('estimate_line_items');
        Schema::dropIfExists('estimates');
    }
};
