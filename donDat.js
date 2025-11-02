// Dữ liệu đơn hàng
let orders = [
    { id: "DH001", customer: "Nguyễn Văn An", date: "2024-01-15", total: 256000, status: "completed" },
    { id: "DH002", customer: "Trần Thị Bình", date: "2024-01-16", total: 180000, status: "shipping" },
    { id: "DH003", customer: "Lê Văn Cường", date: "2024-01-16", total: 450000, status: "confirmed" },
    { id: "DH004", customer: "Phạm Thị Dung", date: "2024-01-17", total: 120000, status: "pending" },
    { id: "DH005", customer: "Hoàng Văn Em", date: "2024-01-17", total: 890000, status: "cancelled" },
];

const statusText = {
    pending: "Chờ xử lý",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    completed: "Hoàn thành",
    cancelled: "Đã hủy"
};

const statusClass = {
    pending: "warning",
    confirmed: "info",
    shipping: "primary",
    completed: "success",
    cancelled: "danger"
};

// Hiển thị đơn hàng
function displayOrders(filteredOrders = orders) {
    let html = '';
    filteredOrders.forEach((order, index) => {
        html += `<tr>`;
        html += `<td><strong>${order.id}</strong></td>`;
        html += `<td>${order.customer}</td>`;
        html += `<td>${order.date}</td>`;
        html += `<td><strong>${order.total.toLocaleString()}₫</strong></td>`;
        html += `<td><span class="badge ${statusClass[order.status]}">${statusText[order.status]}</span></td>`;
        html += `<td>
                    <div class="action-btns">
                        <button class="btn-icon view" onclick="viewOrderDetail('${order.id}')" title="Xem chi tiết">
                            <i class='bx bx-show'></i>
                        </button>
                        <button class="btn-icon edit" onclick="updateOrderStatus(${index})" title="Cập nhật trạng thái">
                            <i class='bx bx-edit'></i>
                        </button>
                    </div>
                 </td>`;
        html += `</tr>`;
    });
    
    const table = document.getElementById('ordersTable');
    if (table) {
        table.innerHTML = html;
    }
}

// Lọc đơn hàng
function filterOrders() {
    const dateInput = document.getElementById('orderDate').value;
    const statusInput = document.getElementById('orderStatus').value;
    
    let filtered = orders;
    
    if (dateInput) {
        filtered = filtered.filter(o => o.date === dateInput);
    }
    
    if (statusInput) {
        filtered = filtered.filter(o => o.status === statusInput);
    }
    
    displayOrders(filtered);
}

// Xem chi tiết đơn
function viewOrderDetail(orderId) {
    alert(`Xem chi tiết đơn hàng ${orderId}\n\n(Chức năng đang phát triển)`);
}

// Cập nhật trạng thái
function updateOrderStatus(index) {
    const order = orders[index];
    const newStatus = prompt(
        `Cập nhật trạng thái đơn ${order.id}:\n\n` +
        `1 - Chờ xử lý\n` +
        `2 - Đã xác nhận\n` +
        `3 - Đang giao\n` +
        `4 - Hoàn thành\n` +
        `5 - Đã hủy\n\n` +
        `Nhập số (1-5):`
    );
    
    const statusMap = {
        "1": "pending",
        "2": "confirmed",
        "3": "shipping",
        "4": "completed",
        "5": "cancelled"
    };
    
    if (statusMap[newStatus]) {
        orders[index].status = statusMap[newStatus];
        displayOrders();
        alert(`Đã cập nhật trạng thái thành: ${statusText[statusMap[newStatus]]}`);
    }
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('ordersTable')) {
        displayOrders();
        // Set ngày hiện tại
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('orderDate');
        if (dateInput) {
            dateInput.value = today;
        }
    }
});