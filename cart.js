let shop = document.getElementById("shop");
let cartBody = document.getElementById("cart-body");
let subtotalElement = document.getElementById("subtotal");
let totalElement = document.getElementById("total");

let shopItemsData = [
    { id: "a", name: "Paracetamol 500mg", price: 60.0, img: "images/cat1.1.jpeg" },
    { id: "ab", name: "Aspirin", price: 80.0, img: "images/cat1.2.jpeg" },
    { id: "abc", name: "Motrin", price: 100.0, img: "images/cat1.3.jpeg" },
    { id: "abcd", name: "Tylenol", price: 120.0, img: "images/cat1.4.jpeg" },
    { id: "abcde", name: "Demerol", price: 140.0, img: "images/cat1.5.jpeg" },
    { id: "abcdef", name: "Naprosyn", price: 160.0, img: "images/cat1.6.jpeg" },
    { id: "abcdefg", name: "Ibuprofen", price: 180.0, img: "images/cat1.7.jpeg" },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Generate Shop Items
let generateshop = () => {
    shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, img } = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
            <div id=product-id-${id} class="pharmacy-box1">
                <img src="${img}" />
                <h5>${name}</h5>
                <h3>Rs.${price.toFixed(2)}</h3>
                <div class="wrapper">
                    <i onclick="decrement('${id}')" class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
                </div>
                <a href="#" onclick="addToCart('${id}')"><i class="fa-solid fa-cart-shopping"></i></a> 
            </div>`;
        })
        .join("");
};

generateshop();

// Add Item to Cart
let addToCart = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) {
        basket.push({ id: selectedItem, item: 1 });
    } else {
        search.item += 1;
    }

    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
};

// Increment Item
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined) {
        basket.push({ id: selectedItem, item: 1 });
    } else {
        search.item += 1;
    }

    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
};

// Decrement Item
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if (search === undefined || search.item === 0) return;

    search.item -= 1;
    basket = basket.filter((x) => x.item !== 0);

    update(selectedItem);
    localStorage.setItem("data", JSON.stringify(basket));
};

// Update Quantity in UI
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    populateCart();
};

// Populate Cart Dynamically
let populateCart = () => {
    if (basket.length === 0) {
        cartBody.innerHTML = `<tr><td colspan="6">Cart is Empty</td></tr>`;
        subtotalElement.innerText = `Rs. 0.00`;
        totalElement.innerText = `Rs. 0.00`;
        return;
    }

    cartBody.innerHTML = basket
        .map((x) => {
            let { id, item } = x;
            let product = shopItemsData.find((y) => y.id === id);
            return `
            <tr>
                <td><button onclick="removeItem('${id}')"><i class="fas fa-trash-alt"></i></button></td>
                <td><img src="${product.img}" alt=""></td>
                <td><h5>${product.name}</h5></td>
                <td><h5>Rs. ${product.price.toFixed(2)}</h5></td>
                <td><input class="w-25" value="${item}" type="number" onchange="updateQuantity('${id}', this.value)"></td>
                <td>Rs. ${(product.price * item).toFixed(2)}</td>
            </tr>`;
        })
        .join("");

    calculateTotals();
};

// Remove Item
let removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    populateCart();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Update Quantity Directly from Input
let updateQuantity = (id, quantity) => {
    let search = basket.find((x) => x.id === id);
    if (quantity <= 0) return removeItem(id);
    search.item = parseInt(quantity, 10);
    populateCart();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Calculate Totals
let calculateTotals = () => {
    let subtotal = basket.reduce((acc, x) => {
        let product = shopItemsData.find((y) => y.id === x.id);
        return acc + product.price * x.item;
    }, 0);

    subtotalElement.innerText = `Rs. ${subtotal.toFixed(2)}`;
    totalElement.innerText = `Rs. ${subtotal.toFixed(2)}`;
};

// Clear Cart
let clearCart = () => {
    basket = [];
    populateCart();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Initialize Cart
populateCart();
