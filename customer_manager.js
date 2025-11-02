let customers = [
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

function hienthiCustomer() {
    let html = '';
    for(let i = 0;i<customers.length;i++){
        let c = customers[i];
        let badge = '';
        if(c.status==='active'){
            badge = '<span class = "badge active">Hoạt động</span>';
        }else{
            badge = '<span class = "badge locked">Bị khóa</span>';
        }
        let icon = '';
        if(c.status==='active'){
            icon = 'bx-lock';
        }else{
            icon = 'bx-lock-open-alt';
        }
        html+='<tr>';
        html+='<td>'+c.id+'</td>';
        html += '<td>' + c.name + '</td>';
        html += '<td>' + c.email + '</td>';
        html += '<td>' + c.phone + '</td>';
        html+='<td>'+c.password+'</td>';
        html+='<td>'+c.date+'</td>';
        html+='<td>'+badge+'</td>';
        html+='<td>';
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
    document.getElementById('customerTable').innerHTML = html; //là để đưa cái function này vô chỗ có id customersTable
}

function resetMatKhau(i){
    let c = customers[i];
    let newPass = prompt("Nhap mat khau moi cho "+c.name+": ");
    if(newPass!==null&&newPass!==""){
        customers[i].password = newPass;
        hienthiCustomer();
    }else{
        alert("Bạn chưa nhập mật khẩu mới!");
    }
}

function khoaTaiKhoan(i){
    let c = customers[i];
    if(c.status === "active"){
        let hoi = confirm("Khóa tài khoản "+c.name+"?");
        if(hoi){
            customers[i].status ="locked";
            hienthiCustomer();
        }
    }else {
        let hoi = confirm("Mở khóa tài khoản "+c.name+"?");
        if(hoi){
            customers[i].status = "active";
            hienthiCustomer();
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có phần tử customerTable không (tức đang ở trang Quản lý Khách hàng)
    if (document.getElementById('customerTable')) {
        hienthiCustomer();
    }
});