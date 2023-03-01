const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoItemsList = document.querySelector(".todo-items"); //ul

let todos = [];

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  if (item == "") {
    alert("Text Something");
    return;
  } else {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = "";
  }
}

function addToLocalStorage(todos) {
  localStorage.setItem("TodoList", JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("TodoList");
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}
getFromLocalStorage();

function renderTodos(todos) {
  todoItemsList.innerHTML = "";
  todos.forEach((item) => {
    const checked = item.completed ? "checked" : null;

    const li = document.createElement("li");
    li.classList.add("item");
    li.setAttribute("data-key", item.id);

    if (checked) {
      li.classList.add("checked");
    }
    let divText = document.createElement("div");
    divText.classList.add("text");

    let inputCheckbox = document.createElement("input");
    inputCheckbox.setAttribute("type", "checkbox");
    inputCheckbox.setAttribute("class", "checkbox");
    inputCheckbox.setAttribute(checked, checked);

    let inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("class", "readonly");
    inputText.setAttribute("value", item.name);
    inputText.setAttribute("readonly", "readonly");
    divText.appendChild(inputCheckbox);
    divText.appendChild(inputText);
    li.appendChild(divText);

    let divBtn = document.createElement("div");
    divBtn.classList.add("btn");

    let BtnEdit = document.createElement("button");
    BtnEdit.setAttribute("class", "edit-button");

    let EditIcon = document.createElement("i");
    EditIcon.setAttribute("class", "fa-regular fa-pen-to-square");
    BtnEdit.appendChild(EditIcon);

    let BtnDel = document.createElement("button");
    BtnDel.setAttribute("class", "delete-button");

    let DelIcon = document.createElement("i");
    DelIcon.setAttribute("class", "fa-solid fa-trash");

    BtnDel.appendChild(DelIcon);

    divBtn.appendChild(BtnEdit);
    divBtn.appendChild(BtnDel);

    li.appendChild(divBtn);

    //     li.innerHTML = `
    //     <div class="text">
    //     <input type="checkbox" class="checkbox" ${checked} />
    //     <input type="text" class="readonly" value="${item.name}" readonly />
    //     </div>
    //     <div class="btn">
    //     <button class="edit-button">
    //     <i class="fa-regular fa-pen-to-square"></i>
    //     </button>
    //     <button class="delete-button">
    //     <i class="fa-solid fa-trash"></i>
    //     </button>
    //   </div>`;
    BtnEdit.addEventListener("click", (e) => {
      let input = e.target.parentElement.parentElement.children[0].children[1];
      if (input.hasAttribute("readonly")) {
        input.removeAttribute("readonly");
        input.style.color = "rgba(0, 0, 0, 0.4)";
        input.style.transition = "all 0.3s ease";
        e.target.children[0].style.opacity = "0.4";
        e.target.children[0].style.transition = "all 0.3s ease";
        input.focus();
      } else {
        input.setAttribute("readonly", "readonly");
        input.style.color = "black";
        let itemId = input.parentElement.parentElement.getAttribute("data-key");
        todos.forEach((todo) => {
          if (todo.id == itemId) {
            todo.name = input.value;
          }
        });
        addToLocalStorage(todos);
      }
    });

    todoItemsList.appendChild(li);
  });
}

todoItemsList.addEventListener("click", (e) => {
  if (e.target.type == "checkbox") {
    toggle(e.target.parentElement.parentElement.getAttribute("data-key"));
  }

  if (e.target.classList.contains("delete-button")) {
    deleteTodo(e.target.parentElement.parentElement.getAttribute("data-key"));
  }
});

function toggle(id) {
  todos.forEach((item) => {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter((item) => {
    return item.id != id;
  });
  addToLocalStorage(todos);
}
// const editBtns = document.querySelectorAll(".edit-button");
// const inputs = document.querySelectorAll(".readonly");

// editBtns.forEach((editButton) => {
//   editButton.addEventListener("click", (e) => {
//     const item = e.target.closest(".item").querySelector(".readonly");
//     if (item.hasAttribute("readonly")) {
//       item.removeAttribute("readonly");
//       item.style.color = "rgba(0, 0, 0, 0.4)";
//       item.focus();
//     } else {
//       const itemId = e.target.closest(".item").getAttribute("data-key");
//       item.setAttribute("readonly", "readonly");
//       item.style.color = "black";
//       todos.forEach((todo) => {
//         if (todo.id == itemId) {
//           todo.name = item.value;
//         }
//       });
//       addToLocalStorage(todos);
//     }
//   });
// });
