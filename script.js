const container = document.querySelector(".container");
const seat = document.querySelector(".seat");
let count = document.querySelector("#count");
let amount = document.querySelector("#amount");
let select = document.querySelector("#movie");
let seats = document.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
    calculateTotal();
  }
});

select.addEventListener("change", function () {
  calculateTotal();
});

function calculateTotal() {
  const selectedSeats = container.querySelectorAll(".selected");
  let selectedSeatsCount = selectedSeats.length;
  let price = select.value;

  let selectedSeatsArr = [];
  let seatsArr = [];

  seats.forEach((seat) => {
    seatsArr.push(seat);
  });

  selectedSeats.forEach((seat) => {
    selectedSeatsArr.push(seat);
  });

  let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
    return seatsArr.indexOf(seat);
  });

  count.innerText = selectedSeatsCount;
  amount.innerText = price * selectedSeatsCount;

  saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));

  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = JSON.parse(
    localStorage.getItem("selectedMovieIndex")
  );

  if (selectedMovieIndex != null) {
    select.selectedIndex = selectedMovieIndex;
  }
}

function saveToLocalStorage(indexs) {
  localStorage.setItem("selectedSeatIndex", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}
