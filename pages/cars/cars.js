import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js";

const url = "http://localhost:8080/api/cars";

export function initCars() {
    getCars();
}

async function getCars() {
    try {
        const carsList = await fetch(url).then(handleHttpErrors);
        displayCars(carsList);
    } catch (e) {
        console.log(e);
    }
}

function displayCars(list) {
    const tableData = list.map(
        (car) =>
            `<tr>
        <td>${car.id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.kilometers}</td>
        </tr>`
    );

    const tableString = tableData.join("\n");
    document.querySelector("#tbody").innerHTML = sanitizeStringWithTableRows(tableString);
}
