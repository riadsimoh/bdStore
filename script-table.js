$(function(){
  $("header").load("header.html"); 
  $("footer").load("footer.html");

});
setTimeout(function() {
  const badge = document.querySelector('.badge');
  console.log(badge);
  badge.innerHTML = sessionStorage.getItem("badge") ;
  
  }, 500)

var album = [];
var auteurId = [];
var serie = [];
var numeroAlbum = [];
for (let i = 1; i <= 27; i++) {
  album.push(albums.get(i.toString()));
}
for (let i = 0; i < 27; i++) {
  auteurId.push(auteurs.get(album[i].idAuteur));
}
for (let i = 0; i < 27; i++) {
  serie.push(series.get(album[i].idSerie))
}
for (let i = 0; i < 27; i++) {
  numeroAlbum.push(album[i].numero);
}
console.log(album);
console.log(auteurId);
console.log(serie);
const tableBody = document.querySelector('tbody');
 var text = "";
for (let i = 0; i < 27; i ++) {
  text += `<tr>
    <td>${i + 1}</td>
    <td>${album[i].titre}</td>
    <td>${auteurId[i].nom}</td>
    <td>${album[i].prix}</td>
  </tr>`
  ;
  tableBody.innerHTML = text;


}


