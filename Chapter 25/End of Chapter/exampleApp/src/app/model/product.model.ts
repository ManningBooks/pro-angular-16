export class Product {

  constructor(public id?: number,
      public name?: string,
      public category?: string,
      public price?: number,
      public keywords?: string[]) { }

    static fromProduct(p: Product) {
        return new Product(p.id, p.name, p.category, p.price, p.keywords);
    }
}
