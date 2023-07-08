// ASI: Automatic Semicolon
const cardImage = document.querySelector(".card-image-top");

const pokeName = document.querySelector(".pokeName");

const searchPoke = document.querySelector(".pokeSearch");

const DROPZONE = document.getElementById("dropZone");

const DRAGGEDIMAGE = document.getElementById("dragMe");

searchPoke.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        fetchpoke();
    }
})

function fetchpoke() {

    let valueOfSearch = searchPoke.value.trim().toLowerCase();

    if (!valueOfSearch) {
        //alert("No Name Given!");
        Swal.fire({
            icon: "error",
            title: "Opss..",
            text: "Please Enter a Name!",
            footer: "Please Contact the developer for any questions"
        });
        return;
    }

    const apiEndPunkt = `https://pokeapi.co/api/v2/pokemon/${valueOfSearch}`;


    // alert(valueOfSearch);

    fetch(apiEndPunkt)
        .then((response) => response.json())
        .then((data) => {

            cardImage.src = data.sprites.front_default;

            pokeName.textContent = data.name;

            // ! CONFETTI EFFFECT
            confetti({
                spread: 400,
                particleCount: 100,
                shapes: ["star"],
                scalar: 1,
                colors: ["#F9CCCA", "#B4E8C8", "#C7B8FF"]
            });

        })
        .catch((error) => {
            Swal.fire({
                icon: "question",
                title: "Couldnt find your Pokemon",
                text: "You might have given the name not correctly, or the pokemon doesnt exist",
                footer: error
            });
        })
}

async function generatePokemonNames() {
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
            'model': 'text-davinci-002',
            'prompt': 'Write 10 pokemon names next to each other seperated by commas',
            'max_tokens': 120,
        })
    });

    if (!response.ok) {
        Swal.fire({
            title: response.status
        })
    }
    else {
        const dataVonKI = await response.json();
        console.log(dataVonKI)
        document.getElementById("pokemonNameContainer").innerText = dataVonKI.choices[0].text.trim();

    }

}

generatePokemonNames();

//Drag and dfrop Action! 
DROPZONE.addEventListener("dragover", (e) => {
    e.preventDefault(); //dieses code blockiert das das bild auf dem body gesticktwird beim schweben auf dem body
});

DROPZONE.addEventListener("drop", (e) => {
    e.preventDefault();
    const imgURL = e.dataTransfer.getData('text/plain');
    const newImgContainer = document.createElement('img'); //im Background

    newImgContainer.src = imgURL;
    DROPZONE.appendChild(newImgContainer);
})

DRAGGEDIMAGE.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData('text/plain', DRAGGEDIMAGE.src);
});


function doSomething() {
    alert("DU HAST ETWAS GEMACHT!")
}

//fang der Knopf aus ihre ID
const actionButton = document.getElementById("uebung");

actionButton.addEventListener("click", () => {
    // finde jetzt wie der Body tag mit JS gefangen werden kann für ein neuen hintergrund farbe
    document.body.style.backgroundColor = "purple";
})