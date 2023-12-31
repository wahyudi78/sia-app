<?php
// edit namespace 'namespace App\Http\Controllers\Api\v1;'
// import controller 'use App\Http\Controllers\Controller;'


namespace App\Http\Controllers\Api\v1;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\SiswaResource;
use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateSiswaRequest;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = SiswaResource::collection(User::all())->whereStrict ('role',3);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'=> $data
        ]);
    }

    /**`
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiswaRequest $request)
    {
        $q = Siswa::create($request->validated());
        $data = SiswaResource::make($q);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show( User $user)
    {
        
        $data = SiswaResource::make($user);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Siswa $siswa)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiswaRequest $request, Siswa $siswa)
    {
        $siswa->update($request->validated());
        $data = SiswaResource::make($siswa);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil"
        ]);
    }
}
