const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.deconreconstruction.com/vasterror/31');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();