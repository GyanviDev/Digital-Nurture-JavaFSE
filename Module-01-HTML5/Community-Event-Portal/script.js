console.log("Community Event Portal Loaded");

const form = document.getElementById("eventForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    document.getElementById("confirmation").textContent =
        "Registration submitted successfully.";

});