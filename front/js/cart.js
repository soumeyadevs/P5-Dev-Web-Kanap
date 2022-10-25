const KanapAPI = "http://localhost:3000/api/products/";
let cartList = JSON.parse(localStorage.getItem('cart'));
let addArticle = document.querySelector('#cart__items');
let totalQty = document.querySelector('#totalQuantity');
let totalPrice = document.querySelector('#totalPrice');
const order = document.getElementById("order");
const allInputs = document.querySelectorAll("form input[name]");