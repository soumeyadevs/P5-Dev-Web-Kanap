let cart = JSON.parse(localStorage.getItem("product_client"));



for(let product of cart){
 fetch(`http://localhost:3000/api/products/`+ product.id)
 .then((res) => res.json())
 .then(displayProducts);

}

function displayProducts(product) {
    let cart_items = document.querySelector("#cart__items");
    cart_items.innerHTML += 
        `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" >Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
      }
  