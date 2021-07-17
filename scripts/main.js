const bookInput = document.querySelector('#book_input');
const bookList = document.querySelector('#book_list');
const newBookBtn = document.querySelector('#new_book')
const addBookBtn = document.querySelector('#add_book');

let library = [];
let libraryRow = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read)?'already read':'not read yet'}`;
}
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary() {
    library.push( new Book(
        document.querySelector('#title_input').value,
        document.querySelector('#author_input').value,
        document.querySelector('#pages_input').value,
        document.querySelector('#read_input').checked
    ) );
    displayBook();
    bookInput.classList.toggle("hidden")
}

function displayBook() {
    for(let j=0;j<libraryRow.length;j++) {
        libraryRow[j].remove();
    }
    libraryRow.length=0;
    for(let i=0;i<library.length;i++) {
        libraryRow.push(document.createElement('tr'));

        const bookColor = Math.floor(Math.random()*360);

        const bookTitleCell = document.createElement('td');
        bookTitleCell.style.cssText = `color: white;
            background: linear-gradient(hsl(${bookColor}, 65%, 65%),
            hsl(${bookColor}, 65%, 50%) 50%,
            hsl(${bookColor}, 65%, 20%));`
        bookTitleCell.textContent = library[i].title;

        const bookAuthorCell = document.createElement('td');
        bookAuthorCell.style.cssText = `color: white;
            background: linear-gradient(hsl(${bookColor}, 65%, 65%),
            hsl(${bookColor}, 65%, 50%) 50%,
            hsl(${bookColor}, 65%, 20%));`
        bookAuthorCell.textContent = library[i].author;

        const bookPagesCell = document.createElement('td');
        bookPagesCell.style.cssText = `color: white;
            background: linear-gradient(hsl(${bookColor}, 65%, 65%),
            hsl(${bookColor}, 65%, 50%) 50%,
            hsl(${bookColor}, 65%, 20%));`
        bookPagesCell.textContent = library[i].pages;

        const bookReadCell = document.createElement('td');
        bookReadCell.style.cssText = `color: white;
            background: linear-gradient(hsl(${bookColor}, 65%, 65%),
            hsl(${bookColor}, 65%, 50%) 50%,
            hsl(${bookColor}, 65%, 20%));`
        bookReadCell.classList.add("read_cell");
        const readCheckbox = document.createElement('input');
        readCheckbox.type = "checkbox";
        readCheckbox.checked = library[i].read;
        bookReadCell.appendChild(readCheckbox);
        readCheckbox.addEventListener('change', () => {library[i].toggleRead()});

        const removeBookCell = document.createElement('td');
        removeBookCell.classList.add("remove_cell");
        const removeBookBtn = document.createElement('button');
        removeBookBtn.dataset.index = i;
        removeBookBtn.textContent = "remove";
        removeBookCell.appendChild(removeBookBtn);
        removeBookBtn.addEventListener('click', removeBook);

        libraryRow[i].append(bookTitleCell, bookAuthorCell, bookPagesCell, bookReadCell, removeBookCell);
        bookList.appendChild(libraryRow[i]);
    }
}

function removeBook(e) {
    let index = e.target.dataset.index;
    library.splice(index, 1);
    libraryRow[index].remove();
    libraryRow.splice(index, 1);
}

addBookBtn.addEventListener('click', addBookToLibrary);

newBookBtn.addEventListener('click', () => bookInput.classList.toggle("hidden"));