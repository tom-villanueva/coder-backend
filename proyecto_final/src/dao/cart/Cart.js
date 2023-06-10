class Cart{
  constructor({id, products = []}) {
    this.id = id;
    this.products = products;
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    return new Promise((resolve, reject) => {
      console.log(product)
      const productIndex = this.products.findIndex((p) => p.pid === product.id);
  
      if(productIndex === -1) {
        const newItem = {
          pid: product.id,
          quantity: 1
        }

        this.products.push(newItem)

        return resolve(this.products);
      } else {
        this.products[productIndex].quantity += 1;

        return resolve(this.products[productIndex]);
      }
    })
  }
}

export default Cart;