import { Product, CartItem } from './base.js';

loadProduct();

async function loadProduct() {
  try {
    const res = await fetch('http://localhost:5501/data/product.json');
    const data = await res.json();
    console.log('data: ', data);

    const products = data.map((item) => {
      return new Product(
        item.id,
        item.name,
        item.gene,
        item.age,
        item.price,
        item.image
      );
    });

    renderProduct(products);
  } catch (error) {
    console.log(error);
  }
}

function renderProduct(products) {
  const productList = document.getElementById('list-product');

  // manipulation with DOM case use template string
  let ulHTMLString = '';
  products.forEach((item, index) => {
    ulHTMLString += `<li class="list-item col-3">
      <button class="btn btn-cart" data-product-id="${
        item.id
      }">Add to cart</button>
      <a href="#" class="card card-pet">
        <div class="card-img">
          <img class="product-img pet-img" src="${item.image}" alt="dog${
      index + 1
    }">
        </div>
        <div class="card-body">
          <h3 class="card-title">${item.name}</h3>
          <p class="card-detail"><span class="detail-key">Gene:&nbsp;</span><span class="detail-value">${
            item.gene
          }</span>
            <img class="detail-icon" src="./assets/icons/gray-dot.svg" alt="dot-icon">
            <span class="detail-key">Age:&nbsp;<span class="detail-value">${
              item.age
            }</span></span>
          </p>
          <span class="card-price">${item.price}</span>
        </div>
      </a>
    </li>`;
  });

  productList.innerHTML = ulHTMLString;

  const btnsCart = document.querySelectorAll('button.btn.btn-cart');

  btnsCart.forEach((item) => {
    item.addEventListener('click', (e) => {
      const productId = e.target.dataset.productId;
      if (productId) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (Array.isArray(cart) && cart.length > 0) {
          const foundCartDetail = cart.find((item) => {
            return item.id === productId;
          });
          if (foundCartDetail) {
            foundCartDetail.quantity = foundCartDetail.quantity + 1;
            localStorage.setItem('cart', JSON.stringify(cart));
          } else {
            const foundProductDetail = products.find((item) => {
              return item.id === productId;
            });
            const cartItem = new CartItem(
              foundProductDetail.id,
              foundProductDetail.name,
              foundProductDetail.image,
              foundProductDetail.price,
              1
            );
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
          }
        } else {
          const foundProductItem = products.find((item) => {
            return item.id === productId;
          });
          const cartItem = new CartItem(
            foundProductItem.id,
            foundProductItem.name,
            foundProductItem.image,
            foundProductItem.price,
            1
          );
          localStorage.setItem('cart', JSON.stringify([cartItem]));
        }
      }
    });
  });
  // manipulation with DOM case use normal function
  // products.forEach((item) => {
  //   const listItem = document.createElement('li');
  //   listItem.classList.add('list-item', 'col-3');
  //   productList.appendChild(listItem);

  //   const cardPet = document.createElement('a');
  //   cardPet.classList.add('card', 'card-pet');
  //   listItem.appendChild(cardPet);

  //   const cardImg = document.createElement('div');
  //   cardImg.classList.add('card-img');
  //   cardPet.appendChild(cardImg);

  //   const petImg = document.createElement('img');
  //   petImg.classList.add('product-img', 'pet-img');
  //   petImg.src = item.image;
  //   petImg.alt = 'pet image';
  //   cardImg.appendChild(petImg);

  //   const cardBody = document.createElement('div');
  //   cardBody.classList.add('card-body');
  //   cardPet.appendChild(cardBody);

  //   const cardTitle = document.createElement('h3');
  //   cardTitle.classList.add('card-title');
  //   cardTitle.textContent = item.id + ' - ' + item.name;
  //   cardBody.appendChild(cardTitle);

  //   const cardDetail = document.createElement('p');
  //   cardDetail.classList.add('card-detail');
  //   cardBody.appendChild(cardDetail);

  //   const detailKeyGene = document.createElement('span');
  //   detailKeyGene.classList.add('detail-key');
  //   detailKeyGene.innerHTML = 'Gene:&nbsp';
  //   cardDetail.appendChild(detailKeyGene);

  //   const detailValueOfGene = document.createElement('span');
  //   detailValueOfGene.classList.add('detail-value');
  //   detailValueOfGene.textContent = item.gene;
  //   cardDetail.appendChild(detailValueOfGene);

  //   const detailIcon = document.createElement('img');
  //   detailIcon.classList.add('detail-icon');
  //   detailIcon.src = './assets/icons/gray-dot.svg';
  //   detailIcon.alt = 'dot-icon';
  //   cardDetail.appendChild(detailIcon);

  //   const detailKeyAge = document.createElement('span');
  //   detailKeyAge.classList.add('detail-key');
  //   detailKeyAge.innerHTML = 'Age:&nbsp';
  //   cardDetail.appendChild(detailKeyAge);

  //   const detailValueOfAge = document.createElement('span');
  //   detailValueOfAge.classList.add('detail-value');
  //   detailValueOfAge.textContent = item.age;
  //   cardDetail.appendChild(detailValueOfAge);

  //   const cardPrice = document.createElement('span');
  //   cardPrice.classList.add('card-price');
  //   cardPrice.textContent = item.price;
  //   cardBody.appendChild(cardPrice);
  // });
}
