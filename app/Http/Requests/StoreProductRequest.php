<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (Auth::user()->role === 'manager' || Auth::user()->role === 'admin') {
            return true;
        }

        return false;
    }

    public function messages(): array
    {
        return [
            'image.image' => 'A imagem deve ser um arquivo do tipo: jpeg, png, jpg, gif, svg.',
            'image.max' => 'A imagem não pode ser maior que 2MB.',
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'price' => str_replace('R$', '', $this->price),
            'company_id' => Auth::user()->company_id,
        ]);
    }
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'categories' => ['nullable', 'array'],
            'image' => ['nullable', 'image', 'max:2048'],
            'imageUrl' => ['nullable', 'string', 'max:255'],
        ];
    }
}
