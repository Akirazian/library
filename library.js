let myLibrary = [];

function Book(title, author, pages, read) {
      this.title = title
      this.author = author
      this.pages = pages
      this.read = read
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


