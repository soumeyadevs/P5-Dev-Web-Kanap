// Récuperer l'id du produit avec la methode GET de l'interface URLsearchparams
let product_id = new URLSearchParams(window.location.search).get("_id");

// Récupérer la donnée du produit grâce à son id
fetch(`http://localhost:3000/api/products/` + product_id)
  .then((product) => product.json()) 
  .then((product) => {
    displayProductInfos(product);
  }).catch((Error) => {console.log(Error)});


// Déclaration des selectors
let product_img = document.querySelector(".item__img");
let product_title = document.querySelector("#title");
let product_price = document.querySelector("#price");
let product_description = document.querySelector("#description");
let product_colors = document.querySelector("#colors");
let product_nb = document.querySelector("#quantity");


// Afficher les informations du produit avec une boucle for pour les couleurs
function displayProductInfos(product) {
  product_img.innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  product_title.innerHTML += `<h1 id="title"> ${product.name} </h1>`;
  product_price.innerHTML += `<span id="price"> ${product.price} </span>`;
  product_description.innerHTML += `<p id="description"> ${product.description} </p>`;
  for (let i = 0; i < product.colors.length; i++) {
    product_colors.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }
}

//------------------------------------------------------------

// Click sur le bouton ajouter au panier
let add_cart = document.querySelector("#addToCart");
add_cart.addEventListener("click", () => {
  let product_client = { 
    id : product_id,
    name : document.getElementById('title').textContent,
    color : document.getElementById('colors').value,
    quantity : Number(document.getElementById('quantity').value),
  };
  verifyInput(product_client);
});
//------------------------------------------------------------

// Vérifier si il y as bien une couleur et une quantite de choisi
function verifyInput(product_client) {
  if((product_client.color == "") && (product_client.quantity < 1 || product_client.quantity > 100)){
    alert("Veuillez choisir une couleur et une quantité comprise entre 1 et 100")
  } else if (product_client.color == "") {
    alert("Merci de bien choisir une couleur")
  } else if (product_client.quantity < 1 || product_client.quantity > 100) {
    alert("Veuillez choisir une quantité comprise entre 1 et 100")
  } else {
    if (addLs(product_client)) {
      alert("Votre commande viens d'etre ajoutée au panier")
    }
  }
}
//------------------------Local storage------------------------------------

// Ajouter le produit au ls et ajoute uniquement la quantité si le produit y est déjà
//Déclaration de la variable ''cart'' dans laquelle on met la clé et les valeurs qui sont dans le LS

function addLs(product_client) {
  let cart = JSON.parse(localStorage.getItem("product_client")); // console.log(cart);
 
  if (cart == null) {
    cart = [];
    cart.push(product_client);
    localStorage.setItem("product_client", JSON.stringify(cart));
  } else {
    let get_article = cart.find((cart_product) => product_client.id == cart_product.id && product_client.color == cart_product.color);
    if (get_article) {
      let nb = Number(product_client.quantity) + Number(get_article.quantity);
      if (nb < 101){
      get_article.quantity = nb;
      localStorage.setItem("product_client", JSON.stringify(cart));
      } else {
        return false
      }
    } else {
      cart.push(product_client);
      localStorage.setItem("product_client", JSON.stringify(cart));
    }
  } return true
} 
//------------------------------------------------------------
