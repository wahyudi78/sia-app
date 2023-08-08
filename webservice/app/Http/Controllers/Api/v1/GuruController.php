<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Guru;
use App\Http\Controllers\Controller;
use App\Http\Resources\GuruResource;
use App\Http\Requests\StoreGuruRequest;
use App\Http\Requests\UpdateGuruRequest;
use App\Models\Obra;


class GuruController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = GuruResource::collection(Guru::all());
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuruRequest $request)
    {
        $q = Guru::create($request->validated());
        $data =  GuruResource::make($q);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Guru $guru)
    {
        $data = GuruResource::make($guru);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Guru $guru)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGuruRequest $request, Guru $guru)
    {
        $guru->update($request->validated());
        $data = GuruResource::make($guru);
        return response()->json([
            'Status' => 200,
            'message' => "Data Berhasil diupate",
            'data'  => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Guru $guru)
    {
        $guru->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Data Berhasil dihapus"
        ]);
    }
}
