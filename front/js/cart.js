let cart = JSON.parse(localStorage.getItem("product_client"));
let totalttc = 0;
let totalarticles = 0;

if(cart !== null){
  for(let product of cart){
    fetch(`http://localhost:3000/api/products/`+ product.id)
    .then((res) => res.json())
    .then((apiData) => {
      displayProducts(apiData,product);
      deleteEventProduct(apiData,product);
      updateEventProduct();
    }).catch((Error) => {console.log(Error)});
  }

  
}



function displayProducts(apiData,productData) {

    /* Mise à jour du total ttc commande */
    totalttc += (parseFloat(apiData.price) * parseInt(productData.quantity));
    //console.log('Total TTC', totalttc);

    /* Mise à jour du total quantité produit */
    totalarticles += parseInt(productData.quantity);

    /* intégration du total ttc dans la page panier */
    document.querySelector('#totalPrice').innerText = totalttc;

    /* intégration du total qté dans la page panier */
    document.querySelector('#totalQuantity').innerText = totalarticles;

    let cart_items = document.querySelector("#cart__items");
    cart_items.innerHTML += 
        `<article class="cart__item" data-id="${apiData._id}" data-color="${productData.color}">
      <div class="cart__item__img">
        <img src="${apiData.imageUrl}" alt="${apiData.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${apiData.name}</h2>
          <p>${productData.color}</p>
          <p>${apiData.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" data-id="${apiData._id}" data-color="${productData.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${apiData._id}" data-color="${productData.color}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
}

function updateEventProduct(){
  let newProduct = [];
  Array.from(document.querySelectorAll('.itemQuantity')).forEach((element) =>{
    element.addEventListener('change', (el) => {
      
       const idProduct = el.target.dataset.id;
       const colorProduct = el.target.dataset.color;
       const qtyProduct = el.target.value;

       if((qtyProduct >= 1) && (qtyProduct <= 100)){
        /* On parcours l'ensemble du tableau product pour supprimer l'id produit + couleur correspondant */
        cart.forEach(elt => {
          if((elt.id === idProduct) && (elt.color === colorProduct)){
            newProduct.push({color:elt.color, id:elt.id, name:elt.name, quantity:qtyProduct});
          }else{
            newProduct.push(elt);
          }
        });

        /* Mise à jour de la localstorage */
        localStorage.setItem("product_client", JSON.stringify(newProduct));
        window.location.reload();
       }else{
        window.location.reload();
       }


       
    });
  });
    
}

function deleteEventProduct(apiData,product){
  let newProduct = [];
  Array.from(document.querySelectorAll('.deleteItem')).forEach((element) =>{
    element.addEventListener('click', (el) => {
      const idProduct = el.target.dataset.id;
      const colorProduct = el.target.dataset.color;

      cart.forEach(elt => {
        if((elt.id === idProduct) && (elt.color === colorProduct)){}else{
          newProduct.push(elt);
        }
      });

      localStorage.setItem("product_client", JSON.stringify(newProduct));
      window.location.reload();
      
    });
  });


    
}

//---------------------------------------------------- F O R M U L AI R E ----------------------------------
// Gestion du formulaire et de l'envoie vers la page confirmation
let first_name = document.querySelector("#firstName");
let last_name = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let e_mail = document.querySelector("#email");
let btn_order = document.querySelector("#order");

let first_name_error = document.querySelector("#firstNameErrorMsg");
first_name_error.style.color = "red";

let last_name_error = document.querySelector("#lastNameErrorMsg");
last_name_error.style.color = "red";

let address_error = document.querySelector("#addressErrorMsg");
address_error.style.color = "red";

let city_error = document.querySelector("#cityErrorMsg");
city_error.style.color = "red";

let e_mail_error = document.querySelector("#emailErrorMsg");
e_mail_error.style.color = "red";

let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

const REG_EX_LAST_FIRST_NAME = (value) => {
  return /^[A-Za-z]{3,38}$/.test(value);
};
const REG_EX_CITY = (value) => {
  return /^[A-Za-zéèàïêç\- \s]{1,50}\s+[0-9]{5}$/.test(value);
};
const REG_EX_ADDRESS = (value) => {
  return /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/.test(value);
};
const REG_EX_E_MAIL = (value) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

/* Ecouteur d'évenement lorsque l'utilisateur change le champ d'un input */
document.querySelector('#firstName').addEventListener("keyup", (e) => {firstNameControl(e.target.value)});
document.querySelector('#lastName').addEventListener("keyup", (e) => {lastNameControl(e.target.value)});
document.querySelector('#address').addEventListener("keyup", (e) => {addressControl(e.target.value)});
document.querySelector('#city').addEventListener("keyup", (e) => {cityControl(e.target.value)});
document.querySelector('#email').addEventListener("keyup", (e) => {emailControl(e.target.value)});

/* fonction pour valider les champs dans la page panier */
function firstNameControl(fieldValue) {
  if (REG_EX_LAST_FIRST_NAME(fieldValue)) {
    first_name_error.innerHTML = "";
    return true;
  } else {
    first_name_error.innerHTML =
      "Le prénom doit avoir 3 lettres minimum et pas de caractères spéciaux ou chiffres";
    return false;
  }
}

function lastNameControl(fieldValue) {
  if (REG_EX_LAST_FIRST_NAME(fieldValue)) {
    last_name_error.innerHTML = "";
    return true;
  } else {
    last_name_error.innerHTML =
      "Le nom doit avoir 3 lettres minimum et pas de caractères spéciaux ou chiffres";
    return false;
  }
}

function addressControl(fieldValue) {
  if (REG_EX_ADDRESS(fieldValue)) {
    address_error.innerHTML = "";
    return true;
  } else {
    address_error.innerHTML =
      "Merci de renseigner votre adresse d'au maximum 50 caractères et débutant par des chiffres";
    return false;
  }
}

function cityControl(fieldValue) {
  if (REG_EX_CITY(fieldValue)) {
    city_error.innerHTML = "";
    return true;
  } else {
    city_error.innerHTML = `Merci de renseigner votre ville et votre code postal. Exemple : « Paris 00000 »`;
    return false;
  }
}

function emailControl(fieldValue) {
  if (REG_EX_E_MAIL(fieldValue)) {
    e_mail_error.innerHTML = "";
    return true;
  } else {
    e_mail_error.innerHTML =
      "E-mail non valide. Il doit contenir un @ et un point suivi d'au maximum 3 lettres";
    return false;
  }
}



btn_order.addEventListener("click", (e) => {
  e.preventDefault();

  class Form {
    constructor(first_name, last_name, address, city, e_mail) {
      this.firstName = first_name;
      this.lastName = last_name;
      this.address = address;
      this.city = city;
      this.email = e_mail;
    }
  }

  const firstNameForm = document.querySelector('#firstName').value;
  const lastNameForm = document.querySelector('#lastName').value;
  const adressForm = document.querySelector('#address').value;
  const cityForm = document.querySelector('#city').value;
  const emailForm = document.querySelector('#email').value;

  const FORM_VALUE = new Form(firstNameForm, lastNameForm, adressForm, cityForm, emailForm);

  firstNameControl(FORM_VALUE.firstName);
  lastNameControl(FORM_VALUE.lastName);
  addressControl(FORM_VALUE.address);
  cityControl(FORM_VALUE.city);
  emailControl(FORM_VALUE.email);

  let firstname_valid = firstNameControl(FORM_VALUE.firstName),
    lastname_valid = lastNameControl(FORM_VALUE.lastName),
    adress_valid = addressControl(FORM_VALUE.address),
    city_valid = cityControl(FORM_VALUE.city),
    email_valid = emailControl(FORM_VALUE.email);
  if (
    !firstname_valid ||
    !lastname_valid ||
    !adress_valid ||
    !city_valid ||
    !email_valid
  )
    return null;

  if(cart === null){
    alert('Aucun produit dans le panier');
  }else{

    let products = [];
    for (let article_select of cart) {
      products.push(article_select.id);
    }

    // Envoie de l'objet order vers le serveur
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({contact: FORM_VALUE,products: products,}),
    }).then(async (response) => {
      try {
        const POST_ORDER = await response.json();
        let orderId = POST_ORDER.orderId;
        localStorage.clear();
        window.location.assign("confirmation.html?id=" + orderId);
      } catch (e) {console.log(e);}
    });
  }
  
});
