<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Guru;
use App\Models\Jadwal;
use App\Http\Controllers\Controller;
use App\Http\Resources\JadwalResource;
use App\Http\Requests\StoreJadwalRequest;
use App\Http\Requests\UpdateJadwalRequest;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = JadwalResource::collection(Jadwal::all());
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJadwalRequest $request)
    {
        $q = Jadwal::create($request->validated());
        $data =  JadwalResource::make($q);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Jadwal $jadwal)
    {
        $data =  JadwalResource::make($jadwal);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
        
    }

   
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJadwalRequest $request, Jadwal $jadwal)
    {
        $jadwal->update($request->validated());
        $data = JadwalResource::make($jadwal);
        return response()->json([
            'Status' => 200,
            'message' => "Data Berhasil diupdate",
            'data'  => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jadwal $jadwal)
    {
        $jadwal->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Data Berhasil dihapus"
        ]);
    }
}
