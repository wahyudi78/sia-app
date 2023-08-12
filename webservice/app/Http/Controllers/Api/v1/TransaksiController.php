<?php

namespace App\Http\Controllers\api\v1;

use Midtrans\Snap;
use App\Models\User;
use Midtrans\Config;
use App\Models\Siswa;
use App\Models\Transaksi;
use App\Models\Pembayaran;
use App\Http\Controllers\Controller;
use App\Http\Resources\SiswaResource;
use App\Http\Resources\TransaksiResource;
use App\Http\Requests\StoreTransaksiRequest;
use App\Http\Requests\UpdateTransaksiRequest;
use App\Http\Controllers\api\v1\TransaksiController;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = TransaksiResource::collection(Transaksi::all());
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
        
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransaksiRequest $request)
    {
        
        $pembayaran = Pembayaran::where('id', $request->pembayaran_id)->first();
        $user = User::where('id', $request->user_id)->first();
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = config('app.midtrans_server');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => rand(),
                'gross_amount' => $pembayaran->gross_amount,
            ),
            'customer_details' => array(
                'first_name' => $user->name,
                "billing_address" => array (
                    "address"=> $user->alamat,
                )
            
            ),
        );

            $snapToken = \Midtrans\Snap::getSnapToken($params);
            if($snapToken){
                $q = Transaksi::create($request->validated());
                $data = TransaksiResource::make($q);
                return response()->json([
                    'Status' => 200,
                    'message' => "Berhasil",
                    'data'  => $data,
                    'token'=> $snapToken
                ]);
            }
            return response()->json([
                'Status' => 200,
                'message' => "Gagal",
            ]);
        
        return $request;
    }
    /**
     * Display the specified resource.
     */
    public function show(Transaksi $transaksi)
    {
        $data = TransaksiResource::make($transaksi);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(Transaksi $transaksi)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    public function update(UpdateTransaksiRequest $request, Transaksi $transaksi)
    {
        $transaksi->update($request->validated());
        $data = TransaksiResource::make($transaksi);
        return response()->json([
            'Status' => 200,
            'message' => "Berhasil",
            'data'  => $data,
        ]);
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    public function destroy(Transaksi $transaksi)
    {
        $transaksi->delete();
        return response()->json([
            'Status' => 200,
            'message' => "Data berhasil dihapus"
        ]);
    }
    }