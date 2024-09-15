import { Test, TestingModule } from "@nestjs/testing";
import { ContentfulService } from "../src/application/services/contentful.service";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { of } from "rxjs";
import { AxiosResponse, AxiosHeaders } from "axios";
import { Agent } from "https";

describe("ContentfulService", () => {
  let service: ContentfulService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentfulService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === "CONTENTFUL_SPACE_ID") return "space_id";
              if (key === "CONTENTFUL_ENVIRONMENT") return "env_id";
              if (key === "CONTENTFUL_ACCESS_TOKEN") return "access_token";
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ContentfulService>(ContentfulService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should fetch products successfully", async () => {
    const mockAxiosResponse: AxiosResponse = {
      data: {
        items: [
          { id: "1", name: "Product 1" },
          { id: "2", name: "Product 2" },
        ],
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    };

    jest.spyOn(httpService, "get").mockReturnValue(of(mockAxiosResponse));

    const products = await service.fetchProducts();

    expect(products).toHaveLength(2);
    expect(products[0].id).toBe("1");
    expect(products[1].name).toBe("Product 2");

    expect(httpService.get).toHaveBeenCalledWith(
      "https://cdn.contentful.com/spaces/space_id/environments/env_id/entries?access_token=access_token&content_type=product",
      {
        httpsAgent: expect.any(Agent),
      }
    );
  });

  it("should handle HTTP errors", async () => {
    const mockError = new Error("Request failed");

    jest.spyOn(httpService, "get").mockImplementation(() => {
      throw mockError;
    });

    await expect(service.fetchProducts()).rejects.toThrow("Request failed");
  });
});
