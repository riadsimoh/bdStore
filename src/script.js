// calling bdFunction that will display the first nine bds as default
let debutPrev;
let debutNext;


if (Number(sessionStorage.getItem('debut')) == 0) {
  bdFunction(1, 9);
} else {

  bdFunction(Number(sessionStorage.getItem('debut')), Number(sessionStorage.getItem('fin')));
}

// Selecting the links of pagination using a for loop and adding the eventListener method
var page = document.querySelectorAll('.page');
for (var i = 0; i < page.length; i++) {
  page[i].addEventListener('click', funAffichage);

}

var numeroPage = 0;



function funAffichage(e) {
  e.preventDefault();
  for (var i = 0; i < page.length; i++) {



    page[i].classList.remove('bg-info');
    page[i].classList.remove('text-white');
  }


  // This variable may contain 1 or 2, 3. Which is the number of page(Pagination)
  numeroPage = e.target.textContent;

  if (numeroPage == 1) {
    bdFunction(1, 9); // first page(Here we tagret the first set of columns)
    paginationColorFun(e.target);
  }
  if (numeroPage == 2) {
    bdFunction(10, 18); //second page(Here we target the second set of columns )
    paginationColorFun(e.target);
  }
  if (numeroPage == 3) {
    bdFunction(19, 27); //Third page(Here we target the third set of columns)
    paginationColorFun(e.target);
  }

}



function bdFunction(debut, fin) {
  sessionStorage.setItem('debut', debut);
  sessionStorage.setItem('fin', fin);

  //Selecting elements 
  debutPrev = debut;
  debutNext = fin;
  //Selecting the columns, 9 per page.
  const col = document.querySelectorAll('.col-lg-3');
  //Selecting the image class, to put as a source the images of the comic books
  const imgbd = document.querySelectorAll('.img-tin');
  //Selecting the price class
  const prixBd = document.querySelectorAll('.prix-bd');
  //Selecting the titles class of the comic book
  const titre = document.querySelectorAll('.titre-bd');
  //Selecting the author class
  const auteur = document.querySelectorAll('.auteur-bd');
  //Selecting the badge class of the cart icon, to make it dynamic
  const badge = document.querySelector('.badge');
  //Getting the number of item we added to the cart from sessionStorage
  badge.innerHTML = sessionStorage.getItem("badge");


  //initialisation
  let album = [];
  let auteurId = [];
  let serie = [];
  let numeroAlbum = [];

  //Getting the comic books from the database(albums.js). 
  for (let i = debut; i <= fin; i++) {
    album.push(albums.get(i.toString()));
  }
  //GEtting the author name
  for (let i = 0; i < 9; i++) {
    auteurId.push(auteurs.get(album[i].idAuteur));
  }
  //Getting the serie name
  for (let i = 0; i < 9; i++) {
    serie.push(series.get(album[i].idSerie))
  }
  //Getting the album number
  for (let i = 0; i < 9; i++) {
    numeroAlbum.push(album[i].numero);
  }

  //Affection the variables we had from the previous loops.
  for (let i = 0; i < col.length; i++) {
    prixBd.item(i).innerHTML = album[i].prix + " EUR";
    titre.item(i).innerHTML = album[i].titre.replace(/'|!|\?|\.|"|:|\$/g, "");
    auteur.item(i).innerHTML = auteurId[i].nom;
    //Using Regex to replace punctuation marks from the srcImage
    let srcImage = 'url("img/albums/' + serie[i].nom.replace(/'|!|\?|\.|"|:|\$/g, "") + "-" + numeroAlbum[i] + "-" + album[i].titre.replace(/'|!|\?|\.|"|:|\$/g, "") + '.jpg\")';
    imgbd.item(i).style.backgroundImage = srcImage;
  }

}

// previous and next of the pagination page
// Selecting prev and next links
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
next.addEventListener("click", funDirectionNext);
prev.addEventListener("click", funDirectionPrev);

// The function of the next link
function funDirectionNext(e) {
  e.preventDefault();

  loopPaginationLinks();


  prev.parentElement.classList.remove("disabled");
  numeroPage++;
  console.log(numeroPage)
  if (numeroPage == 1) {
    bdFunction(10, 18);
    page[1].classList.add('bg-info');
    page[1].classList.add('text-white');
  }
  if (numeroPage == 2) {
    bdFunction(19, 27);
    page[2].classList.add('bg-info');
    page[2].classList.add('text-white');
  }
  if (numeroPage >= 3) {
    numeroPage = 3;
    page[2].classList.add('bg-info');
    page[2].classList.add('text-white');
    next.parentElement.classList.add("disabled");
  }
}

// The function of the prev link
function funDirectionPrev(e) {
  next.parentElement.classList.remove("disabled");
  e.preventDefault();
  loopPaginationLinks();

  if (numeroPage == 3) {
    page[1].classList.add('bg-info');
    page[1].classList.add('text-white');
    bdFunction(10, 18);
  }
  if (numeroPage == 2) {
    page[0].classList.add('bg-info')
    page[0].classList.add('text-white');
    bdFunction(1, 9);
  }
  if (numeroPage <= 1) {
    page[0].classList.add('bg-info')
    page[0].classList.add('text-white');
    numeroPage = 1;
    prev.parentElement.classList.add("disabled");
  }

  numeroPage--;
}

//
const prixBd = document.querySelector("prix-bd");
const buyBtn = document.querySelectorAll(".buyBtn a");
// Add eventlistener to all of the links buy(Acheter)
for (let i = 0; i < buyBtn.length; i++) {
  buyBtn[i].addEventListener("click", payementFun);
}

// THis function will save values into the session storage.
//The script for getting the data back form the session storage is in the script-payement.js
function payementFun(e) {

  //Traversing the DOM to target the elements to get the text content(using innerHTML)
  let prixTot = e.target.parentElement.parentElement.querySelector('.prix-bd').innerHTML;
  let titreTot = e.target.parentElement.parentElement.querySelector('.titre-bd').innerHTML;
  let auteurTot = e.target.parentElement.parentElement.querySelector('.auteur-bd').innerHTML;

  //Getting the url of the image of the comic book
  let imgBdd = e.target.parentElement.parentElement.parentElement.querySelector('.img-tin').style.backgroundImage;

  // create an object to push it to the local storage
  let bd = {
    prix: prixTot,
    titre: titreTot,
    auteur: auteurTot,
    imgBdd: imgBdd
  };

  let bdDateBase = JSON.parse(sessionStorage.getItem("bd"));
  if (bdDateBase == null) {
    bdDateBase = [];
  }

  bdDateBase.push(bd);

  sessionStorage.setItem("badge", bdDateBase.length)

  sessionStorage.setItem("bd", JSON.stringify(bdDateBase));
  console.log(debutNext);
  setTimeout(function () {
      location.reload();

    },
    100);

}


// Selection the links to add to cart(panier) and add eventlistener to each one of them
const lienPanier = document.querySelectorAll('.lien-panier');
for (let i = 0; i < lienPanier.length; i++) {
  lienPanier[i].addEventListener('click', payementFun);
  lienPanier[i].addEventListener('click', panierFun);
}


function panierFun(e) {

  e.preventDefault();
  e.target.textContent = "Ajouté";
  e.target.style.color = "#555";
}

function searchBar() {
  let searchAlbum = [];
  for (let i = 1; i <= 27; i++) {
    searchAlbum.push(albums.get(i.toString()));
  }


  let searchBarArray = [];
  for (let i = 1; i < searchAlbum.length; i++) {
    searchBarArray.push(searchAlbum[i].titre);
  }

  console.log(searchBarArray);


  $(function () {

    $("#searchBar").autocomplete({
      source: searchBarArray
    });
  });


  //Setting the backgroun images of the carousel with js
  const carouselImage = document.querySelectorAll('.carousel-item img');
  const imgSrcCarousel = ["img/tintin.jpg", "img/tintin1.jpg", "img/tintin.jpg2"]

  carouselImage.forEach(function (item, index) {
    item.style.backgroundImage = imgSrcCarousel[index];
  })
}

searchBar();

function paginationColorFun(e) {
  console.log(e);
  e.classList.add('bg-info');
  e.classList.add('text-white');
}

function loopPaginationLinks() {
  for (var i = 0; i < page.length; i++) {

    page[i].classList.remove('bg-info');
    page[i].classList.remove('text-white');
  }

}