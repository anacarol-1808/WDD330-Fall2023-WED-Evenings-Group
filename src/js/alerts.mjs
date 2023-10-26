import { getProductsByCategory } from "./externalServices.mjs";

export default async function buildAlerts() {
    const alerts = await getProductsByCategory('alerts');
    if (alerts.length > 0) {
        const output = document.createElement("section");
        output.classList.add("alert-list");
        renderList(alerts, output);
    }
}

function alertTemplate (alert) {
    return `<p style="background-color: ${alert.background}; color: ${alert.color}; padding: 16px">
        ${alert.message}
    </p>`
};

function renderList(list, output) {
    list.map((alert)=> {
        output.insertAdjacentHTML("beforeend", alertTemplate(alert))  
    });

    document.querySelector("main").insertAdjacentElement("afterbegin", output);
}