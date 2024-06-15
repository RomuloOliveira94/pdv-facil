import { Cashier } from "@/Pages/Cashiers/types";
import { Company } from "@/Pages/Company/types";
import { Product } from "@/Pages/Products/types";

export interface Sell {
    id: number;
    company_id: number;
    company: Company;
    products: Product[];
    user_id: number;
    payment_type: PaymentMethods;
    cashier: Cashier;
    delivery_tax: number;
    discount: number;
    subtotal: number;
    total: number;
    created_at: string;
}

export interface SellWithPaginate {
    data: Sell[];
    links: any;
}

export interface ProductWithPaginate {
    data: Product[];
    links: any;
}

export interface PaymentMethods {
    id: number;
    name: string;
    code: string;
}
