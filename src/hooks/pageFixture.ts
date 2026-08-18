import { Page } from "@playwright/test";
import { Logger } from "winston";
import { BrowserManager } from "../helper/browsers/browserManager";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

export const fixture = {
  page: undefined as Page,
  logger: undefined as Logger,
  browserManager: undefined as BrowserManager,
  loginPage: undefined as LoginPage,
  dashboardPage: undefined as DashboardPage,
};
