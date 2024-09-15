import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "@infrastructure/controllers/product.controller";
import { ProductEntity } from "@infrastructure/repositories/typeorm-product.entity";
import { ProductServiceImpl } from "@application/services/product.service";
import { TypeOrmProductRepository } from "@infrastructure/repositories/typeorm-product.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: "ProductService",
      useClass: ProductServiceImpl,
    },
    {
      provide: "ProductRepository",
      useClass: TypeOrmProductRepository,
    },
  ],
  exports: ["ProductService"],
})
export class ProductsModule {}
