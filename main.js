import { productBooks } from "./fetchingData/booksStore.js";
const addBasketVoice = new Audio();
addBasketVoice.src = "./assets/click.wav";
const getStoreBooksButton = document.querySelector(".fetchingData");
const basketButton = document.querySelector(".basket");

let sectionForBookLists = document.getElementById("bookListsSection");

const searchInput = document.querySelector(".searchInput");

const getBooks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productBooks);
    }, 2000);
  });
};

const drawBookLists = () => {
  getBooks().then((bookList) => {
    bookList.forEach((book) => {
      sectionForBookLists.append(createBookList(book));
    });
  });
};

const createBookList = ({ src, title, author, price }) => {
  let container = document.createElement("article");
  container.setAttribute("class", "bookCard");
  let headDiv = document.createElement("div");
  headDiv.setAttribute("class", "bookCardHeader");
  let bookCover = document.createElement("img");
  bookCover.setAttribute("src", `${src}`);
  headDiv.appendChild(bookCover);
  let bodyDiv = document.createElement("div");
  bodyDiv.setAttribute("class", "bookInfo");
  let bookTitle = document.createElement("p");
  bookTitle.setAttribute("class", "bookTitle");
  bookTitle.innerText = title;
  let bookAuthor = document.createElement("p");
  bookAuthor.innerText = author;
  let bookPrice = document.createElement("p");
  bookPrice.innerText = price;
  let bookLike = document.createElement("img");
  bookLike.setAttribute("src", `${"assets/heart.png"}`);
  bookLike.setAttribute("class", "likeSymbol");
  bookLike.addEventListener("click", () => {
    if (bookLike.matches(".likeSymbol")) {
      bookLike.setAttribute("class", "likeSymbolRed");
    } else {
      bookLike.setAttribute("class", "likeSymbol");
    }
  });
  let addBasket = document.createElement("img");
  addBasket.setAttribute("src", `${"assets/add-to-basket.png"}`);
  addBasket.setAttribute("class", "addMe");
  addBasket.addEventListener("click", () => {
    addBasketVoice.play();
  });
  addBasket.addEventListener("click", () => {
    basketButton.dataset.basketbook++;
  });

  addBasket.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    let bookContent = `
    <div class = "purchaseBooks"> 

      <div class= "bookBox">
          <img src= ${src} alt="" class="bookBoxImg" />

          <div class="bookBoxInfo"> 
            <div class="bookBoxTitle"> ${title} </div>
            <div class="bookBoxPrice"> ${price} </div>
          </div>

          <button class="removeBookBox"> DELETE </button>
      </div>

     </div>
  `;
    document
      .querySelector(".popUpBasket")
      .insertAdjacentHTML("afterbegin", bookContent);

    let removeBookBox = document.querySelector(".removeBookBox");
    removeBookBox.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      basketButton.dataset.basketbook--;
    });
  });

  bodyDiv.append(bookTitle, bookAuthor, bookPrice, bookLike, addBasket);
  container.append(headDiv, bodyDiv);
  return container;
};

getStoreBooksButton.addEventListener("click", drawBookLists);

const searchingBooks = () => {
  let parentCard = [...document.querySelectorAll(".bookCard")];
  parentCard = parentCard.map((eachCard) => {
    if (
      !eachCard.lastElementChild.firstElementChild.innerText
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      eachCard.style.display = "none";
    } else {
      eachCard.style.display = "block";
    }
    return eachCard;
  });
  sectionForBookLists.innerHTML = "";
  sectionForBookLists.append(...parentCard);
};

searchInput.addEventListener("keyup", searchingBooks);

const isEmptyInput = () => {
  if (sectionForBookLists.children.length > 0) {
    searchInput.removeAttribute("readonly");
    searchInput.focus();
  }
};

searchInput.addEventListener("click", isEmptyInput);

const lazyLoading = () => {
  let loadingImg = document.createElement("img");
  loadingImg.setAttribute("src", `${"assets/loading.png"}`);
  loadingImg.classList.add("loadImg");
  if (sectionForBookLists.children.length < 1) {
    sectionForBookLists.append(loadingImg);
    setTimeout(() => {
      sectionForBookLists.removeChild(loadingImg);
    }, 1990);
  }
};

getStoreBooksButton.addEventListener("click", lazyLoading);

const createPopUpBasket = () => {
  let popUpBasket = document.createElement("div");
  popUpBasket.setAttribute("class", "popUpBasket");
  let popUpTitle = document.createElement("h3");
  popUpTitle.setAttribute("class", "popUpTitle");
  popUpTitle.innerText = "Your collected basket";
  let closePopUpBasket = document.createElement("button");
  closePopUpBasket.setAttribute("class", "closePopUpBasket");
  closePopUpBasket.innerText = "X";
  let totalPurchases = document.createElement("div");
  totalPurchases.setAttribute("class", "totalPurchases");
  let totalTitle = document.createElement("div");
  totalTitle.setAttribute("class", "total-title");
  totalTitle.innerText = "Total";
  let totalPrice = document.createElement("div");
  totalPrice.setAttribute("class", "total-price");
  totalPrice.innerText = "0 դր․";
  totalPurchases.append(totalTitle, totalPrice);
  let buyBooksButton = document.createElement("button");
  buyBooksButton.setAttribute("class", "buyBooks");
  buyBooksButton.innerText = "Buy Now";
  popUpBasket.append(
    popUpTitle,
    closePopUpBasket,
    totalPurchases,
    buyBooksButton
  );
  document.body.append(popUpBasket);
};

createPopUpBasket();

basketButton.addEventListener("click", () => {
  document.querySelector(".popUpBasket").style.right = 0;
});

const closePopUpBasket = document.querySelector(".closePopUpBasket");

closePopUpBasket.addEventListener("click", () => {
  document.querySelector(".popUpBasket").style.right = "-100%";
});

document.addEventListener("click", ({ pageX }) => {
  if (pageX < 1070) {
    document.querySelector(".popUpBasket").style.right = "-100%";
  }
});
