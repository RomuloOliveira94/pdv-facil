export interface Product {
    id: number;
    name: string;
    price: number;
    categories: [];
    imageUrl: string;
    image: string;
}

export interface ProductWithPaginate {
    data: Product[];
    links: any;
}
