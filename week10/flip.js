const card = document.querySelector(".card")

card.addEventListener("click", flip)
function flip() {
    card.classList.toggle("flip");
}