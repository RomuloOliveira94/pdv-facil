import { Company } from "@/Pages/Company/types";
import { User } from "vendor/laravel/breeze/stubs/inertia-react-ts/resources/js/types";

export interface Cashier {
    id: number;
    user_id: number;
    user: User;
    company_id: number;
    company: Company;
    total: number;
    active: boolean;
    created_at: string;
}
