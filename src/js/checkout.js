import { checkoutProcess } from "./checkoutProcess.mjs";

checkoutProcess.init("so-cart");

document.getElementById("checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  checkoutProcess.buildCheckoutPayload();
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) checkoutProcess.checkOut();
});
