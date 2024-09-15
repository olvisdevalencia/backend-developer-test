import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportService } from "@application/services/report.service";
import { ReportController } from "../controllers/report.controller";
import { ProductEntity } from "@infrastructure/repositories/typeorm-product.entity";
import { TypeOrmProductRepository } from "@infrastructure/repositories/typeorm-product.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ReportController],
  providers: [
    {
      provide: "ReportService",
      useClass: ReportService,
    },
    {
      provide: "ProductRepository",
      useClass: TypeOrmProductRepository,
    },
  ],
})
export class ReportsModule {}
