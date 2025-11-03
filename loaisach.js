// ============================================
// BƯỚC 1: ĐỌC DỮ LIỆU TỪ LOCALSTORAGE
// ============================================

// JSON.parse(): Chuyển chuỗi JSON thành mảng object
// localStorage.getItem('categories'): Lấy dữ liệu đã lưu với key là 'categories'
// || [...]: Nếu localStorage trống (null), dùng dữ liệu mặc định bên dưới
let categories = JSON.parse(localStorage.getItem('categories')) || [
    // Dữ liệu mặc định chỉ chạy lần đầu tiên khi chưa có dữ liệu trong localStorage
    { id: "LS001", name: "Văn học", description: "Sách văn học trong và ngoài nước", status: "active", productCount: 15 },
    { id: "LS002", name: "Kinh tế", description: "Sách về kinh doanh và tài chính", status: "active", productCount: 8 },
    { id: "LS003", name: "Kỹ năng sống", description: "Sách phát triển bản thân", status: "active", productCount: 12 },
    { id: "LS004", name: "Thiếu nhi", description: "Sách dành cho trẻ em", status: "active", productCount: 20 },
    { id: "LS005", name: "Khoa học", description: "Sách khoa học tự nhiên và xã hội", status: "hidden", productCount: 5 },
];

// ============================================
// BƯỚC 2: HÀM LƯU DỮ LIỆU VÀO LOCALSTORAGE
// ============================================

function saveCategories() {
    // JSON.stringify(): Chuyển mảng categories thành chuỗi JSON để lưu
    // localStorage.setItem(): Lưu dữ liệu với key là 'categories'
    // ⭐ Hàm này PHẢI được gọi sau mỗi lần thêm/sửa/xóa/ẩn/hiện dữ liệu
    localStorage.setItem('categories', JSON.stringify(categories));
}

// ============================================
// BƯỚC 3: HIỂN THỊ DANH SÁCH LOẠI SÁCH
// ============================================

// Hiển thị danh sách loại sách
// filteredData: Dữ liệu đã lọc (hoặc toàn bộ nếu không lọc)
function displayCategories(filteredData = categories) {
    let html = '';
    
    // forEach(): Duyệt qua từng loại sách
    // cat: Loại sách hiện tại
    // index: Vị trí trong mảng (0, 1, 2, ...)
    filteredData.forEach((cat, index) => {
        // Tạo badge hiển thị trạng thái
        const statusBadge = cat.status === 'active' 
            ? '<span class="badge success">Hiển thị</span>'  // Màu xanh nếu active
            : '<span class="badge danger">Ẩn</span>';        // Màu đỏ nếu hidden
        
        // Tạo HTML cho mỗi dòng trong bảng
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
    
    // Đưa HTML vào bảng có id="categoriesTable"
    const table = document.getElementById('categoriesTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// BƯỚC 4: THÊM LOẠI SÁCH MỚI
// ============================================

function addCategory() {
    // Bước 1: Nhập tên loại sách
    const name = prompt("Nhập tên loại sách:");
    if (!name) return; // Nếu user nhấn Cancel hoặc để trống → thoát hàm
    
    // Bước 2: Nhập mô tả
    const description = prompt("Nhập mô tả:");
    if (!description) return;
    const c = prompt("Nhập số lượng sách:");
    if (!c) return;
    
    // Bước 3: Tạo ID tự động
    // categories.length + 1: Lấy số thứ tự tiếp theo (VD: có 5 loại → thêm loại thứ 6)
    // .padStart(3, '0'): Thêm số 0 vào trước để đủ 3 chữ số
    // VD: 6 → "006" → "LS006"
    const newId = "LS" + String(categories.length + 1).padStart(4, '0');
    
    // Bước 4: Thêm loại sách mới vào mảng
    categories.push({
        id: newId,
        name: name,
        description: description,
        status: "active",      // Mặc định là hiển thị
        productCount: c        // Chưa có sản phẩm nào
    });
    
    // ⭐⭐⭐ QUAN TRỌNG: LƯU DỮ LIỆU VÀO LOCALSTORAGE ⭐⭐⭐
    // Nếu không có dòng này, khi refresh trang → dữ liệu mất
    saveCategories();
    
    // Hiển thị lại bảng với dữ liệu mới
    displayCategories();
    alert("✅ Đã thêm loại sách mới!");
}

// ============================================
// BƯỚC 5: SỬA LOẠI SÁCH
// ============================================

function editCategory(index) {
    const cat = categories[index]; // Lấy loại sách cần sửa theo vị trí index
    
    // Sửa tên loại sách
    // prompt("Nhập tên mới:", cat.name): Hiển thị giá trị cũ trong ô nhập
    const newName = prompt("Nhập tên mới:", cat.name);
    if (newName && newName !== cat.name) { // Kiểm tra có nhập và có thay đổi không
        categories[index].name = newName; // Cập nhật tên mới
    }
    
    // Sửa mô tả
    const newDesc = prompt("Nhập mô tả mới:", cat.description);
    if (newDesc && newDesc !== cat.description) {
        categories[index].description = newDesc;
    }

    const newSL = prompt("Nhập số lượng sách mới:", cat.productCount);
    if (newSL && newSL !== cat.productCount) {
        categories[index].productCount = newSL;
    }
    
    // ⭐⭐⭐ LƯU LẠI SAU KHI SỬA ⭐⭐⭐
    saveCategories();
    
    // Hiển thị lại bảng với dữ liệu đã cập nhật
    displayCategories();
    alert("✅ Đã cập nhật loại sách!");
}

// ============================================
// BƯỚC 6: ẨN/HIỆN LOẠI SÁCH
// ============================================

function toggleCategoryStatus(index) {
    const cat = categories[index]; // Lấy loại sách theo index
    
    // Xác định hành động: ẩn hay hiện?
    const action = cat.status === 'active' ? 'ẩn' : 'hiện';
    
    // Hiển thị popup xác nhận
    if (confirm(`Bạn có chắc muốn ${action} loại sách "${cat.name}"?`)) {
        // Đổi trạng thái: active ↔ hidden
        // Nếu đang active → chuyển thành hidden
        // Nếu đang hidden → chuyển thành active
        categories[index].status = cat.status === 'active' ? 'hidden' : 'active';
        
        // ⭐⭐⭐ LƯU LẠI SAU KHI THAY ĐỔI TRẠNG THÁI ⭐⭐⭐
        saveCategories();
        
        // Hiển thị lại bảng
        displayCategories();
    }
}


// ============================================
// BƯỚC 8: KHỞI TẠO KHI TRANG LOAD
// ============================================

// DOMContentLoaded: Sự kiện kích hoạt khi HTML đã load xong
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có phần tử categoriesTable không (đang ở trang Quản lý Loại sách)
    if (document.getElementById('categoriesTable')) {
        displayCategories(); // Hiển thị dữ liệu từ localStorage
    }
});