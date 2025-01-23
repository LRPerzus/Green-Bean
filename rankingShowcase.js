document.addEventListener("DOMContentLoaded", () => {
    const rankingList = document.querySelector("#rankList");
    const rankingListContainer = document.querySelector(".list-container");

    function adjustRankingList() {
        const items = Array.from(rankingList.children);

        // Remove existing ellipsis if present
        items.forEach(item => {
            if (item.classList.contains("ellipsis")) item.remove();
        });

        // Create an ellipsis item
        const ellipsis = document.createElement("li");
        ellipsis.classList.add("ellipsis");
        ellipsis.innerHTML = `
            <span class="rankText"> ... </span>
            <span class="nameText"> ... </span>
        `;

        // Add the ellipsis before removing excess items
        rankingList.appendChild(ellipsis);

        // Remove items until it fits
        while (rankingList.scrollHeight > rankingListContainer.clientHeight) {
            const lastItem = rankingList.children[rankingList.children.length - 2]; // Get last real item
            if (lastItem) lastItem.remove();
        }
    }

    adjustRankingList();
    window.addEventListener("resize", adjustRankingList); // Adjust when the window resizes
});
