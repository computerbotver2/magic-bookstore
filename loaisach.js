// Dữ liệu loại sách
let categories = [
    { id: "LS001", name: "Văn học", description: "Sách văn học trong và ngoài nước", status: "active", productCount: 15 },
    { id: "LS002", name: "Kinh tế", description: "Sách về kinh doanh và tài chính", status: "active", productCount: 8 },
    { id: "LS003", name: "Kỹ năng sống", description: "Sách phát triển bản thân", status: "active", productCount: 12 },
    { id: "LS004", name: "Thiếu nhi", description: "Sách dành cho trẻ em", status: "active", productCount: 20 },
    { id: "LS005", name: "Khoa học", description: "Sách khoa học tự nhiên và xã hội", status: "hidden", productCount: 5 },
];

// Hiển thị danh sách loại sách
function displayCategories(filteredData = categories) {
    let html = '';
    filteredData.forEach((cat, index) => {
        const statusBadge = cat.status === 'active' 
            ? '<span class="badge success">Hiển thị</span>' 
            : '<span class="badge danger">Ẩn</span>';
        
        html += `<tr>`;
        html += `<td><strong>${cat.id}</strong></td>`;
        html += `<td>${cat.name}</td>`;
        html += `<td>${cat.description}</td>`;
        html += `<td>${cat.productCount}</td>`;
        html += `<td>${statusBadge}</td>`;
        html += `<td>
                    <div class="action-btns">
                        <button class="btn-icon edit" onclick="editCategory(${index})" title="Sửa">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button class="btn-icon delete" onclick="toggleCategoryStatus(${index})" title="${cat.status === 'active' ? 'Ẩn' : 'Hiện'}">
                            <i class='bx ${cat.status === 'active' ? 'bx-hide' : 'bx-show'}'></i>
                        </button>
                    </div>
                 </td>`;
        html += `</tr>`;
    });
    
    const table = document.getElementById('categoriesTable');
    if (table) {
        table.innerHTML = html;
    }
}

// Thêm loại sách mới
function addCategory() {
    const name = prompt("Nhập tên loại sách:");
    if (!name) return;
    
    const description = prompt("Nhập mô tả:");
    if (!description) return;

    const sl = prompt("Nhập số lượng sách:");
    if(!sl) return;
    
    const newId = "LS" + String(categories.length + 1).padStart(3, '0');
    categories.push({
        id: newId,
        name: name,
        description: description,
        status: "active",
        productCount: sl
    });
    
    displayCategories();
    alert("Đã thêm loại sách mới!");
}

// Sửa loại sách
function editCategory(index) {
    const cat = categories[index];
    const newName = prompt("Nhập tên mới:", cat.name);
    if (newName && newName !== cat.name) {
        categories[index].name = newName;
    }
    
    const newDesc = prompt("Nhập mô tả mới:", cat.description);
    if (newDesc && newDesc !== cat.description) {
        categories[index].description = newDesc;
    }
    
    const newSL = prompt("Nhập số lượng sách mới:", cat.productCount);
    if (newSL && newSL !== cat.productCount) {
        categories[index].productCount = newSL;
    }
    displayCategories();
    alert("Đã cập nhật loại sách!");
}

// Ẩn/Hiện loại sách
function toggleCategoryStatus(index) {
    const cat = categories[index];
    const action = cat.status === 'active' ? 'ẩn' : 'hiện';
    
    if (confirm(`Bạn có chắc muốn ${action} loại sách "${cat.name}"?`)) {
        categories[index].status = cat.status === 'active' ? 'hidden' : 'active';
        displayCategories();
    }
}


// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('categoriesTable')) {
        displayCategories();
    }
});