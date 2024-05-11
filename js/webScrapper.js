const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://parking.ucf.edu/resources/garage-availability/');

  const data = await page.evaluate(() => {
    const tds = Array.from(document.querySelectorAll('table tr td'))
    return tds.map(td => td.innerText)
  });

  const jsonData = JSON.parse(JSON.stringify(Object.assign({}, data)));

  //You will now have an array of strings
  //[ 'One', 'Two', 'Three', 'Four' ]
  console.log(jsonData);
  await browser.close();
})();
