"use strict";
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const loginBTN = document.getElementById("btn-submit");
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = JSON.parse(getFromStorage("current")) || {};
// const currentUser = {};
console.log(currentUser);

function validatedata() {
  if (usernameInput.value == "") {
    alert("Please Enter UserName");
  }
  if (passwordInput.value == "") {
    alert("Please Enter Password");
  }
  for (let i = 0; i < userArr.length; i++) {
    if (
      usernameInput.value == userArr[i].username &&
      passwordInput.value == userArr[i].password
    ) {
      return;
    }
  }
  alert("Incorrect username or password");
}

loginBTN.addEventListener("click", function () {
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const validate = validatedata();
  for (let i = 0; i < userArr.length; i++) {
    if (
      data.username == userArr[i].username &&
      data.password == userArr[i].password
    ) {
      currentUser.username = data.username;
      currentUser.password = data.password;
      saveToStorage("current", JSON.stringify(currentUser));
      window.location.href = "../index.html";
      //   //   console.log(data);
      return;
    }
  }
});
