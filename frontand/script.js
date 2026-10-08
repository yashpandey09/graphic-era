const products = [
  {
    id: 1,
    name: "Classic Beige Jacket",
    category: "men",
    type: "Men's Jacket",
    price: 1899,
    oldPrice: 2499,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Minimal White Shirt",
    category: "men",
    type: "Men's Shirt",
    price: 999,
    oldPrice: 1399,
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Elegant Black Dress",
    category: "women",
    type: "Women's Dress",
    price: 1699,
    oldPrice: 2299,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Oversized Street Hoodie",
    category: "men",
    type: "Unisex Hoodie",
    price: 1299,
    oldPrice: 1799,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Casual Denim Look",
    category: "women",
    type: "Women's Outfit",
    price: 1999,
    oldPrice: 2799,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Everyday Sneakers",
    category: "shoes",
    type: "Sneakers",
    price: 1499,
    oldPrice: 1999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Premium Knit Sweater",
    category: "women",
    type: "Women's Sweater",
    price: 1399,
    oldPrice: 1899,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Urban Black Sneakers",
    category: "shoes",
    type: "Sneakers",
    price: 1799,
    oldPrice: 2399,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
  }
];

let cart = JSON.parse(localStorage.getItem("stylehub-cart")) || [];

const productGrid = document.getElementById("productGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

function money(value) {
  return "₹" + value.toLocaleString("en-IN");
}

function renderProducts(list = products) {

  if (!list.length) {
    productGrid.innerHTML =
      '<p class="empty">No products found.</p>';
    return;
  }

  productGrid.innerHTML = list.map(product => `
    <article class="product-card">

      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="product-info">

        <div class="product-category">
          ${product.type}
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div>
          <span class="price">
            ${money(product.price)}
          </span>

          <span class="old-price">
            ${money(product.oldPrice)}
          </span>
        </div>

        <button
          class="add-cart"
          onclick="addToCart(${product.id})"
        >
          Add to Cart
        </button>

      </div>
    </article>
  `).join("");
}

function addToCart(id) {

  const product = products.find(
    item => item.id === id
  );

  const existing = cart.find(
    item => item.id === id
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  openCart();
}

function removeFromCart(id) {

  cart = cart.filter(
    item => item.id !== id
  );

  saveCart();
}

function saveCart() {

  localStorage.setItem(
    "stylehub-cart",
    JSON.stringify(cart)
  );

  renderCart();
}

function renderCart() {

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = money(totalPrice);

  if (!cart.length) {

    cartItems.innerHTML =
      '<div class="empty">Your cart is empty.</div>';

    return;
  }

  cartItems.innerHTML = cart.map(item => `

    <div class="cart-item">

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div>

        <h4>
          ${item.name}
        </h4>

        <div>
          ${money(item.price)}
          ×
          ${item.quantity}
        </div>

        <button
          class="remove"
          onclick="removeFromCart(${item.id})"
        >
          Remove
        </button>

      </div>

    </div>

  `).join("");
}

function openCart() {

  cartPanel.classList.add("open");

  overlay.classList.add("show");
}

function closeCart() {

  cartPanel.classList.remove("open");

  overlay.classList.remove("show");
}


// CART BUTTON

document
  .getElementById("cartBtn")
  .addEventListener("click", openCart);


// CLOSE CART

document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);


// OVERLAY

overlay.addEventListener(
  "click",
  closeCart
);


// SEARCH BUTTON

document
  .getElementById("searchBtn")
  .addEventListener("click", () => {

    const searchBox =
      document.getElementById("searchBox");

    const searchInput =
      document.getElementById("searchInput");

    searchBox.classList.toggle("show");

    if (searchBox.classList.contains("show")) {
      searchInput.focus();
    }

  });


// SEARCH

document
  .getElementById("searchInput")
  .addEventListener("input", event => {

    const term =
      event.target.value
        .toLowerCase()
        .trim();

    const filtered =
      products.filter(product =>

        product.name
          .toLowerCase()
          .includes(term)

        ||

        product.type
          .toLowerCase()
          .includes(term)

        ||

        product.category
          .toLowerCase()
          .includes(term)

      );

    renderProducts(filtered);

  });


// CATEGORY FILTERS

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelector(".filter.active")
          .classList.remove("active");

        button.classList.add("active");

        const category =
          button.dataset.category;

        if (category === "all") {

          renderProducts(products);

        } else {

          const filtered =
            products.filter(
              product =>
                product.category === category
            );

          renderProducts(filtered);
        }

      }
    );

  });


// CHECKOUT

document
  .getElementById("checkoutBtn")
  .addEventListener(
    "click",
    () => {

      if (!cart.length) {

        alert("Your cart is empty.");

        return;
      }

      alert(
        "Demo checkout: Payment integration can be added here."
      );

    }
  );


// INITIAL LOAD

renderProducts();

renderCart();