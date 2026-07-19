export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price?: string;
  featured?: boolean;
};


export const products: Product[] = [];