import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { localhostURL } from "../../settings.js";

const urlDeliveries = localhostURL + "deliveries"
const urlProductOrders = localhostURL + "orders"

export function initFindDelivery(){
    document.querySelector("#btn-fetch-deli").onclick = findDelivery
}

async function findDelivery(){
    const id = document.getElementById("deli-id-input").value
    console.log(id)
    const delivery = await fetch(urlDeliveries + "/" + id).then(handleHttpErrors)
    document.querySelector("#price").value = delivery.name
    document.querySelector("#weight").value = delivery.weight
    getProductOrdersByDelivery(id)
}

async function getProductOrdersByDelivery(id){
    const OrdersByDeliveryList = await fetch(urlProductOrders + "/delivery/" + id)
    displayOrders(OrdersByDeliveryList)
}

function displayOrders(list){
    const tableData = list.map(
        (order) =>
            `<tr>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.price}</td>
        <td>${order.weight}</td>
        </tr>`
    ).join("\n");

    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableData);
}