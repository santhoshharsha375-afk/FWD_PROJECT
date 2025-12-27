function getCart() {
  const data = localStorage.getItem('eduCart');
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem('eduCart', JSON.stringify(cart));
}

function updateCartCount() {
  const el = document.querySelector('.cart-count');
  if (!el) return;
  const cart = getCart();
  el.textContent = cart.length;
}

function setupShopPage() {
  const buttons = document.querySelectorAll('.add-to-cart');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      let cart = getCart();
      cart.push({ name, price });
      saveCart(cart);
      alert(name + ' is added to cart');
      updateCartCount();
    });
  });

  updateCartCount();
}

function setupCartPage() {
  const tbody = document.getElementById('cart-body');
  if (!tbody) {
    updateCartCount();
    return;
  }

  const emptyText = document.getElementById('cart-empty');
  const totalText = document.getElementById('cart-total');
  let cart = getCart();

  tbody.innerHTML = '';

  if (!cart.length) {
    emptyText.style.display = 'block';
    totalText.textContent = 'Total: ₹0';
    updateCartCount();
    return;
  }

  emptyText.style.display = 'none';

  let total = 0;

  cart.forEach((item, index) => {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = item.name;

    const tdPrice = document.createElement('td');
    tdPrice.textContent = item.price;

    const tdAction = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      saveCart(cart);
      setupCartPage();
      alert(item.name + ' removed from cart');
    });

    tdAction.appendChild(removeBtn);

    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdAction);
    tbody.appendChild(tr);

    total += item.price;
  });

  totalText.textContent = 'Total: ₹' + total;
  updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
  setupShopPage();
  setupCartPage();
});
