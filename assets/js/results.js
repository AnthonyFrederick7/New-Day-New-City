const $cityresults = document.getElementById('city-results');
const $dateresults = document.getElementById('date-results');
const $hotelresults = document.getElementById('hotel-results');
const $restsresults = document.getElementById('rests-results');
const $attractionsresults = document.getElementById('attractions-results');
const $hotelsShortcut = document.getElementById('hotelsShortcut');
const $restsShortcut = document.getElementById('restsShortcut');
const $attractionsShortcut = document.getElementById('attractionsShortcut');

const myWeatherKey = '7c595b9c2a826cc8f93da7b893dfce75';

// Gets URL data and puts it into an array
var criteriaArray = window.location.href.split(/=|&/);

// Gets arrays of different requests (Hotels, Restaurants, or Attractions)
let nearbyHotels = [{}];
let nearbyRestaurants = [{}];
let nearbyAttractions = [{}];

//Holds the Latitude and Longitude for the current city.
let  lat = '';
let lng = '';

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

//Displays a map of hotels in requested City 
function initMap() {
    console.log(nearbyHotels);
    //map options
    let options = {
      zoom: 10,
      center: {lat: nearbyHotels[0].geoCode.latitude, lng: nearbyHotels[0].geoCode.longitude}
    }
  
    // New map
    let map = new google.maps.Map(document.getElementById('map'), options);
  
    //Add Marker
    for(let i = 0; i<nearbyHotels.length; i++){
        let marker = new google.maps.Marker({
          position:{lat:nearbyHotels[i].geoCode.latitude, lng:nearbyHotels[i].geoCode.longitude},
          map:map,
          title: `${nearbyHotels[i].name}`,
          //click: () => {}
        });
        // var infoWindow = new google.maps.InfoWindow({
        //     content: `<h1>${nearbyHotels[i].name}</h1>`
        // });
        // marker.addListener('click', () => {
        //     infoWindow.open(map, marker);
        // });
    }
}
const displayHotelNames = () => {
    $hotelresults.appendChild(document.createElement('ul'));
    for(let i = 0; i < nearbyHotels.length; i++){
        $hotelresults.firstElementChild.appendChild(document.createElement('li')).textContent = `${nearbyHotels[i].name}`;
    }
    $hotelresults.firstElementChild.style = "font-size: 2em; color: #ffffff"
}



/* getCoords(weatherApiUrl)
Use: This funtion accesses the Weather API program that translates a city name into a set of coordinates.
weatherApiUrl: This is a variable that takes a provided string and uses it as the fetch access endpoint in the funtion.
*/
const options = {method: 'GET', headers: {'accept': 'application/json', 'Authorization': 'Bearer eU3qcOR8triJu545Pe9vIOuEkaAG'}};

const getCoords = (weatherApiUrl) => {
    fetch(weatherApiUrl)
    .then(function (response){
        return response.json();
    }).then(function(data) {
        lat = data[0].lat;
        lng = data[0].lon;
        displayHotelsMap();
    })
}

const displayHotelsMap = () => {
    fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lng}&radius=5&radiusUnit=KM&hotelSource=ALL`, options)
          .then(response => response.json())
          .then(function(response) {
            console.log(response.data);
            nearbyHotels = response.data;
            window.initMap = initMap();
            displayHotelNames();
            fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${nearbyHotels[3].hotelId}`, options)
            .then(response => response.json())
            .then(function(response) {
                console.log(response);
            })
          })
          .catch(err => console.error(err));
}

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
//Gets coords for the current city.
getCoords(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myWeatherKey}`)

console.log("City: " + criteriaArray[1],
            "Date: " + criteriaArray[3], 
            "Hotel: " + hotels, 
            "Restarurants: " + restaurants,  
            "Attractions: " + attractions);