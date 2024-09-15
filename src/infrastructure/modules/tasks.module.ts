import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TasksService } from "@application/services/tasks.service";
import { ContentfulService } from "@application/services/contentful.service";
import { ProductsModule } from "@infrastructure/modules/products.module";

@Module({
  imports: [ProductsModule, HttpModule],
  providers: [
    {
      provide: "TasksService",
      useClass: TasksService,
    },
    {
      provide: "ContentfulService",
      useClass: ContentfulService,
    },
  ],
})
export class TasksModule {}
