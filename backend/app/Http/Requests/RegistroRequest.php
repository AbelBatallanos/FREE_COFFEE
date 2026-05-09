<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password as PassordRules;
use Override;

class RegistroRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => ['required','string','confirmed', PassordRules::min(8)->letters()->numbers()->symbols()],
        ];
    }

    #[Override]
    public function messages()
    {
        return [
            "name"=> "El Nombre es obligatorio",
            "email.required"=> "El Email es obligatorio",
            "email.email"=> "El Email noe es valido",
            "email.unique"=> "El Email ya esta registrado, intenta con otro email",
            "password"=> "El password debe ser almenos 8 caracteres y debe de contener almenos 1 simbolo, 1 numero y una Letra Mayuscula"
        ];
    }
}
