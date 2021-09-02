MicroModal.init();

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    if (this.read === true) this.read = false;
    else this.read = true;
    displayBooks();
  }
}

function addBook(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
}

function removeBook(event) {
  let position = event.currentTarget.parentNode.id.split('-')[1];
  myLibrary.splice(position, 1);
  displayBooks();
}

function displayBooks() {
  let library = document.querySelector(".container");
  library.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let newBook = document.createElement("ul")
    newBook.id = "book-" + i;
    newBook.classList.add("book");

    let title = document.createElement("li");
    title.innerText = myLibrary[i].title.toTitleCase();

    let author = document.createElement("li");
    author.innerText = "by " + myLibrary[i].author.toTitleCase();

    let pages = document.createElement("li");
    pages.innerText = myLibrary[i].pages + " pages";

    let read = document.createElement("button");
    read.innerText = (myLibrary[i].read ? "Read" : "Not Read");
    read.classList.add("pointer");
    read.addEventListener("click", () => myLibrary[i].toggleRead());
    
    let deleteButton = document.createElement("span");
    deleteButton.classList.add("material-icons-outlined", "pointer");
    deleteButton.innerText = "clear"
    deleteButton.addEventListener("click", removeBook);
  
    library.appendChild(newBook);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);
    newBook.appendChild(deleteButton);
  }
}


const addButton = document.getElementById("add-button");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readInput = document.getElementById("read-input");
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

addButton.addEventListener("click", () => {
  for (const el of form.querySelectorAll("[required]")) { //check if all required fields are filled
    if (!el.reportValidity()) {
      return;
    }
  }
  addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
  inputs.forEach(input => input.value = "")
  MicroModal.close("new-book-modal");
});

addBook("Catcher In The Rye", "JD salinger", 340, true);
addBook("harry potter", "JK rowling", 584, true);
addBook("Maltese falcon", "PT Boomer", 544, false);