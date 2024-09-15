import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductRepository } from "@domain/repositories/product-repository.interface";
import { Product } from "@domain/entities/product.entity";
import { ProductEntity } from "@infrastructure/repositories/typeorm-product.entity";

@Injectable()
export class TypeOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(filters: any): Promise<Product[]> {
    const productEntities = await this.productRepository.find();
    return productEntities.map((entity) => this.mapToDomain(entity));
  }

  async findById(id: string): Promise<Product | null> {
    const productEntity = await this.productRepository.findOne({
      where: { id },
    });
    if (!productEntity) {
      return null;
    }
    return this.mapToDomain(productEntity);
  }

  async save(product: Product): Promise<Product> {
    const productEntity = this.mapToEntity(product);
    const savedProductEntity = await this.productRepository.save(productEntity);
    return this.mapToDomain(savedProductEntity);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  private mapToDomain(productEntity: ProductEntity): Product {
    return new Product(
      productEntity.id,
      productEntity.name,
      productEntity.category,
      productEntity.price,
      productEntity.deleted
    );
  }

  private mapToEntity(product: Product): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.id = product.id;
    productEntity.name = product.name;
    productEntity.category = product.category;
    productEntity.price = product.price;
    productEntity.deleted = product.deleted;
    return productEntity;
  }
}
