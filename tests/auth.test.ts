import { describe, test, expect } from "bun:test";
import { checkAuth, unauthorizedResponse } from "../src/auth";

describe("auth", () => {
  test("accepts valid credentials", () => {
    const req = new Request("http://localhost/todos", {
      headers: { Authorization: "Basic " + btoa("admin:admin") },
    });
    expect(checkAuth(req)).toBe(true);
  });

  test("rejects wrong password", () => {
    const req = new Request("http://localhost/todos", {
      headers: { Authorization: "Basic " + btoa("admin:wrong") },
    });
    expect(checkAuth(req)).toBe(false);
  });

  test("rejects missing header", () => {
    const req = new Request("http://localhost/todos");
    expect(checkAuth(req)).toBe(false);
  });

  test("rejects non-Basic scheme", () => {
    const req = new Request("http://localhost/todos", {
      headers: { Authorization: "Bearer token123" },
    });
    expect(checkAuth(req)).toBe(false);
  });

  test("unauthorizedResponse returns 401 with WWW-Authenticate", () => {
    const res = unauthorizedResponse();
    expect(res.status).toBe(401);
    expect(res.headers.get("WWW-Authenticate")).toContain("Basic");
  });
});
