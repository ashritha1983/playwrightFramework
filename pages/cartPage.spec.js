import { APPLE_MONITOR, CART_BUTTON, SAMSUNG_GALAXY, SONY_VAIO,CART, TEXT, TITLE, DELETE} from "../pageObjects/cart.spec.js";
import { ALL_ITEMS, HOME_BTN, LAPTOPS, MONITORS, PHONES} from "../pageObjects/home.spec.js"; 
import { expect } from '@playwright/test';
import { LOGOUT } from "../pageObjects/login.spec.js";

class CartPage {
    constructor(page) {
        this.page = page;
    }

    async addToCart(category, product) {
        await this.page.locator(category).click();  
        await this.page.waitForTimeout(1000); 
        await this.page.locator(product).click(); 
        await this.page.waitForTimeout(1000); 
        await this.page.locator(CART_BUTTON).click(); 

        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await this.page.locator(HOME_BTN).click(); 
    }

    async addToCartITEMINPHONE() {
        await this.addToCart(PHONES, SAMSUNG_GALAXY);
    }

    async addToCartITEMINLAPTOP() {
        await this.addToCart(LAPTOPS, SONY_VAIO);
    }

    async addToCartITEMINMONITOR() {
        // await this.page.pause()
        await this.addToCart(MONITORS, APPLE_MONITOR);
    }

    async goToCart() {
        await this.page.locator(CART).click(); 
    }

    async deleteCartItems() {
        await this.goToCart();
        await this.page.waitForLoadState('domcontentloaded');
        
        let cartItems = this.page.locator('//tbody[@id="tbodyid"]//tr'); 
        let itemCount = await cartItems.count();
    
        console.log(`🛒 Items in cart before deletion: ${itemCount}`);
    
        while (itemCount > 0) {
            const deleteButtons = await this.page.locator(DELETE).all();
    
            if (deleteButtons.length > 0) {
                for (const button of deleteButtons) {
                    await button.click();
                    await this.page.waitForLoadState('networkidle'); 
                }
            } else {
                console.warn(" No delete buttons found.");
                break;
            }
    
        
            cartItems = this.page.locator('//tbody[@id="tbodyid"]//tr');
            itemCount = await cartItems.count();
            console.log(` Items remaining in cart: ${itemCount}`);
        }
    
        console.log("All items removed from the cart.");
    }

    async logout() {
        await this.page.waitForLoadState('domcontentloaded'); 
        await this.page.waitForSelector(LOGOUT, { state: 'visible', timeout: 60000 });
        await this.page.locator(LOGOUT).click();
    }
    
    
    
        }
    
    export default CartPage;
