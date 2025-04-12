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

class CartItem {}

class Cart {}
