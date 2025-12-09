let cart = [];

/* SPLASH */
function enterShop() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("shop").style.display = "block";
}

/* CART */
function addToCart(id, price) {
  const product = cart.find(p => p.id === id);
  if (product) {
    product.qty++;
  } else {
    cart.push({ id, price, qty: 1 });
  }
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  const cartBox = document.getElementById("cart-items");
  cartBox.innerHTML = "";

  let subtotal = 0;

  cart.forEach(item => {
    const line = item.price * item.qty;
    subtotal += line;

    cartBox.innerHTML += `
      <p>${item.id} x ${item.qty} = Rp ${line.toLocaleString("id-ID")}</p>
    `;
  });

  const shipping = subtotal === 0 ? 0 : 12000;
  const total = subtotal + shipping;

  document.getElementById("subtotal").innerText = formatIDR(subtotal);
  document.getElementById("shipping").innerText = formatIDR(shipping);
  document.getElementById("total").innerText = formatIDR(total);
}

/* CHECKOUT */
function openCheckout() {
  if (cart.length === 0) {
    alert("Keranjang masih kosong");
    return;
  }
  document.getElementById("checkout-modal").style.display = "block";
}

function closeCheckout() {
  document.getElementById("checkout-modal").style.display = "none";
}

/* QR */
/* COD */
function showCOD() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Lengkapi data dulu!");
    return;
  }

  document.getElementById("checkout-modal").style.display = "none";
  document.getElementById("cod-modal").style.display = "block";

  const totalText = document.getElementById("total").innerText;
  document.getElementById("finalTotal").innerText = totalText;
}

/* SELESAI COD */
function finishOrder() {
  alert("Pesanan berhasil dibuat dengan sistem COD ✅");

  document.getElementById("cod-modal").style.display = "none";
  clearCart();
}

/* FORMAT */
function formatIDR(num) {
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR"
  });
}