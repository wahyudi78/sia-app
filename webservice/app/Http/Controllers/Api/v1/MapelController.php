<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Mapel;
use App\Http\Controllers\Controller;
use App\Http\Resources\MapelResource;
use App\Http\Requests\StoreMapelRequest;
use App\Http\Requests\UpdateMapelRequest;

class MapelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = MapelResource::collection(Mapel::all());
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
    public function store(StoreMapelRequest $request)
    {
        $q = Mapel::create($request->validated());
        $data =  MapelResource::make($q);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mapel $mapel)
    {
        $data = MapelResource::make($mapel);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Mapel $mapel)
    // {
        
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMapelRequest $request, Mapel $mapel)
    {
        $mapel->update($request->validated());
        $data = MapelResource::make($mapel);
        return response()->json([
            'Status' => 200,
            'message' => "Data Berhasil diupdate",
            'data'  => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mapel $mapel)
    {
        $mapel->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Data Berhasil dihapus",
        ]);
    }
}
