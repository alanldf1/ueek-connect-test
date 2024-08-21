<?php

namespace App\Http\Controllers;

use App\Models\Numbers;
use Illuminate\Http\Request;

class NumbersController extends Controller
{
    public function getNumbers()
    {
        // $numbers = Numbers::all();
        // return json_encode($numbers);
        $numbers = Numbers::with(['purchasedNumbers.purchase' => function ($query) {
            $query->select('id', 'status');
        }])->get();
    
        $result = $numbers->map(function ($number) {
            return [
                'number' => $number->number,
                'is_purchased' => $number->purchasedNumbers->isNotEmpty(),
                'purchase_status' => $number->purchasedNumbers->first()->purchase->status ?? null,
            ];
        });
    
        return json_encode($result);
    }
}
