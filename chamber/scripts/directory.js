const membersElement = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Display the current year and last modified date
document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

// Mobile navigation

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Get business members from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersElement.textContent = "Unable to load business members.";
        console.error(error);
    }
}

// Display members
function displayMembers(members) {
    membersElement.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership: ${member.membershipLevel === 3 ? "Gold" : member.membershipLevel === 2 ? "Silver" : "Member"}</p>
        `;

        membersElement.appendChild(card);
    });
}

// Grid view

gridButton.addEventListener("click", () => {
    membersElement.classList.add("members-grid");
    membersElement.classList.remove("members-list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});

// List view
listButton.addEventListener("click", () => {
    membersElement.classList.add("members-list");
    membersElement.classList.remove("members-grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
});

// Load the members
getMembers();