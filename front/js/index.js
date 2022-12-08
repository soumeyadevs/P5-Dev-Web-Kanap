let items_container = document.querySelector(".items");

// Récupérer les données de l'api
fetch(`http://localhost:3000/api/products`)
// Réponse en json
  .then((products) => products.json())
  .then((products) => {
    displayProducts(products);
  }).catch((Error) => {console.log(Error)});

//Création des élèments + rajout des données dans ces balises
//affichage des produits sur la page d'accueil avec la boucle for
function displayProducts(products) {
  items_container.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    items_container.innerHTML += `
    <a href="./product.html?_id=${products[i]._id}"> 
      <article>
        <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
        <h3 class="productName">${products[i].name}</h3> 
        <p class="productDescription">${products[i].description}</p>
      </article>
    </a>`;
  }
}
