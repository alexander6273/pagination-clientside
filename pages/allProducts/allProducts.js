import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { localhostURL } from "../../settings.js";

const url = localhostURL + "products"

export function initAllProducts(){
    getProducts();
}

async function getProducts() {
    try {
        const productList = await fetch(url).then(handleHttpErrors);
        displayProducts(productList);
    } catch (e) {
        console.log(e);
    }
}

function displayProducts(list) {
    const tableData = list.map(
        (prod) =>
            `<tr>
        <td>${prod.name}</td>
        <td>${prod.price}</td>
        <td>${prod.weight}</td>
        </tr>`
    ).join("\n");

    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableData);
}