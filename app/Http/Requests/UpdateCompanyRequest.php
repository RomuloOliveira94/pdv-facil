<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UpdateCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (Auth::user()->role == 'admin' || Auth::user()->role == 'manager') {
            return true;
        }
        return false;
    }

    public function prepareForValidation()
    {
        $image_path = '';

        if ($this->file('image')) {
            Storage::delete('public/' . $this->logo);

            $image = $this->file('image');
            $image_name = time() . '_' . $image->getClientOriginalName();
            $image_path = $this->image->storeAs('public/images', $image_name);
            $image_path = str_replace('public/', '', $image_path);
        }

        $this->merge([
            'logo' => $image_path ? $image_path : $this->logo,
        ]);
    }


    public function rules(): array
    {
        return [
            'name' => ['required','string', 'max:255'],
            'cnpj' => ['nullable', 'string', 'min:18', 'max:18'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'phone' => ['required', 'string', 'min:11', 'max:15'],
            'address' => ['required', 'string', 'max:255'],
            'address_number' => ['required', 'string', 'max:255'],
            'address_complement' => ['nullable', 'string', 'max:255'],
            'neighborhood' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'zip_code' => ['required', 'string', 'min:8'],
            'pix_key' => ['nullable', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'max:2048'],
            'payment_types' => 'array',
        ];
    }

    public function messages(): array
    {
        return [
            'logo.image' => 'The logo must be a file of type: jpeg, png, jpg, gif, svg.',
            'logo.max' => 'The logo must not be greater than 2MB.',
        ];
    }
}
