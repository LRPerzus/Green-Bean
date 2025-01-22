function mapClick() {
    fetch('apikey.txt')
        .then(response => response.text())
        .then(apiKey => {
            // Dynamically load Google Maps API
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey.trim()}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        })
        .catch(error => console.error("Error loading API key:", error));
}

function initMap() {
    const npLocation = { lat: 1.3321, lng: 103.7741 };

    // Get the .closestLocation div where the map should be created
    const closestLocationDiv = document.querySelector(".closestLocation");

    // Create a div element for the map directly inside .closestLocation
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    mapDiv.style.width = "100%";
    mapDiv.style.height = "100%";

    // Append the map div to .closestLocation
    closestLocationDiv.appendChild(mapDiv);

    // Initialize Google Maps inside the .closestLocation div
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
