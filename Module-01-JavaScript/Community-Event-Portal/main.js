console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
    alert("Community Portal Loaded");
});

const portalName = "Community Portal";
const launchDate = "2026";

let totalSeats = 100;

console.log(
    `${portalName} launched in ${launchDate}`
);

totalSeats++;

let allEvents = [];

/* -----------------------------------
   CLOSURE
----------------------------------- */

function createRegistrationCounter(){

    let total = 0;

    return function(){

        total++;

        return total;
    };
}

const registrationCounter =
createRegistrationCounter();

/* -----------------------------------
   CLASS
----------------------------------- */

class Event{

    constructor(
        name,
        category,
        date,
        seats
    ){
        this.name = name;
        this.category = category;
        this.date = date;
        this.seats = seats;
    }

    checkAvailability(){

        return this.seats > 0;
    }
}

const demoEvent =
new Event(
    "Music Festival",
    "Music",
    "2026-08-15",
    50
);

console.log(
    Object.entries(demoEvent)
);

/* -----------------------------------
   FUNCTIONS
----------------------------------- */

function addEvent(event){

    allEvents.push(event);
}

function registerUser(eventName){

    try{

        alert(
            `Registered for ${eventName}`
        );

        console.log(
            "Total Registrations:",
            registrationCounter()
        );

    }
    catch(error){

        console.log(error);
    }
}

function filterEventsByCategory(
    category,
    callback
){

    const filtered =
    allEvents.filter(
        event =>
        event.category === category
    );

    callback(filtered);
}

/* -----------------------------------
   FETCH EVENTS
----------------------------------- */

document
.getElementById("loading")
.style.display = "block";

fetch("data/events.json")

.then(response => response.json())

.then(data => {

    allEvents = [...data];

    document
    .getElementById("loading")
    .style.display = "none";

    displayEvents(allEvents);

})

.catch(error => {

    console.log(error);

});

/* -----------------------------------
   DISPLAY EVENTS
----------------------------------- */

function displayEvents(events){

    const container =
    document.querySelector(
        "#eventsContainer"
    );

    container.innerHTML = "";

    events.forEach(event => {

        const card =
        document.createElement("div");

        card.classList.add(
            "event-card"
        );

        card.innerHTML = `

        <h3>${event.name}</h3>

        <p>
            Category:
            ${event.category}
        </p>

        <p>
            Date:
            ${event.date}
        </p>

        <p>
            Seats:
            ${event.seats}
        </p>

        <button
            class="register-btn"
            onclick="registerUser('${event.name}')">

            Register

        </button>
        `;

        container.appendChild(card);

    });

    $("#eventsContainer").fadeIn();
}

/* -----------------------------------
   CATEGORY FILTER
----------------------------------- */

document
.getElementById("categoryFilter")
.addEventListener("change", function(){

    const category =
    this.value;

    if(category === "All"){

        displayEvents(allEvents);

        return;
    }

    filterEventsByCategory(
        category,
        displayEvents
    );
});

/* -----------------------------------
   SEARCH
----------------------------------- */

document
.getElementById("searchInput")
.addEventListener("keyup", function(){

    const keyword =
    this.value.toLowerCase();

    const filtered =
    allEvents.filter(event =>
        event.name
        .toLowerCase()
        .includes(keyword)
    );

    displayEvents(filtered);
});

/* -----------------------------------
   FORM
----------------------------------- */

document
.getElementById("registrationForm")
.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const name =
    this.elements["name"].value;

    const email =
    this.elements["email"].value;

    const event =
    this.elements["event"].value;

    if(
        name === "" ||
        email === "" ||
        event === ""
    ){

        document
        .getElementById("message")
        .innerText =
        "Please fill all fields";

        return;
    }

    document
    .getElementById("message")
    .innerText =
    `Thank you ${name}. Registration Successful`;

    fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method:"POST",

            body:JSON.stringify({
                name,
                email,
                event
            }),

            headers:{
                "Content-Type":
                "application/json"
            }
        }
    )

    .then(response =>
        response.json()
    )

    .then(data => {

        console.log(
            "Registration Sent"
        );

        console.log(data);

    })

    .catch(error => {

        console.log(error);

    });

});

/* -----------------------------------
   GEOLOCATION
----------------------------------- */

document
.getElementById("locationBtn")
.addEventListener(
"click",
getLocation
);

function getLocation(){

    navigator.geolocation
    .getCurrentPosition(

        success,

        error,

        {
            enableHighAccuracy:true,
            timeout:5000
        }
    );
}

function success(position){

    const {
        latitude,
        longitude
    } = position.coords;

    document
    .getElementById(
        "locationResult"
    )
    .innerText =
    `Latitude: ${latitude}
     Longitude: ${longitude}`;
}

function error(err){

    document
    .getElementById(
        "locationResult"
    )
    .innerText =
    err.message;
}