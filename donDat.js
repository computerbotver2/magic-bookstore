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
// HIỂN THỊ DANH SÁCH ĐƠN HÀNG
// ============================================
function displayOrders(filteredOrders = orders) {
    let html = '';
    
    if (filteredOrders.length === 0) {
        html = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#999;">Chưa có đơn hàng nào</td></tr>';
    } else {
        filteredOrders.forEach((order, index) => {
            let actionButtons = '';
            
            // ✅ LOGIC NÚT THAO TÁC THEO TRẠNG THÁI
            switch(order.status) {
                case 'pending':
                    actionButtons = `
                        <button class="btn-icon edit" onclick="processOrder('${order.id}')" title="Xác nhận xử lý">
                            <i class='bx bx-check-circle'></i>
                        </button>
                        <button class="btn-icon delete" onclick="cancelOrderByAdmin('${order.id}')" title="Hủy đơn">
                            <i class='bx bx-x-circle'></i>
                        </button>
                    `;
                    break;
                    
                case 'processing':
                    actionButtons = `
                        <button class="btn-icon edit" onclick="shipOrder('${order.id}')" title="Đã giao hàng">
                            <i class='bx bx-package'></i>
                        </button>
                        <button class="btn-icon delete" onclick="cancelOrderByAdmin('${order.id}')" title="Hủy đơn">
                            <i class='bx bx-x-circle'></i>
                        </button>
                    `;
                    break;
                    
                case 'shipped':
                case 'completed':
                case 'cancelled':
                    actionButtons = '<span style="color:#999; font-size:13px;">Không thể thao tác</span>';
                    break;
            }
            
            // ✅ ĐẢM BẢO LUÔN CÓ TEXT HIỂN THỊ
            const statusDisplay = statusText[order.status] || order.status;
            
            html += `<tr>`;
            html += `<td><strong>${order.id}</strong></td>`;
            html += `<td>${order.customer}</td>`;
            html += `<td>${new Date(order.date).toLocaleString('vi-VN')}</td>`;
            html += `<td><strong>${order.total.toLocaleString()}₫</strong></td>`;
            html += `<td><span class="badge ${statusClass[order.status]}">${statusDisplay}</span></td>`;
            html += `<td>
                        <div class="action-btns">
                            <button class="btn-icon view" onclick="viewOrderDetail('${order.id}')" title="Xem chi tiết">
                                <i class='bx bx-show'></i>
                            </button>
                            ${actionButtons}
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
    if (confirm('📦 Xác nhận đã GIAO HÀNG?')) {
        // 1️⃣ TÌM ĐƠN HÀNG
        const order = orders.find(o => o.id === orderId);
        
        if (order && order.items && order.items.length > 0) {
            // 2️⃣ CẬP NHẬT TỒN KHO VÀ GHI LOG XUẤT
            const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
            const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
            
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
            
            order.items.forEach(item => {
                const bookId = item.id;
                const quantity = item.quantity;
                const bookName = item.title;
                
                // ✅ TRỪ TỒN KHO
                stockData[bookId] = (stockData[bookId] || 0) - quantity;
                
                // ✅ TÌM CATEGORY
                const defaultBook = defaultBooks.find(b => b.id === bookId);
                const category = defaultBook ? defaultBook.category : 'Chưa rõ';
                
                // ✅ GHI LOG XUẤT VÀO INVENTORY
                const productCode = "SP" + String(bookId).padStart(3, '0');
                inventory.push({
                    id: productCode,
                    name: bookName,
                    category: category,
                    date: new Date().toISOString().split('T')[0],
                    type: "Xuất",
                    quantity: quantity
                });
                
                console.log(`📤 Xuất kho: ${bookName} -${quantity} → Tồn: ${stockData[bookId]}`);
            });
            
            // 3️⃣ LƯU DỮ LIỆU
            localStorage.setItem('bookstore_stock', JSON.stringify(stockData));
            localStorage.setItem('inventory', JSON.stringify(inventory));
        }
        
        // 4️⃣ CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
        saveOrderStatus(orderId, 'shipped');
        orders = loadOrdersFromUsers();
        displayOrders();
        alert('✅ Đã chuyển đơn sang trạng thái "Đã giao"\n📦 Đã cập nhật tồn kho!\n\n👉 User sẽ thấy nút "Đã nhận hàng"');
    }
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
// XEM CHI TIẾT ĐƠN HÀNG
// ============================================
function viewOrderDetail(orderId) {
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        let itemsText = '';
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                itemsText += `\n• ${item.title} x${item.quantity} - ${item.price.toLocaleString()}₫`;
            });
        }
        
        let addressText = 'Chưa cập nhật';
        if (order.shippingAddress) {
            addressText = `${order.shippingAddress.name}\n${order.shippingAddress.phone}\n${order.shippingAddress.address}`;
        }
        
        let cancelInfo = '';
        if (order.status === 'cancelled') {
            cancelInfo = `\n\n❌ Đã hủy bởi: ${order.cancelledBy === 'admin' ? 'Admin' : 'Khách hàng'}\nThời gian: ${new Date(order.cancelledAt).toLocaleString('vi-VN')}`;
        }
        
        alert(`📦 Chi tiết đơn hàng\n\n` +
              `Mã đơn: ${order.id}\n` +
              `Khách hàng: ${order.customer}\n` +
              `Ngày đặt: ${new Date(order.date).toLocaleString('vi-VN')}\n` +
              `Tổng tiền: ${order.total.toLocaleString()}₫\n` +
              `Trạng thái: ${statusText[order.status]}\n\n` +
              `📍 Địa chỉ giao hàng:\n${addressText}\n\n` +
              `💳 Thanh toán: ${order.paymentMethod || 'Chưa rõ'}\n\n` +
              `📋 Sản phẩm:${itemsText}` +
              cancelInfo
        );
    } else {
        alert("❌ Không tìm thấy đơn hàng!");
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