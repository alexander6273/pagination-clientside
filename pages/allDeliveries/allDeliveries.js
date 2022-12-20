import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { localhostURL } from "../../settings.js";

const url = localhostURL + "deliveries"

export function initAllDeliveries(){
    getDeliveries();
}

async function getDeliveries(){
    try {
        const deliveryList = await fetch(url).then(handleHttpErrors);
        displayDeliveries(deliveryList);
    } catch (e) {
        console.log(e)
    }
}

function displayDeliveries(list){
    const tableData = list.map(
        (deli) =>
            `<tr>
        <td>${deli.id}</td>
        <td>${deli.deliveryDate}</td>
        <td>${deli.warehouse}</td>
        <td>${deli.destination}</td>
        <td>${deli.price}</td>
        <td>${deli.weight}</td>
        </tr>`
    ).join("\n");

    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableData);
}