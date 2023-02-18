"use strict";

const newscontainer = document.getElementById("news-container");
const nextBTN = document.getElementById("btn-next");
const prevBTN = document.getElementById("btn-prev");
const pagenum = document.getElementById("page-num");
// const setting = JSON.parse(getFromStorage("setting") || {});
// console.log(setting);
let setting;
if (localStorage.getItem("setting")) {
  setting = JSON.parse(getFromStorage("setting"));
} else {
  setting = {
    pageSize: 5,
    category: "General",
  };
}

let currentPage = 1;
function rendernews(page) {
  fetch(
    `https://newsapi.org/v2/top-headlines?apiKey=d9d47bb4aa5442ae89dad4b6b245b16f&country=us&category=${setting.category}&pageSize=${setting.pageSize}&page=${page}`
  )
    .then(function (respose) {
      console.log(respose);
      return respose.json();
    })
    .then(function (data) {
      console.log(data);
      newscontainer.innerHTML = ""
      //   console.log(data.articles[0].title);
      for (let i = 0; i < setting.pageSize; i++) {
        if (!data.articles[i]) break;
        const html = `<div class="card flex-row flex-wrap">
          <div class="card mb-3" style="">
              <div class="row no-gutters">
                  <div class="col-md-4">
                      <img src=${data.articles[i].urlToImage}
                          class="card-img"
                          alt="image">
                  </div>
                  <div class="col-md-8">
                      <div class="card-body">
                          <h5 class="card-title">${data.articles[i].title}</h5>
                          <p class="card-text">${data.articles[i].description}</p>
                          <a href=${data.articles[i].url}
                              class="btn btn-primary">View</a>
                      </div>
                  </div>
              </div>
          </div>
          </div>`;
        newscontainer.insertAdjacentHTML("beforeend", html);
      }
      //   pagetotal(data);
      const pagetotal =
        Math.floor((1.0 * data.totalResults) / setting.pageSize) + 1;
      console.log("pagetotal=" + pagetotal);
      console.log(page);
      if (pagetotal == page) {
        console.log("jijiijijii");
        nextBTN.classList.add("hide");
      } else {
        console.log("aaaaaaaaa");
        nextBTN.classList.remove("hide");
      }
      if (page == 1) {
        prevBTN.classList.add("hide");
      } else {
        prevBTN.classList.remove("hide");
      }
    });
}
rendernews(currentPage);

// console.log(Math.floor(64 / 5) + 1);

nextBTN.addEventListener("click", function () {
  currentPage += 1;
  // newscontainer.innerHTML = "";
  pagenum.textContent = currentPage;
  //   console.log(currentPage);
  rendernews(currentPage);
});

prevBTN.addEventListener("click", function () {
  currentPage -= 1;
  // newscontainer.innerHTML = "";
  pagenum.textContent = currentPage;
  //   console.log(currentPage);
  rendernews(currentPage);
});
