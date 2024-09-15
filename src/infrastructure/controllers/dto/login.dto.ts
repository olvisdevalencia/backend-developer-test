import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Username of the user",
    example: "admin",
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: "Password of the user",
    example: "password",
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
