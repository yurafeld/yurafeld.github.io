// Fetch products from the server
fetch('/api/products')
  .then(response => response.json())
  .then(products => {
    // Display products in the UI
    const productsDiv = document.querySelector('.products');
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}">
        <p>${product.description}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      `;
      productsDiv.appendChild(productDiv);
    });
  });

// Handle add to cart button clicks
const cartDiv = document.querySelector('.cart');
cartDiv.addEventListener('click', event => {
  if (event.target.classList.contains('add-to-cart')) {
    const productId = event.target.dataset.id;
    // Add product to cart in the server
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    })
      .then(response => response.json())
      .then(cart => {
        // Display cart in the UI
        cartDiv.innerHTML = `
          <h2>Cart</h2>
          <ul>
            ${cart.items.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}
          </ul>
