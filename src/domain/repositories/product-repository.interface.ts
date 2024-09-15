import { Product } from '@domain/entities/product.entity';

export interface ProductRepository {
  findAll(filters: any): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}

