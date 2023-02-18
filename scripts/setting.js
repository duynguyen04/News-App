"use strict";
const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const saveBTN = document.getElementById("btn-submit");
let setting;
if (localStorage.getItem("setting")) {
  setting = JSON.parse(getFromStorage("setting"));
} else {
  setting = {
    pageSize: 5,
    category: "General",
  };
}
console.log(setting);
saveToStorage("setting", JSON.stringify(setting));

saveBTN.addEventListener("click", function () {
  setting.pageSize = pageSizeInput.value;
  setting.category = categoryInput.value;
  if (isNaN(pageSizeInput.value) || categoryInput.value <= 0) {
    setting.pageSize = 5;
  }
  saveToStorage("setting", JSON.stringify(setting));
});
