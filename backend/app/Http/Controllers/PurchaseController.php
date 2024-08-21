<?php

namespace App\Http\Controllers;

use App\Models\Purchases;
use App\Models\PurchasedNumbers;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function saveNewPurchase(Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string', // Ajuste se necessário
            'selectedNumbers' => 'required|array',
            'userId' => 'required|integer|exists:users,id',
            'value' => 'required|numeric',
            'paymentMethod' => 'required|string',
        ]);

        try {
            $purchase = new Purchases();

            $purchase->user_id = $validated['userId'];
            $purchase->type = $validated['paymentMethod'];
            $purchase->value = $validated['value'];
            $purchase->status = $validated['status'];
            $purchase->save();

            if($purchase->id){
                foreach ($validated['selectedNumbers'] as $number) {
                    PurchasedNumbers::create([
                        'purchase_id' => $purchase->id,
                        'number_id' => $number,
                    ]);
                }
            }

            return response()->json(['message' => 'Compra realizada com sucesso!', 'purchase' => $purchase], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
