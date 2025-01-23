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

// Now we are going to set those which have cursor on the HomePage that if they are clickable to run this function of removing
function addClickListenerToPointerElements(containerElement,isControlBar) {
    const allElements = containerElement.querySelectorAll('*');
  
    const elementsWithPointerCursor = Array.from(allElements).filter(element => {
      const style = window.getComputedStyle(element);
      return style.cursor === 'pointer';
    });
  
    elementsWithPointerCursor.forEach(element => {
      element.addEventListener('click', () => {
        // Hide the ".userImage" and ".userText" elements
        const userImage = document.querySelector(".userImage");
        const userText = document.querySelector(".userText");
  
        if (userImage) userImage.classList.add("hidden");
        if (userText) userText.classList.add("hidden");
  
        // Show the "#returnArrow" element
        const returnArrow = document.querySelector("#returnArrow");
        if (returnArrow) returnArrow.classList.remove("hidden");
  
        // Hide the "#controlBar" element
        if (!isControlBar)
        {
            const controlBar = document.querySelector("#controlBar");
            if (controlBar) controlBar.classList.add("hidden");
        }
       
      });
    });
}

const homePageElement = document.getElementById("Homepage");
addClickListenerToPointerElements(homePageElement,false);
const controlPannel = document.getElementById("controlBar");
addClickListenerToPointerElements(controlPannel,true);

// Functionality of back button
const backButton = document.getElementById("returnArrow");
backButton.addEventListener("click", () =>{

    const allMainPages = Array.from(document.querySelectorAll(".mainContent"));
    console.log("allMainPages",allMainPages)
    allMainPages.forEach(mainPage => {
        if (mainPage.getAttribute("id") !== "Homepage")
        {
            mainPage.classList.add("hidden");
        }
        else
        {
            mainPage.classList.remove("hidden");
        }
    });

    const userImage = document.querySelector(".userImage");
    const userText = document.querySelector(".userText");

    if (userImage) userImage.classList.remove("hidden");
    if (userText) userText.classList.remove("hidden");

    // Show the "#returnArrow" element
    const returnArrow = document.querySelector("#returnArrow");
    if (returnArrow) returnArrow.classList.add("hidden");

    // Hide the "#controlBar" element
    const controlBar = document.querySelector("#controlBar");
    if (controlBar) controlBar.classList.remove("hidden");

})

controlPannel.querySelectorAll(".greenOption").forEach(controlOptions => {
    controlOptions.addEventListener("click", function() {
        const currentlyActive = document.querySelector(".active");
        if (currentlyActive) currentlyActive.classList.remove("active");
        this.classList.add("active");  // `this` refers to the clicked element
    });
});

// Click function for redeemVoucher
const redeemVoucherElement = homePageElement.querySelector(".redeemVoucher .container");
redeemVoucherElement.addEventListener("click", () => {
    const homePage = document.getElementById("Homepage")
    homePage.classList.add("hidden")

    const beanRedemption = document.getElementById("beanRedemption");
    beanRedemption.classList.remove("hidden")

})


// Click function for see local rankings
const seemoreRankingElement = homePageElement.querySelector(".rankingMore .container");
seemoreRankingElement.addEventListener("click",() => {
    homePageElement.classList.add("hidden");

    const rankings = document.getElementById("rankings");
    rankings.classList.remove("hidden");
})
  





