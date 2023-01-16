// const amadeusKey = dy4iaAOxWeAWElo6n02Qi5l6CusR0tV2;
const $cityresults = document.getElementById('city-results');
const $dateresults = document.getElementById('date-results');

// Gets URL data and puts it into an array
var criteriaArray = window.location.href.split(/=|&/);

//Takes the array info and formats it and sets checkbox selections to true or false
const city = criteriaArray[1];
const date = criteriaArray[3];
const hotels = criteriaArray.includes("hotels");
const restaurants = criteriaArray.includes("restaurants");
const attractions = criteriaArray.includes("attractions");

// formats city and date to look better on the page
const cityFormat = city.charAt(0).toUpperCase() + city.substring(1).replace('+', ' ').replace('%2C+', ' ').split("%")[0];
const dateArr = date.split("-");
const dateFormat = dateArr[1] + "/" + dateArr[2]  + "/" + dateArr[0];


//Displays city and date at top of page
$cityresults.textContent = cityFormat;
$dateresults.textContent = dateFormat;

console.log("City: " + criteriaArray[1],
            "Date: " + criteriaArray[3], 
            "Hotel: " + hotels, 
            "Restarurants: " + restaurants,  
            "Attractions: " + attractions);

fetch('https:test.api.amadeus.com/v1/reference-data/locations/hotels')
    .then(res => res.json())
