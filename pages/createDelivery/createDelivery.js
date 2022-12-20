import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";
import { localhostURL } from "../../settings.js";

const url = localhostURL + "deliveries"

export async function initCreateDelivery(){
    document.getElementById("form").onsubmit = createNewDelivery
}

async function createNewDelivery(evt){
    evt.preventDefault()

    const newDelivery = {}
    newDelivery.deliveryDate = document.querySelector("#date").value
    newDelivery.warehouse = document.querySelector("#warehouse").value
    newDelivery.destination = document.querySelector("#destination").value

    const options = {}
    options.method = "POST";
    options.headers = { "Content-type": "application/json" };
    options.body = JSON.stringify(newDelivery);

    clearForm()
    await fetch(url, options).then(handleHttpErrors)
}

function clearForm(){
    document.querySelector("#date").value = "";
    document.querySelector("#warehouse").value = "";
    document.querySelector("#destination").value = "";
}