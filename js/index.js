let inputFields = Array.from(document.querySelectorAll(".input"));
const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const nameAlert = document.getElementById("nameAlert");
const priceAlert = document.getElementById("priceAlert");
const calAlert = document.getElementById("calAlert");
const catAlert = document.getElementById("catAlert");
const pictureAlert = document.getElementById("pictureAlert");
const alertToast = document.getElementById("alertToast");
const myRow = document.getElementById("myRow");
inputFields.forEach((element) => {
  element.addEventListener("input", (e) => {
    evaluteInputs(e);
  });
});
let cardContainer = ``;
let globalIndex;
let isEmpty = true;
let isValid = false;
let regex;
let categories = ["breakfast", "lunch", "dinner", "snacks"];

// check on local storage for foodDataBase
let foodDataBase =
  JSON.parse(window.localStorage.getItem("foodDataBase")) || [];
showItems(foodDataBase);

// function to add item to database
let addItem = () => {
  let foodObject = {
    objName: inputFields[0].value,
    objPrice: inputFields[1].value,
    objCal: inputFields[2].value,
    objCat: inputFields[3].value,
    objImg: inputFields[4].value,
  };

  if (!isEmpty && isValid) {
    foodDataBase.push(foodObject);
    showItems(foodDataBase);
    clearInputs();
    saveLocalStorage();
  } else if (isEmpty) {
    showToast();
  }
};

// function to show stored items
function showItems(array) {
  cardContainer = ``;
  if (array.length === 0) {
    myRow.innerHTML = `<div class="col-md-12 text-center"><h1 class="text-capitalize overflow-hidden">no items to show</h1></div>`;
  } else {
    for (let index = 0; index < array.length; index++) {
      cardContainer += `<div class="item p-2 col-md-6 col-xl-3 rounded-3">
                <div
                  class="item-card pb-3 d-flex flex-column align-items-center gap-3 rounded-3"
                >
                  <div
                    class="img-container overflow-hidden bg-white w-100 text-center"
                  >
                    <img
                      src="${array[index].objImg}"
                      alt=""
                      class="w-100"
                    />
                  </div>
                  <div class="d-flex flex-column w-100 gap-1">
                    <p class="item-title fs-5 m-0">
                      <span class="text-capitalize">${array[index].objName}</span>
                    </p>
                    <p class="item-info d-flex justify-content-around align-items-center px-2 m-0">
                      <span class="">${array[index].objCal} calories</span>
                      <span class="dot"></span>
                      <span class="text-lowercase">${array[index].objCat}</span>
                    </p>
                    <div
                      class="d-flex align-items-center justify-content-around"
                    >
                      <p class="price m-0 d-inline">${array[index].objPrice}.00$</p>
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
}

// function to clear inputs
let clearInputs = () => {
  inputFields.forEach((element) => {
    element.value = null;
  });
};

// function to store food dataBase in the browser's local storage
let saveLocalStorage = () => {
  window.localStorage.setItem("foodDataBase", JSON.stringify(foodDataBase));
};

// updating item method
// function to set the update item back to inputs
let itemToInputs = (index) => {
  inputFields[0].value = foodDataBase[index].objName;
  inputFields[1].value = foodDataBase[index].objPrice;
  inputFields[2].value = foodDataBase[index].objCal;
  inputFields[3].value = foodDataBase[index].objCat;
  inputFields[4].value = foodDataBase[index].objImg;
  globalIndex = index;
  submitBtn.setAttribute("style", "display:none !important;");
  updateBtn.setAttribute("style", "display:block !important;");
};
// function to update item based on new inputs
let updateItem = () => {
  if (!isEmpty && isValid) {
    foodDataBase[globalIndex].objName = inputFields[0].value;
    foodDataBase[globalIndex].objPrice = inputFields[1].value;
    foodDataBase[globalIndex].objCal = inputFields[2].value;
    foodDataBase[globalIndex].objCat = inputFields[3].value;
    foodDataBase[globalIndex].objImg = inputFields[4].value;
    submitBtn.setAttribute("style", "display:block !important;");
    updateBtn.setAttribute("style", "display:none !important;");
    clearInputs();
    saveLocalStorage();
    showItems(foodDataBase);
  } else if (isEmpty) {
    showToast();
  }
};

// function to delete item
let deleteItem = (index) => {
  foodDataBase.splice(index, 1);
  saveLocalStorage(foodDataBase);
  showItems(foodDataBase);
};

// function to search for food by any attribute
searchInput.addEventListener("input", () => {
  let foundArray = [];
  let searchedName = searchInput.value;
  if (searchInput.value === "") {
    showItems(foodDataBase);
  } else {
    for (let index = 0; index < foodDataBase.length; index++) {
      if (
        foodDataBase[index].objName
          .toLowerCase()
          .includes(searchedName.toLowerCase()) ||
        foodDataBase[index].objCat
          .toLowerCase()
          .includes(searchedName.toLowerCase()) ||
        foodDataBase[index].objCal == +searchedName
      ) {
        foundArray.push(foodDataBase[index]);
      }
      showItems(foundArray);
    }
  }
});

// evaluate inputs
function evaluteInputs(e) {
  // return true if any input field is empty
  isEmpty = inputFields.some((element) => element.value === "") || false;

  // check if inputs are valid
  switch (e.target.id) {
    case "foodName":
      regex = /^[A-Za-z]{2,10}(\s[A-Za-z]{2,10}){0,1}$/;
      isValid = regex.test(inputFields[0].value);
      if (!isValid) {
        nameAlert.classList.remove("d-none");
      } else {
        nameAlert.classList.add("d-none");
      }
      break;
    case "foodPrice":
      regex = /^[1-9][0-9]{0,2}$/;
      isValid = regex.test(inputFields[1].value);
      if (!isValid) {
        priceAlert.classList.remove("d-none");
      } else {
        priceAlert.classList.add("d-none");
      }
      break;
    case "foodCalories":
      regex = /^([1-9][0-9]{2}|1[0-4][0-9]{2}|1500)$/gm;
      isValid = regex.test(inputFields[2].value);
      if (!isValid) {
        calAlert.classList.remove("d-none");
      } else {
        calAlert.classList.add("d-none");
      }
      break;
    case "foodCategory":
      isValid = categories.includes(inputFields[3].value.toLowerCase());
      if (!isValid) {
        catAlert.classList.remove("d-none");
      } else {
        catAlert.classList.add("d-none");
      }
      break;
  }
}

// function to show toast
function showToast() {
  alertToast.classList.add("show");
  setTimeout(() => {
    alertToast.classList.remove("show");
  }, 2000);
}
