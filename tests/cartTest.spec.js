import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage.spec';
import { CONFIG } from "../utils/config.js";
import { LOGOUT, WELCOME_ADMIN } from '../pageObjects/login.spec';
import CartPage from '../pages/cartPage.spec.js';
import { APPLE_MONITOR, CART, PRICES, SAMSUNG_GALAXY, SONY_VAIO } from '../pageObjects/cart.spec.js';
import {MONITORS } from "../pageObjects/home.spec.js";

test.describe('Cart Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login(CONFIG.USERNAME, CONFIG.PASSWORD);

        const welcomeAdminMessage = page.locator(WELCOME_ADMIN);
        await expect(welcomeAdminMessage).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        const cartPage = new CartPage(page);
    
        await cartPage.goToCart();
        // await page.waitForLoadState('domcontentloaded');
    
        // let itemCount = await page.locator('//tbody[@id="tbodyid"]//tr').count();
        // console.log(` Items in cart before logout: ${itemCount}`);
    
        // if (itemCount > 0) {
        //     await cartPage.deleteCartItems();
        
        //     await page.waitForLoadState('domcontentloaded');
        //     itemCount = await page.locator('//tbody[@id="tbodyid"]//tr').count();
        //     console.log(`Items remaining after deletion: ${itemCount}`);
        
        //     if (itemCount > 0) {
        //         console.warn(" Some items were not deleted. Retrying...");
        //         await cartPage.deleteCartItems();
    
        //         await page.waitForLoadState('domcontentloaded');
        //         itemCount = await page.locator('//tbody[@id="tbodyid"]//tr').count();
        //         console.log(`Final item count after retry: ${itemCount}`);
        //     }
        // } else {
        //     console.log("Cart is already empty.");
        // }

        await cartPage.logout();
    
       
   
    });
    
    
    

    test("verify adding item from different sections", async ({ page }) => {
        const cartPage = new CartPage(page);

        await cartPage.addToCartITEMINPHONE();
        await expect(page.locator(SAMSUNG_GALAXY)).toBeVisible();
        const priceText = await page.locator(PRICES).textContent(); 
        await expect(priceText.trim()).toBe("$360"); 
      console.log(" Item from phone section added to cart");

        await cartPage.addToCartITEMINLAPTOP();
        await expect(page.locator(SONY_VAIO)).toBeVisible();
        console.log("Item from laptop section added to cart");

        await cartPage.addToCartITEMINMONITOR();
        await page.locator(MONITORS).click(); 
        await expect(page.locator(APPLE_MONITOR)).toBeVisible();
        console.log("Item from laptop section added to cart");

       


        await page.waitForTimeout(2000)


   

        
 
    });

   


});
