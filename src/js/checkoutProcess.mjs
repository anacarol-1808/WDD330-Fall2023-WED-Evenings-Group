import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";
import { convertToJson } from "./externalServices.mjs"

export const checkoutProcess = {
    localKey: "",
    itemTotal: 0,
    finalTotal: 0,
    tax: 0,
    shipping: 0,
    list: [],
    init: function(localKey){
        this.USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',});
        this.localKey = localKey;
        this.packageItems();
        this.calculateItemTotal();
    },
    packageItems: function(){
        let data = getLocalStorage(this.localKey)
        data.map((ele)=>{
            this.list.push({
                id: ele.Id,
                name: ele.Name,
                price: parseFloat(ele.FinalPrice),
                quantity: 1
            })
        })
    },
    calculateItemTotal: function(){
        for(let item of this.list){
            this.itemTotal += parseFloat(item.price);
        }
        this.calculateFinalPrice();
    },
    calculateFinalPrice: function(){
        this.tax = this.itemTotal * .06;
        this.shipping = ((this.list.length-1) * 2) + 10;
        this.finalTotal += this.itemTotal;
        this.finalTotal += this.tax;
        this.finalTotal += this.shipping;
        this.displayFinalPrice();
    },
    displayFinalPrice: function(){
        document.getElementById("subtotal-price").textContent = this.USDollar.format(this.itemTotal);
        document.getElementById("shippingEstimate").textContent = this.USDollar.format(this.shipping);
        document.getElementById("tax").textContent = this.USDollar.format(this.tax);
        document.getElementById("total").textContent = this.USDollar.format(this.finalTotal);
    },
    buildCheckoutPayload: function(){
        
        this.payload = {
            orderDate: new Date(),
            items: this.list,
            orderTotal: this.itemTotal,
            shipping: this.shipping,
            tax: this.tax
        }
        
        Array.from(document.getElementById("checkoutForm").elements).forEach(formField => {
            this.payload[formField.name] = formField.value;
        });
    },
    checkOut: function() {
        try {
            const response = checkout(this.payload);
            const responseData = convertToJson(response);
            console.log(responseData);
            location.assign('/checkout/success.html');
        } catch (err) {
            console.log(err);
            err.message;
        }
    }
}