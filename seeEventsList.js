const eventList = [
    {
        name: "Workshop A",
        startTime: "14:00",
        endTime: "16:30",
        image: "assets/plantWorkshop.png",
        location: "Community Center"
    },
    {
        name: "Workshop B",
        startTime: "18:00",
        endTime: "20:00",
        image: "assets/potEvent.png",
        location: "Tech Hub"
    },
    {
        name: "Workshop C",
        startTime: "07:00",
        endTime: "08:30",
        image: "assets/gardeningEvent.png",
        location: "Local Park"
    }
];

function getRandomEvents() {
    const numEvents = Math.floor(Math.random() * 3) + 1;
    const selectedEvents = [];
    const usedIndices = new Set();
    
    while (selectedEvents.length < numEvents) {
        const index = Math.floor(Math.random() * eventList.length);
        if (!usedIndices.has(index)) {
            usedIndices.add(index);
            selectedEvents.push(eventList[index]);
        }
    }
    return selectedEvents;
}

function formatTime(time) {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let hour = parseInt(hours);
    if (hour >= 12) {
        period = "PM";
        if (hour > 12) hour -= 12;
    }
    return `${hour}:${minutes} ${period}`;
}

function getRandomSpaceClass() {
    const classes = ["noSpace", "midSpace", "alotSpace"];
    return classes[Math.floor(Math.random() * classes.length)];
}

function displayEvents() {
    const container = document.getElementById("seeEvents");
    if (!container) return;

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const eventsHTML = [today, tomorrow].map(date => {
        const events = getRandomEvents();
        const formattedDate = date.toDateString();
        
        return `
            <div class="dateEvents">
                <div class="Date title">
                    <span>${formattedDate}</span>
                </div>
                <div class="eventsList">
                    <ul>
                        ${events.map(event => {
                            const spaceClass = getRandomSpaceClass();
                            const jsonData = JSON.stringify({...event, date: formattedDate});
                            return `
                                <li class="event ${spaceClass}" JsonData='${jsonData}'>
                                    <div class="imageOfEvent">
                                        <img src="${event.image}" alt="Event Image">
                                    </div>
                                    <div class="details">
                                        <span class="name">${event.name}</span>
                                        <span class="timing"> ${formatTime(event.startTime)} - ${formatTime(event.endTime)}</span>
                                    </div>
                                    <div class="addToCalandar">
                                        <img src="assets/addTocalander.png" alt="Add to Calendar" JsonData='${jsonData}' ${spaceClass === "noSpace" ? 'canceled="true"' : ''}>
                                        ${spaceClass === "noSpace" ? '<img class="cancel" src="assets/cancel.png" alt="Cancel Event">' : ''}
                                    </div>
                                    <div class="location">
                                        <img src="assets/location.png" alt="Location Icon">
                                        <span>${event.location}</span>
                                    </div>
                                </li>`;
                        }).join('')}
                    </ul>
                </div>
            </div>`;
    }).join('');

    container.innerHTML = eventsHTML;
}

const upcomingEvent = document.getElementById("upcomingEvents");
upcomingEvent.addEventListener("click", displayEvents());
