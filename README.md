# __UCF Garage Tracker__
A website created to visualize the availability of parking spots at the garages of the University of Central Florida. There is an app version for Android available [here](https://github.com/thomastrivino/UCF-Garage-Tracker-App)  
## [Go to site](https://thomastrivino.github.io/UCF-Garage-Availability-Map-Visualizer/)  

![PREVIEW](https://raw.githubusercontent.com/thomastrivino/UCF-Garage-Availability-Map-Visualizer/master/ucfGarageMap%20(1).gif)

## How it works
Tech used: HTML, CSS, Javascript, Node.js, Puppeteer, Cloud Functions,  Google Maps API, Figma  

<img src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" alt="html" width="60"/><img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="css" width="60"/>
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="js" width="60"/>
<img src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="node.js" width="60"/>
<img src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/ab742751-b55b-43d7-8f49-9a67e293f67c" alt="puppeteer" width="60"/>
<img src="https://user-images.githubusercontent.com/25181517/183911547-990692bc-8411-4878-99a0-43506cdb69cf.png" alt="gcs" width="60"/>
<img src="https://user-images.githubusercontent.com/25181517/189715289-df3ee512-6eca-463f-a0f4-c10d94a06b2f.png" alt="figma" width="60"/>

First, I made a design of what I wanted the website to look like utilizing Figma. I sketched and planned the layout, the map, and the colors to get a grasp of what the final product should look like. Following that, I followed my Figma design and recreated it using HTML and CSS.  

In that process, I used Google Maps Static Maps API to make a call to retrieve an image of UCF and altered its parameters to remove Google's default markers. I used this image as the map displayed on the website.  

In order to acquire the data of each garage, I built a web scrapper utilizing Puppeteer and hosted it on Google Cloud Functions. The web scrapper scrapes [UCF's garage availability website](https://parking.ucf.edu/resources/garage-availability/) and creates a JSON out of the data. A trigger can then be sent to the Google Cloud Function to retrieve the JSON with the data.  

That data is then handled in the javascript code of the website and edits the HTML and CSS to reflect the availability of the garages. Depending on the availability, the color of the percent bar and its respective garage is changed.  

## Lessons Learned
In the process of making this project, I encountered obstacles that pushed me to familiarize myself with new technologies, mainly Puppeteer and Cloud Functions. In my original attempt to fetch the data from UCF's website, I utilized the javascript built-in ```fetch()``` function to retrieve the HTML of UCF's website and then parse it for the data. Cross-origin resource sharing (CORS), however, made this approach impossible, as it was disabled on UCF's website, denying the fetch function access to the data.  

I attempted to circumvent this by utilizing BeautifulSoup4 in Python to parse the website instead; however, BeautifulSoup4 does not parse dynamic content on a webpage, in this case, the table containing the data. That led me to Puppeteer which initializes its own browser instance and loads the website. This allows for dynamic content to be loaded and then parsed. Because this dependency runs on Node.js, the parsing could not be done clientside in the browser, so I had to find a way to host my webscrapper online. That introduced me to Cloud Functions, which allows for hosting a Node.js environment in the cloud and sending a trigger to execute a function and obtain its return. After hosting the web scrapper on Cloud Functions, I was able to obtain the garage availability for the client and then use it to update the website and have it reflect the data.

## Whats next?
I intend to add media queries to the CSS so that mobile devices and smaller screens have a more appealing layout for their smaller sizes. I also intend to optimize and improve the method of obtaining the garage availability data.  

Currently, upon loading the site, a trigger to a Cloud Function is sent to obtain the data. I plan to restructure this so that the Cloud Function periodically obtains the data and stores it in a database. Then upon a user loading the site, the javascript makes a request to the database instead of the Cloud Function. Doing so would improve the loading time as every time the Cloud Function is invoked, Puppeteer must create its own browser, traverse to UCF's website, parse the data, and then return it. With this new method retrieving the data will just be obtaining information from the database.
