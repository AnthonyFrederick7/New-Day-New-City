const $cityresults = document.getElementById('city-results');
const $dateresults = document.getElementById('date-results');
const $hotelresults = document.getElementById('hotel-results');
const $restsresults = document.getElementById('rests-results');
const $attractionsresults = document.getElementById('attractions-results');
const $hotelsShortcut = document.getElementById('hotelsShortcut');
const $restsShortcut = document.getElementById('restsShortcut');
const $attractionsShortcut = document.getElementById('attractionsShortcut');


// Gets URL data and puts it into an array
var criteriaArray = window.location.href.split(/=|&/);

//Takes the array info and formats it and sets checkbox selections to true or false
const city = criteriaArray[1];
const date = criteriaArray[3];
const hotels = criteriaArray.includes("hotels");
const restaurants = criteriaArray.includes("restaurants");
const attractions = criteriaArray.includes("attractions");

// formats city and date to look better on the page

const cityFormat = city.charAt(0).toUpperCase() + city.substring(1).toLowerCase()
const dateArr = date.split("-");
const dateFormat = dateArr[1] + "/" + dateArr[2]  + "/" + dateArr[0];


//Displays city and date at top of page
$cityresults.textContent = "the city of " + cityFormat;
$dateresults.textContent = dateFormat;

// Hides divs and nav links for any options that weren't selected on form
if (hotels === false){
    $hotelresults.style.display = "none";
    $hotelsShortcut.style.display = "none";
}
if (restaurants=== false){
    $restsresults.style.display = "none";
    $restsShortcut.style.display = "none";
}
if (attractions === false){
    $attractionsresults.style.display = "none";
    $attractionsShortcut.style.display = "none";
}

console.log("City: " + criteriaArray[1],
            "Date: " + criteriaArray[3], 
            "Hotel: " + hotels, 
            "Restarurants: " + restaurants,  
            "Attractions: " + attractions);

