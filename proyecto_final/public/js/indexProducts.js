const socket = io();

socket.on('products_changed', data => {
  const list = document.getElementById('products');

  let products = "";

  if(data?.products?.length > 0) {
    data.products.forEach(element => {
      products +=  `
        <li>Id: ${element.id} ${element.title} $${element.price}</li>
      `;
    });
  } else {
    products = `<p>No products</p>`
  }

  list.innerHTML = products;
});