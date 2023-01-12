let $userinput = document.getElementById("user-input")
let $cityinput = document.getElementById("city-input");
let $dateinput = document.getElementById("date-input");
let $submit = document.getElementById("submit")
let $hotels = document.getElementById("hotels");
let $rests = document.getElementById("rests");
let $attractions = document.getElementById("attractions");
const $results = "./results.html";
let $options = document.querySelector(".options")

// creates click event to save search history and function to display in search bar
let searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
$userinput.addEventListener("submit", () => {


    if (searchHistory.indexOf($cityinput.value.toLowerCase()) == -1){
    searchHistory.push($cityinput.value.toLowerCase());
    localStorage.searchHistory = JSON.stringify(searchHistory);
    }
});


// listens for search box to be focused and displays previous searches
$cityinput.addEventListener("focus", () => {
    let data = document.querySelector("datalist#searchdata");
    data.innerHTML = "";
    searchHistory.forEach((search) => {
    data.innerHTML = "<option>" + data.innerHTML;
    data.querySelector("option").innerText = search;
    });
});

// Once submit is clicked, takes you to results page
// $submit.addEventListener("click", redirectFunction);
// function redirectFunction(event) {
//     event.preventDefault()
// //Capture form input here
// window.location.replace($results)}
//checkbox verification

function checkboxValidation(theForm) {
    if (
    theForm.hotels.checked == false &&
    theForm.restaurants.checked == false &&
    theForm.attractions.checked == false)
    {

        $options.firstElementChild.style.color = "red";
        $options.firstElementChild.textContent = "Please select at least one option";
        return false;
    } else {
        return true;
    }
}

// checks todays date and sets min for date picker
let today = new Date().toISOString().split('T')[0];
document.getElementsByName("date")[0].setAttribute('min', today);

