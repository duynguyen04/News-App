"use strict";
const addBTN = document.getElementById("btn-add");
const titleInput = document.getElementById("input-task");
const currentUser = JSON.parse(getFromStorage("current"));
const todoArr = JSON.parse(getFromStorage("todo")) || [];
const todolist = document.getElementById("todo-list");
// const userArr = JSON.parse(getFromStorage(KEY)) || [];
class task {
  constructor(task, owner, isdone) {
    this.task = task;
    this.owner = owner;
    this.isdone = isdone;
  }
}
rendertodo(todoArr);
function parsetodo(data) {
  const todo = new task(data.task, data.owner, data.isdone);
  return todo;
}

addBTN.addEventListener("click", function () {
  const data = {
    task: titleInput.value,
    owner: currentUser.username,
    isdone: false,
  };
  console.log(data);
  titleInput.value = "";
  todoArr.push(parsetodo(data));
  console.log(todoArr);
  saveToStorage("todo", JSON.stringify(todoArr));
  todolist.innerHTML = "";
  rendertodo(todoArr);
});
// console.log(todoArr);
function rendertodo(todoArr) {
  todolist.innerHTML = "";
  const todoArrOwner = todoArr.filter(function (todo) {
    if (todo.owner == currentUser.username) {
      return true;
    } else return false;
  });
  // const id = document.getElementById("i");
  for (let i = 0; i < todoArrOwner.length; i++) {
    // console.log(todoArr[i].owner);
    // onclick="toggleTask(${i})"
    const html = `<li class="${
      todoArrOwner[i].isdone ? "checked" : ""
    }"  onclick="toggleTask(${i})">${
      todoArrOwner[i].task
    }<span class="close" id="${i}">×</span></li>`;
    todolist.insertAdjacentHTML("beforeend", html);
  }
}
function toggleTask(i) {
  if (todoArr[i].isdone == true) {
    todoArr[i].isdone = false;
    rendertodo(todoArr);
    saveToStorage("todo", JSON.stringify(todoArr));
    // console.log(i, "hihi");
    // console.log(todoArr[i].isdone);
  } else {
    // console.log(i, "aaaaaaaaaaa");
    todoArr[i].isdone = true;
    rendertodo(todoArr);
    saveToStorage("todo", JSON.stringify(todoArr));
    // console.log(todoArr[i].isdone);
  }
}
todolist.addEventListener("click", function (e) {
  console.log(e.target);
  if (e.target.className == "close") {
    console.log("X");
    const id = e.target.getAttribute("id");
    console.log(id);
    todoArr.splice(id, 1);
    rendertodo(todoArr);
    saveToStorage("todo", JSON.stringify(todoArr));
  }
});
