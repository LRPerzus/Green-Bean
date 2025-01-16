document.addEventListener("DOMContentLoaded", async () => {
    // Select all beans and sort them based on their class name order
    const beans = Array.from(document.querySelectorAll(".loadingBeans")).sort((a, b) => {
        const order = ["first", "second", "third", "fourth"];
        return order.indexOf(a.classList[0]) - order.indexOf(b.classList[0]);
    });

    // Function to animate each bean sequentially
    const animateBeans = async () => {
        for (let i = 0; i < beans.length; i++) {
            beans[i].classList.add("pop-in");
            await new Promise(resolve => setTimeout(resolve, 75)); // Wait before next bean
        }
    };

    await animateBeans(); // Wait for all beans to animate

    await new Promise(resolve => setTimeout(resolve, 500)); // Wait 2 seconds after animation

    // Hide loading page
    document.querySelector(".beanLoading").style.display = "none";
    // Show the login options
    document.querySelector(".loginOptions").style.display = "flex";

});
