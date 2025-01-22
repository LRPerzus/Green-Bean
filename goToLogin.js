function goToLogin()
{
    const manualLogionHidden = document.getElementById("manualLogin");
    const loginPageToHide = document.getElementById("logionOptions");

    manualLogionHidden.classList.remove("hidden");
    loginPageToHide.classList.add("hidden");
}

function goToMainPage() {
    // Get the user input values
    let usernameInput = document.getElementById("loginUser").value.trim();
    
    // Default to "username" if input is empty
    let setUsername = usernameInput ? usernameInput : "username";
    
    // Log the username for debugging
    console.log("Set Username:", setUsername);
    
    // You can now use setUsername as needed, such as storing it or redirecting the user
    // Example: Redirecting to another page
    window.location.href = `mainPage.html?username=${encodeURIComponent(setUsername)}`;
}