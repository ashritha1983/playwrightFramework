import { test, expect } from '@playwright/test';
import HomePage from '../pages/homePage.spec';
import LoginPage from '../pages/loginPage.spec';
import { CONFIG } from "../utils/config.js";
import { WELCOME_ADMIN } from '../pageObjects/login.spec';

test.describe('Home Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goToLoginPage();
        await loginPage.login(CONFIG.USERNAME, CONFIG.PASSWORD);

        const welcomeAdminMessage = page.locator(WELCOME_ADMIN);
        await expect(welcomeAdminMessage).toBeVisible();
    });

    test('Verify item count in Phone, Monitor, and Laptop sections', async ({ page }) => {
        const homePage = new HomePage(page);

        const phoneCount = await homePage.numberOfItemInPhoneSection();
        console.log(`Number of phones: ${phoneCount}`);
        expect(phoneCount).toBe(7);

        const monitorCount = await homePage.numberOfItemInMonitorSection();
        console.log(`Number of monitors: ${monitorCount}`);
        expect(monitorCount).toBe(2);

        const laptopCount = await homePage.numberOfItemInLaptopSection();
        console.log(`Number of laptops: ${laptopCount}`);
        expect(laptopCount).toBe(6);
    });
});

