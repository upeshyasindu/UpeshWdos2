// Function to show the payment form (Modal)
function showPaymentForm() {
    document.getElementById("payment-modal").style.display = "block";
}

// Function to close the payment form (Modal)
function closePaymentForm() {
    document.getElementById("payment-modal").style.display = "none";
}

// Function to handle form submission and show completion message
function showCompletionMessage(event) {
    event.preventDefault(); // Prevent form submission
    alert("Your transaction has been completed");
    closePaymentForm(); // Close the modal after submission
}

// Function to clear the cart (Placeholder)
// function clearCart() {
//     document.getElementById("cart-body").innerHTML = "";
//     document.getElementById("subtotal").innerText = "Rs. 0.00";
//     document.getElementById("total").innerText = "Rs. 0.00";
// }
