// Simulated user database
const users = [];

// Cart array to hold added products
let cart = [];

// Sign Up Functionality
document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        document.getElementById('signupMessage').innerText = "User  already exists.";
        return;
    }

    // Add user to the simulated database
    users.push({ username, email, password });
    document.getElementById('signupMessage').innerText = "Sign up successful! Redirecting to home...";

    // Redirect to home page after a short delay
    setTimeout(() => {
        window.location.href = "home.html"; // Redirect to home page
    }, 2000); // 2 seconds delay
});

// Sign In Functionality
document.getElementById('signInForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if user exists in the simulated database
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // Redirect to homepage if credentials are correct
        window.location.href = "home.html";
    } else {
        document.getElementById('errorMessage').innerText = "Invalid email or password.";
    }
});

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productElement = this.parentElement;
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.querySelector('h3').innerText;
        const productPrice = parseFloat(productElement.querySelector('.price').innerText.replace('$', ''));

        // Add product to cart
        const product = { id: productId, name: productName, price: productPrice };
        cart.push(product);
        updateCart();
    });
});

// Function to update the cart display
function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear previous cart contents

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerText = `${item.name} - $${item.price.toFixed(2)}`;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('cartTotal').innerText = `Total: $${total.toFixed(2)}`;
}