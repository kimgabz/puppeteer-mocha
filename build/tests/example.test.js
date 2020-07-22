'use strict';

var _builder = require('../builder');

var _builder2 = _interopRequireDefault(_builder);

var _mochaSteps = require('mocha-steps');

var _chai = require('chai');

var _LoginPage = require('../pages/LoginPage');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mocha test demo', function () {
    var page = void 0;
    var loginPage = void 0;

    before(async function () {
        page = await _builder2.default.build("Desktop");
        loginPage = new _LoginPage2.default(page);
    });

    after(async function () {
        await page.close();
    });

    (0, _mochaSteps.step)('test online banking menu', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.waitAndClick("#onlineBankingMenu");
        await page.waitFor(5000);
    });

    (0, _mochaSteps.step)('sign in button', async function () {
        await page.goto('http://zero.webappsecurity.com/index.html');
        var signInButton = await page.isElementVisible("#signin_button");
        (0, _chai.expect)(signInButton).to.be.true;
    });

    (0, _mochaSteps.step)('login form', async function () {
        await page.waitAndClick("#signin_button");
        var loginForm = await page.isElementVisible("#login_form");
        (0, _chai.expect)(loginForm).to.be.true;
        var signInButton = await page.isElementVisible("#signin_button");
        (0, _chai.expect)(signInButton).to.be.false;
    });

    (0, _mochaSteps.step)('login to applciation', async function () {
        // await page.waitAndType("#user_login", "username");
        // await page.waitAndType("#user_password", "password");
        // await page.waitAndClick(".btn-primary");
        // const navbar = await page.isElementVisible(".nav-tabs");
        // expect(navbar).to.be.true;
        await loginPage.login("username", "password");
        (0, _chai.expect)((await page.isElementVisible(".nav-tabs"))).to.be.true;
    });

    (0, _mochaSteps.step)('6 navbar links', async function () {
        (0, _chai.expect)((await page.getCount(".nav-tabs li"))).to.equal(6);
    });
});