let customers = [];

// ==================== MIGRATION TỰ ĐỘNG ====================
function migrateOldUsers() {
    const saved = localStorage.getItem('users'); 
    if (!saved) return;
    
    let users = JSON.parse(saved);
    let hasChanged = false;
    
    users = users.map((user, index) => {
        let updated = { ...user };
        
        if (!updated.id) {
            let maxNum = 0;
            users.forEach(u => {
                if (u.id && u.id.startsWith('KH')) {
                    const num = parseInt(u.id.substring(2));  //từ chuỗi sang số int
                    if (num > maxNum) maxNum = num;
                }
            });
            updated.id = 'KH' + String(maxNum + index + 1).padStart(3, '0');
            hasChanged = true;
        }
        
        if (!updated.name) {
            updated.name = updated.username || 'User';
            hasChanged = true;
        }
        
        if (!updated.date) {
            updated.date = new Date().toLocaleDateString('vi-VN');
            hasChanged = true;
        }
        
        if (!updated.status) {
            updated.status = 'active';
            hasChanged = true;
        }
        
        if (!updated.orders) {
            updated.orders = [];
            hasChanged = true;
        }
        
        if (!updated.cart) {
            updated.cart = [];
            hasChanged = true;
        }
        
        if (!updated.address) {
            updated.address = '';
            hasChanged = true;
        }
        
        return updated;
    });
    
    if (hasChanged) {
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ [Admin] Đã cập nhật ' + users.length + ' tài khoản');
    }
}

// Đọc từ localStorage
function loadCustomersFromLocalStorage() {
    migrateOldUsers();
    
    const saved = localStorage.getItem('users');
    if (saved) {
        customers = JSON.parse(saved);
    } else {
        customers = [];
    }
}

// Lưu vào localStorage
function saveCustomersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(customers));
}

function hienthiCustomer() {
    const tbody = document.getElementById('customerTable');
    
    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:20px; color:#999;">Chưa có khách hàng nào đăng ký</td></tr>';
        return;
    }
    
    let html = '';
    for(let i = 0; i < customers.length; i++){
        let c = customers[i];
        let badge = '';
        if(c.status === 'active'){
            badge = '<span class="badge active">Hoạt động</span>';
        } else {
            badge = '<span class="badge locked">Bị khóa</span>';
        }
        let icon = '';
        if(c.status === 'active'){
            icon = 'bx-lock';
        } else {
            icon = 'bx-lock-open-alt';
        }
        
        // Format ngày giờ
        let formattedDate = 'Chưa rõ';
        if (c.date) {
            try {
                const d = new Date(c.date);
                if (isNaN(d.getTime())) {
                    formattedDate = c.date;
                } else {
                    formattedDate = d.toLocaleString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
            } catch(e) {
                formattedDate = c.date;
            }
        }
        
        // Icon reset mật khẩu
        let resetIcon = 'bx-refresh';
        let resetTitle = 'Yêu cầu đổi mật khẩu';
        if (c.requirePasswordChange) {
            resetIcon = 'bx-time';
            resetTitle = '⏳ Đang chờ user đổi mật khẩu';
        }
        
        html += '<tr>';
        html += '<td>' + (c.id || 'N/A') + '</td>';
        html += '<td>' + (c.name || c.username) + '</td>';
        html += '<td>' + (c.email || 'Chưa cập nhật') + '</td>';
        html += '<td>' + (c.phone || 'Chưa cập nhật') + '</td>';
        html += '<td>' + c.password + '</td>';
        html += '<td>' + formattedDate + '</td>';
        html += '<td>' + badge + '</td>';
        html += '<td>';
        html += '  <div class="action-btns">';
        html += '    <button class="btn-icon edit" title="' + resetTitle + '" onclick="resetMatKhau(' + i + ')">';
        html += '      <i class="bx ' + resetIcon + '"></i>';
        html += '    </button>';
        html += '    <button class="btn-icon delete" title="Khóa/Mở khóa" onclick="khoaTaiKhoan(' + i + ')">';
        html += '      <i class="bx ' + icon + '"></i>';
        html += '    </button>';
        html += '  </div>';
        html += '</td>';
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

// ==================== YÊU CẦU ĐỔI MẬT KHẨU ====================
function resetMatKhau(i){
    let c = customers[i];
    let hoi = confirm("Yêu cầu " + (c.name || c.username) + " đổi mật khẩu khi đăng nhập lần sau?");
    
    if(hoi){
        customers[i].requirePasswordChange = true;
        saveCustomersToLocalStorage(); //lưu vào localstorage những gì đã chỉnh sửa
        hienthiCustomer();             //có thể thay bằng refresh để câp nhật giao diện
        alert("✅ Đã gửi yêu cầu đổi mật khẩu!");
    }
}

// ==================== KHÓA/MỞ TÀI KHOẢN ====================
function khoaTaiKhoan(i){
    let c = customers[i];
    if(c.status === "active"){
        let hoi = confirm("Khóa tài khoản " + (c.name || c.username) + "?");
        if(hoi){
            customers[i].status = "locked";
            saveCustomersToLocalStorage();
            hienthiCustomer();
            alert("✅ Đã khóa tài khoản!");
        }
    } else {
        let hoi = confirm("Mở khóa tài khoản " + (c.name || c.username) + "?");
        if(hoi){
            customers[i].status = "active";
            saveCustomersToLocalStorage();
            hienthiCustomer();
            alert("✅ Đã mở khóa tài khoản!");
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('customerTable')) {
        loadCustomersFromLocalStorage();
        hienthiCustomer();
    }
});
/* ================================================= */
/* ========== XEM ĐƠN HÀNG CỦA KHÁCH HÀNG ========= *///chua test voi daui nha, tại nó bắt phải thêm nút này kia
/* ================================================= */

function viewCustomerOrders(index) {
    const customer = customers[index];
    
    if (!customer.orders || customer.orders.length === 0) {
        alert(`❌ ${customer.name || customer.username} chưa có đơn hàng nào!`);
        return;
    }
    
    let orderText = `📦 ĐƠN HÀNG CỦA ${customer.name || customer.username}\n\n`;
    orderText += `Tổng: ${customer.orders.length} đơn hàng\n\n`;
    
    customer.orders.forEach((order, i) => {
        orderText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        orderText += `Đơn ${i + 1}: ${order.id}\n`;
        orderText += `Ngày: ${order.date}\n`;
        orderText += `Tổng tiền: ${order.total.toLocaleString()}₫\n`;
        orderText += `Trạng thái: ${order.status}\n`;
        orderText += `Sản phẩm:\n`;
        
        order.items.forEach(item => {
            orderText += `  • ${item.title} x${item.quantity}\n`;
        });
        
        orderText += `\n`;
    });
    
    alert(orderText);
}