<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signUp(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return response([
            'user' => new UserResource($user),
        ], 201);
    }

    public function login(LoginRequest $request)
    {

        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);


            if (!Auth::attempt($credentials, $remember)) {
                return response([
                    'error' => 'The credentials are not correct'
                ], 422);
            }
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $ability = $user->is_admin ? 'admin' : '*';
            $token = $user->createToken('main', [$ability], now()->addMinutes(120))->plainTextToken;

            $response = [
                'user' => new UserResource($user),
                'token' => $token,
            ];

            return response($response);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        if (Auth::check()) {
            $user = $request->user();
            $user->currentAccessToken()->delete();
        }

        return response()->json(['message' => 'Successfully logged out.']);
    }


    public function  getMe(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $response = [
            'user' => new UserResource($user)
        ];
        return response($response);
    }

}
