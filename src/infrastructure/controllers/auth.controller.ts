import { Controller, Post, Body, Inject } from "@nestjs/common";
import { AuthService } from "@application/services/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "../controllers/dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AuthService")
    private readonly authService: AuthService
  ) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    if (!user) {
      return { error: "Invalid credentials" };
    }
    return this.authService.login(user);
  }
}
