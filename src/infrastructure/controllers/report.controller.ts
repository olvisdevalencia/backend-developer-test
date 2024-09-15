import { Controller, Get, UseGuards, Query, Inject } from "@nestjs/common";
import { JwtAuthGuard } from "../modules/jwt-auth.guard";
import { ReportService } from "@application/services/report.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("reports")
@Controller("reports")
export class ReportController {
  constructor(
    @Inject("ReportService")
    private readonly reportService: ReportService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("deleted-products-percentage")
  getDeletedProductsPercentage() {
    return this.reportService.getDeletedProductsPercentage();
  }

  @UseGuards(JwtAuthGuard)
  @Get("non-deleted-products-price")
  getNonDeletedProductsPriceReport() {
    return this.reportService.getNonDeletedProductsPriceReport();
  }

  @UseGuards(JwtAuthGuard)
  @Get("products-by-date-range")
  getProductsByDateRange(
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) {
    return this.reportService.getProductsByDateRange(
      new Date(startDate),
      new Date(endDate)
    );
  }
}
