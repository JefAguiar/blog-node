const puppeteer = require('puppeteer');
const sessionFactory =  require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();

    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function(target, property) {
          return target[property] || browser[property] || page[property];
      }
    });
  }

  async login() {
      
  const user = await userFactory();

  const { session, sig } = sessionFactory(user);
   
  await this.page.setCookie({ name: 'session', value: session });
  await this.page.setCookie({ name: 'session.sig', value: sig });
  
  await this.page.goto('localhost:3000/blogs');
  let elem = 'a[href="/auth/logout"]';

  await this.page.waitFor(elem);

  }

  async getContentsOf(selector) {
      return this.page.$eval(selector, el => el.innerHTML);
  }

  constructor(page) {
      this.page = page;
  }
}

module.exports = CustomPage;