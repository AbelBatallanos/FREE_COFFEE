<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistroRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Soap\Sdl;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json(["mensaje"=>"Credenciales invalidas", "request" => $request->all()], 422);
        }
        $user = Auth::user();
       return response()->json(['message' => 'Login successful', "token"=> $user->createToken('token')->plainTextToken, "user" => $user]);
    }
    public function logout()
    {
        $user = auth()->user();

        // Elimina el token actual
        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ]);
    }

    public function register(RegistroRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
        ]);

        return response()->json(['message' => 'Registration successful', "token"=> $user->createToken('token')->plainTextToken, "user" => $user]); 
    }
}
