import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "@domain/entities/product.entity";
import { GetProductsDto } from "@infrastructure/controllers/dto/get-products.dto";
import { ProductEntity } from "@app/infrastructure/repositories/typeorm-product.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ProductServiceImpl {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(
    filters: GetProductsDto
  ): Promise<{ data: Product[]; total: number; page: number; limit: number }> {
    const query = this.productRepository.createQueryBuilder("product");

    if (filters.name) {
      query.andWhere("product.name LIKE :name", { name: `%${filters.name}%` });
    }

    if (filters.category) {
      query.andWhere("product.category = :category", {
        category: filters.category,
      });
    }

    if (filters.minPrice) {
      query.andWhere("product.price >= :minPrice", {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice) {
      query.andWhere("product.price <= :maxPrice", {
        maxPrice: filters.maxPrice,
      });
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 5;

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async createOrUpdateProduct(productData: any): Promise<Product> {
    const productId = productData.sys.id || uuidv4();

    if (!productId) {
      throw new Error("Product ID is missing");
    }

    const existingProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (existingProduct) {
      existingProduct.name = productData.fields.name;
      existingProduct.category = productData.fields.category;
      existingProduct.price = productData.fields.price || null;
      existingProduct.deleted = productData.fields.deleted || false;
      const savedProduct = await this.productRepository.save(existingProduct);
      return this.mapToDomain(savedProduct);
    } else {
      const newProduct = this.productRepository.create({
        id: productId,
        name: productData.fields.name,
        category: productData.fields.category,
        price: productData.fields.price || null,
        deleted: productData.fields.deleted || false,
      });
      const savedProduct = await this.productRepository.save(newProduct);
      return this.mapToDomain(savedProduct);
    }
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

  async deleteProduct(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: String(productId) },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    product.deleted = true;
    return this.productRepository.save(product);
  }
}
