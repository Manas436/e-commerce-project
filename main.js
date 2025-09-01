const list = document.querySelector(".navlist")
const hamburger = document.querySelector(".fa-bars")

hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("fa-x");
    list.classList.toggle("navlist-active");
})

// --- Add to Cart with Remove and UI ---
let cart = [];

function updateCartUI() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
    } else {
        cartEmpty.style.display = 'none';
        cart.forEach((item, idx) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.img}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <button class="remove-from-cart" data-idx="${idx}">Remove</button>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', function () {
        const card = button.closest('.card');
        const title = card.querySelector('.title').innerText.trim();
        const price = card.querySelector('.amount').innerText.trim();
        const img = card.querySelector('img').getAttribute('src');
        cart.push({ title, price, img });
        document.getElementById('cart-sidebar').style.display = 'block';
        updateCartUI();
    });
});

// Remove from cart (event delegation)
document.getElementById('cart-items').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-from-cart')) {
        const idx = parseInt(e.target.getAttribute('data-idx'));
        cart.splice(idx, 1);
        updateCartUI();
    }
});

// Open cart when clicking shopping bag icon
document.querySelectorAll('.fa-shopping-bag').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('cart-sidebar').style.display = 'block';
        updateCartUI();
    });
});

// Close cart sidebar
document.getElementById('close-cart').addEventListener('click', function() {
    document.getElementById('cart-sidebar').style.display = 'none';
});

