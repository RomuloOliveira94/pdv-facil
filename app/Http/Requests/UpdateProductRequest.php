<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        if (Auth::user()->role === 'manager' || Auth::user()->role === 'admin') {
            return true;
        }

        return false;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'price' => str_replace('R$', '', $this->price),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'categories' => ['nullable', 'array'],
            'image' => ['nullable', 'image', 'max:2048'],
            'imageUrl' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'image.image' => 'A imagem deve ser um arquivo do tipo: jpeg, png, jpg, gif, svg.',
            'image.max' => 'A imagem não pode ser maior que 2MB.',
        ];
    }
}
