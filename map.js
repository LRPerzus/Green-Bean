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

        // Define the custom icon
        const customIcon = {
            url: "./assets/weighingScale.png", // Replace with the path to your PNG file
            scaledSize: new google.maps.Size(50, 50), // Resize the icon (optional)
            origin: new google.maps.Point(0, 0), // Origin point
            anchor: new google.maps.Point(25, 50) // Anchor point (adjust as needed)
        };

        // Function to generate random locations near a given coordinate
        function getRandomLocation(baseLocation, offset = 0.002) {
            return {
                lat: baseLocation.lat + (Math.random() * offset * 2 - offset),
                lng: baseLocation.lng + (Math.random() * offset * 2 - offset)
            };
        }

        // Generate 5 random markers
        for (let i = 0; i < 5; i++) {
            new google.maps.Marker({
                position: getRandomLocation(npLocation),
                map: map,
                title: `Random Location ${i + 1}`,
                icon: customIcon
            });
        }
    }
}
