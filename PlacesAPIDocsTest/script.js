let map;
let service;
let infowindow;
const myWeatherKey = '7c595b9c2a826cc8f93da7b893dfce75';
const tripadvisorKey = 'A52824AD6AD843C38D6D4678E544DD65';
const $root = document.getElementById("root");
let nearbyHotels = [{}];
let lat = '';
let lon = '';
let userLocale = prompt("Where would you like to go?");

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

//   infowindow = new google.maps.InfoWindow();
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: {lat:32.2319, lng:-110.9501},
//     zoom: 15,
//   });

//   const request = {
//     query: userLocale,
//     fields: ["name", "geometry"],
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.findPlaceFromQuery(request, (results, status) => {
//     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
//       for (let i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }

//       map.setCenter(results[0].geometry.location);
//     }
//   });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

const options = {method: 'GET', headers: {'accept': 'application/json', 'Authorization': 'Bearer lExl2tfyVHra3T9sgJ2poBLzWScJ'}};


let getCoords = (weatherApiUrl) => {
    fetch(weatherApiUrl)
    .then(function (response){
        return response.json();
    }).then(function(data) {
        lat = data[0].lat;
        lon = data[0].lon;
        
        fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}&radius=5&radiusUnit=KM&hotelSource=ALL`, options)
          .then(response => response.json())
          .then(function(response) {
            console.log(response.data);
            nearbyHotels = response.data;
            window.initMap = initMap();
          })
          .catch(err => console.error(err));
    })
}

getCoords(`https://api.openweathermap.org/geo/1.0/direct?q=${userLocale}&appid=${myWeatherKey}`)
//console.log();