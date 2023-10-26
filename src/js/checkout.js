import { checkoutProcess } from "./checkoutProcess.mjs";
import { checkout } from "./externalServices.mjs"

checkoutProcess.init("so-cart")

document.getElementById("checkoutForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    checkoutProcess.buildCheckoutPayload()
    checkout(checkoutProcess.payload)
})