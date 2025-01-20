const booksContainer = document.getElementById('books-container')
const addBookBtn = document.getElementById('add-book')
const bookForm = document.getElementById('book-form-container')
const titleInput = document.getElementById('title')
const authorInput = document.getElementById('author')
const genreInput = document.getElementById('genre')
const pagesInput = document.getElementById('pages')
const readInput = document.getElementById('read-input')
const submitBook = document.getElementById('submit-book')

window.addEventListener('load', displayBooks)
addBookBtn.addEventListener('click', toggleBookForm)
submitBook.addEventListener('click', addBookToLibrary)

const trashCan = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'

let myLibrary = []

function Book(title, author, genre, pages, read) {
    this.title = title,
    this.author = author,
    this.genre = genre,
    this.pages = pages,
    this.read = read
}

function addBookToLibrary(e) {
    e.preventDefault()
    const title = titleInput.value
    const author = authorInput.value
    const genre = genreInput.value
    const pages = pagesInput.value
    const read = readInput.checked ? true : false
    let newBook = new Book(title, author, genre, pages, read)
    myLibrary.push(newBook)
    toggleBookForm()
    displayBooks()
    titleInput.value = ''
    authorInput.value = ''
    genreInput.value = ''
    pagesInput.value = ''
    readInput.checked = false
}

function toggleBookForm() {
    readInput.removeAttribute('checked')
    bookForm.toggleAttribute('hidden')
}

function createBookCard(title, author, genre, pages, read, index) {
    const bookCard = document.createElement('div')
    bookCard.classList.add('book-card')
    const titleSpan = document.createElement('span')
    titleSpan.textContent = title
    const authorSpan = document.createElement('span')
    authorSpan.textContent = author
    const genreSpan = document.createElement('span')
    genreSpan.textContent = genre
    const pagesSpan = document.createElement('span')
    pagesSpan.textContent = pages
    const readSpan = document.createElement('input')
    readSpan.setAttribute('type', 'checkbox')
    readSpan.setAttribute('data', index)
    if (read) readSpan.setAttribute('checked', '')
    const removeDiv = document.createElement('div')
    removeDiv.innerHTML = trashCan
    removeDiv.classList.add('remove')
    removeDiv.setAttribute('data', index)

    bookCard.appendChild(titleSpan)
    bookCard.appendChild(authorSpan)
    bookCard.appendChild(genreSpan)
    bookCard.appendChild(pagesSpan)
    bookCard.appendChild(readSpan)
    bookCard.appendChild(removeDiv)
    booksContainer.appendChild(bookCard)

    readSpan.addEventListener('click', toggleRead)
    removeDiv.addEventListener('click', removeBook)
}

function displayBooks() {
    booksContainer.innerHTML = ''
    myLibrary.forEach((book, index) => {
        createBookCard(book.title, book.author, book.genre, book.pages, book.read, index)
    })
}

function removeBook(e) {
    const removeIndex = e.currentTarget.attributes[1].value
    myLibrary.splice(removeIndex, 1)
    displayBooks()
}

function toggleRead(e) {
    const toggleIndex = e.currentTarget.attributes[1].value
    myLibrary[toggleIndex].read = !myLibrary[toggleIndex].read
    displayBooks()
}