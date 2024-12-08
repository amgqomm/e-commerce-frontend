export class Product {
    id: number | undefined;
    name: string | undefined;
    price: number | undefined;
    category: string | undefined;
    rating: number | undefined;
    description: string | undefined;
    color?: string | undefined;
    stock: boolean | undefined;
    sku: string | undefined;
    code: string | undefined;
    imageUrls: string[] = [];
}  