let cart = JSON.parse(localStorage.getItem("product_client"));



for(let product of cart){
  fetch(`http://localhost:3000/api/products/`+ product.id)
  .then((res) => res.json())
  .then((apiData) => {
    displayProducts(apiData,product);
    deleteEventProduct(apiData,product);
    updateEventProduct();
  });
}



function displayProducts(apiData,productData) {
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
            <input type="number" data-id="${apiData._id}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productData.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${apiData._id}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
}

function updateEventProduct(){
  // console.log(Array.from(document.querySelectorAll('#cart__items p.deleteItem')));
  Array.from(document.querySelectorAll('.itemQuantity')).forEach((element) =>{
    element.addEventListener('change', (el) => {
       const idProduct = el.target.dataset.id;
       console.log('Element qté modifié', idProduct);
       /* reste à faire la mise à jour de la localstorage + reload de la page (window.location.reload();)*/
       
    });
  });
    
}

function deleteEventProduct(apiData,product){
  // console.log(Array.from(document.querySelectorAll('#cart__items p.deleteItem')));
  Array.from(document.querySelectorAll('.deleteItem')).forEach((element) =>{
    element.addEventListener('click', (el) => {
      const idProduct = el.target.dataset.id;
      console.log('Element supprimé et cliqué', idProduct);
      /* reste à faire la mise à jour de la localstorage + reload de la page (window.location.reload();)*/
      // Récupération des élements DOM liées à son articles
      const buttonDelete = document.querySelector(`[data-id="${product._id}"][data-color="${product.color}"] .deleteItem`);
      const delArticle = document.querySelector(`[data-id="${product._id}"][data-color="${product.color}"]`);
      const qtyInput = document.querySelector(`[data-id="${product._id}"][data-color="${product.color}"] .itemQuantity`);

      // séléction de l'id du produit qui va étre supprimer en cliquant sur le btn
      let id_selectionner_suppression = apiData.idProduct
      //avec la methode filter je séléctionne les éléments à garder et je supprime l'élement ou le bouton a été cliqué
      let elementSuppression = apiData.filter( el => el.idProduct !== id_selectionner_suppression);
      console.log(elementSuppression);
    });
  });
    
}

//----------------------------------------------------F O R M U L AI R E ----------------------------------

// Gestion du formulaire et de l'envoie vers la page confirmation

// Formulaire querySelector
let first_name = document.querySelector("#firstName");
let last_name = document.querySelector("#lastName");
let address = document.querySelector("#address");
let city = document.querySelector("#city");
let e_mail = document.querySelector("#email");
let btn_order = document.querySelector("#order");

// Formulaire Error querySelector
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

// Champs demandés pour le POST
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

// Event au click
btn_order.addEventListener("click", (e) => {
  e.preventDefault();

  // Création d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
  class Form {
    constructor() {
      this.firstName = first_name.value;
      this.lastName = last_name.value;
      this.address = address.value;
      this.city = city.value;
      this.email = e_mail.value;
    }
  }
  // Appel de l'instance de classe Formulaire pour créer l'objet FORM_VALUE
  const FORM_VALUE = new Form();

  // Const regEx pour le formulaire
  const REG_EX_LAST_FIRST_NAME = (value) => {
    return /^[A-Za-z]{2,38}$/.test(value);
  };
  const REG_EX_CITY = (value) => {
    return /^[A-Za-zéèàïêç\-\s]{1,50}\s+[0-9]{5}$/.test(value);
  };
  const REG_EX_ADDRESS = (value) => {
    return /^[0-9]{1,5}\s+[A-Za-zéèàïêç\-\s]{2,50}$/.test(value);
  };
  const REG_EX_E_MAIL = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  // Control de la validité name
  function firstNameControl() {
    let name_form = FORM_VALUE.firstName;
    if (REG_EX_LAST_FIRST_NAME(name_form)) {
      first_name_error.innerHTML = "";
      return true;
    } else {
      first_name_error.innerHTML =
        "Le prénom doit avoir 3 lettres minimum et pas de caractères spéciaux ou chiffres";
      return false;
    }
  }

  // Control de la validité lastName
  function lastNameControl() {
    let last_name_form = FORM_VALUE.lastName;
    if (REG_EX_LAST_FIRST_NAME(last_name_form)) {
      last_name_error.innerHTML = "";
      return true;
    } else {
      last_name_error.innerHTML =
        "Le nom doit avoir 3 lettres minimum et pas de caractères spéciaux ou chiffres";
      return false;
    }
  }

  // Control de la validité address
  function addressControl() {
    let address_form = FORM_VALUE.address;
    if (REG_EX_ADDRESS(address_form)) {
      address_error.innerHTML = "";
      return true;
    } else {
      address_error.innerHTML =
        "Merci de renseigner votre adresse d'au maximum 50 caractères et débutant par des chiffres";
      return false;
    }
  }

  // Control de la validité city
  function cityControl() {
    let city_form = FORM_VALUE.city;
    if (REG_EX_CITY(city_form)) {
      city_error.innerHTML = "";
      return true;
    } else {
      city_error.innerHTML = `Merci de renseigner votre ville et votre code postal. Exemple : « Paris 00000 »`;
      return false;
    }
  }

  // Control de la validité email
  function emailControl() {
    let email_form = FORM_VALUE.email;
    if (REG_EX_E_MAIL(email_form)) {
      e_mail_error.innerHTML = "";
      return true;
    } else {
      e_mail_error.innerHTML =
        "E-mail non valide. Il doit contenir un @ et un point suivi d'au maximum 3 lettres";
      return false;
    }
  }

  // Vérification si la fonction return vrai ou faux
  let firstname_valid = firstNameControl(),
    lastname_valid = lastNameControl(),
    adress_valid = addressControl(),
    city_valid = cityControl(),
    email_valid = emailControl();
  if (
    !firstname_valid ||
    !lastname_valid ||
    !adress_valid ||
    !city_valid ||
    !email_valid
  )
    return null;
  //-------------------------------------------------

  // Push uniquement les Id dans le tableau des produits
  let products = [];
  for (let article_select of cart) {
    products.push(article_select.id);
  }

  // Envoie de l'objet order vers le serveur
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: FORM_VALUE,
      products: products,
    }),
  }).then(async (response) => {
    try {
      const POST_ORDER = await response.json();
      let orderId = POST_ORDER.orderId;

      // Clear le localStorage
      localStorage.clear();
      window.location.assign("confirmation.html?id=" + orderId);
    } catch (e) {
      console.log(e);
    }
  });
});
