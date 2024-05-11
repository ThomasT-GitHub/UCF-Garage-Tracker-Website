// Gets the garage data from Cloud Functions. Returns the JSON with the data
const getGarageInfo = async () => {
  // Makes a call to the UCF garage API
  const response = await fetch('https://us-central1-ucf-garage.cloudfunctions.net/getGarageData');
  const result = await response.json();

  // Returns the JSON with the garage data
  return result;
}

// Assigns a color to a percent value for the percent bars and returns the color
const getBarColorFromPercent = (percent) => {
  // Parses the percent into an int
  const percentInt = parseInt(percent);

  // If filled between 50 and 80, set percent bar to yellow
  if (percentInt >= 50 && percentInt < 80)
    return '#FFD60A';

  // If filled more than 80, set percent bar to red
  if (percentInt >= 80)
    return '#FF2C55';

  // If less than 50, set percent bar to green
  else
    return '#35C75A';
}

// Assigns a color to a percent value for the garage icons and returns the color
const getGarageColorFromPercent = (percent) => {
  // Parses the percent into an int
  const percentInt = parseInt(percent);

  // If filled between 50 and 80, set percent bar to yellow
  if (percentInt >= 50 && percentInt < 80)
    return '#edde69';

  // If filled more than 80, set percent bar to red
  if (percentInt >= 80)
    return '#e3898c';

  // If less than 50, set percent bar to green
  else
    return '#9dd298';
}

(async() => {
  // Gets our percent bars; garage icons; the hover text for each garage; the loading wheels
  const percentBars = await document.querySelectorAll(".percent-bar-a,.percent-bar-b,.percent-bar-c,.percent-bar-d,.percent-bar-h,.percent-bar-i");
  const garages = await document.querySelectorAll(".garage");
  const garageHoverText = await document.querySelectorAll("#aText,#bText,#cText,#dText,#hText,#iText");
  const loadingWheels = await document.querySelectorAll(".wheelLoading");

  // Gets the JSON info of the garage data
  let garageInfo = await getGarageInfo();

  // Hides the loading wheels when data is received
  loadingWheels.forEach((wheel) => wheel.style.visibility = 'hidden');

  // Keeps track of our position in the percentBars array
  let pos = 0;

  // For each garage, makes the calculation for the percentage and adds it to the array
  for (let i = 3; i < 24; i += 4) {
    // Stores the percentage full, available, total, and filled spots
    let percent = garageInfo[i];
    let avail = garageInfo[i - 2];

    // If percent is greater than 0 make it visible
    if (parseInt(percent) > 0) {
      percentBars[pos].firstElementChild.style.visibility = 'visible';
    }

    // Sets the percent bars to their width and color
    percentBars[pos].style.width = percent;
    percentBars[pos].firstElementChild.innerText = percent;
    percentBars[pos].style.background = getBarColorFromPercent(percent);

    // Sets the garage icons to their color and sets their hover text
    garages[pos].style.background = getGarageColorFromPercent(percent);
    garageHoverText[pos].innerText = avail;
    pos++;
  }
})();
