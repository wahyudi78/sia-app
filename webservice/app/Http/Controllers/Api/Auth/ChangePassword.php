<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\Guru;
use App\Models\User;
use App\Models\Siswa;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ChangePassword extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
         # Validation
         $request->validate([
            'old_password' => 'required',
            'new_password' => 'required',
        ]);

       


        #Match The Old Password
       


        #Update the new Password
        $user = User::where('id', $request->id)->first();

        if(!$user || !Hash::check($request->old_password, $user->password)){
            throw ValidationException::withMessages([
                // 'old password' => 'tidak sesuai'
            ]);
        }
            $user->update([
                'password' =>$request->new_password
            ]);
        

        return response()->json([
            'status'  => 200,
            'message'  =>"berhasil",
            
        ]);
    }
}
