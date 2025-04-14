export function loadCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart'));
  let sum = 0;
  if (Array.isArray(cart) && cart.length > 0) {
    cart.forEach((item) => {
      sum += item.quantity;
    });
    cartCount.textContent = sum;
  } else {
    cartCount.textContent = sum;
  }
}
