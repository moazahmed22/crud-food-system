const foodName = document.getElementById("foodName");
const foodPrice = document.getElementById("foodPrice");
const foodCalories = document.getElementById("foodCalories");
const foodCategory = document.getElementById("foodCategory");
const foodImg = document.getElementById("foodImg");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const myRow = document.getElementById("myRow");
let cardContainer = ``;
let globalIndex;

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
    objImg: foodImg.value,
  };
  foodDataBase.push(foodObject);

  showItems();

  clearInputs();

  saveLocalStorage();
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
                      src="${foodDataBase[index].objImg}"
                      alt=""
                      class="w-100"
                    />
                  </div>
                  <div class="d-flex flex-column w-100 gap-1">
                    <p class="item-title fs-5 m-0">
                      <span class="text-capitalize">${foodDataBase[index].objName}</span>
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
                      <div class="button-container d-flex justify-content-between align-items-end">
                        <button class="border-0 d-flex justify-content-center align-align-items-center" onclick="itemToInputs(${index})"">
                          <i class="fa-solid fa-pen-to-square primary me-2"></i>
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
let saveLocalStorage = () => {
  window.localStorage.setItem("foodDataBase", JSON.stringify(foodDataBase));
};

// updating item method
// function to set the update item back to inputs
let itemToInputs = (index) => {
  foodName.value = foodDataBase[index].objName;
  foodPrice.value = foodDataBase[index].objPrice;
  foodCalories.value = foodDataBase[index].objCal;
  foodCategory.value = foodDataBase[index].objCat;
  foodImg.value = foodDataBase[index].objImg;
  globalIndex = index;
  submitBtn.setAttribute("style", "display:none !important;");
  updateBtn.setAttribute("style", "display:block !important;");
};
// function to update item based on new inputs
let updateItem = () => {
  foodDataBase[globalIndex].objName = foodName.value;
  foodDataBase[globalIndex].objPrice = foodPrice.value;
  foodDataBase[globalIndex].objCal = foodCalories.value;
  foodDataBase[globalIndex].objCat = foodCategory.value;
  foodDataBase[globalIndex].objImg = foodImg.value;
  submitBtn.setAttribute("style", "display:block !important;");
  updateBtn.setAttribute("style", "display:none !important;");
  clearInputs();
  saveLocalStorage();
  showItems();
};

// function to delete item
let deleteItem = (index) => {
  foodDataBase.splice(index, 1);
  saveLocalStorage(foodDataBase);
  showItems();
};
