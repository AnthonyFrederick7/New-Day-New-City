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
const cityFormat = city.charAt(0).toUpperCase() + city.substring(1).split('%')[0].replace('+', ' ');
const dateArr = date.split("-");
const dateFormat = dateArr[1] + "/" + dateArr[2]  + "/" + dateArr[0];


//Displays city and date at top of page
$cityresults.textContent = "the city of " + cityFormat;
$dateresults.textContent = dateFormat;

console.log("City: " + criteriaArray[1],
            "Date: " + criteriaArray[3], 
            "Hotel: " + hotels, 
            "Restarurants: " + restaurants,  
            "Attractions: " + attractions);

