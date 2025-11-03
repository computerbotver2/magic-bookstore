// Dữ liệu khách hàng mặc định
const defaultCustomers = [
    {
        id: "KH001",
        name: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        phone: "0901234567",
        password: "an123",
        date: "15/03/2024",
        status: "active"
    },
    {
        id: "KH002",
        name: "Trần Thị Bình",
        email: "tranbinh@gmail.com",
        phone: "0912345678",
        password: "binh123",
        date: "20/03/2024",
        status: "active"
    },
    {
        id: "KH003",
        name: "Lê Văn Cường",
        email: "levcuong@gmail.com",
        phone: "0923456789",
        password: "cuong123",
        date: "25/03/2024",
        status: "locked"
    },
];

// Biến lưu trữ khách hàng
let customers = [];

// Lưu vào localStorage
function saveCustomersToLocalStorage() {
    localStorage.setItem('bookstore_customers', JSON.stringify(customers));
}

// Load từ localStorage
function loadCustomersFromLocalStorage() {
    const saved = localStorage.getItem('bookstore_customers');
    if (saved) {
        customers = JSON.parse(saved);
    } else {
        // Lần đầu tiên, dùng dữ liệu mặc định và lưu vào localStorage
        customers = [...defaultCustomers];
        saveCustomersToLocalStorage();
    }
}

function hienthiCustomer() {
    let html = '';
    for(let i = 0; i < customers.length; i++){
        let c = customers[i];
        let badge = '';
        if(c.status === 'active'){
            badge = '<span class = "badge active">Hoạt động</span>';
        } else {
            badge = '<span class = "badge locked">Bị khóa</span>';
        }
        let icon = '';
        if(c.status === 'active'){
            icon = 'bx-lock';
        } else {
            icon = 'bx-lock-open-alt';
        }
        html += '<tr>';
        html += '<td>' + c.id + '</td>';
        html += '<td>' + c.name + '</td>';
        html += '<td>' + c.email + '</td>';
        html += '<td>' + c.phone + '</td>';
        html += '<td>' + c.password + '</td>';
        html += '<td>' + c.date + '</td>';
        html += '<td>' + badge + '</td>';
        html += '<td>';
        html += '  <div class="action-btns">';
        html += '    <button class="btn-icon edit" title="Reset mật khẩu" onclick="resetMatKhau(' + i + ')">';
        html += '      <i class="bx bx-refresh"></i>';
        html += '    </button>';
        html += '    <button class="btn-icon delete" title="Khóa/Mở khóa" onclick="khoaTaiKhoan(' + i + ')">';
        html += '      <i class="bx ' + icon + '"></i>';
        html += '    </button>';
        html += '  </div>';
        html += '</td>';
        html += '</tr>';
    }
    document.getElementById('customerTable').innerHTML = html;
}

function resetMatKhau(i){
    let c = customers[i];
    let newPass = prompt("Nhập mật khẩu mới cho " + c.name + ": ");
    if(newPass !== null && newPass !== ""){
        customers[i].password = newPass;
        saveCustomersToLocalStorage(); // Lưu vào localStorage
        hienthiCustomer();
        alert("Đã reset mật khẩu thành công!");
    } else {
        alert("Bạn chưa nhập mật khẩu mới!");
    }
}

function khoaTaiKhoan(i){
    let c = customers[i];
    if(c.status === "active"){
        let hoi = confirm("Khóa tài khoản " + c.name + "?");
        if(hoi){
            customers[i].status = "locked";
            saveCustomersToLocalStorage(); // Lưu vào localStorage
            hienthiCustomer();
        }
    } else {
        let hoi = confirm("Mở khóa tài khoản " + c.name + "?");
        if(hoi){
            customers[i].status = "active";
            saveCustomersToLocalStorage(); // Lưu vào localStorage
            hienthiCustomer();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có phần tử customerTable không (tức đang ở trang Quản lý Khách hàng)
    if (document.getElementById('customerTable')) {
        loadCustomersFromLocalStorage(); // Load dữ liệu từ localStorage
        hienthiCustomer();
    }
});