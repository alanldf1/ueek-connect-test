<?php

namespace Database\Seeders;

use App\Models\Numbers;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            Numbers::create(['number' => $number]);
        }
    }
}
