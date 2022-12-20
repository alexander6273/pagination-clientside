import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { localhostURL } from "../../settings.js";

const url = localhostURL + "products"

export async function initAddProduct(){
    document.getElementById("form").onsubmit = addNewProduct
}

async function addNewProduct(evt){
    evt.preventDefault()

    const newProduct = {}
    newProduct.name = document.querySelector("#name").value
    newProduct.price = document.querySelector("#price").value
    newProduct.weight = document.querySelector("#weight").value

    const options = {}
    options.method = "POST";
    options.headers = { "Content-type": "application/json" };
    options.body = JSON.stringify(newProduct);

    clearForm()
    await fetch(url, options).then(handleHttpErrors)
}

function clearForm(){
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#weight").value = "";
}