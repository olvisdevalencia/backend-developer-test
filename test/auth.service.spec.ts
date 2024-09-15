import { AuthService } from "../src/application/services/auth.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: "test-secret" });
    authService = new AuthService(jwtService);
  });

  describe("validateUser", () => {
    it("should return user object when valid credentials are provided", async () => {
      const user = await authService.validateUser("admin", "password");
      expect(user).toEqual({ userId: 1, username: "admin" });
    });

    it("should return null when invalid credentials are provided", async () => {
      const user = await authService.validateUser("invalid", "credentials");
      expect(user).toBeNull();
    });
  });

  describe("login", () => {
    it("should return an access token on successful login", async () => {
      const user = { userId: 1, username: "admin" };
      const result = await authService.login(user);
      expect(result.access_token).toBeDefined();
    });
  });
});
