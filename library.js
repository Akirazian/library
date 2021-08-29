MicroModal.init();

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// Book.prototype.info = function () {
//   if (this.read === true) {
//     return `${this.title} by ${this.author}, ${this.pages} pages, read`
//     } else {
//     return `${this.title} by ${this.author}, ${this.author} pages, not read yet`
//     }
// }

function addBook(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayBooks();
}

function removeBook(number) {
  myLibrary.splice(number, 1);
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
    title.innerText = myLibrary[i].title;
    let author = document.createElement("li");
    author.innerText = myLibrary[i].author;
    let pages = document.createElement("li");
    pages.innerText = myLibrary[i].pages + " pages";
    let read = document.createElement("li");
    read.innerText = (myLibrary[i].read ? "Read" : "Not Read");
  
    library.appendChild(newBook);
    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);
  }
}

const addButton = document.getElementById("add-button");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const readInput = document.getElementById("read-input");
const inputs = document.querySelectorAll("input");

addButton.addEventListener("click", () => {
  addBook(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
  inputs.forEach(input => input.value = "")
  MicroModal.close("new-book-modal");
});

addBook("Catcher in the Rye", "JD Salinger", 340, true);
addBook("harry potter", "jk rowling", 584, true);
addBook("Maltese Falcon", "PT Boomer", 544, false);