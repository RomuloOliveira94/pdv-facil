export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
}

export interface ProductWithPaginate {
    data: Product[];
    links: any;
}
