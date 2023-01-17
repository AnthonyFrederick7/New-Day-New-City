const $cityresults = document.getElementById('city-results');
const $dateresults = document.getElementById('date-results');
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
        map:map
      });
    }
  }
  
  const options = {method: 'GET', headers: {'accept': 'application/json', 'Authorization': 'Bearer 3iS5f2nQELhB1d4AfqsN64iBgH84'}};
  
  /* getCoords(weatherApiUrl)
  Use: This funtion accesses the Weather API program that translates a city name into a set of coordinates.
  weatherApiUrl: This is a variable that takes a provided string and uses it as the fetch access endpoint in the funtion.
  */
 
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
    })
    .catch(err => console.error(err));
  }
  
//Displays city and date at top of page
$cityresults.textContent = "the city of " + cityFormat;
$dateresults.textContent = dateFormat;

//Gets coords for the current city.
getCoords(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myWeatherKey}`)

console.log("City: " + criteriaArray[1],
            "Date: " + criteriaArray[3], 
            "Hotel: " + hotels, 
            "Restarurants: " + restaurants,  
            "Attractions: " + attractions);
