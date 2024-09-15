import { Controller, Get, Query, Inject, Delete, Param } from "@nestjs/common";
import { ProductServiceImpl } from "@application/services/product.service";
import { GetProductsDto } from "./dto/get-products.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("products")
@Controller("products")
export class ProductController {
  constructor(
    @Inject("ProductService")
    private readonly productService: ProductServiceImpl
  ) {}

  @Get()
  async getProducts(@Query() query: GetProductsDto) {
    return this.productService.findAll(query);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return this.productService.deleteProduct(id);
  }
}
