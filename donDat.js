// ============================================
// ĐỌC DỮ LIỆU TỪ USERS
// ============================================
function loadOrdersFromUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let allOrders = [];
    
    users.forEach(user => {
        if (user.orders && user.orders.length > 0) {
            user.orders.forEach(order => {
                // ✅ KHÔNG HIỂN THỊ ĐƠN BỊ HỦY BỞI USER
                if (order.status === 'cancelled' && order.cancelledBy === 'user') {
                    return; // Skip đơn này
                }
                
                allOrders.push({
                    id: order.id,
                    customerId: user.id,
                    customerUsername: user.username,
                    customer: user.name || user.username,
                    date: order.date,
                    total: order.total,
                    status: order.status || 'pending',
                    items: order.items,
                    shippingAddress: order.shippingAddress,
                    paymentMethod: order.paymentMethod,
                    cancelledBy: order.cancelledBy,
                    cancelledAt: order.cancelledAt
                });
            });
        }
    });
    
    return allOrders;
}

let orders = loadOrdersFromUsers();

// ============================================
// LƯU TRẠNG THÁI VÀO USERS
// ============================================
function saveOrderStatus(orderId, newStatus, cancelledBy = null) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    users.forEach(user => {
        if (user.orders) {
            user.orders.forEach(order => {
                if (order.id === orderId) {
                    order.status = newStatus;
                    if (cancelledBy) {
                        order.cancelledBy = cancelledBy;
                        order.cancelledAt = new Date().toISOString();
                    }
                }
            });
        }
    });
    
    localStorage.setItem('users', JSON.stringify(users));
}

// ============================================
// ✅ MAPPING TRẠNG THÁI ĐÚNG
// ============================================
const statusText = {
    pending: "🟡 Mới đặt",
    processing: "🔵 Đã xử lý",
    shipped: "🚚 Đã giao",
    completed: "✅ Hoàn thành",
    cancelled: "❌ Đã hủy"
};

const statusClass = {
    pending: "warning",
    processing: "info",
    shipped: "primary",
    completed: "success",
    cancelled: "danger"
};

// ============================================
// HIỂN THỊ DANH SÁCH ĐƠN HÀNG - CHỈ 1 NÚT CHI TIẾT
// ============================================
function displayOrders(filteredOrders = orders) {
    let html = '';
    
    if (filteredOrders.length === 0) {
        html = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#999;">Chưa có đơn hàng nào</td></tr>';
    } else {
        filteredOrders.forEach((order, index) => {
            const statusDisplay = statusText[order.status] || order.status;
            
            html += `<tr>`;
            html += `<td><strong>${order.id}</strong></td>`;
            html += `<td>${order.customer}</td>`;
            html += `<td>${new Date(order.date).toLocaleString('vi-VN')}</td>`;
            html += `<td><strong>${order.total.toLocaleString()}₫</strong></td>`;
            html += `<td><span class="badge ${statusClass[order.status]}">${statusDisplay}</span></td>`;
            html += `<td>
                        <div class="action-btns">
            <button class="btn-icon view" onclick="openOrderDetailModal('${order.id}')" title="Xem chi tiết & Thao tác">
                <i class='bx bx-show'></i>    <!-- ✅ ĐÚNG: icon mắt -->
            </button>
                        </div>
                     </td>`;
            html += `</tr>`;
        });
    }
    
    const table = document.getElementById('ordersTable');
    if (table) {
        table.innerHTML = html;
    }
}
// ============================================
// XỬ LÝ ĐƠN HÀNG (ADMIN)
// ============================================
function processOrder(orderId) {
    if (confirm('✅ Xác nhận XỬ LÝ đơn hàng này?')) {
        saveOrderStatus(orderId, 'processing');
        orders = loadOrdersFromUsers();
        displayOrders();
        alert('✅ Đã chuyển đơn sang trạng thái "Đã xử lý"');
    }
}

function shipOrder(orderId) {
    if (!confirm('📦 Xác nhận đã GIAO HÀNG cho đơn này?')) return;

    // 1️⃣ Tìm đơn hàng theo mã
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.items || order.items.length === 0) return;

    // 2️⃣ Cập nhật tồn kho và ghi log xuất
    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const adminProducts = JSON.parse(localStorage.getItem('bookstore_products') || '[]');

    // Sách mặc định cho fallback (danh mục, không cần sửa nếu đã có đủ loại)
    const defaultBooks = [
        {id:1, title:"Tôi thấy hoa vàng trên cỏ xanh", category:"Văn học"},
        {id:2, title:"Đắc nhân tâm", category:"Tâm lý"},
        {id:3, title:"Nhà giả kim", category:"Văn học"},
        {id:4, title:"Cho tôi xin một vé đi tuổi thơ", category:"Thiếu nhi"},
        {id:5, title:"Dế mèn phiêu lưu ký", category:"Thiếu nhi"},
        {id:6, title:"Tuổi thơ dữ dội", category:"Văn học"},
        {id:7, title:"Số đỏ", category:"Văn học"},
        {id:8, title:"Nỗi buồn chiến tranh", category:"Văn học"},
        {id:9, title:"Tư duy nhanh và chậm", category:"Tâm lý"},
        {id:10, title:"Tuổi trẻ đáng giá bao nhiêu", category:"Tản văn"},
        {id:11, title:"Khởi nghiệp 4.0", category:"Kinh tế"},
        {id:12, title:"Hãy sống ở thể chủ động", category:"Tâm lý"},
        {id:13, title:"Làm đĩ", category:"Văn học"},
        {id:14, title:"Tôi tài giỏi, bạn cũng thế!", category:"Học tập"},
        {id:15, title:"Kể chuyện trước giờ đi ngủ", category:"Thiếu nhi"},
        {id:16, title:"Bộ não và tâm trí", category:"Tâm lý"},
        {id:17, title:"Bạn đắt giá bao nhiêu?", category:"Tản văn"},
        {id:18, title:"Một đời như kẻ tìm đường", category:"Tiểu sử"},
        {id:19, title:"3 người thầy vĩ đại", category:"Tâm lý"},
        {id:20, title:"Những tù nhân của địa lý", category:"Học tập"},
        {id:21, title:"Tinh hoa trí tuệ do thái", category:"Kinh doanh"},
        {id:22, title:"Nghĩ giàu và làm giàu", category:"Kinh doanh"},
        {id:23, title:"Hiểu về trái tim", category:"Tâm lý"},
        {id:24, title:"Đừng bao giờ đi ăn một mình", category:"Tâm lý"},
        {id:25, title:"Đọc vị bất kì ai", category:"Tâm lý"},
        {id:26, title:"Ra bờ suối ngắm hoa kèn hồng", category:"Văn học"},
        {id:27, title:"Con chim xanh biếc quay về", category:"Tản văn"}
    ];

    // Duyệt từng sản phẩm trong đơn
    order.items.forEach(item => {
        const bookId = item.id;
        const productCode = "SP" + String(bookId).padStart(3, '0');
        const bookName = item.title;
        const quantity = item.quantity;

        // 1️⃣ Lấy loại sách từ adminProducts nếu có, nếu không thì lấy theo defaultBooks
        let category = "Chưa rõ";
        const adminProduct = adminProducts.find(p => p.id === productCode);
        if (adminProduct) {
            category = adminProduct.category;
        } else {
            const defaultBook = defaultBooks.find(b => b.id === bookId);
            if (defaultBook) category = defaultBook.category;
        }

        // 2️⃣ Trừ tồn kho
        stockData[bookId] = (stockData[bookId] || 0) - quantity;

        // 3️⃣ Ghi log xuất kho vào inventory
        inventory.push({
            id: productCode,
            name: bookName,
            category: category,
            date: new Date().toISOString().split('T')[0],
            type: "Xuất",
            quantity: quantity
        });

        console.log(`📤 Xuất kho: ${bookName} -${quantity} (${category}) -> Tồn sau: ${stockData[bookId]}`);
    });

    // 4️⃣ Lưu dữ liệu
    localStorage.setItem('bookstore_stock', JSON.stringify(stockData));
    localStorage.setItem('inventory', JSON.stringify(inventory));

    // 5️⃣ Đổi trạng thái đơn hàng thành "Đã giao"
    saveOrderStatus(orderId, 'shipped');

    // 6️⃣ Refresh hiển thị đơn trên giao diện admin
    orders = loadOrdersFromUsers();
    displayOrders();

    // 7️⃣ Thông báo hành động đã hoàn tất
    alert('✅ Đã chuyển đơn sang trạng thái "Đã giao"\n📦 Đã cập nhật tồn kho!\n\n👉 User sẽ thấy nút "Đã nhận hàng"');
}
function cancelOrderByAdmin(orderId) {
    if (confirm('❌ Bạn có chắc muốn HỦY đơn hàng này?\n\n⚠️ User sẽ nhận được thông báo!')) {
        saveOrderStatus(orderId, 'cancelled', 'admin');
        orders = loadOrdersFromUsers();
        displayOrders();
        alert('✅ Đã hủy đơn hàng!\n\n👉 User sẽ thấy thông báo "Admin đã hủy đơn hàng"');
    }
}

// ============================================
// MỞ POPUP CHI TIẾT ĐƠN HÀNG
// ============================================
function openOrderDetailModal(orderId) {
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert("❌ Không tìm thấy đơn hàng!");
        return;
    }
    
    // Tạo HTML cho danh sách sản phẩm
    let itemsHtml = '';
    if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
            itemsHtml += `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                    <span>${item.title}</span>
                    <span style="color: #666;">x${item.quantity} - ${item.price.toLocaleString()}₫</span>
                </div>
            `;
        });
    }
    
    // Địa chỉ giao hàng
    let addressHtml = 'Chưa cập nhật';
    if (order.shippingAddress) {
        addressHtml = `
            <strong>${order.shippingAddress.name}</strong><br>
            📞 ${order.shippingAddress.phone}<br>
            📍 ${order.shippingAddress.address}
        `;
    }
    
    // Thông tin hủy đơn (nếu có)
    let cancelInfo = '';
    if (order.status === 'cancelled') {
        cancelInfo = `
            <div style="background: #fee2e2; padding: 12px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ef4444;">
                <strong style="color: #dc2626;">❌ Đơn hàng đã bị hủy</strong><br>
                <span style="font-size: 13px; color: #991b1b;">
                    Bởi: ${order.cancelledBy === 'admin' ? 'Admin' : 'Khách hàng'}<br>
                    Thời gian: ${new Date(order.cancelledAt).toLocaleString('vi-VN')}
                </span>
            </div>
        `;
    }
    
    // Các nút hành động theo trạng thái
    let actionButtons = '';
    
    switch(order.status) {
        case 'pending':
            actionButtons = `
                <button class="btn btn-primary" onclick="processOrderFromModal('${order.id}')" style="flex: 1;">
                    <i class='bx bx-check-circle'></i> Xác nhận xử lý
                </button>
                <button class="btn btn-danger" onclick="cancelOrderFromModal('${order.id}')" style="flex: 1;">
                    <i class='bx bx-x-circle'></i> Hủy đơn
                </button>
            `;
            break;
            
        case 'processing':
            actionButtons = `
                <button class="btn btn-primary" onclick="shipOrderFromModal('${order.id}')" style="flex: 1;">
                    <i class='bx bx-package'></i> Đã giao hàng
                </button>
                <button class="btn btn-danger" onclick="cancelOrderFromModal('${order.id}')" style="flex: 1;">
                    <i class='bx bx-x-circle'></i> Hủy đơn
                </button>
            `;
            break;
            
        case 'shipped':
        case 'completed':
        case 'cancelled':
            actionButtons = `
                <div style="text-align: center; padding: 15px; color: #999; font-size: 14px;">
                    🔒 Không thể thao tác với đơn hàng này
                </div>
            `;
            break;
    }
    
    // Tạo nội dung modal
    const modalContent = `
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
            <div>
                <h2 style="margin: 0; color: #1e293b; font-size: 24px;">📦 Chi tiết đơn hàng</h2>
                <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Mã đơn: <strong>${order.id}</strong></p>
            </div>
            <span class="badge ${statusClass[order.status]}" style="font-size: 14px; padding: 8px 16px;">
                ${statusText[order.status]}
            </span>
        </div>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 10px;">
                <div>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">👤 Khách hàng</p>
                    <p style="margin: 5px 0 0 0; font-weight: 600; color: #1e293b;">${order.customer}</p>
                </div>
                <div>
                    <p style="margin: 0; color: #64748b; font-size: 13px;">📅 Ngày đặt</p>
                    <p style="margin: 5px 0 0 0; font-weight: 600; color: #1e293b;">${new Date(order.date).toLocaleString('vi-VN')}</p>
                </div>
            </div>
            <div>
                <p style="margin: 0; color: #64748b; font-size: 13px;">📍 Địa chỉ giao hàng</p>
                <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 1.6; color: #475569;">${addressHtml}</p>
            </div>
            <div style="margin-top: 10px;">
                <p style="margin: 0; color: #64748b; font-size: 13px;">💳 Thanh toán</p>
                <p style="margin: 5px 0 0 0; font-weight: 600; color: #1e293b;">${order.paymentMethod || 'Chưa rõ'}</p>
            </div>
        </div>
        
        <div style="margin-bottom: 15px;">
            <p style="margin: 0 0 10px 0; font-weight: 600; color: #1e293b; font-size: 15px;">📋 Sản phẩm</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px;">
                ${itemsHtml}
                <div style="display: flex; justify-content: space-between; padding: 12px 0 0 0; margin-top: 10px; border-top: 2px solid #e2e8f0;">
                    <strong style="color: #1e293b;">Tổng cộng:</strong>
                    <strong style="color: #2563eb; font-size: 18px;">${order.total.toLocaleString()}₫</strong>
                </div>
            </div>
        </div>
        
        ${cancelInfo}
        
        <div style="display: flex; gap: 10px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            ${actionButtons}
        </div>
    `;
    
    // Hiển thị modal
    showModal('orderDetailModal', modalContent);
}

// ============================================
// XỬ LÝ TỪ MODAL
// ============================================
function processOrderFromModal(orderId) {
    if (confirm('✅ Xác nhận XỬ LÝ đơn hàng này?')) {
        saveOrderStatus(orderId, 'processing');
        orders = loadOrdersFromUsers();
        closeModal('orderDetailModal');
        displayOrders();
        alert('✅ Đã chuyển đơn sang trạng thái "Đã xử lý"');
    }
}

function shipOrderFromModal(orderId) {
    closeModal('orderDetailModal');
    shipOrder(orderId); // Sử dụng hàm shipOrder() có sẵn
}

function cancelOrderFromModal(orderId) {
    if (confirm('❌ Bạn có chắc muốn HỦY đơn hàng này?\n\n⚠️ User sẽ nhận được thông báo!')) {
        saveOrderStatus(orderId, 'cancelled', 'admin');
        orders = loadOrdersFromUsers();
        closeModal('orderDetailModal');
        displayOrders();
        alert('✅ Đã hủy đơn hàng!\n\n👉 User sẽ thấy thông báo "Admin đã hủy đơn hàng"');
    }
}

// ============================================
// HÀM HIỂN THỊ/ĐÓNG MODAL CHUNG
// ============================================
function showModal(modalId, content) {
    // Tạo modal nếu chưa có
    let modal = document.getElementById(modalId);
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeModal('${modalId}')"></div>
            <div class="modal-panel">
                <button class="modal-close-btn" onclick="closeModal('${modalId}')" title="Đóng">
                    <i class='bx bx-x'></i>
                </button>
                <div class="modal-content-wrapper"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Cập nhật nội dung
    modal.querySelector('.modal-content-wrapper').innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ============================================
// LỌC ĐƠN HÀNG
// ============================================
function filterOrders() {
    const fromDate = document.getElementById('orderDateFrom').value;
    const toDate = document.getElementById('orderDateTo').value;
    const statusInput = document.getElementById('orderStatus').value;
    
    orders = loadOrdersFromUsers();
    
    let filtered = orders;
    
    if (fromDate && toDate) {
        filtered = filtered.filter(o => {
            const orderDate = new Date(o.date).toISOString().split('T')[0];
            return orderDate >= fromDate && orderDate <= toDate;
        });
    }
    
    if (statusInput) {
        filtered = filtered.filter(o => o.status === statusInput);
    }
    
    displayOrders(filtered);
}

// ============================================
// KHỞI TẠO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('ordersTable')) {
        orders = loadOrdersFromUsers();
        displayOrders();
        
        const today = new Date().toISOString().split('T')[0];
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        const fromDateInput = document.getElementById('orderDateFrom');
        const toDateInput = document.getElementById('orderDateTo');
        if (fromDateInput && toDateInput) {
            fromDateInput.value = lastWeek.toISOString().split('T')[0];
            toDateInput.value = today;
        }
    }
});