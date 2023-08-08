<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Pembayaran;
use App\Http\Controllers\Controller;
use App\Http\Resources\PembayaranResource;
use App\Http\Requests\StorePembayaranRequest;
use App\Http\Requests\UpdatePembayaranRequest;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = PembayaranResource::collection(Pembayaran::all());
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
    public function store(StorePembayaranRequest $request)
    {
        $q = Pembayaran::create($request->validated());
        $data = PembayaranResource::make($q);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pembayaran $pembayaran)
    {
        
        $data = PembayaranResource::make($pembayaran);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Pembayaran $pembayaran)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePembayaranRequest $request, Pembayaran $pembayaran)
    {
        $pembayaran->update($request->validated());
        $data = PembayaranResource::make($pembayaran);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pembayaran $pembayaran)
    {
        $pembayaran->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
        ]);
    }
}
