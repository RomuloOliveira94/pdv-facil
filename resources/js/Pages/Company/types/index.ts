export interface Company {
    id: number;
    name: string;
    email: string;
    logo: string;
    logo_url: string;
    cnpj: string;
    phone: string;
    address: string;
    address_number: string;
    address_complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    pix_key: string;
    payment_types: PaymentTypes[];
}

export interface PaymentTypes {
    id: number;
    name: string;
    code: string;
}
