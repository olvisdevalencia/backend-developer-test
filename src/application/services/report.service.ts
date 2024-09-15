import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, IsNull } from "typeorm";
import { Product } from "@domain/entities/product.entity";
import { ProductEntity } from "@app/infrastructure/repositories/typeorm-product.entity";

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async getDeletedProductsPercentage(): Promise<{ deletedPercentage: number }> {
    const totalProducts = await this.productRepository.count();
    const deletedProducts = await this.productRepository.count({
      where: { deleted: true },
    });

    const deletedPercentage = (deletedProducts / totalProducts) * 100;

    return { deletedPercentage };
  }

  async getNonDeletedProductsPriceReport(): Promise<{
    withPrice: number;
    withoutPrice: number;
  }> {
    const nonDeletedProducts = await this.productRepository.count({
      where: { deleted: false },
    });

    const withPrice = await this.productRepository.count({
      where: { deleted: false, price: Not(IsNull()) },
    });

    const withoutPrice = nonDeletedProducts - withPrice;

    const withPricePercentage =
      nonDeletedProducts > 0 ? (withPrice / nonDeletedProducts) * 100 : 0;
    const withoutPricePercentage =
      nonDeletedProducts > 0 ? (withoutPrice / nonDeletedProducts) * 100 : 0;

    return {
      withPrice: withPricePercentage,
      withoutPrice: withoutPricePercentage,
    };
  }

  async getProductsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder("product")
      .where("product.deleted = :deleted", { deleted: false })
      .andWhere("product.created_at BETWEEN :start AND :end", {
        start: startDate,
        end: endDate,
      })
      .getMany();
  }
}
