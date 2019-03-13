const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');  
});

afterEach(async () => {
  await page.close();
});

test('Header test should be correct', async () => {
  //const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  const text = await page.getContentsOf('a.brand-logo');
  expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();
  
  expect(url).toMatch(/accounts\.google\.com/);
  
});

test('When signed in, shows logout button', async () => {
  await page.login();
  let elem = 'a[href="/auth/logout"]';
  const text = await page.$eval(elem, el => el.innerHTML);
  expect(text).toEqual('Logout');
});
