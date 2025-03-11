import { PHONES, MONITORS, LAPTOPS, ALL_ITEMS } from "../pageObjects/home.spec.js"; 

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async numberOfItemsInCategory(categoryLocator) {
        await this.page.locator(categoryLocator).click();
        await this.page.waitForTimeout(1000); 
        return await this.page.locator(ALL_ITEMS).count();
    }

    async numberOfItemInPhoneSection() {
        return await this.numberOfItemsInCategory(PHONES);
    }

    async numberOfItemInMonitorSection() {
        return await this.numberOfItemsInCategory(MONITORS);
    }

    async numberOfItemInLaptopSection() {
        return await this.numberOfItemsInCategory(LAPTOPS);
    }
}

export default HomePage;
