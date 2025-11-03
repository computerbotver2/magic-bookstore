// ============================================
// BƯỚC 1: ĐỌC DỮ LIỆU TỪ LOCALSTORAGE
// ============================================

// JSON.parse(): Chuyển chuỗi JSON thành mảng object
// localStorage.getItem('orders'): Lấy dữ liệu đã lưu với key là 'orders'
// || [...]: Nếu localStorage trống (null), dùng dữ liệu mặc định bên dưới
let orders = JSON.parse(localStorage.getItem('orders')) || [
    // Dữ liệu mặc định chỉ chạy lần đầu tiên khi chưa có dữ liệu trong localStorage
    { id: "DH001", customer: "Nguyễn Văn An", date: "2024-01-15", total: 256000, status: "completed" },
    { id: "DH002", customer: "Trần Thị Bình", date: "2024-01-16", total: 180000, status: "shipping" },
    { id: "DH003", customer: "Lê Văn Cường", date: "2024-01-16", total: 450000, status: "confirmed" },
    { id: "DH004", customer: "Phạm Thị Dung", date: "2024-01-17", total: 120000, status: "pending" },
    { id: "DH005", customer: "Hoàng Văn Em", date: "2024-01-17", total: 890000, status: "cancelled" },
];

// ============================================
// BƯỚC 2: OBJECT MAPPING CHO TRẠNG THÁI
// ============================================

// Object này chứa text hiển thị cho từng trạng thái đơn hàng
const statusText = {
    pending: "Chờ xử lý",      // Đơn mới tạo, chưa xử lý
    confirmed: "Đã xác nhận",  // Đã xác nhận đơn hàng
    shipping: "Đang giao",     // Đang trên đường giao hàng
    completed: "Hoàn thành",   // Đã giao thành công
    cancelled: "Đã hủy"        // Đơn bị hủy
};

// Object này chứa class CSS cho từng trạng thái (để tô màu badge)
const statusClass = {
    pending: "warning",     // Màu vàng/cam (cảnh báo)
    confirmed: "info",      // Màu xanh dương (thông tin)
    shipping: "primary",    // Màu xanh đậm (chính)
    completed: "success",   // Màu xanh lá (thành công)
    cancelled: "danger"     // Màu đỏ (nguy hiểm/hủy)
};

// ============================================
// BƯỚC 3: HÀM LƯU DỮ LIỆU VÀO LOCALSTORAGE
// ============================================

function saveOrders() {
    // JSON.stringify(): Chuyển mảng orders thành chuỗi JSON để lưu
    // localStorage.setItem(): Lưu dữ liệu với key là 'orders'
    // ⭐ Hàm này PHẢI được gọi sau mỗi lần thay đổi trạng thái đơn hàng
    localStorage.setItem('orders', JSON.stringify(orders));
}

// ============================================
// BƯỚC 4: HIỂN THỊ DANH SÁCH ĐỚN HÀNG
// ============================================

// filteredOrders: Dữ liệu đã lọc (hoặc toàn bộ nếu không lọc)
function displayOrders(filteredOrders = orders) {
    let html = '';
    
    // forEach(): Duyệt qua từng đơn hàng
    // order: Đơn hàng hiện tại
    // index: Vị trí trong mảng (0, 1, 2, ...)
    filteredOrders.forEach((order, index) => {
        html += `<tr>`;
        html += `<td><strong>${order.id}</strong></td>`;
        html += `<td>${order.customer}</td>`;
        html += `<td>${order.date}</td>`;
        
        // .toLocaleString(): Format số thành dạng có dấu phẩy
        // VD: 256000 → "256,000"
        html += `<td><strong>${order.total.toLocaleString()}₫</strong></td>`;
        
        // Hiển thị badge trạng thái với màu sắc tương ứng
        // statusClass[order.status]: Lấy class CSS theo trạng thái (VD: "warning", "success")
        // statusText[order.status]: Lấy text hiển thị theo trạng thái (VD: "Chờ xử lý", "Hoàn thành")
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
    
    // Đưa HTML vào bảng có id="ordersTable"
    const table = document.getElementById('ordersTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// BƯỚC 5: LỌC ĐƠN HÀNG
// ============================================

function filterOrders() {
    // Lấy giá trị từ các ô input
    const dateInput = document.getElementById('orderDate').value;
    const statusInput = document.getElementById('orderStatus').value;
    
    // Bắt đầu với toàn bộ dữ liệu
    let filtered = orders;
    
    // Lọc theo ngày (nếu có nhập)
    if (dateInput) {
        // .filter(): Tạo mảng mới chỉ chứa các đơn hàng có ngày trùng với dateInput
        // o: Từng đơn hàng trong mảng
        // o.date === dateInput: So sánh ngày đơn hàng với ngày đã chọn
        filtered = filtered.filter(o => o.date === dateInput);
    }
    
    // Lọc theo trạng thái (nếu có chọn)
    if (statusInput) {
        // Lọc tiếp trên kết quả đã lọc theo ngày (nếu có)
        filtered = filtered.filter(o => o.status === statusInput);
    }
    
    // Hiển thị kết quả đã lọc
    // Không cần saveOrders() vì không sửa dữ liệu, chỉ hiển thị
    displayOrders(filtered);
}

// ============================================
// BƯỚC 6: XEM CHI TIẾT ĐƠN HÀNG
// ============================================

function viewOrderDetail(orderId) {
    // Tìm đơn hàng theo ID
    // .find(): Tìm phần tử đầu tiên thỏa điều kiện
    // o: Từng đơn hàng trong mảng
    // o.id === orderId: So sánh ID
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        // Hiển thị thông tin đơn hàng
        // Template literal với ${}: Chèn giá trị biến vào chuỗi
        alert(`📦 Chi tiết đơn hàng\n\n` +
              `Mã đơn: ${order.id}\n` +
              `Khách hàng: ${order.customer}\n` +
              `Ngày đặt: ${order.date}\n` +
              `Tổng tiền: ${order.total.toLocaleString()}₫\n` +
              `Trạng thái: ${statusText[order.status]}\n\n` +
              `(Chức năng chi tiết đầy đủ đang phát triển)`);
    } else {
        alert("❌ Không tìm thấy đơn hàng!");
    }
}

// ============================================
// BƯỚC 7: CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
// ============================================

function updateOrderStatus(index) {
    const order = orders[index]; // Lấy đơn hàng cần cập nhật
    
    // Hiển thị menu chọn trạng thái mới
    // \n: Xuống dòng
    const newStatus = prompt(
        `🔄 Cập nhật trạng thái đơn ${order.id}:\n\n` +
        `Trạng thái hiện tại: ${statusText[order.status]}\n\n` +
        `Chọn trạng thái mới:\n` +
        `1️⃣ - Chờ xử lý\n` +
        `2️⃣ - Đã xác nhận\n` +
        `3️⃣ - Đang giao\n` +
        `4️⃣ - Hoàn thành\n` +
        `5️⃣ - Đã hủy\n\n` +
        `Nhập số (1-5):`
    );
    
    // Object ánh xạ từ số nhập vào sang mã trạng thái
    // Key: Số user nhập (dạng chuỗi "1", "2"...)
    // Value: Mã trạng thái tương ứng ("pending", "confirmed"...)
    const statusMap = {
        "1": "pending",     // 1 → Chờ xử lý
        "2": "confirmed",   // 2 → Đã xác nhận
        "3": "shipping",    // 3 → Đang giao
        "4": "completed",   // 4 → Hoàn thành
        "5": "cancelled"    // 5 → Đã hủy
    };
    
    // Kiểm tra xem user có nhập đúng số 1-5 không
    // statusMap[newStatus]: Lấy giá trị theo key
    // VD: statusMap["1"] → "pending"
    if (statusMap[newStatus]) {
        // Cập nhật trạng thái mới cho đơn hàng
        orders[index].status = statusMap[newStatus];
        
        // ⭐⭐⭐ LƯU LẠI SAU KHI THAY ĐỔI TRẠNG THÁI ⭐⭐⭐
        saveOrders();
        
        // Hiển thị lại bảng với trạng thái mới
        displayOrders();
        
        // Thông báo thành công
        alert(`✅ Đã cập nhật trạng thái thành: ${statusText[statusMap[newStatus]]}`);
    } else if (newStatus !== null) {
        // newStatus !== null: User không nhấn Cancel
        // Nghĩa là user nhập số không hợp lệ (không phải 1-5)
        alert("❌ Lựa chọn không hợp lệ! Vui lòng nhập số từ 1-5.");
    }
    // Nếu newStatus === null (user nhấn Cancel) → Không làm gì cả
}

// ============================================
// BƯỚC 8: KHỞI TẠO KHI TRANG LOAD
// ============================================

// DOMContentLoaded: Sự kiện kích hoạt khi HTML đã load xong
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có phần tử ordersTable không (đang ở trang Quản lý Đơn hàng)
    if (document.getElementById('ordersTable')) {
        displayOrders(); // Hiển thị dữ liệu từ localStorage
        
        // Set ngày hiện tại cho ô input ngày
        // new Date(): Tạo object ngày giờ hiện tại
        // .toISOString(): Chuyển thành chuỗi dạng "2024-01-17T01:47:58.123Z"
        // .split('T')[0]: Cắt lấy phần trước chữ T → "2024-01-17"
        const today = new Date().toISOString().split('T')[0];
        
        const dateInput = document.getElementById('orderDate');
        if (dateInput) {
            dateInput.value = today; // Đặt giá trị mặc định là ngày hôm nay
        }
    }
});