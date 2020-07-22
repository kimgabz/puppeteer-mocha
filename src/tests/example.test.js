import Page from '../builder';
import { step } from 'mocha-steps';
import { expect } from 'chai';
import LoginPage from '../pages/LoginPage';

describe('Mocha test demo', () => {
    let page;
    let loginPage;

    before(async function() {
        page = await Page.build("Desktop");
        loginPage = new LoginPage(page);
    });

    after(async function() {
        await page.close();
    });

    step('test online banking menu', async () => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.waitAndClick("#onlineBankingMenu");
        await page.waitFor(5000);
    });

    step('sign in button', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html');
        const signInButton = await page.isElementVisible("#signin_button");
        expect(signInButton).to.be.true;
    });

    step('login form', async function() {
        await page.waitAndClick("#signin_button");
        const loginForm = await page.isElementVisible("#login_form");
        expect(loginForm).to.be.true;
        const signInButton = await page.isElementVisible("#signin_button");
        expect(signInButton).to.be.false;
    });

    step('login to applciation', async function() {
        // await page.waitAndType("#user_login", "username");
        // await page.waitAndType("#user_password", "password");
        // await page.waitAndClick(".btn-primary");
        // const navbar = await page.isElementVisible(".nav-tabs");
        // expect(navbar).to.be.true;
        await loginPage.login("username", "password");
        expect(await page.isElementVisible(".nav-tabs")).to.be.true;
    });

    step('6 navbar links', async function() {
        expect(await page.getCount(".nav-tabs li")).to.equal(6);
    });
});