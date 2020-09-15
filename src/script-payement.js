//Selecting elements
const listProduits = document.querySelector(".list-produits")
const totalAPayer = document.querySelectorAll('.total-a-payer');
const objet = document.querySelectorAll('.objet');

//Adding an event listener
listProduits.addEventListener('click', deleteFun);


//Getting the commic books we selected and ceating elements dynamically dynamically
let bd = JSON.parse(sessionStorage.getItem('bd'));

if (bd === null) {
  bd = [];
}
for (var i = 0; i < bd.length; i++) {

  const li = document.createElement("li");
  li.className = "list-group-item d-flex flex-column flex-sm-row justify-content-around text-center list-payment";
  //Adding the comic books dynamically
  li.innerHTML = '<div class="image-bdd mx-auto mb-3"></div><div class="mx-auto w-50"><h4>Titre du bd (' + (i + 1) + ')</h4><p class="titre-panier">Brief description</p><h5>Prix</h5><p class="prix-page text-info">0</p></div>';
  //Adding dynamically the delete icons
  const deleteIcon = document.createElement('a');
  deleteIcon.setAttribute("src", "#");
  deleteIcon.innerHTML = '<i class="fas fa-times-circle text-danger"></i> Retirer';
  li.appendChild(deleteIcon);
  listProduits.appendChild(li);

}


var total = 0;
for (var i = 0; i < bd.length; i++) {
  var titrePanier = document.querySelectorAll(".titre-panier");
  const prixPanier = document.querySelectorAll(".prix-page");
  const imgBdd = document.querySelectorAll(".image-bdd");

  //Diplayng the title of the bd, image the price and total price.
  titrePanier[i].innerHTML = bd[i].titre;
  prixPanier[i].innerHTML = bd[i].prix;
  total += parseFloat(bd[i].prix);
  imgBdd[i].style.backgroundImage = bd[i].imgBdd;

}


//Diplay the number of comic books we want to buy
for (var i = 0; i < objet.length; i++) {

  objet[i].innerHTML = bd.length;

}

//Display to total price we have to pay
totalAPayer.forEach(function (item) {

  item.innerHTML = total.toFixed(2) + " EUR";

});

//The delete function, using event object to get the element we want to delete
function deleteFun(e) {


  if (e.target.classList.contains("fa-times-circle")) {
    if (confirm("Etes vous sûr de vouloir supprimer cet article")) {

      (e.target.parentElement.parentElement.remove());
      let bd = JSON.parse(sessionStorage.getItem('bd'));

      if (bd === null) {
        bd = [];
      }

      let newBd = []
      for (let i = 0; i < bd.length; i++) {
        if (bd[i].titre != e.target.parentElement.parentElement.firstChild.nextSibling.firstChild.nextSibling.innerHTML)
          newBd.push(bd[i]);

      }

      sessionStorage.setItem("badge", newBd.length);
      sessionStorage.setItem("bd", JSON.stringify(newBd));
      setTimeout(function () {
          location.reload();
        },
        100);

    };

  }
}