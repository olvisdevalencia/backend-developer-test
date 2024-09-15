import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { Agent } from "https"; //firewall purpose

@Injectable()
export class ContentfulService {
  private readonly apiUrl: string;
  private readonly accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.apiUrl = `https://cdn.contentful.com/spaces/${this.configService.get(
      "CONTENTFUL_SPACE_ID"
    )}/environments/${this.configService.get(
      "CONTENTFUL_ENVIRONMENT"
    )}/entries`;
    this.accessToken = this.configService.get("CONTENTFUL_ACCESS_TOKEN");
  }

  async fetchProducts() {
    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${this.apiUrl}?access_token=${this.accessToken}&content_type=product`,
          {
            httpsAgent: new Agent({
              rejectUnauthorized: false,
            }),
          }
        )
      );

      const items = response?.data?.items;
      if (items) {
        return items;
      } else {
        throw new Error("No data received from Contentful");
      }
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      throw error;
    }
  }
}
