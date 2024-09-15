import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getWelcomeMessage(): string {
    return "JavaScript Back End Developer Test 🚀";
  }

  @Get("health")
  getHealthCheck(): string {
    return "The API is healthy and running!";
  }
}
