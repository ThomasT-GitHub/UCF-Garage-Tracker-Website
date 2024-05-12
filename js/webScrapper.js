/*This is the code used in the cloud function to retrieve the data from the UCF garage availability website*/

const puppeteer = require('puppeteer');

exports.garageData = async (req, res) => {
  // Enables CORS to allow us to make a fetch call to the Cloud Trigger
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  // Loads the borwser and a new page
  const browser = await puppeteer.launch({args: ['--no-sandbox']}); // IMPORTANT! ['--no-sandbox'] required to work in Cloud Functions
  const page = await browser.newPage();

  // Navigates to UCF Garage website
  await page.goto('https://parking.ucf.edu/resources/garage-availability/');

  // Parses the data from the table
  const data = await page.evaluate(() => {
    // Selects the table data
    const tabledatum = Array.from(document.querySelectorAll('table tr td'))

    // Turns the array of HTML elements into their inner text values
    return tabledatum.map(datum => datum.innerText)
  });

  // Parses it into a JSON
  const jsonData = JSON.parse(JSON.stringify(Object.assign({}, data)));

  // Sets the return type of the cloud function to JSON
  res.set('Content-Type', 'application/json');

  // Send the JSON
  res.send(jsonData);

  await browser.close();
};
