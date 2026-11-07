const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

const emptyCart = [];
const singleItemCart = [{name: "Game", price:60}];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total; //Fix: changed <= to <
}

function applyDiscount(total, discountRate) {
    if (discountRate < 0) { // Fix: Clamp discountRate
        discountRate = 0;
    }
    
    if (discountRate > 1) {
        discountRate = 1;
    }

    return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  let totalNum = parseFloat(total);// Fix: force to float
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${totalNum.toFixed(2)}`; // Bug: total may not be a number
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

const emptyTotal = calculateTotal(emptyCart);
const emptyRecipt = generateReceipt(emptyCart, emptyTotal);

console.log("Empty Cart:")
console.log(`Total: $${emptyTotal}`);
console.log(emptyRecipt);

const singleItemTotal = calculateTotal(singleItemCart);
const singleItemRecipt = generateReceipt(singleItemCart, singleItemTotal);

console.log("Single Item Cart:")
console.log(`Total: $${singleItemTotal}`);
console.log(singleItemRecipt);

const edgeDiscount = applyDiscount(singleItemTotal, 1);

console.log("Full Discount:")
console.log(`Total: $${edgeDiscount}`);
console.log(singleItemRecipt);
