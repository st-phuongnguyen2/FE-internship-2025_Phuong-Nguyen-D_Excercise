export class Product {
  id;
  name;
  gene;
  age;
  price;
  image;
  unit;

  constructor(id, name, gene, age, price, image, unit) {
    this.id = id;
    this.name = name;
    this.gene = gene;
    this.age = age;
    this.price = price;
    this.image = image;
    this.unit = unit;
  }
}

export class CartItem {
  id;
  name;
  image;
  price;
  quantity;
  unit;

  constructor(id, name, image, price, quantity, unit) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.quantity = quantity;
    this.unit = unit;
  }
}
