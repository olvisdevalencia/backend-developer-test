import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "../src/application/services/tasks.service";
import { ContentfulService } from "../src/application/services/contentful.service";
import { ProductServiceImpl } from "../src/application/services/product.service";

describe("TasksService", () => {
  let tasksService: TasksService;
  let contentfulService: ContentfulService;
  let productService: ProductServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: "ContentfulService",
          useValue: {
            fetchProducts: jest.fn(),
          },
        },
        {
          provide: "ProductService",
          useValue: {
            createOrUpdateProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    contentfulService = module.get<ContentfulService>("ContentfulService");
    productService = module.get<ProductServiceImpl>("ProductService");
  });

  describe("handleCron", () => {
    it("should fetch products from Contentful and update/create them in the database", async () => {
      const mockProducts = [
        {
          sys: { id: "1" },
          fields: {
            name: "Product 1",
            category: "Category A",
            price: 100,
          },
        },
        {
          sys: { id: "2" },
          fields: {
            name: "Product 2",
            category: "Category B",
            price: 200,
          },
        },
      ];

      (contentfulService.fetchProducts as jest.Mock).mockResolvedValue(
        mockProducts
      );

      await tasksService.handleCron();

      expect(contentfulService.fetchProducts).toHaveBeenCalledTimes(1);
      expect(productService.createOrUpdateProduct).toHaveBeenCalledTimes(2);
      expect(productService.createOrUpdateProduct).toHaveBeenNthCalledWith(
        1,
        mockProducts[0]
      );
      expect(productService.createOrUpdateProduct).toHaveBeenNthCalledWith(
        2,
        mockProducts[1]
      );
    });

    it("should handle errors during product fetching or saving", async () => {
      const mockError = new Error("Failed to fetch products");
      (contentfulService.fetchProducts as jest.Mock).mockRejectedValue(
        mockError
      );

      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await tasksService.handleCron();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching or saving products: ",
        mockError
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
