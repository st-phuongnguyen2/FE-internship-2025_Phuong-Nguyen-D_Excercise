export class Product {
  id;
  name;
  gene;
  age;
  price;
  image;

  constructor(id, name, gene, age, price, image) {
    this.id = id;
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
  price;
  quantity;

  constructor(id, name, image, price, quantity) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
  }
}

