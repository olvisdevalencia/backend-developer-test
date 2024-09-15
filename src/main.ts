import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("JavaScript Back End Developer Test 🚀")
    .setDescription("API to manage products")
    .setVersion("1.0")
    .setContact(
      "Olvis Quintana",
      "https://www.linkedin.com/in/olvisquintana/",
      "quintanaolvis@gmail.com"
    )
    .addTag("auth")
    .addTag("products")
    .addTag("reports")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3000);
}
bootstrap();
