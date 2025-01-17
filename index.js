const titles = document.getElementById('titles')
const authors = document.getElementById('authors')
const genres = document.getElementById('genres')
const pages = document.getElementById('page-counts')
const addBookBtn = document.getElementById('add-book')
const bookForm = document.getElementById('book-form-container')
const titleInput = document.getElementById('title')
const authorInput = document.getElementById('author')
const genreInput = document.getElementById('genre')
const pagesInput = document.getElementById('pages')
const readInput = document.getElementById('read')
const submitBook = document.getElementById('submit-book')

window.addEventListener('load', displayBooks)
addBookBtn.addEventListener('click', toggleBookForm)
submitBook.addEventListener('click', addBookToLibrary)

const myLibrary = [
    {
        title: 'LOTR',
        author: 'JRR Tolkien',
        genre: 'Fantasy',
        pages: 560,
        read: true
    },
    {
        title: 'HHGTG',
        author: 'Douglas Adams',
        genre: 'Sci Fi',
        pages: 750,
        read: true
    },
    {
        title: 'Lessons in Chemistry',
        author: 'Bonnie Garmus',
        genre: 'Heroine Fiction',
        pages: 375,
        read: false
    }
]

let bookCount = myLibrary.length

function Book(title, author, genre, pages, read) {
    this.title = title,
    this.author = author,
    this.genre = genre,
    this.pages = pages,
    this.read = read
}

function addBookToLibrary(e) {
    e.preventDefault()
    console.log(readInput.value)
    const title = titleInput.value
    const author = authorInput.value
    const genre = genreInput.value
    const pages = pagesInput.value
    const read = readInput.value === 'on' ? true : false
    let newBook = new Book(title, author, genre, pages, read)
    myLibrary.push(newBook)
    displayBooks()
    toggleBookForm()
}

function toggleBookForm() {
    bookForm.toggleAttribute('hidden')
}

function displayBooks() {
    titles.innerText = ''
    authors.innerText = ''
    genres.innerText = ''
    pages.innerText = ''
    myLibrary.forEach(book => {
        titles.innerText += `\n ${book.read ? '*' : ''}${book.title}`;
        authors.innerText += `\n ${book.author} `;
        genres.innerText += `\n ${book.genre} `;
        pages.innerText += `\n ${book.pages} `;
    })
}
