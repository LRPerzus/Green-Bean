const activitiesRandomList = [
    { "name": "Add a friend", "description": "Community Center", "color": "red" },
    { "name": "Ride Green With AnyWheel", "description": "Community Center", "color": "green" },
    { "name": "Green Your Routine", "description": "Community Center", "color": "brown" }
];

function getRandomTime() {
    let hour = Math.floor(Math.random() * 12) + 8;
    let minute = Math.random() < 0.5 ? '00' : '30';
    return { hour, minute: parseInt(minute) };
}

function convertTimeToMinutes(time) {
    return time.hour * 60 + time.minute;
}

const thisMonth = {};
const daysInMonth = 5;  // Only process 5 days
for (let day = 1; day <= daysInMonth; day++) {
    let numActivities = Math.floor(Math.random() * 3) + 1;  // Up to 3 activities per day
    let activities = [];

    for (let i = 0; i < numActivities; i++) {
        let activity = { ...activitiesRandomList[Math.floor(Math.random() * activitiesRandomList.length)] };
        activity.startTime = getRandomTime();
        activity.endTime = getRandomTime();

        // Ensure the end time is later than the start time
        while (convertTimeToMinutes(activity.endTime) <= convertTimeToMinutes(activity.startTime)) {
            activity.endTime = getRandomTime();
        }

        activities.push(activity);
    }

    // Sort activities by start time
    activities.sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime));
    thisMonth[day] = activities;
}

console.log("thisMonth", thisMonth);
