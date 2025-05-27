let foodName = document.getElementById("foodName");
let foodPrice = document.getElementById("foodPrice");
let foodCalories = document.getElementById("foodCalories");
let foodCategory = document.getElementById("foodCategory");
let foodImg = document.getElementById("foodImg");
let myRow = document.getElementById("myRow");
let cardContainer = ``;

// check on local storage for foodDataBase
let foodDataBase =
  JSON.parse(window.localStorage.getItem("foodDataBase")) || [];
showItems();

// function to add item to database
let addItem = () => {
  let foodObject = {
    objName: foodName.value,
    objPrice: foodPrice.value,
    objCal: foodCalories.value,
    objCat: foodCategory.value,
    objImg: foodImg.files[0].name,
  };
  foodDataBase.push(foodObject);

  showItems();

  clearInputs();

  saveLocalStorage(foodDataBase);
};

// function to show stored items
function showItems() {
  cardContainer = ``;
  for (let index = 0; index < foodDataBase.length; index++) {
    cardContainer += `<div class="item p-2 col-md-6 col-xl-3 rounded-3">
                <div
                  class="item-card pb-3 d-flex flex-column align-items-center gap-3 rounded-3"
                >
                  <div
                    class="img-container overflow-hidden bg-white w-100 text-center"
                  >
                    <img
                      src="./asstes/images/${foodDataBase[index].objImg}"
                      alt=""
                      class="w-100"
                    />
                  </div>
                  <div class="d-flex flex-column w-100 gap-1">
                    <p class="item-title fs-5 m-0">
                      <span class="">${foodDataBase[index].objName}</span>
                    </p>
                    <p class="item-info d-flex justify-content-around align-items-center px-2 m-0">
                      <span class="">${foodDataBase[index].objCal} calories</span>
                      <span class="dot"></span>
                      <span class="text-lowercase">${foodDataBase[index].objCat}</span>
                    </p>
                    <div
                      class="d-flex align-items-center justify-content-around"
                    >
                      <p class="price m-0 d-inline">${foodDataBase[index].objPrice}$</p>
                      <div
                        class="button-container d-flex justify-content-between align-items-end"
                      >
                        <button class="border-0 d-flex justify-content-center align-align-items-center" onclick="deleteItem()">
                          <i class="fa-solid fa-pen-to-square primary me-2" onclick="updateItem(${index})"></i>
                        </button>
                        <button 
                          class="border-0 d-flex justify-content-center align-align-items-center" 
                          onclick="deleteItem(${index})">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  myRow.innerHTML = cardContainer;
}

// function to clear inputs
let clearInputs = () => {
  foodName.value = null;
  foodPrice.value = null;
  foodCalories.value = null;
  foodCategory.value = null;
  foodImg.value = null;
};

// function to store food dataBase in the browser's local storage
let saveLocalStorage = (data) => {
  window.localStorage.setItem("foodDataBase", JSON.stringify(data));
};

// function to update item
let updateItem = (index) => {

};

// function to delete item
let deleteItem = (index) => {
  console.log("logg");
  foodDataBase.splice(index, 1);
  saveLocalStorage(foodDataBase);
  showItems();
};
