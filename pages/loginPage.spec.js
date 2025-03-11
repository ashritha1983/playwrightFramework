import { HOME_LOGIN_BTN, LOGIN, PASSWORD_FIELD, USERNAME_FIELD } from "../pageObjects/login.spec";
import { CONFIG } from "../utils/config.js";

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto(CONFIG.URL); 
    }

    async login() {
        await this.page.locator(HOME_LOGIN_BTN).click();
        await this.page.locator(USERNAME_FIELD).fill(CONFIG.USERNAME); 
        await this.page.locator(PASSWORD_FIELD).fill(CONFIG.PASSWORD); 
        await this.page.locator(LOGIN).click();
    }
}

export default LoginPage;

