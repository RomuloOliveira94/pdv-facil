<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSellRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (auth()->user()) {
            return true;
        }
        return false;
    }

    public function prepareForValidation()
    {
        $this->merge([
            'delivery_tax' => floatval(str_replace('R$', '', str_replace(',', '.', $this->delivery_tax))),
            'discount' => floatval(str_replace('R$', '', str_replace(',', '.', $this->discount))),
            'subtotal' => floatval(str_replace('R$', '', str_replace(',', '.', $this->subtotal))),
            'total' => floatval(str_replace('R$', '', str_replace(',', '.', $this->total))),
        ]);
    }

    public function rules(): array
    {
        return [
            'payment_type_id' => 'required|exists:payment_types,id',
            'delivery_tax' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
        ];
    }
}
