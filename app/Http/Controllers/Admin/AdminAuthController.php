<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);



            if (!Auth::guard('admin')->attempt($credentials, $remember)) {
                return response([
                    'error' => 'The credentials are not correct'
                ], 422);
            }
            /** @var \App\Models\Admin $admin */
            $admin = Auth::guard('admin')->user();
            $token = $admin->createToken('main', ['role:admin'])->plainTextToken;





        return response([
            'admin' => $admin,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\Admin  $admin*/
        $admin = request()->user();
        $admin->tokens()->where('id', $admin->currentAccessToken()->id)->delete();

        return response([
            'success' => true
        ]);
    }


    public function me(Request $request)
    {
        return $request->user();
    }
}
