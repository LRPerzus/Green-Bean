const activitiesRandomList = [
    { "name": "Add a friend", "description": "Community Center", "color": "#F4A07A" },
    { "name": "Ride Green With AnyWheel", "description": "Community Center", "color": "#D5FFAB" },
    { "name": "Green Your Routine", "description": "Community Center", "color": "#B99470" }
];

function getRandomTime() {
    let hour = Math.floor(Math.random() * 12) + 8;
    let minute = Math.random() < 0.5 ? '00' : '30';
    return { hour, minute: parseInt(minute) };
}

function convertTimeToMinutes(time) {
    return time.hour * 60 + time.minute;
}

function generateRandomMonth() {
    const daysInMonth = 5; // Number of days with events
    const maxEventsPerDay = 3; // Max 3 events per day
    const maxTotalEvents = 10; // Max 10 events in total
    const randomMonth = {};

    let eventCount = 0;
    let daysSelected = [];

    while (eventCount < maxTotalEvents && daysSelected.length < daysInMonth) {
        let randomDay = Math.floor(Math.random() * 31) + 1; // Random day between 1 and 31
        if (!daysSelected.includes(randomDay)) {
            daysSelected.push(randomDay);
            let numEvents = Math.floor(Math.random() * maxEventsPerDay) + 1; // Random events per day (1 to 3)

            let activities = [];
            for (let i = 0; i < numEvents; i++) {
                let activity = { ...activitiesRandomList[Math.floor(Math.random() * activitiesRandomList.length)] };
                activity.startTime = getRandomTime();
                activity.endTime = getRandomTime();

                while (convertTimeToMinutes(activity.endTime) <= convertTimeToMinutes(activity.startTime)) {
                    activity.endTime = getRandomTime();
                }

                activities.push(activity);
                eventCount++;
                if (eventCount >= maxTotalEvents) break;
            }

            // Sort activities for the day
            activities.sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime));
            randomMonth[randomDay] = activities;
        }
    }

    return randomMonth;
}

let thisMonth;

// Check if `thisMonth` is stored in localStorage
if (localStorage.getItem("thisMonth")) {
    // If stored in localStorage, use the stored data
    thisMonth = JSON.parse(localStorage.getItem("thisMonth"));
} else {
    // If not stored, generate and store it
    thisMonth = generateRandomMonth();
    localStorage.setItem("thisMonth", JSON.stringify(thisMonth));
}

console.log("thisMonth", thisMonth);

function populateCalendar() {
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Get the calendar element
    const calendarElement = document.getElementById("Calander");

    // Create the full HTML content for the calendar
    let tableHTML = `
        <div class="calendar-header">
            <h2>${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}</h2>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>`;

    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    let daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Ensure you get the correct number of days
    let dayCounter = 1;

    for (let week = 0; week < 6 && dayCounter <= daysInMonth; week++) {
        tableHTML += `<tr>`;
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            if ((week === 0 && dayOfWeek < firstDay) || dayCounter > daysInMonth) {
                tableHTML += `<td></td>`; // Empty cell for padding
            } else {
                tableHTML += `<td data-day="${dayCounter}" class="calendar-day">${dayCounter}`;
                if (thisMonth[dayCounter]) {
                    thisMonth[dayCounter].forEach(activity => {
                        tableHTML += `
                            <div style="background-color: ${activity.color}; height: 10px; margin-top: 5px; border-radius: 5px;"></div>
                        `;
                    });
                }
                tableHTML += `</td>`;
                dayCounter++;
            }
        }
        tableHTML += `</tr>`;
    }

    tableHTML += `</tbody></table>`;

    // Add the generated table HTML to the calendar div
    calendarElement.innerHTML = tableHTML;

    // Add event listeners for each date to show detailed view
    const dayCells = document.querySelectorAll(".calendar-day");
    dayCells.forEach(cell => {
        cell.addEventListener("click", function() {
            document.getElementById("CalanderMoreDetails").classList.remove("hidden");
            document.getElementById("Calander").classList.remove("hidden");

            showDayDetails(parseInt(cell.getAttribute("data-day")));
        });
    });
}

function showDayDetails(day) {
    const dayDetailsDiv = document.getElementById("CalanderMoreDetails");
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Show the detailed information of the selected day
    let detailsHTML = `
    <div class="details-header">
        <button id="prevDay" class="nav-arrow">←</button>
        <h3>${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}</h3>
        <button id="nextDay" class="nav-arrow">→</button>
    </div>
    <div class="activities">`;

    if (thisMonth[day]) {
        thisMonth[day].forEach(activity => {
            detailsHTML += `
            <div class="activity" style="background-color: ${activity.color};">
                <span class="title">${activity.name}</span>
                <div class="activity-details">
                    <div class="time">
                        <span>${activity.startTime.hour}:${activity.startTime.minute < 10 ? '0' : ''}${activity.startTime.minute} - ${activity.endTime.hour}:${activity.endTime.minute < 10 ? '0' : ''}${activity.endTime.minute}</span>
                    </div>
                    <div class="description">
                        <span>Description: </span>
                        <span> ${activity.description} </span>

                       
                    </div>
                </div>
            </div>
        `;
        });
    }

    detailsHTML += `</div>`;

    dayDetailsDiv.innerHTML = detailsHTML;

    // Add event listeners for the navigation arrows
    document.getElementById("prevDay").addEventListener("click", function() {
        if (day > 1) {
            showDayDetails(day - 1);
        }
    });

    document.getElementById("nextDay").addEventListener("click", function() {
        if (day < 31) {
            showDayDetails(day + 1);
        }
    });

    // Hide the calendar and show the details
    document.getElementById("Calander").classList.add("hidden");
}


document.addEventListener("DOMContentLoaded", populateCalendar);
