if (userData.username !== "")
{
    console.log("userData",userData);

    // Updating the general options
    const usernameElement = document.querySelector(".username");
    usernameElement.textContent = userData.userName;

    const rankElement = document.querySelector(".rank");
    rankElement.textContent = "#" + userData.ranking;

    const totalBeans = document.querySelector(".noOfBeans span");
    totalBeans.textContent = userData.totalBeans;

    const dateElement = document.querySelector(".upcomingDate");
    dateElement.textContent = formatDate(userData.calanderEvent[0].date)

    const upcomingEvent = document.querySelector(".eventName");
    upcomingEvent.textContent = userData.calanderEvent[0].eventName;

}
else
{
    console.log("USERDATA IS EMPTY")
}

// Function to format the date as "3rd January"
function formatDate(dateString) {
    const date = new Date(dateString);

    // Array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get the day of the month (1-31)
    let day = date.getDate();

    // Determine the appropriate suffix (st, nd, rd, th)
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) {
        suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
        suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
        suffix = "rd";
    }

    // Get the month name
    const month = months[date.getMonth()];

    // Return the formatted date
    return `${day}${suffix} ${month}`;
}
