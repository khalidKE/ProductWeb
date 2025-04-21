
let products = JSON.parse(localStorage.getItem('products')) || [];
let currentIndex = -1;


const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productCategoryInput = document.getElementById('productCategory');
const productDescriptionInput = document.getElementById('productDescription');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const searchInput = document.getElementById('searchInput');
const productTableBody = document.getElementById('productTableBody');


addBtn.addEventListener('click', addProduct);
updateBtn.addEventListener('click', updateProduct);
searchInput.addEventListener('input', searchProducts);

displayProducts();

function addProduct() {
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const category = productCategoryInput.value.trim();
    const description = productDescriptionInput.value.trim();
    
    if (!name || !price || !category || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    const product = {
        name,
        price,
        category,
        description
    };
    
    products.push(product);
    
    saveProducts();
    
    clearForm();
    
    displayProducts();
}

function displayProducts(productsToDisplay = products) {
    productTableBody.innerHTML = '';
    
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

function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescriptionInput.value = '';
    
    updateBtn.style.display = 'none';
    addBtn.style.display = 'inline-block';
    
    currentIndex = -1;
}

function editProduct(index) {
    const product = products[index];
    
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productCategoryInput.value = product.category;
    productDescriptionInput.value = product.description;
    
    updateBtn.style.display = 'inline-block';
    addBtn.style.display = 'none';
    
    currentIndex = index;
    
    window.scrollTo(0, 0);
}

function updateProduct() {
    if (currentIndex === -1) {
        return;
    }
    
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const category = productCategoryInput.value.trim();
    const description = productDescriptionInput.value.trim();
    
    if (!name || !price || !category || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    products[currentIndex] = {
        name,
        price,
        category,
        description
    };
    
    saveProducts();
    
    clearForm();
    
    displayProducts();
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(index, 1);
        
        saveProducts();
        
        displayProducts();
    }
}

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        
        displayProducts();
    } else {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    }
}

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}
