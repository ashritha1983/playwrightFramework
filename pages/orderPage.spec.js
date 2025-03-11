import { placeOrderButton, successfullmsg, name, country, city, creditcard, month, year, purchase, okbtn, close_btn } from '../pageObjects/order.spec.js';
import { expect } from '@playwright/test';

class OrderPage {
    constructor(page) {
        this.page = page;
    } 

    async placeOrder() {
        await this.page.locator(placeOrderButton).waitFor({ state: 'visible', timeout: 5000 });

        if (await this.page.locator(placeOrderButton).isVisible()) {
            console.log("Place Order button is visible. Clicking now...");
            await this.page.locator(placeOrderButton).click();
        } else {
            console.error(" Place Order button is NOT visible!");
        }
    }

    async fillOrderDetails(orderData) {
        await this.page.locator(name).waitFor({ state: 'visible', timeout: 5000 });

        await this.page.locator(name).fill(orderData.Name);
        await this.page.locator(country).fill(orderData.country);
        await this.page.locator(city).fill(orderData.city);
        await this.page.locator(creditcard).fill(orderData.creditCard);
        await this.page.locator(month).fill(orderData.month);
        await this.page.locator(year).fill(orderData.year);
        
        console.log(" Order details filled successfully.");

        await this.page.locator(purchase).click();
        console.log("Order placed successfully!");
    }

    async confirmOrder() {

        await expect(this.page.locator(successfullmsg)).toBeVisible();
        console.log("Order success message is visible");

        await this.page.locator(okbtn).click();
        await this.page.locator(close_btn).click()
        
        console.log("Clicked OK button on success popup.");
        
    }

    
    
}

export default OrderPage;
