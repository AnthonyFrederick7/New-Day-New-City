let $userinput = document.getElementById("user-input")
let $cityinput = document.getElementById("city-input");
let $dateinput = document.getElementById("date-input");
let $submit = document.getElementById("submit")
let $hotels = document.getElementById("hotels");
let $rests = document.getElementById("rests");
let $attractions = document.getElementById("attractions");
const $results = "./results.html";

// creates click event to save search history and function to display in search bar
let searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
$userinput.addEventListener("submit", () => {
    searchHistory.push($cityinput.value);
    localStorage.searchHistory = JSON.stringify(searchHistory);
});
$cityinput.addEventListener("focus", () => {
    let data = document.querySelector("datalist#searchdata");
    data.innerHTML = "";
    searchHistory.forEach((search) => {
    data.innerHTML = "<option>" + data.innerHTML;
    data.querySelector("option").innerText = search;
    });
});

// Once submit is clicked, takes you to results page
$submit.addEventListener("click", redirectFunction);
function redirectFunction(event) {
    event.preventDefault()
//Capture form input here
window.location.replace($results)}