let cart = JSON.parse(localStorage.getItem("cart")) || [];

function changeQty(btn, val) {
    let span = btn.parentElement.querySelector("span");
    let qty = Math.max(1, parseInt(span.textContent) + val);
    span.textContent = qty;
}

function addToCart(btn, item, price) {
    let qty = parseInt(btn.parentElement.querySelector(".qty span").textContent);
    cart.push({ item, price, qty });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    btn.textContent = "Added ✓";
    setTimeout(()=>btn.textContent="Add",1000);
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}
updateCartCount();

function loadCart() {
    let list = document.getElementById("cart-items");
    let total = 0;
    cart.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.item} x${p.qty} = ₱${p.price * p.qty}`;
        list.appendChild(li);
        total += p.price * p.qty;
    });
    document.getElementById("total").textContent = "Total: ₱" + total;
}

function filterProducts(type) {
    document.querySelectorAll(".product-card").forEach(p => {
        p.style.display = (type === "all" || p.classList.contains(type)) ? "block" : "none";
    });
}

/* MARKET TRACKER */
const markets = ["Downtown Market • 2km", "Green Valley • 5km", "City Fresh • 8km"];
let i = 0;
setInterval(() => {
    document.getElementById("market-name").textContent = markets[i];
    i = (i + 1) % markets.length;
}, 3000);

/* MODAL */
function openModal() { document.getElementById("checkout-modal").style.display="block"; }
function closeModal() { document.getElementById("checkout-modal").style.display="none"; }
function confirmOrder() {
    alert("Order placed!");
    localStorage.clear();
    closeModal();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );
}

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}
function loadCart() {
    let list = document.getElementById("cart-items");
    let total = 0;
    list.innerHTML = "";

    cart.forEach((p, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${p.item} x${p.qty} — ₱${p.price * p.qty}
            <button onclick="removeItem(${index})">Remove</button>
        `;
        list.appendChild(li);
        total += p.price * p.qty;
    });

    document.getElementById("total").textContent = "Total: ₱" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function clearCart() {
    if (confirm("Clear all items from cart?")) {
        cart = [];
        localStorage.removeItem("cart");
        loadCart();
        updateCartCount();
    }
}
