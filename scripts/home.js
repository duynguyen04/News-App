"use strict";

const maincontent = document.getElementById("main-content");
const loginmodal = document.getElementById("login-modal");
const currentUser = JSON.parse(getFromStorage("current"));
const logoutBTN = document.getElementById("btn-logout");
const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const message = document.getElementById("welcome-message");
console.log(currentUser);

if (currentUser) {
  //   console.log("aaaaaaaaaaaaa");
  for (let i = 0; i < userArr.length; i++) {
    if (currentUser.username == userArr[i].username) {
      console.log(userArr[i].firstname);
      message.innerHTML = `Welcome ${userArr[i].firstname}`;
    }
  }
  loginmodal.classList.add("hide");
  maincontent.classList.remove("hide");
} else {
  //   console.log("bbbbbbbbbbbbbbb");
  maincontent.classList.add("hide");
  loginmodal.classList.remove("hide");
}

logoutBTN.addEventListener("click", function () {
  localStorage.removeItem("current");
  window.location.href = "../index.html";
});
