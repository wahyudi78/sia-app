<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Ruangan;
use App\Http\Controllers\Controller;
use App\Http\Resources\RuanganResource;
use App\Http\Requests\StoreRuanganRequest;
use App\Http\Requests\UpdateRuanganRequest;

class RuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = RuanganResource::collection(Ruangan::all());
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
    public function store(StoreRuanganRequest $request)
    {
        $q = Ruangan::create($request->validated());
        $data = RuanganResource::make($q);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ruangan $ruangan)
    {
        $data = RuanganResource::make($ruangan);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Ruangan $ruangan)
    // {
        
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRuanganRequest $request, Ruangan $ruangan)
    {
        $ruangan->update($request->validated());
        $data = RuanganResource::make($ruangan);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ruangan $ruangan)
    {
        $ruangan->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil"
        ]);
    }
}
