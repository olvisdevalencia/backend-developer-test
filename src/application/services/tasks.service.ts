import { Injectable, Inject } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ContentfulService } from "@application/services/contentful.service";
import { ProductServiceImpl } from "@application/services/product.service";

@Injectable()
export class TasksService {
  constructor(
    @Inject("ContentfulService")
    private readonly contentfulService: ContentfulService,
    @Inject("ProductService")
    private readonly productService: ProductServiceImpl
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    try {
      const products = await this.contentfulService.fetchProducts();

      for (const product of products) {
        await this.productService.createOrUpdateProduct(product);
      }
    } catch (error) {
      console.error("Error fetching or saving products: ", error);
    }
  }
}
