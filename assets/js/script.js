let $cityinput = document.getElementById("city-input");
let $dateinput = document.getElementById("date-input");
let $submit = document.getElementById("submit")
let $hotels = document.getElementById("hotels").checked;
let $rests = document.getElementById("rests").checked;
let $attractions = document.getElementById("attractions").checked;

// creates click event to save search history and function to display in search bar
let searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
$submit.addEventListener("click", () => {
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
