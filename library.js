const addButton = document.getElementById("add-button");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readInput = document.getElementById("read-input");
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const clearButton = document.getElementById("clear-button");
const modal = new bootstrap.Modal(document.getElementById("new-book-modal"));
const clearModal = new bootstrap.Modal(document.getElementById("are-you-sure-modal"))

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title.toTitleCase();
    this.author = author.toTitleCase();
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    if (this.read === true) this.read = false;
    else this.read = true;
    displayBooks();
  }
};

function localSave() {
  localStorage.setObject("myLibrary", myLibrary);
}

function localDownload() {
  if (localStorage.getObject("myLibrary") == null) return;
  myLibrary = localStorage.getObject("myLibrary");
  myLibrary.forEach(book => Object.assign(book, Book));
  displayBooks();
}

let myLibrary = [];
localDownload();

function addBook(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function removeBook(event) {
  let position = event.currentTarget.id.split('-')[1];
  myLibrary.splice(position, 1);
  displayBooks();
}

function displayBooks() {
  let library = document.getElementById("library-container");
  library.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement("div")
    newBook.id = "book-" + i;
    newBook.classList.add("col-sm");

    let cardTemplate = document.createElement("div");
    cardTemplate.classList.add("card", "shadow", "text-dark", "bg-light", "bg-gradient", "text-center")

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let title = document.createElement("h4");
    title.classList.add("card-title", "mb-3");
    title.innerText = myLibrary[i].title;

    let author = document.createElement("h5");
    author.classList.add("card-subtitle", "mb-2");
    author.innerText = "by " + myLibrary[i].author;

    let pages = document.createElement("p");
    pages.classList.add("card-text");
    pages.innerText = myLibrary[i].pages + " pages";

    let read = document.createElement("button");
    read.innerText = (myLibrary[i].read ? "Read" : "Not Read");
    if (myLibrary[i].read === true) { 
      read.classList.add("btn-success")
    } else {
      read.classList.add("btn-danger");
    }
    read.classList.add("btn", "mb-3");
    read.addEventListener("click", () => myLibrary[i].toggleRead());
    
    let deleteButtonContainer = document.createElement("p");
    deleteButtonContainer.classList.add("card-text");

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-close");
    deleteButton.id = "delete-" + i;
    deleteButton.type = "button";
    deleteButton.addEventListener("click", removeBook);
  
    library.appendChild(newBook);
    newBook.appendChild(cardTemplate);
    cardTemplate.appendChild(cardBody);
    deleteButtonContainer.appendChild(deleteButton);
    cardBody.append(title, author, pages, read, deleteButtonContainer);
  }

  localSave();
}

function addBookAction() {
  for (const el of form.querySelectorAll("[required]")) { //check if all required fields are filled
    if (!el.reportValidity()) {
      return;
    }
  }
  addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
  inputs.forEach(input => input.value = "")
  modal.toggle();
}

addButton.addEventListener("click", addBookAction);

clearButton.addEventListener("click", () => {
  myLibrary = [];
  displayBooks();
  clearModal.toggle();
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { 
    addBookAction();
  }
});
