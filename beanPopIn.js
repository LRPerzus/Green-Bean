document.addEventListener("DOMContentLoaded", () => {
    // Select all beans and sort them based on their class name order
    const beans = Array.from(document.querySelectorAll(".loadingBeans")).sort((a, b) => {
        const order = ["first", "second", "third", "fourth"];
        return order.indexOf(a.classList[0]) - order.indexOf(b.classList[0]);
    });

    // Apply animation with delay
    beans.forEach((bean, index) => {
        setTimeout(() => {
            bean.classList.add("pop-in");
        }, index * 75); // Adjust timing as needed
    });
});