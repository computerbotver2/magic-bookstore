// ============================================
// BƯỚC 1: ĐỌC DỮ LIỆU TỪ LOCALSTORAGE
// ============================================

// JSON.parse(): Chuyển chuỗi JSON thành mảng object
// localStorage.getItem('importOrders'): Lấy dữ liệu đã lưu với key là 'importOrders'
// || [...]: Nếu localStorage trống (null), dùng dữ liệu mặc định bên dưới
let importOrders = JSON.parse(localStorage.getItem('importOrders')) || [
    // Dữ liệu mặc định chỉ chạy lần đầu tiên khi chưa có dữ liệu trong localStorage
    { id: "PN001", supplier: "NXB Trẻ", date: "2024-11-01", total: 5000000, status: "completed", items: 5 },
    { id: "PN002", supplier: "NXB Kim Đồng", date: "2024-11-02", total: 3500000, status: "pending", items: 3 },
    { id: "PN003", supplier: "Fahasa", date: "2024-10-28", total: 7200000, status: "completed", items: 8 },
    { id: "PN004", supplier: "NXB Văn học", date: "2024-10-25", total: 2800000, status: "cancelled", items: 2 },
];

// ============================================
// BƯỚC 2: OBJECT MAPPING CHO TRẠNG THÁI
// ============================================

// Object này chứa text hiển thị cho từng trạng thái
const importStatusText = {
    pending: "Chờ nhập",       // Phiếu mới tạo, chưa nhập hàng
    completed: "Đã hoàn thành", // Đã nhập hàng xong
    cancelled: "Đã hủy"        // Phiếu bị hủy
};

// Object này chứa class CSS cho từng trạng thái (để tô màu badge)
const importStatusClass = {
    pending: "warning",    // Màu vàng/cam (cảnh báo)
    completed: "success",  // Màu xanh lá (thành công)
    cancelled: "danger"    // Màu đỏ (nguy hiểm/hủy)
};

// ============================================
// BƯỚC 3: HÀM LƯU DỮ LIỆU VÀO LOCALSTORAGE
// ============================================

function saveImportOrders() {
    // JSON.stringify(): Chuyển mảng importOrders thành chuỗi JSON để lưu
    // localStorage.setItem(): Lưu dữ liệu với key là 'importOrders'
    // ⭐ Hàm này PHẢI được gọi sau mỗi lần thêm/sửa/xóa/thay đổi trạng thái
    localStorage.setItem('importOrders', JSON.stringify(importOrders));
}

// ============================================
// BƯỚC 4: HIỂN THỊ DANH SÁCH PHIẾU NHẬP
// ============================================

// filteredData: Dữ liệu đã lọc (hoặc toàn bộ nếu không lọc)
function displayImportOrders(filteredData = importOrders) {
    let html = '';
    
    // forEach(): Duyệt qua từng phiếu nhập
    // order: Phiếu nhập hiện tại
    // index: Vị trí trong mảng (0, 1, 2, ...)
    filteredData.forEach((order, index) => {
        html += `<tr>`;
        html += `<td><strong>${order.id}</strong></td>`;
        html += `<td>${order.supplier}</td>`;
        html += `<td>${order.date}</td>`;
        html += `<td>${order.items}</td>`;
        
        // .toLocaleString(): Format số thành dạng có dấu phẩy
        // VD: 5000000 → "5,000,000"
        html += `<td><strong>${order.total.toLocaleString()}₫</strong></td>`;
        
        // Hiển thị badge trạng thái với màu sắc tương ứng
        html += `<td><span class="badge ${importStatusClass[order.status]}">${importStatusText[order.status]}</span></td>`;
        
        html += `<td>
                    <div class="action-btns">
                        <button class="btn-icon edit" onclick="editImport(${index})" title="Sửa">
                            <i class='bx bx-edit'></i>
                        </button>`;
        
        // Chỉ hiển thị nút Hoàn thành và Hủy nếu phiếu đang ở trạng thái "pending"
        // Ternary operator: condition ? true_value : false_value
        if (order.status === 'pending') {
            html += `
                        <button class="btn-icon view" onclick="completeImport(${index})" title="Hoàn thành">
                            <i class='bx bx-check'></i>
                        </button>
                        <button class="btn-icon delete" onclick="cancelImport(${index})" title="Hủy">
                            <i class='bx bx-x'></i>
                        </button>`;
        }
        
        html += `
                    </div>
                 </td>`;
        html += `</tr>`;
    });
    
    // Đưa HTML vào bảng có id="importOrdersTable"
    const table = document.getElementById('importOrdersTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// BƯỚC 5: THÊM PHIẾU NHẬP MỚI
// ============================================

function addImportOrder() {
    // Bước 1: Nhập tên nhà cung cấp
    const supplier = prompt("Nhập tên nhà cung cấp:");
    if (!supplier) return; // Nếu không nhập → Thoát hàm
    
    // Bước 2: Nhập số lượng sản phẩm
    const items = parseInt(prompt("Số lượng sản phẩm:"));
    // parseInt(): Chuyển chuỗi thành số nguyên
    // VD: "5" → 5, "abc" → NaN
    if (!items || items <= 0) {
        alert("❌ Số lượng không hợp lệ!");
        return;
    }
    
    // Bước 3: Nhập tổng tiền
    const total = parseInt(prompt("Tổng tiền:"));
    if (!total || total <= 0) {
        alert("❌ Tổng tiền không hợp lệ!");
        return;
    }
    
    // Bước 4: Lấy ngày hiện tại
    // new Date(): Tạo object ngày giờ hiện tại
    // .toISOString(): Chuyển thành chuỗi dạng "2024-11-03T01:47:58.123Z"
    // .split('T')[0]: Cắt lấy phần trước chữ T → "2024-11-03"
    const today = new Date().toISOString().split('T')[0];
    
    // Bước 5: Tạo ID tự động
    // importOrders.length + 1: Lấy số thứ tự tiếp theo
    // String(...).padStart(3, '0'): Thêm số 0 vào đầu cho đủ 3 chữ số
    // VD: 5 → "005" → "PN005"
    const newId = "PN" + String(importOrders.length + 1).padStart(3, '0');
    
    // Bước 6: Thêm phiếu nhập mới vào mảng
    importOrders.push({
        id: newId,
        supplier: supplier,
        date: today,           // Ngày hiện tại
        total: total,
        status: "pending",     // Mặc định là "Chờ nhập"
        items: items
    });
    
    // ⭐⭐⭐ QUAN TRỌNG: LƯU DỮ LIỆU VÀO LOCALSTORAGE ⭐⭐⭐
    // Nếu không có dòng này, khi refresh trang → dữ liệu mất
    saveImportOrders();
    
    // Hiển thị lại bảng với dữ liệu mới
    displayImportOrders();
    alert("✅ Đã tạo phiếu nhập mới!");
}

// ============================================
// BƯỚC 6: SỬA PHIẾU NHẬP
// ============================================

function editImport(index) {
    const order = importOrders[index]; // Lấy phiếu nhập cần sửa
    
    // Sửa tên nhà cung cấp
    const newSupplier = prompt("Nhập tên nhà cung cấp mới:", order.supplier);
    if (newSupplier && newSupplier.trim() !== "") {
        // .trim(): Xóa khoảng trắng đầu cuối
        // VD: "  ABC  " → "ABC"
        importOrders[index].supplier = newSupplier.trim();
    }
    
    // Sửa số lượng sản phẩm
    const newItems = parseInt(prompt("Nhập số lượng sản phẩm mới:", order.items));
    if (newItems && newItems > 0) {
        importOrders[index].items = newItems;
    } else if (newItems !== null) {
        // newItems !== null: User không nhấn Cancel
        // Nghĩa là user nhập số không hợp lệ (≤ 0 hoặc NaN)
        alert("❌ Số lượng không hợp lệ!");
        return;
    }
    
    // Sửa tổng tiền
    const newTotal = parseInt(prompt("Nhập tổng tiền mới:", order.total));
    if (newTotal && newTotal > 0) {
        importOrders[index].total = newTotal;
    } else if (newTotal !== null) {
        alert("❌ Tổng tiền không hợp lệ!");
        return;
    }
    
    // Hỏi có muốn đổi ngày nhập không
    const changeDate = confirm("Bạn có muốn thay đổi ngày nhập không?");
    if (changeDate) {
        const newDate = prompt("Nhập ngày mới (YYYY-MM-DD):", order.date);
        
        // Kiểm tra định dạng ngày bằng Regular Expression (Regex)
        // /^\d{4}-\d{2}-\d{2}$/: 
        // ^ : Bắt đầu chuỗi
        // \d{4} : 4 chữ số (năm)
        // - : Dấu gạch ngang
        // \d{2} : 2 chữ số (tháng)
        // - : Dấu gạch ngang
        // \d{2} : 2 chữ số (ngày)
        // $ : Kết thúc chuỗi
        if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
            importOrders[index].date = newDate;
        } else if (newDate !== null) {
            alert("❌ Định dạng ngày không hợp lệ! (YYYY-MM-DD)");
            return;
        }
    }
    
    // ⭐⭐⭐ LƯU LẠI SAU KHI SỬA ⭐⭐⭐
    saveImportOrders();
    
    displayImportOrders();
    alert("✅ Đã cập nhật phiếu nhập!");
}

// ============================================
// BƯỚC 7: HOÀN THÀNH PHIẾU NHẬP
// ============================================

function completeImport(index) {
    // confirm(): Hiển thị popup có nút OK và Cancel
    // Trả về true nếu user nhấn OK, false nếu nhấn Cancel
    if (confirm("✅ Xác nhận hoàn thành phiếu nhập này?")) {
        // Đổi trạng thái thành "completed"
        importOrders[index].status = "completed";
        
        // ⭐⭐⭐ LƯU LẠI SAU KHI THAY ĐỔI TRẠNG THÁI ⭐⭐⭐
        saveImportOrders();
        
        displayImportOrders();
        alert("✅ Đã hoàn thành phiếu nhập!");
    }
}

// ============================================
// BƯỚC 8: HỦY PHIẾU NHẬP
// ============================================

function cancelImport(index) {
    if (confirm("❌ Bạn có chắc muốn hủy phiếu nhập này?")) {
        // Đổi trạng thái thành "cancelled"
        importOrders[index].status = "cancelled";
        
        // ⭐⭐⭐ LƯU LẠI SAU KHI THAY ĐỔI TRẠNG THÁI ⭐⭐⭐
        saveImportOrders();
        
        displayImportOrders();
        alert("❌ Đã hủy phiếu nhập!");
    }
}

// ============================================
// BƯỚC 9: TÌM KIẾM/LỌC PHIẾU NHẬP
// ============================================

function filterImportOrders() {
    // Lấy giá trị từ các ô input
    const dateInput = document.getElementById('importDate').value;
    const statusInput = document.getElementById('importStatus').value;
    
    // Bắt đầu với toàn bộ dữ liệu
    let filtered = importOrders;
    
    // Lọc theo ngày (nếu có nhập)
    if (dateInput) {
        // .filter(): Tạo mảng mới chỉ chứa phần tử thỏa điều kiện
        // o: Từng phiếu nhập trong mảng
        // o.date === dateInput: So sánh ngày
        filtered = filtered.filter(o => o.date === dateInput);
    }
    
    // Lọc theo trạng thái (nếu có chọn)
    if (statusInput) {
        filtered = filtered.filter(o => o.status === statusInput);
    }
    
    // Hiển thị kết quả đã lọc (không cần saveImportOrders vì không sửa dữ liệu)
    displayImportOrders(filtered);
}

// ============================================
// BƯỚC 10: KHỞI TẠO KHI TRANG LOAD
// ============================================

// DOMContentLoaded: Sự kiện kích hoạt khi HTML đã load xong
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có phần tử importOrdersTable không (đang ở trang Quản lý Nhập hàng)
    if (document.getElementById('importOrdersTable')) {
        displayImportOrders(); // Hiển thị dữ liệu từ localStorage
    }
});