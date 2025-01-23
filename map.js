function mapClick() {
    const homePageElement = document.getElementById("Homepage");
    homePageElement.classList.add("hidden");

    const mapElement = document.getElementById("Map");
    mapElement.classList.remove("hidden");

    // Prompt the user to enter the API key
    const apiKey = prompt("Please enter your Google Maps API key:");

    if (apiKey && apiKey.trim() !== "") {
        // Dynamically load the Google Maps API script with the provided API key
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.trim()}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    } else {
        alert("API key is required to load the map.");
    }
}


function initMap() {
    const npLocation = { lat: 1.3321, lng: 103.7741 };

    // Find the .closestLocation div where the map will be created
    const closestLocationDiv = document.querySelector(".closestLocation");

    // Only create the map if the map is not already present
    if (!closestLocationDiv.querySelector('#map')) {
        // Create the div element for the map inside .closestLocation
        const mapDiv = document.createElement("div");
        mapDiv.id = "map";
        mapDiv.style.width = "100%";
        mapDiv.style.height = "500px";

        // Append the new map div to .closestLocation
        closestLocationDiv.appendChild(mapDiv);

        // Initialize the map inside the new div
        const map = new google.maps.Map(mapDiv, {
            center: npLocation,
            zoom: 16,
        });

        // Add a marker at Ngee Ann Polytechnic
        new google.maps.Marker({
            position: npLocation,
            map: map,
            title: "Ngee Ann Polytechnic"
        });
    }
}
