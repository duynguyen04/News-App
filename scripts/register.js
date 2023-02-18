"use strict";

const firstnameInput = document.getElementById("input-firstname");
const lastnameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const cfpasswordInput = document.getElementById("input-password-confirm");
const RegisterBTN = document.getElementById("btn-submit");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

function validatedata() {
  let checked = true;

  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === usernameInput.value) {
      alert("User must unique!");
      checked = false;
      break;
    }
  }
  if (firstnameInput.value === "") {
    alert("Please Enter First Name");
    checked = false;
  }
  if (lastnameInput.value === "") {
    alert("Please Enter First Name");
    checked = false;
  }
  if (usernameInput.value === "") {
    alert("Please Enter User Name");
    checked = false;
  }
  if (passwordInput.value != cfpasswordInput.value) {
    alert("Password and Confirm Password must be the same");
    checked = false;
  }
  if (passwordInput.value.length <= 7 || cfpasswordInput.value.length <= 7) {
    alert("Password must be more than 8 characters");
    checked = false;
  }
  return checked;
}

function clearInput() {
  firstnameInput.value = "";
  lastnameInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
  cfpasswordInput.value = "";
}

RegisterBTN.addEventListener("click", function () {
  const data = {
    firstname: firstnameInput.value,
    lastname: lastnameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    cfpassword: cfpasswordInput.value,
  };
  let validate = validatedata();
  if (validate) {
    userArr.push(parseUser(data));
    console.log(userArr);
    // userArr.push(data);
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
    clearInput()
  }
  console.log(validate);
  console.log(data);
});
