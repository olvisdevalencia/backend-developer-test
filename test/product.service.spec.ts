import { Test, TestingModule } from "@nestjs/testing";
import { ProductServiceImpl } from "../src/application/services/product.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ProductEntity } from "../src/infrastructure/repositories/typeorm-product.entity";
import { Repository } from "typeorm";

describe("ProductService", () => {
  let service: ProductServiceImpl;
  let repository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: "ProductService",
          useClass: ProductServiceImpl,
        },
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductServiceImpl>("ProductService");
    repository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity)
    );
  });

  it("should mark product as deleted", async () => {
    const mockProduct = {
      id: "markProductAsDeletedId",
      deleted: false,
    } as ProductEntity;
    jest.spyOn(repository, "findOne").mockResolvedValue(mockProduct);
    jest.spyOn(repository, "save").mockResolvedValue({
      ...mockProduct,
      deleted: true,
    });

    const result = await service.deleteProduct("markProductAsDeletedId");
    expect(result.deleted).toBe(true);
  });

  it("should find all products with filters", async () => {
    const mockProducts = [
      { id: "1", name: "Product 1", deleted: false, price: 100 },
      { id: "2", name: "Product 2", deleted: false, price: 200 },
    ] as ProductEntity[];

    jest.spyOn(repository, "createQueryBuilder").mockImplementation((): any => {
      return {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([mockProducts, 2]),
      };
    });

    const result = await service.findAll({
      page: 1,
      limit: 10,
      name: "Product",
    });

    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(2);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
  });

  it("should create a new product", async () => {
    const productData = {
      sys: { id: "3" },
      fields: {
        name: "Product 3",
        category: "Category A",
        price: 300,
        deleted: false,
      },
    };

    const mockSavedProduct = {
      id: "3",
      name: "Product 3",
      category: "Category A",
      price: 300,
      deleted: false,
    } as ProductEntity;

    jest.spyOn(repository, "findOne").mockResolvedValue(null);
    jest.spyOn(repository, "create").mockReturnValue(mockSavedProduct);
    jest.spyOn(repository, "save").mockResolvedValue(mockSavedProduct);

    const result = await service.createOrUpdateProduct(productData);

    expect(result.name).toBe("Product 3");
    expect(result.category).toBe("Category A");
    expect(result.price).toBe(300);
    expect(result.deleted).toBe(false);
  });

  it("should update an existing product", async () => {
    const existingProduct = {
      id: "1",
      name: "Old Product",
      price: 100,
      deleted: false,
    } as ProductEntity;

    const updatedProductData = {
      sys: { id: "1" },
      fields: { name: "Updated Product", price: 150, deleted: false },
    };

    jest.spyOn(repository, "findOne").mockResolvedValue(existingProduct);
    jest.spyOn(repository, "save").mockResolvedValue({
      ...existingProduct,
      ...updatedProductData.fields,
    });

    const result = await service.createOrUpdateProduct(updatedProductData);

    expect(result.name).toBe("Updated Product");
    expect(result.price).toBe(150);
  });

  it("should throw error if product not found for deletion", async () => {
    jest.spyOn(repository, "findOne").mockResolvedValue(null);

    await expect(service.deleteProduct("productToDelete")).rejects.toThrowError(
      "Product not found"
    );
  });
});
