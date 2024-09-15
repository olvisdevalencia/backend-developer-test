import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "@application/services/auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "../controllers/auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET", "defaultSecret"),
        signOptions: { expiresIn: "60m" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: "AuthService",
      useClass: AuthService,
    },
    {
      provide: "JwtStrategy",
      useClass: JwtStrategy,
    },
  ],
  exports: ["AuthService"],
})
export class AuthModule {}
