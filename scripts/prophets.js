const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector("#cards");

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthdate = document.createElement('p');
        const birthplace = document.createElement('p');

        // Populate the heading
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Set image attributes
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add birth information
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Append elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthdate);
        card.appendChild(birthplace);

        // Append card to the cards div
        cards.appendChild(card);
    });
};

async function getProphetData() {
    const response = await fetch(url)
    const data = await response.json();
    // console.table(data);
    displayProphets(data.prophets); 
}

getProphetData();