<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Numbers;
use App\Models\User;
use App\Models\Purchases;
use App\Models\PurchasedNumbers;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cria um array com números de 1 a 80
        $numbers = range(1, 80);

        // Insere os números na tabela 'numbers'
        foreach ($numbers as $number) {
            // Formata o número para ter 2 dígitos
            $formattedNumber = str_pad($number, 2, '0', STR_PAD_LEFT);
            Numbers::create(['number' => $formattedNumber]);
        }
        
        // Cria um usuário
        $user = User::create([
            'cpf'   => '01296041948',
            'name'  => 'Alan de Souza',
            'email' => 'thealanldf@gmail.com',
            'phone' => '49999663128',
            'cep'   => '12345678',
            'uf'    => 'SC',
            'city'  => 'Lages',
            'neighborhood' => 'Centro',
            'street' => 'Rua teste',
            'number' => '123',

        ]);

        // Cria uma compra associada ao usuário
        $purchase = Purchases::create([
            'user_id' => $user->id,
            'type' => 'pix',
            'value' => 100.00, // Valor da compra
            'status' => 'approved', // Status da compra
        ]);

        // Cria números comprados associados à compra
        $purchasedNumbers = [
            '1',
            '12',
            '22',
            '23',
            '34',
            '45',
            '49',
            '67',
            '78',
            '80',
        ];

        foreach ($purchasedNumbers as $number) {
            PurchasedNumbers::create([
                'purchase_id' => $purchase->id,
                'number_id' => $number,
            ]);
        }
    }
}