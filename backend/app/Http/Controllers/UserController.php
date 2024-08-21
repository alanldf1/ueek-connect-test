<?php

namespace App\Http\Controllers;


use App\Http\Requests\User\InsertUserRequest;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function saveNewUser(InsertUserRequest $request)
    {
        $validated = $request->validated();

        // Verifica se o ID do usuário foi enviado na requisição
        if (isset($validated['id'])) {
            // Tenta encontrar o usuário existente pelo ID
            $user = User::find($validated['id']);
        } else {
            // Verifica se o usuário existe pelo CPF ou CNPJ
            $user = User::where('cpf', $validated['cpf'])
                ->orWhere('cnpj', $validated['cnpj'])
                ->first();
        }

        if ($user) {
            // Atualiza as informações do usuário existente
            $user->cpf = isset($validated['cpf']) && $validated['cpf'] !== $user->cpf ? $validated['cpf'] : $user->cpf;
            $user->cnpj = isset($validated['cnpj']) && $validated['cnpj'] !== $user->cnpj ? $validated['cnpj'] : $user->cnpj;
            $user->name = isset($validated['name']) && $validated['name'] !== $user->name ? $validated['name'] : $user->name;
            $user->email = isset($validated['email']) && $validated['email'] !== $user->email ? $validated['email'] : $user->email;
            $user->phone = isset($validated['phone']) && $validated['phone'] !== $user->phone ? $validated['phone'] : $user->phone;
            $user->cep = isset($validated['cep']) && $validated['cep'] !== $user->cep ? $validated['cep'] : $user->cep;
            $user->uf = isset($validated['uf']) && $validated['uf'] !== $user->uf ? $validated['uf'] : $user->uf;
            $user->city = isset($validated['city']) && $validated['city'] !== $user->city ? $validated['city'] : $user->city;
            $user->neighborhood = isset($validated['neighborhood']) && $validated['neighborhood'] !== $user->neighborhood ? $validated['neighborhood'] : $user->neighborhood;
            $user->street = isset($validated['street']) && $validated['street'] !== $user->street ? $validated['street'] : $user->street;
            $user->number = isset($validated['number']) && $validated['number'] !== $user->number ? $validated['number'] : $user->number;

            $user->save();

            // Retorna uma resposta de sucesso indicando que o usuário foi atualizado
            return response()->json(['message' => 'Usuário atualizado com sucesso!', 'user' => $user], 200);
        } else {
            try {
                $user = new User();

                $user->cpf = $validated['cpf'];
                $user->cnpj = $validated['cnpj'];
                $user->name = $validated['name'];
                $user->email = $validated['email'];
                $user->phone = $validated['phone'];
                $user->cep = $validated['cep'];
                $user->uf = $validated['uf'];
                $user->city = $validated['city'];
                $user->neighborhood = $validated['neighborhood'];
                $user->street = $validated['street'];
                $user->number = $validated['number'];

                $user->save();

                // Retorna uma resposta de sucesso
                return response()->json(['message' => 'Usuário criado com sucesso!', 'user' => $user], 201);
            } catch (\Exception $e) {
                return response()->json(['message' => $e->getMessage()], 400);
            }
        }
    }

    public function getUserByDocument(Request $request)
    {
        $validated = $request->validate([
            'document' => 'required|string',
        ]);

        $cleanedDocument = str_replace(['.', '-', '/'], '', $validated['document']);
        $userData = new User();
        $user = $userData->where('cpf', $cleanedDocument)
            ->orWhere('cnpj', $cleanedDocument)
            ->first();

        if ($user) {
            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['message' => 'Usuário não encontrado'], 404);
        }
    }
}
