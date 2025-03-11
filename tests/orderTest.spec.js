import { test, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage.spec';
import CartPage from '../pages/cartPage.spec';
import OrderPage from '../pages/orderPage.spec';
import { CONFIG } from '../utils/config.js';
import { orderData } from '../utils/orderData.js';
import { LOGOUT } from '../pageObjects/login.spec';
import { purchase, successfullmsg, okbtn } from '../pageObjects/order.spec.js';

test.describe('Order Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.login(CONFIG.USERNAME, CONFIG.PASSWORD);
        console.log("Successfully logged in");

        const cartPage = new CartPage(page);
        await cartPage.goToCart();

     
    });

    test('Verify order placement', async ({ page }) => {
        const cartPage = new CartPage(page);
        const orderPage = new OrderPage(page);

        await cartPage.goToCart();
        console.log(" Navigated to cart for order placement.");

        await orderPage.placeOrder();
        console.log("Clicked 'Place Order' button.");

        await orderPage.fillOrderDetails(orderData);
        console.log(" Order details entered successfully.");

        await page.locator(purchase).click();
        console.log("clicked on purchase button and Order placed successfully!");
       
        await orderPage.confirmOrder();
        console.log("Confirmed order by clicking 'OK' button.");
      
    });

    test.afterEach(async ({ page }) => {
        const cartPage = new CartPage(page);    
        await cartPage.logout();
        console.log("Logged out successfully.");
    });
    
    

});
