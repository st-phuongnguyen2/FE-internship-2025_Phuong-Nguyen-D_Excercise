import { CartItem } from './base.js';
import { loadCartCount } from './cart-count.js';

const ulCart = document.getElementById('cart');
const sectionOrder = document.getElementById('section-order');

loadCart();
loadCartCount();

function loadCart() {
  const data = JSON.parse(localStorage.getItem('cart'));
  if (Array.isArray(data) && data.length > 0) {
    const cart = data.map(
      (item) =>
        new CartItem(
          item.id,
          item.name,
          item.image,
          item.price,
          item.quantity,
          item.unit
        )
    );

    renderCart(cart);
  } else {
    ulCart.innerHTML = 'Nothing added yet';
  }
}

function renderCart(cart) {
  ulCart.innerHTML = '';

  let ulCartHTML = '';

  cart.forEach((item, i) => {
    ulCartHTML += `
      <li class="list-item">
        <a class="card">
          <div class="card-img">
            <img class="cart-item-img" src="${item.image}" alt="cart-item-${
      i + 1
    }"  >
          </div>
          <div class="card-body">
            <h3 class="card-title">${item.name}</h3>
            <span class="card-price">${item.price} ${item.unit}</span>
          </div>

          <div class="card-footer">
            <h3 class="card-title">
              <span>${item.quantity}</span>
              <button class="btn btn-increment" data-cart-id="${
                item.id
              }">+</button>
              <button class="btn btn-decrement" data-cart-id="${
                item.id
              }">-</button>
            </h3>
            <button class="btn btn-primary btn-delete" data-cart-id="${
              item.id
            }">Delete</button>
          </div>
        </a>
      </li>
    `;
  });

  const sum = cart.reduce((acc, cur) => {
    const price = Number(cur.price.replaceAll('.', ''));
    return acc + price * cur.quantity;
  }, 0);

  ulCart.innerHTML = ulCartHTML;

  sectionOrder.innerHTML = `
    <div class="section-title">Total:</div>
    <div class="section-total">${sum}</div>
  `;

  const incrementButtons = document.querySelectorAll(
    'button.btn.btn-increment'
  );
  const decrementButtons = document.querySelectorAll(
    'button.btn.btn-decrement'
  );
  const deleteButtons = document.querySelectorAll('button.btn.btn-delete');

  incrementButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      const cartId = e.target.dataset.cartId;

      const foundCart = cart.find((item) => {
        return item.id === cartId;
      });

      if (foundCart) {
        foundCart.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(cart);
        loadCartCount();
      }
    });
  });

  decrementButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      const cartId = e.target.dataset.cartId;

      const foundCart = cart.find((item) => {
        return item.id === cartId;
      });

      if (foundCart) {
        const currentQuantity = foundCart.quantity;

        if (currentQuantity === 1) {
          const newCart = cart.filter((item) => item.id !== cartId);
          localStorage.setItem('cart', JSON.stringify(newCart));
          renderCart(newCart);
          loadCartCount();
        } else {
          foundCart.quantity -= 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart(cart);
          loadCartCount();
        }
      }
    });
  });

  deleteButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      const cartId = e.target.dataset.cartId;
      const newCart = cart.filter((item) => item.id !== cartId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      renderCart(newCart);
      loadCartCount();
    });
  });
}
