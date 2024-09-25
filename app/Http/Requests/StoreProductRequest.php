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
            'categories' => ['required', 'array'],
            'image' => ['nullable', 'image', 'max:2048'],
            'imageUrl' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'image.image' => 'The image must be a file of type: jpeg, png, jpg, gif, svg.',
            'image.max' => 'The image must not be greater than 2MB.',
        ];
    }
}
