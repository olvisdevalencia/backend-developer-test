import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsModule } from "@infrastructure/modules/products.module";
import { ReportsModule } from "@infrastructure/modules/reports.module";
import { TasksModule } from "@infrastructure/modules/tasks.module";
import { ContentfulModule } from "@infrastructure/modules/contentful.module";
import { AuthModule } from "@infrastructure/modules/auth.module";
import { ProductEntity } from "@app/infrastructure/repositories/typeorm-product.entity";
import { AppController } from "@infrastructure/controllers/app.controller";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST", "localhost"),
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [ProductEntity],
        synchronize: configService.get<boolean>("DB_SYNC", true),
      }),
    }),
    ScheduleModule.forRoot(),
    ProductsModule,
    ReportsModule,
    TasksModule,
    ContentfulModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
