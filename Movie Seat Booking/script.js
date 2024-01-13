const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = movieSelect.value;

populateUI();

//seçilen filmin koltuklaarını kaydetme
function setMovieData(movieIndex, movieValue) {
  localStorage.setItem("selectMovieIndex", movieIndex);
  localStorage.setItem("selectMoviePrice", movieValue);
}

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

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.textContent = selectedSeats.length;
  total.textContent = selectedSeats.length * ticketPrice;
}

// localstorage veri alma ve kullanma
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach((seat) => {
      seats[seat].classList.toggle("selected");
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//film seçimi
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
});

//koltuk seçimi
container.addEventListener("click", (e) => {
  selectseat(e);
  updatecount();
});

updatecount(); //sayfa yenilendiğinde yüklemek için.
