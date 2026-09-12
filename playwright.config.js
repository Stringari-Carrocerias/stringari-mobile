import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:5173",
    headless: true,
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },

    {
      name: "chromium",
      testMatch: /.*\.spec\.js/,
      testIgnore: /.*\.auth\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "authenticated",
      testMatch: /.*\.auth\.spec\.js/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
