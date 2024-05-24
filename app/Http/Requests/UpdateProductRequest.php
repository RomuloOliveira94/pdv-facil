<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        $image_path = '';

        if ($this->file('image')) {
            Storage::delete('public/' . $this->imageUrl);

            $image = $this->file('image');
            $image_name = time() . '_' . $image->getClientOriginalName();
            $image_path = $this->image->storeAs('public/products', $image_name);
            $image_path = str_replace('public/', '', $image_path);
        }

        $this->merge([
            'price' => str_replace('R$', '', $this->price),
            'imageUrl' => $image_path ? $image_path : $this->imageUrl,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'category' => ['nullable', 'string', 'max:255'],
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
