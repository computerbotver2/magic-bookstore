// Dữ liệu sản phẩm
let products = [
    { id: "SP001", name: "The Lumina Chronicles", category: "Văn học", price: 150000, stock: 70, status: "active", image: "book1.jpg" },
    { id: "SP002", name: "The Journey of a Thousand Steps", category: "Kỹ năng sống", price: 120000, stock: 25, status: "active", image: "book2.jpg" },
    { id: "SP003", name: "Ignite Your Inner Universe", category: "Kỹ năng sống", price: 180000, stock: 15, status: "active", image: "book3.jpg" },
    { id: "SP004", name: "The Magical Treehouse Adventure", category: "Thiếu nhi", price: 95000, stock: 110, status: "active", image: "book4.jpg" },
    { id: "SP005", name: "Stardust & Serendipity", category: "Văn học", price: 130000, stock: 12, status: "hidden", image: "book5.jpg" },
];

// Hiển thị danh sách sản phẩm
function displayProducts(filteredData = products) {
    let html = '';
    filteredData.forEach((product, index) => {
        const statusBadge = product.status === 'active' 
            ? '<span class="badge success">Đang bán</span>' 
            : '<span class="badge danger">Ẩn</span>';
        
        const stockClass = product.stock < 20 ? 'text-danger' : 'text-success';
        
        html += `<tr>`;
        html += `<td><strong>${product.id}</strong></td>`;
        html += `<td>${product.name}</td>`;
        html += `<td>${product.category}</td>`;
        html += `<td><strong>${product.price.toLocaleString()}₫</strong></td>`;
        html += `<td class="${stockClass}">${product.stock}</td>`;
        html += `<td>${statusBadge}</td>`;
        html += `<td>
                    <div class="action-btns">
                        </button>
                        <button class="btn-icon edit" onclick="editProduct(${index})" title="Sửa">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button class="btn-icon delete" onclick="toggleProductStatus(${index})" title="${product.status === 'active' ? 'Ẩn' : 'Hiện'}">
                            <i class='bx ${product.status === 'active' ? 'bx-hide' : 'bx-show'}'></i>
                        </button>
                    </div>
                 </td>`;
        html += `</tr>`;
    });
    
    const table = document.getElementById('productsTable');
    if (table) {
        table.innerHTML = html;
    }
}

// Thêm sản phẩm mới
function addProduct() {
    const name = prompt("Nhập tên sản phẩm:");
    if (!name) return;
    
    const category = prompt("Nhập loại sách:");
    if (!category) return;
    
    const price = parseInt(prompt("Nhập giá bán:"));
    if (!price || price <= 0) {
        alert("Giá không hợp lệ!");
        return;
    }
    
    const stock = parseInt(prompt("Nhập số lượng tồn:"));
    if (!stock || stock < 0) {
        alert("Số lượng không hợp lệ!");
        return;
    }
    
    const newId = "SP" + String(products.length + 1).padStart(3, '0');
    products.push({
        id: newId,
        name: name,
        category: category,
        price: price,
        stock: stock,
        status: "active",
        image: "default.jpg"
    });
    
    displayProducts();
    alert("Đã thêm sản phẩm mới!");
}

// Sửa sản phẩm
function editProduct(index) {
    const product = products[index];
    
    const newName = prompt("Tên sản phẩm:", product.name);
    if (newName) products[index].name = newName;
    
    const newPrice = parseInt(prompt("Giá bán:", product.price));
    if (newPrice && newPrice > 0) products[index].price = newPrice;
    
    const newStock = parseInt(prompt("Số lượng tồn:", product.stock));
    if (newStock >= 0) products[index].stock = newStock;
    
    displayProducts();
    alert("Đã cập nhật sản phẩm!");
}

// Xem chi tiết sản phẩm
function viewProduct(index) {
    const p = products[index];
    alert(`Chi tiết sản phẩm:\n\nMã: ${p.id}\nTên: ${p.name}\nLoại: ${p.category}\nGiá: ${p.price.toLocaleString()}₫\nTồn kho: ${p.stock}\nTrạng thái: ${p.status === 'active' ? 'Đang bán' : 'Ẩn'}`);
}

// Ẩn/Hiện sản phẩm
function toggleProductStatus(index) {
    const product = products[index];
    const action = product.status === 'active' ? 'ẩn' : 'hiện';
    
    if (confirm(`Bạn có chắc muốn ${action} sản phẩm "${product.name}"?`)) {
        products[index].status = product.status === 'active' ? 'hidden' : 'active';
        displayProducts();
    }
}


// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productsTable')) {
        displayProducts();
    }
});