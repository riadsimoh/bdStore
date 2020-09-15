//The srcipt to diplsay the table that contains all the comic books we have in ourdatabase



// the setTimeout method is here to retard selecting the cart and getting badge variable(number of commic books we selected). To let the table loading and preventing an error
setTimeout(function () {
  const badge = document.querySelector('.badge');

  badge.innerHTML = sessionStorage.getItem("badge");

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

const tableBody = document.querySelector('tbody');
let text = "";
for (let i = 0; i < 27; i++) {
  text += `<tr>
    <td>${i + 1}</td>
    <td>${album[i].titre}</td>
    <td>${auteurId[i].nom}</td>
    <td>${album[i].prix}</td>
  </tr>`;
  tableBody.innerHTML = text;

}