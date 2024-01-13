const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = movieSelect.value;

const currentcount = parseInt(count.textContent);

function selectseat(input) {
  if (
    input.target.className !== "seat occupied" &&
    !input.target.classList.contains("icon")
  ) {
    input.target.classList.toggle("selected");
  }
}

function updatecount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  count.textContent = selectedSeats.length;
  total.textContent = selectedSeats.length * ticketPrice;
}

//film seçimi
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
});

//koltuk seçimi
container.addEventListener("click", (e) => {
  selectseat(e);
  updatecount();
});
