import { IsOptional, IsNumber, IsString, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetProductsDto {
  @ApiPropertyOptional({
    description: "Page number for pagination",
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: "Number of products per page",
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = 5;

  @ApiPropertyOptional({
    description: "Filter by product name",
    example: "Laptop",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: "Filter by product category",
    example: "Electronics",
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: "Minimum price for product filter",
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({
    description: "Maximum price for product filter",
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
