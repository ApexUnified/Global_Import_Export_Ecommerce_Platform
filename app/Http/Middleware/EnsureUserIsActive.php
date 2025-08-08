<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EnsureUserIsActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {

        if (Auth::check() && Auth::user()) {

            // dd($request->route()->getName());
            if ($request->route()->getName() !== 'logout') {
                if (Auth::user()->hasAnyRole(['Supplier', 'Collaborator', 'Customer']) && Auth::user()->is_active == 0) {
                    return Inertia::render('Dashboard/Errors/AccountDisabled');
                }

            }

        }

        return $next($request);
    }
}
