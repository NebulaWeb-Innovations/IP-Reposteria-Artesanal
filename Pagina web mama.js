document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h3').textContent;
            const quantity = parseInt(product.querySelector('.quantity').value);
            addToCart(productId, productName, quantity);
        });
    });

    function addToCart(id, name, quantity) {
        const item = cart.find(product => product.id === id);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.push({ id, name, quantity });
        }
        renderCart();
    }

    function removeFromCart(id) {
        const itemIndex = cart.findIndex(product => product.id === id);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let totalAmount = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - Cantidad: ${item.quantity} <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>`;
            cartItems.appendChild(li);
            totalAmount += item.quantity * 10; // Suponiendo que cada producto cuesta $10
        });
        total.textContent = totalAmount;

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                removeFromCart(productId);
            });
        });
    }
});
