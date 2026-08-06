<?php

namespace App\Services;

class EstimatorService
{
    /**
     * Calculate total price with overhead multiplier and target profit margin safeguard.
     */
    public function calculateQuote(array $lineItems, float $overheadPct = 15.0, float $targetMarginPct = 38.0): array
    {
        $directCostTotal = 0.0;
        foreach ($lineItems as $item) {
            $directCostTotal += ($item['quantity'] * $item['unitCost']);
        }

        $overheadMultiplier = 1 + ($overheadPct / 100);
        $costWithOverhead = $directCostTotal * $overheadMultiplier;

        $marginDecimal = $targetMarginPct / 100;
        $finalSellingPrice = $marginDecimal < 1.0 
            ? $costWithOverhead / (1 - $marginDecimal) 
            : $costWithOverhead;

        $netProfitDollars = $finalSellingPrice - $costWithOverhead;

        return [
            'direct_cost_total' => round($directCostTotal, 2),
            'cost_with_overhead' => round($costWithOverhead, 2),
            'selling_price' => round($finalSellingPrice, 2),
            'net_profit_dollars' => round($netProfitDollars, 2),
            'margin_pct' => $targetMarginPct,
            'is_margin_locked' => $targetMarginPct >= 30.0
        ];
    }
}
