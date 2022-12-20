import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { localhostURL } from "../../settings.js";

const url = localhostURL + "products"

export function initfindEditProduct(){
    document.querySelector("#btn-find-prod").onclick = findProduct
    document.querySelector("#btn-edit-prod").onclick = editProduct
    document.querySelector("#btn-delete-prod").onclick = deleteProduct
}

async function findProduct(){
    const id = document.getElementById("prod-name-input").value
    console.log(id)
    const product = await fetch(url + "/" + id).then(handleHttpErrors)
    document.querySelector("#name").value = product.name
    document.querySelector("#price").value = product.price
    document.querySelector("#weight").value = product.weight
}

async function editProduct(){
    const productToEdit = {}
    productToEdit.name = document.querySelector("#name").value
    productToEdit.price = document.querySelector("#price").value
    productToEdit.weight = document.querySelector("#weight").value

    const options = {}
    options.method = "PUT"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(productToEdit)

    const newProduct = await fetch(url + "/" + productToEdit.name, options)
    clearForm()
}

async function deleteProduct(){
    const productToDelete = document.querySelector("#name").value
    const options = {}
    options.method = "DELETE"
    await fetch(url + "/" + productToDelete, options)
    clearForm()
}

function clearForm(){
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#weight").value = "";
}