// Select elements and getting data back from the local storage to display them.
// for (var i = 0; i < titrePanier.length; i++) {

//   objet[i].innerHTML = titrePanier.length;
    
 

// }



const listProduits = document.querySelector(".list-produits")
const totalAPayer = document.querySelectorAll('.total-a-payer');
const objet = document.querySelectorAll('.objet');



  listProduits.addEventListener('click', deleteFun);




var bd = JSON.parse(sessionStorage.getItem('bd'));

if (bd === null) {
  bd = [];
}
for (var i = 0; i < bd.length; i++) {

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between lh-condensed";
  li.innerHTML = '<div><h6 class="my-0">Titre du bd (' + (i + 1) + ')</h6><small class="titre-panier">Brief description</small></div><div><h6 class="my-0">Prix</h6><small class="prix">0</small></div><div class="image-bdd"></div>';

 
  const deleteIcon = document.createElement('a');
  deleteIcon.setAttribute("src", "#");
  deleteIcon.innerHTML = '<i class="fas fa-times-circle text-danger"></i> Retirer';
  
  li.appendChild(deleteIcon);
  listProduits.appendChild(li);

 
}


var total = 0;
for (var i = 0; i < bd.length; i++) {
  var titrePanier = document.querySelectorAll(".titre-panier");
  const prixPanier = document.querySelectorAll(".prix");
  const imgBdd = document.querySelectorAll(".image-bdd");
  
 
  titrePanier[i].innerHTML = bd[i].titre;
  prixPanier[i].innerHTML = bd[i].prix;
  total += parseFloat(bd[i].prix);
 
  imgBdd[i].style.backgroundImage = bd[i].imgBdd;
  
 

  
}
for (var i = 0; i < objet.length; i++) {

  objet[i].innerHTML = bd.length;
    
 

}


totalAPayer.forEach(function(item) {

  item.innerHTML = total.toFixed(2) + " EUR";

});


function deleteFun(e) {
  

  if(e.target.classList.contains("fa-times-circle")) {
    if(confirm("Etes vous sûr de vouloir supprimer cet article")) {
      (e.target.parentElement.parentElement.remove());
      var bd = JSON.parse(sessionStorage.getItem('bd'));
      
      if (bd === null) {
          bd = [];
      } 
      
      var newBd = []
      for (var i = 0; i < bd.length; i++) {
        if (bd[i].titre != e.target.parentElement.parentElement.firstChild.lastChild.innerHTML )
          
         newBd.push(bd[i]);
         

      }
      
      sessionStorage.setItem("badge",  newBd.length);
      sessionStorage.setItem("bd", JSON.stringify(newBd));
      setTimeout(function() {
          location.reload(); 
      }, 
      200);

    };
   
  }
}