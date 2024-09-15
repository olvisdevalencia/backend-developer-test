import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ContentfulService } from "@application/services/contentful.service";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: "ContentfulService",
      useClass: ContentfulService,
    },
  ],
  exports: ["ContentfulService"],
})
export class ContentfulModule {}
