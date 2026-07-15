export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  category: string;
  featured?: boolean;
}