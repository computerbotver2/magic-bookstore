// Dữ liệu phiếu nhập
let importOrders = [
    { id: "PN001", supplier: "NXB Trẻ", date: "2024-11-01", total: 5000000, status: "completed", items: 5 },
    { id: "PN002", supplier: "NXB Kim Đồng", date: "2024-11-02", total: 3500000, status: "pending", items: 3 },
    { id: "PN003", supplier: "Fahasa", date: "2024-10-28", total: 7200000, status: "completed", items: 8 },
    { id: "PN004", supplier: "NXB Văn học", date: "2024-10-25", total: 2800000, status: "cancelled", items: 2 },
];

const importStatusText = {
    pending: "Chờ nhập",
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy"
};

const importStatusClass = {
    pending: "warning",
    completed: "success",
    cancelled: "danger"
};

// Hiển thị danh sách phiếu nhập
function displayImportOrders(filteredData = importOrders) {
    let html = '';
    filteredData.forEach((order, index) => {
        html += `<tr>`;
        html += `<td><strong>${order.id}</strong></td>`;
        html += `<td>${order.supplier}</td>`;
        html += `<td>${order.date}</td>`;
        html += `<td>${order.items}</td>`;
        html += `<td><strong>${order.total.toLocaleString()}₫</strong></td>`;
        html += `<td><span class="badge ${importStatusClass[order.status]}">${importStatusText[order.status]}</span></td>`;
        html += `<td>
                    <div class="action-btns">
                        <button class="btn-icon edit" onclick="editImport(${index})" title="Sửa">
                            <i class='bx bx-edit'></i>
                        </button>
                        ${order.status === 'pending' ? `
                        <button class="btn-icon view" onclick="completeImport(${index})" title="Hoàn thành">
                            <i class='bx bx-check'></i>
                        </button>
                        <button class="btn-icon delete" onclick="cancelImport(${index})" title="Hủy">
                            <i class='bx bx-x'></i>
                        </button>
                        ` : ''}
                    </div>
                 </td>`;
        html += `</tr>`;
    });
    
    const table = document.getElementById('importOrdersTable');
    if (table) {
        table.innerHTML = html;
    }
}

// Thêm phiếu nhập mới
function addImportOrder() {
    const supplier = prompt("Nhập tên nhà cung cấp:");
    if (!supplier) return;
    
    const items = parseInt(prompt("Số lượng sản phẩm:"));
    if (!items || items <= 0) {
        alert("Số lượng không hợp lệ!");
        return;
    }
    
    const total = parseInt(prompt("Tổng tiền:"));
    if (!total || total <= 0) {
        alert("Tổng tiền không hợp lệ!");
        return;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const newId = "PN" + String(importOrders.length + 1).padStart(3, '0');
    
    importOrders.push({
        id: newId,
        supplier: supplier,
        date: today,
        total: total,
        status: "pending",
        items: items
    });
    
    displayImportOrders();
    alert("Đã tạo phiếu nhập mới!");
}

// Sửa phiếu nhập
function editImport(index) {
    const order = importOrders[index];
    
    // Sửa tên nhà cung cấp
    const newSupplier = prompt("Nhập tên nhà cung cấp mới:", order.supplier);
    if (newSupplier && newSupplier.trim() !== "") {
        importOrders[index].supplier = newSupplier.trim();
    }
    
    // Sửa số lượng sản phẩm
    const newItems = parseInt(prompt("Nhập số lượng sản phẩm mới:", order.items));
    if (newItems && newItems > 0) {
        importOrders[index].items = newItems;
    } else if (newItems !== null) {
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
    
    // Sửa ngày nhập (tùy chọn)
    const changeDate = confirm("Bạn có muốn thay đổi ngày nhập không?");
    if (changeDate) {
        const newDate = prompt("Nhập ngày mới (YYYY-MM-DD):", order.date);
        if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
            importOrders[index].date = newDate;
        } else if (newDate !== null) {
            alert("❌ Định dạng ngày không hợp lệ! (YYYY-MM-DD)");
            return;
        }
    }
    
    displayImportOrders();
    alert("✅ Đã cập nhật phiếu nhập!");
}

// Hoàn thành phiếu nhập
function completeImport(index) {
    if (confirm("✅ Xác nhận hoàn thành phiếu nhập này?")) {
        importOrders[index].status = "completed";
        displayImportOrders();
        alert("✅ Đã hoàn thành phiếu nhập!");
    }
}

// Hủy phiếu nhập
function cancelImport(index) {
    if (confirm("❌ Bạn có chắc muốn hủy phiếu nhập này?")) {
        importOrders[index].status = "cancelled";
        displayImportOrders();
        alert("❌ Đã hủy phiếu nhập!");
    }
}

// Tìm kiếm phiếu nhập
function filterImportOrders() {
    const dateInput = document.getElementById('importDate').value;
    const statusInput = document.getElementById('importStatus').value;
    
    let filtered = importOrders;
    
    if (dateInput) {
        filtered = filtered.filter(o => o.date === dateInput);
    }
    
    if (statusInput) {
        filtered = filtered.filter(o => o.status === statusInput);
    }
    
    displayImportOrders(filtered);
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('importOrdersTable')) {
        displayImportOrders();
    }
});