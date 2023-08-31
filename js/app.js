//TODO Tanımlama---------------------------------------------------------
let islenmisData;
let cathegory = ["Fire", "Water", "Grass"];
let list = document.querySelector(".list");
const buttonFire = document.querySelector(".buttonFire");
const buttonWater = document.querySelector(".buttonWater");
const buttonGrass = document.querySelector(".buttonGrass");
const buttonAll = document.querySelector(".buttonAll");

//TODO Fetc--------------------------------------------------------------

fetch("./json/pokedex.json")
  .then((response) => response.json())
  .then((data) => {
    ekleme(data, cathegory);
    return (islenmisData = data);
  });

const belirleme = (key, div) => {
  const kart = document.querySelector(".sayi" + key);
  kart.addEventListener("mouseenter", function () {
    document.querySelector(".sayiImage" + key).classList.add("cardImageEffect");
  });
  kart.addEventListener("mouseleave", function () {
    document
      .querySelector(".sayiImage" + key)
      .classList.remove("cardImageEffect");
  });
};

//TODO Button Events-----------------------------------------------------
buttonFire.addEventListener("click", () => {
  let cathegory = ["Fire"];
  ekleme(islenmisData, cathegory);
});
buttonWater.addEventListener("click", () => {
  let cathegory = ["Water"];
  ekleme(islenmisData, cathegory);
});
buttonGrass.addEventListener("click", () => {
  let cathegory = ["Grass"];
  ekleme(islenmisData, cathegory);
});
buttonAll.addEventListener("click", () => {
  let cathegory = ["Fire", "Water", "Grass"];
  ekleme(islenmisData, cathegory);
});
//TODO Virtual DOM ekleme--------------------------------------------------
const ekleme = (islenmisData, cathegory) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  let products = islenmisData.pokemons;
  products.forEach((value, key) => {
    if (cathegory.includes(value.type)) {
      let newDiv = document.createElement("div");
      newDiv.classList.add("cardAll", "sayi" + key, "col-md-2", "col-12");
      newDiv.setAttribute("onmouseover", `belirleme(${key},this)`);
      newDiv.innerHTML = `<div class="cardCerceve col-12 d-flex justify-content-center">
                                 <img class="cardImage sayiImage${key}" src="${
        value.url
      }">
                             </div>
                             <div class="cardCerceve col-12 d-flex flex-wrap justify-content-center align-items-center ">
                                 <div class="col-12 lead text-center fw-semibold mb-4">${
                                   value.name
                                 }</div>
                                 <div class="${
                                   value.type == "Water"
                                     ? "badge bg-primary"
                                     : value.type == "Fire"
                                     ? "badge bg-danger"
                                     : value.type == "Grass"
                                     ? "badge bg-success"
                                     : ""
                                 } col-4 p-2 lead text-center mb-5">${
        value.type
      }</div> 
                             </div>`;
      list.appendChild(newDiv);
    }
  });
};
