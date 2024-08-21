<?php

namespace App\Http\Requests\User;


use Illuminate\Foundation\Http\FormRequest;

class InsertUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'nullable|int',
            'cpf' => 'nullable|string|size:11',
            'cnpj' => 'nullable|string|size:14',
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'cep' => 'required|string',
            'uf' => 'required|string',
            'city' => 'required|string',
            'neighborhood' => 'required|string',
            'street' => 'required|string',
            'number' => 'required|string',
        ];
    }
}
