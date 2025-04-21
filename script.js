// Initialize products array from localStorage or empty array if none exists
let products = JSON.parse(localStorage.getItem('products')) || [];
let currentIndex = -1;

// DOM Elements
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productCategoryInput = document.getElementById('productCategory');
const productDescriptionInput = document.getElementById('productDescription');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const searchInput = document.getElementById('searchInput');
const productTableBody = document.getElementById('productTableBody');

// Event Listeners
addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
searchInput.addEventListener('input', searchProducts);

// Initial render
displayProducts();

// Function to add a new product
function addProduct() {
    // Get input values
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const category = productCategoryInput.value.trim();
    const description = productDescriptionInput.value.trim();
    
    // Validate inputs
    if (!name || !price || !category || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create product object
    const product = {
        name,
        price,
        category,
        description
    };
    
    // Add to products array
    products.push(product);
    
    // Save to localStorage
    saveProducts();
    
    // Clear form
    clearForm();
    
    // Display updated products
    displayProducts();
}

// Function to display products in the table
function displayProducts(productsToDisplay = products) {
    // Clear table body
    productTableBody.innerHTML = '';
    
    // Loop through products and create table rows
    productsToDisplay.forEach((product, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
            <td><button class="action-btn update-btn" onclick="editProduct(${index})">Update</button></td>
            <td><button class="action-btn delete-btn" onclick="deleteProduct(${index})">Delete</button></td>
        `;
        
        productTableBody.appendChild(tr);
    });
}

// Function to clear the form
function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
    
    // Hide update button, show add button
    updateBtn.style.display = 'none';
    addBtn.style.display = 'inline-block';
    
    // Reset current index
    currentIndex = -1;
}

// Function to edit a product
function editProduct(index) {
    // Get product
    const product = products[index];
    
    // Fill form with product data
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productCategoryInput.value = product.category;
    productDescriptionInput.value = product.description;
    
    // Show update button, hide add button
    updateBtn.style.display = 'inline-block';
    addBtn.style.display = 'none';
    
    // Set current index
    currentIndex = index;
    
    // Scroll to form
    window.scrollTo(0, 0);
}

// Function to update a product
function updateProduct() {
    // Validate current index
    if (currentIndex === -1) {
        return;
    }
    
    // Get input values
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const category = productCategoryInput.value.trim();
    const description = productDescriptionInput.value.trim();
    
    // Validate inputs
    if (!name || !price || !category || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    // Update product
    products[currentIndex] = {
        name,
        price,
        category,
        description
    };
    
    // Save to localStorage
    saveProducts();
    
    // Clear form
    clearForm();
    
    // Display updated products
    displayProducts();
}

// Function to delete a product
function deleteProduct(index) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this product?')) {
        // Remove product from array
        products.splice(index, 1);
        
        // Save to localStorage
        saveProducts();
        
        // Display updated products
        displayProducts();
    }
}

// Function to search products
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        // If search term is empty, display all products
        displayProducts();
    } else {
        // Filter products by search term
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        // Display filtered products
        displayProducts(filteredProducts);
    }
}

// Function to save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}