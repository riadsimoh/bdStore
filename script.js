

  bdFunction(1, 9);
// calling bdFunction that will display the first nine bds as default
// Selecting the links of pagination using a for loop and adding the eventListener method
var page = document.querySelectorAll('.page');
for (var i = 0; i < page.length; i++) {
  page[i].addEventListener('click', funAffichage);
}

var numeroPage = 0;
function funAffichage(e) {
  e.preventDefault();  
  // This variable may contain 1 or 2, 3. Which is the number of page(Pagination)
  numeroPage = e.target.textContent;
  if (numeroPage == 1) {
    bdFunction(1,9); // first page(Here we tagret the first set of columns)
  }
  if ( numeroPage == 2) {
    bdFunction(10, 18); //second page(Here we target the second set of columns )
  }
  if( numeroPage == 3) {
    bdFunction(19, 27);  //Third page(Here we target the third set of columns)
  }
}


function bdFunction(debut, fin) {
  debutPrev = debut;
  debutNext = fin;
  //Selecting elements 
  const col = document.querySelectorAll('.col-lg-3');
  const imgbd = document.querySelectorAll('.img-tin');
  const prixBd = document.querySelectorAll('.prix-bd');
  const titre = document.querySelectorAll('.titre-bd');
  const auteur = document.querySelectorAll('.auteur-bd');

  const badge = document.querySelector('.badge');
  console.log(badge);
  badge.innerHTML = sessionStorage.getItem("badge") ;

  

  
 

  var album = [];
  var auteurId = [];
  var serie = [];
  var numeroAlbum = [];

 
  for (let i = debut; i <= fin; i++) {
    album.push(albums.get(i.toString()));
  }
  for (let i = 0; i < 9; i++) {
    auteurId.push(auteurs.get(album[i].idAuteur));
  }
  for (let i = 0; i < 9; i++) {
    serie.push(series.get(album[i].idSerie))
  }
  for (let i = 0; i < 9; i++) {
    numeroAlbum.push(album[i].numero);
  }
 

  for (let i = 0; i < col.length; i++) {
    prixBd.item(i).innerHTML = album[i].prix + " EUR";
    titre.item(i).innerHTML = album[i].titre.replace(/'|!|\?|\.|"|:|\$/g, "");
    auteur.item(i).innerHTML = auteurId[i].nom; 
    // Etablir src des images des bd et utilisation d'une expression régulière pour supprimer les caractères non autorisés dans les noms de fichiers : '!?.":$

    var srcImage = 'url("img/albums/' + serie[i].nom.replace(/'|!|\?|\.|"|:|\$/g, "") + "-" + numeroAlbum[i] + "-" + album[i].titre.replace(/'|!|\?|\.|"|:|\$/g, "") + '.jpg\")';
    
    imgbd.item(i).style.backgroundImage = srcImage;
  }
  
}

// prev and next 

var next  = document.querySelector(".next");
var prev = document.querySelector(".prev");
next.addEventListener("click", funDirectionNext);
prev.addEventListener("click", funDirectionPrev);
// The function of the next link
function funDirectionNext(e) {
  e.preventDefault();
  prev.parentElement.classList.remove("disabled");
   numeroPage++;
  if (numeroPage == 1) {
    bdFunction(10, 18);
  }
  if (numeroPage == 2) {
    bdFunction(19, 27);
  }
  if (numeroPage >= 3) {
    numeroPage = 3;
    next.parentElement.classList.add("disabled");
  }
}

// The function of the prev link
function funDirectionPrev(e) {
  next.parentElement.classList.remove("disabled");
  e.preventDefault();
  console.log(numeroPage);
  if (numeroPage == 3) {
    bdFunction(10, 18); 
  }
  if (numeroPage == 2) {
    bdFunction(1, 9);
  }
  if (numeroPage <= 1) {
    numeroPage = 1;
   prev.parentElement.classList.add("disabled");
  }  
    numeroPage--;
}

//
const prixBd = document.querySelector("prix-bd");
const buyBtn = document.querySelectorAll(".buyBtn a");
// buyBtn.addEventListener("click", myFun);
for (let i = 0; i < buyBtn.length; i ++) {

buyBtn[i].addEventListener("click", payementFun);
}

// THis function will save values into the session storage.
//The script for getting the data back form the session storage is in the script-payement.js
function payementFun(e) { 

  var prixTot = e.target.parentElement.parentElement.querySelector('.prix-bd').innerHTML;
  var titreTot = e.target.parentElement.parentElement.querySelector('.titre-bd').innerHTML;
  var auteurTot = e.target.parentElement.parentElement.querySelector('.auteur-bd').innerHTML;
  var imgBdd = e.target.parentElement.parentElement.parentElement.querySelector('.img-tin').style.backgroundImage;
  // create an object to push it to the local storage
  var bd = {
    prix: prixTot,
    titre: titreTot,
    auteur: auteurTot,
    imgBdd: imgBdd
  };
  var bdDateBase = JSON.parse(sessionStorage.getItem("bd"));
  if (bdDateBase == null) {
    bdDateBase = [];
  }
  bdDateBase.push(bd);

  
  sessionStorage.setItem("badge", bdDateBase.length)

  sessionStorage.setItem("bd", JSON.stringify(bdDateBase));
  setTimeout(function() {
    location.reload(); 
  }, 
   100);



}


// Selection the links to add to cart
const lienPanier = document.querySelectorAll('.lien-panier');

for (let i = 0; i < lienPanier.length; i ++) {

  lienPanier[i].addEventListener('click', payementFun);
  lienPanier[i].addEventListener('click', panierFun);
 

  }
  


function panierFun(e) {
 e.preventDefault();
 
 e.target.textContent = "Ajouté";

  e.target.style.color = "#555";
 
}


