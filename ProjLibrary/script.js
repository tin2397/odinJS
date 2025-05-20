const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
}


document.addEventListener('DOMContentLoaded', () => {
    const addBookBtn = document.getElementById('add-book-btn');
    const formContainer = document.getElementById('book-form-container');
    const cancelBtn = document.getElementById('cancel-btn');
    const addBookForm = document.getElementById('add-book-form');
    // Show form when Add Book button is clicked
    addBookBtn.addEventListener('click', () => {
        formContainer.style.display = 'block';
    });

    // Hide form when Cancel button is clicked
    cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
        addBookForm.reset();
    });

    // Handle form submission
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addBookForm);
        const title = formData.get('title');
        const author = formData.get('author');
        const pages = formData.get('pages');
        const read = formData.get('read') === 'on';
        addBookToLibrary(title, author, pages, read);
        renderBooks();
        formContainer.style.display = 'none';
        addBookForm.reset();
        
        // Show thank you dialog
        const thankYouDialog = document.getElementById('thank-you-dialog');
        /*showModal will block all other actions until the dialog is closed*/
        /*show will not block other actions*/
        thankYouDialog.showModal();
    });
}); 

function renderBooks() {
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = ''; // Clear existing books
    
    library.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button onclick="toggleReadStatus('${book.id}')">Toggle Read</button>
            <button onclick="removeBook('${book.id}')">Remove</button>
        `;
        booksContainer.appendChild(bookElement);
    });
}

function toggleReadStatus(id) {
    const book = library.find(book => book.id === id);
    if (book) {
        book.toggleRead();
        renderBooks();
    }
}

function removeBook(id) {
    const index = library.findIndex(book => book.id === id);
    if (index !== -1) {
        library.splice(index, 1);
        renderBooks();
    }
}