// DOM elements
const booksContainer = document.getElementById('books-container');
const addBookBtn = document.getElementById('add-book');
const bookFormWindow = document.getElementById('book-form-container');
const bookForm = document.getElementById('book-form')
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const genreInput = document.getElementById('genre');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read-input');
const submitBook = document.getElementById('submit-book');

const trashCan =
	'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';

class Book {
	constructor(title, author, genre, pages, read) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.pages = pages;
		this.read = read;
	}

	toggleRead() {
		this.read = !this.read;
	}
}

class Library {
	constructor() {
		this.books = [];
	}

	addBook(book) {
		this.books.push(book);
	}

	removeBook(index) {
		this.books.splice(index, 1);
		this.displayBooks();
	}

	displayBooks() {
		booksContainer.innerHTML = '';
		this.books.forEach((book, index) => {
			this.createBookCard(book, index);
		});
	}

	createBookCard(book, index) {
		const bookCard = document.createElement('div');
		bookCard.classList.add('book-card');

		const titleSpan = document.createElement('span');
		titleSpan.textContent = book.title;
		const authorSpan = document.createElement('span');
		authorSpan.textContent = book.author;
		const genreSpan = document.createElement('span');
		genreSpan.textContent = book.genre;
		const pagesSpan = document.createElement('span');
		pagesSpan.textContent = book.pages;
		const readSpan = document.createElement('input');
		readSpan.setAttribute('type', 'checkbox');
		readSpan.setAttribute('data', index);
		if (book.read) readSpan.setAttribute('checked', '');
		const removeDiv = document.createElement('div');
		removeDiv.innerHTML = trashCan;
		removeDiv.classList.add('remove');
		removeDiv.setAttribute('data', index);

		bookCard.appendChild(titleSpan);
		bookCard.appendChild(authorSpan);
		bookCard.appendChild(genreSpan);
		bookCard.appendChild(pagesSpan);
		bookCard.appendChild(readSpan);
		bookCard.appendChild(removeDiv);
		booksContainer.appendChild(bookCard);

		readSpan.addEventListener('click', () => this.toggleRead(index));
		removeDiv.addEventListener('click', e => this.removeBook(index));
	}

	toggleRead(index) {
		this.books[index].toggleRead();
		this.displayBooks();
	}
}

const library = new Library();

function addBookToLibrary(e) {
	e.preventDefault();
	const title = titleInput.value;
	const author = authorInput.value;
	const genre = genreInput.value;
	const pages = pagesInput.value;
	const read = readInput.checked;

	const newBook = new Book(title, author, genre, pages, read);
	library.addBook(newBook);
	toggleBookForm();
	library.displayBooks();

	// Clear form inputs
	titleInput.value = '';
	authorInput.value = '';
	genreInput.value = '';
	pagesInput.value = '';
	readInput.checked = false;
}

function toggleBookForm() {
	readInput.removeAttribute('checked');
	bookFormWindow.toggleAttribute('hidden');
}

function validateForm(e) {
	if (bookForm.checkValidity()) {
		addBookToLibrary(e);
	} else {
		bookForm.setCustomValidity('Please fill out all fields')
	}
}

// Event listeners
window.addEventListener('load', () => library.displayBooks());
addBookBtn.addEventListener('click', toggleBookForm);
submitBook.addEventListener('click', (e) => {
	validateForm(e)
});
