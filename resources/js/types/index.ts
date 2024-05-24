import { Company } from "@/Pages/Company/types";

export interface Flash {
    message: string;
    error: string;
    success: string;
}

export interface User {
    id: number;
    name: string;
    company: Company;
    role: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}
