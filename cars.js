const colors = ["red", "green", "yellow", "black"];
const types = ["bmw", "mrcds", "mazda", "subaro"];
const doors = [2, 4, 5];
const DOM = {};
const imageurls = [
  "https://www.bmw.co.il/content/dam/bmw/common/all-models/7-series/sedan/2019/inform/bmw-7series-sedan-inform-line-02-slide-01.jpg.asset.1566410543564.jpg",
  "https://www.mercedes-benz.co.il/wp-content/uploads/859-2.jpg",
  "https://www.mazda.co.il/Uploads/ProductPage/360/11/1d3248/1.jpg?width=750",
  "https://www.cartube.co.il/images/stories/subaru/xv/2017/2017-subaru-xv-new-560px.jpg",
];

const displayFunctions = {
  cards: getCardItem, //card unit
  list: getListItem, //list unit
  table: getRowItem, //table row unit
};
console.log(displayFunctions);

function generateCars(numberOfCars, isArray) {
  //return array with Cars ( each car  is is an object in JS)
  if (typeof numberOfCars !== "number") return;
  const cars = isArray ? [] : {};
  for (let index = 0; index < numberOfCars; index++) {
    if (isArray) cars.push(generateSingleCar(index));
    else {
      const singleCar = generateSingleCar(index);
      cars[singleCar.lp.toString()] = singleCar;
    }
  }
  return cars;
}

function generateSingleCar(index) {
  return {
    lp: _generateLP(),
    color: _generateColor(),
    type: _generateType(),
    doors: _generateDoors(),
    isSunRoof: _isSunRoof(index),
    image: _generateImage(),
  };

  function _generateLP() {
    return Math.ceil(Math.random() * 999999);
  }
  function _generateColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
  function _generateDoors() {
    return doors[Math.floor(Math.random() * doors.length)];
  }
  function _isSunRoof(index) {
    return index % 2 === 0 ? true : false;
  }
  function _generateType() {
    return types[Math.floor(Math.random() * types.length)];
  }
  function _generateImage() {
    return imageurls[Math.floor(Math.random() * imageurls.length)];
  }
}

// array [....]
// filter - filter by boolean statment
// find - like filter but exactly one, the first one.
// findIndex - exactly like find, but return only the index.
// map - return partial result
// reduce - next time..

(function () {
  const cars = generateCars(100, true); // car shop add 100 car
  DOM.listData = document.getElementById("data"); //list view
  DOM.cardsData = document.getElementById("data-cards"); //card view
  DOM.tableData = document.getElementById("Table-Data"); //table view
  draw(cars, DOM.listData, "list"); //show in list view

  const listViewButton = document.getElementById("listView");
  const cardViewButton = document.getElementById("cardView");
  const tableViewButton = document.getElementById("tableView");
  const searchButton = document.getElementById("btnSearch");
  const searchInput = document.getElementById("searchInput");

  searchButton.addEventListener("click", function () {
    const carsOfType = findCarsOfType(cars, searchInput.value);
    draw(carsOfType, DOM.listData, "list");
  });
  listViewButton.addEventListener("click", function () {
    draw(cars, DOM.listData, "list");
  });
  cardViewButton.addEventListener("click", function () {
    draw(cars, DOM.cardsData, "cards");
  });
  tableViewButton.addEventListener("click", function () {
    draw(cars, DOM.tableData, "table");
  });
})();

function draw(data, domContainer, displayType) {
  clearDOM();
  if (!Array.isArray(data)) return;
  if (typeof domContainer !== "object") return;
  const displayFunction = displayFunctions[displayType];
  if (displayType === "table") drawTableRow(domContainer);
  if (typeof displayFunction !== "function") return;
  data.forEach((car) => {
    domContainer.append(displayFunction(car));
  });
}

function clearDOM() {
  DOM.listData.innerHTML = "";
  DOM.cardsData.innerHTML = "";
  DOM.tableData.innerHTML = "";
}
function getListItem(carData) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.innerHTML = `car lp: ${carData.lp}, car color: ${carData.color} , Type: ${carData.type}`;
  return listItem;
}

function getCardItem(carData) {
  const card = document.createElement("div");
  const cardbody = document.createElement("div");
  let paragraph = document.createElement("p");
  let img = document.createElement("img");

  img.className = "card-img-top";

  card.className = "card col-lg-3 m-2 ";
  cardbody.className = "card-body";
  paragraph.className = "card-text";

  card.style.display = "inline-block";
  card.style.backgroundColor = _pickColor();
  img.src = _pickimg();
  paragraph.innerHTML = `<strong>car lp:</strong> ${carData.lp}<br> <strong> car color:</strong> ${carData.color} <strong> Type:</strong> ${carData.type}`;

  cardbody.append(paragraph);
  card.append(cardbody);
  card.append(img);
  return card;

  function _pickColor() {
    if (carData.color === "red") {
      card.style.backgroundColor = "red";
    } else if (carData.color === "green") {
      card.style.backgroundColor = "green";
    } else if (carData.color === "yellow") {
      card.style.backgroundColor = "yellow";
    } else if (carData.color === "black") {
      card.style.backgroundColor = "black";
      card.style.color = "white";
    }
  }
  function _pickimg() {
    if (carData.type === "bmw") {
      return imageurls[0];
    } else if (carData.type === "mrcds") {
      return imageurls[1];
    } else if (carData.type === "sazda") {
      return imageurls[2];
    } else if (carData.type === "subaro") {
      return imageurls[3];
    }
  }
}
function drawTableRow(domContainer) {
  const th_lp = document.createElement("th");
  th_lp.innerText = "Licence Plate";
  const th_color = document.createElement("th");
  th_color.innerText = "Color";
  const th_doors = document.createElement("th");
  th_doors.innerText = "Door";
  const th_model = document.createElement("th");
  th_model.innerText = "Model";

  domContainer.append(th_lp, th_color, th_doors, th_model);
}
function getRowItem(carData) {
  const tableRow = document.createElement("tr");
  const tableDataCarLp = document.createElement("td");
  const tableDataCarColor = document.createElement("td");
  const tableDataCarDoor = document.createElement("td");
  const tableDataCarType = document.createElement("td");
  tableDataCarLp.innerText = carData.lp;
  tableDataCarColor.innerText = carData.color;
  tableDataCarDoor.innerText = carData.doors;
  tableDataCarType.innerText = carData.type;

  tableRow.append(
    tableDataCarLp,
    tableDataCarColor,
    tableDataCarDoor,
    tableDataCarType
  );
  return tableRow;
}

// function setlist(group) {
//   clearlist()
//   for(const car of group)
// }

// function clearlist() {}
function findCarsOfType(carsArray, serchTypeFromInput) {
  const carsOfType = carsArray.filter(function (car) {
    return car.type.toLowerCase() === serchTypeFromInput.toLowerCase();
  });
  return carsOfType;
}

// searchInput.addEventListener("keyup", (carData) => {
//   const value = carData.target.value.toLowerCase();
//   const li_data = document.getElementById("data");
//   if (value === "bmw") {
//     console.log("bmw");

// return li_data.type === "bmw";
