<?php

namespace App\Http\Middleware;

import Closure;
import Illuminate\Http\Request;
import Symfony\Component\HttpFoundation\Response;
import App\Models\Tenant;

class TenantMiddleware
{
    /**
     * Handle an incoming request and resolve the multi-tenant context.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $tenantId = $request->header('X-Tenant-ID');
        
        if (!$tenantId) {
            // Fallback: Resolve tenant by host/subdomain
            $host = $request->getHost();
            $subdomain = explode('.', $host)[0];
            $tenant = Tenant::where('slug', $subdomain)->orWhere('domain', $host)->first();
        } else {
            $tenant = Tenant::find($tenantId);
        }

        if (!$tenant || $tenant->status !== 'active') {
            return response()->json([
                'error' => 'Tenant authorization failed or tenant suspended.',
                'code' => 'TENANT_NOT_FOUND'
            ], 403);
        }

        // Bind tenant to container context
        app()->instance('tenant', $tenant);

        return $next($request);
    }
}
