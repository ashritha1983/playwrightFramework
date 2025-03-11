import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage.spec"; 
import { WELCOME_ADMIN } from "../pageObjects/login.spec";
import { CONFIG } from "../utils/config.js";
 

test("Login Page Test", async ({ page }) => {
    const loginPage = new LoginPage(page); 
    
    await loginPage.goToLoginPage();  

    await loginPage.login(CONFIG.USERNAME, CONFIG.PASSWORD);

    const welcomeAdminMessage = page.locator(WELCOME_ADMIN);
    await expect(welcomeAdminMessage).toBeVisible();

    await page.waitForSelector(WELCOME_ADMIN);
});
