import { Product } from "@domain/entities/product.entity";

export interface ProductService {
  getAllProducts(filters: any): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  createProduct(data: any): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
}