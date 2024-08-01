const addBookButton = document.querySelector("#add-book");
const modalDispaly = document.querySelector(".modal-container");
const modalCloseButton = document.querySelector("#close-modal");
const bookSearchAdd = document.querySelector("#book-add-search");
const modalBookDisplay = document.querySelector(".modal .books")
const bookAddForm = document.querySelector("#book-add-form");
const bookCards = document.querySelectorAll(".books");
const bookCardBtn = document.querySelector(".book-library");

const library = [
    "City Of Orange",
    "Don't Look Back",
    "Pieces of Light",
    "Soul",
    "The Beauty Within",
    "The Death of Vivek",
    "Walk Into The Shadow", 
];


addBookButton.addEventListener('click', ()=>{
    modalDispaly.classList.add('show')
});

modalCloseButton.addEventListener('click', () => {
    modalDispaly.classList.remove('show')
});

function addBookToShelf(bookTitle){
    const book_array = [...bookCards];
    for (let i = 0; i < book_array.length; i++) {
        const book = book_array[i];
        
        if (book.id === "") {
            book.style.visibility = 'visible';
            const bookImage = new Image();
            book.id = bookTitle;
            bookImage.src = bookTitle + '.png';
            bookImage.onerror = function() {
                this.src = bookTitle + '.jpg'; 
            };

            book.insertBefore(bookImage,book.firstChild );
            break;
        }
    }

}


function displayModalBook(bookTitle,match) {
    const bookImage = new Image();
    if (match) {
        if (document.getElementById(bookTitle) == null){
            while(modalBookDisplay.firstChild){
                modalBookDisplay.removeChild(modalBookDisplay.lastChild);
            }
            bookImage.src = bookTitle + '.png';
    
            bookImage.onerror = function() {
                this.src = bookTitle + '.jpg';
            };
        
            bookImage.onload = function() {
                modalBookDisplay.appendChild(bookImage);
            };
        }
        bookImage.id = bookTitle;
    }
    else{
        while(modalBookDisplay.firstChild){
            modalBookDisplay.removeChild(modalBookDisplay.lastChild);
        }
        bookImage.src = "error.jpg";

        bookImage.onload = function() {
            modalBookDisplay.appendChild(bookImage);
        };
    }


}


function matchAlgorithm(libraryTitle,searchTitle){
    let matched = true;
    maxdiscrepency = 0;

    for(let i = 0; i < libraryTitle.length; i++){
        if (libraryTitle[i] !== searchTitle[i]){
            maxdiscrepency++;
        }
        if (maxdiscrepency === 3){
            return false;
        }
    }

    return matched;
}



bookSearchAdd.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        event.preventDefault(); 
        let found = false;
        for (let i = 0; i < library.length; i++){
            if (matchAlgorithm(library[i],bookSearchAdd.value)){
                found = true;

                displayModalBook(library[i], found);
                
                break;
            }

        }
        if (!found){
            displayModalBook('N/A',false);
        }
    }                   

})


bookAddForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const img = document.querySelector(".modal .books img"); // Updated selector to match your modal structure
    if (!img || img.src.includes("error.jpg")) {
        console.log('No valid book image found or image is an error.');
        event.preventDefault(); // Prevent the default form submission (page reload)
    } else {
        addBookToShelf(img.id);
        console.log(`Added book to shelf: ${img.id}`);
        modalDispaly.classList.remove('show');
    }

    // Optionally, close the modal after adding the book
});

document.querySelector('.book-library').addEventListener('click', (event) => {
    if (event.target.id === 'delete-book') {
        const bookDiv = event.target.closest('.books');
        if (bookDiv) {
            bookDiv.remove();
        }
    }
});


