export class Product {
  id;
  idProduct;
  name;
  gene;
  age;
  price;
  image;

  constructor(id, idProduct, name, gene, age, price, image) {
    this.id = id;
    this.idProduct = idProduct;
    this.name = name;
    this.gene = gene;
    this.age = age;
    this.price = price;
    this.image = image;
  }
}

export class CartItem {
  id;
  name;
  image;
  quantity;

  constructor(id, name, image, quantity) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.quantity = quantity;
  }
}
