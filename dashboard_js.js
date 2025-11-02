// ===== XỬ LÝ TOGGLE SIDEBAR =====
const btn = document.getElementById('btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
//id.classList.contain('')/add('')/remove('')
// Hàm mở sidebar
function openSidebar() {
    sidebar.classList.add('open');     // thêm class 'open' → CSS điều khiển hiển thị, animation
    overlay.classList.add('active');   // bật overlay
}
// Hàm đóng sidebar
function closeSidebar() {
    sidebar.classList.remove('open');  // xóa class 'open'
    overlay.classList.remove('active');// tắt overlay
}
// Gắn sự kiện click nên k có ()
btn.onclick = openSidebar;
overlay.onclick = closeSidebar; // bấm màn tối → luôn đóng

// ===== XỬ LÝ CHUYỂN GIỮA CÁC TRANG =====
// Lấy tất cả nút menu (link trong thanh điều hướng)
const navLinks = document.querySelectorAll('.nav-link');

// Lấy tất cả phần nội dung trang
const pageContents = document.querySelectorAll('.page-content');

// Duyệt qua từng nút menu
navLinks.forEach(link => {

    // Gắn sự kiện khi click vào từng nút
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn việc load lại trang khi click vào thẻ <a>, nhưng do thẻ a mình có href="#" nên là ngăn nó bị giật thôi

        // --- Bước 1: Cập nhật lại trạng thái "đang chọn" ---
        // Xóa trạng thái "active" khỏi tất cả các nút
        navLinks.forEach(item => item.classList.remove('active'));

        // Đánh dấu nút hiện tại là "active", this là link
        this.classList.add('active');

        // --- Bước 2: Ẩn/hiện nội dung tương ứng ---
        // Ẩn tất cả nội dung trước
        pageContents.forEach(page => page.classList.remove('active'));

        // Lấy id của trang cần hiển thị (từ thuộc tính data-page)
        const pageId = this.getAttribute('data-page');

        // Tìm phần tử có id đó và hiển thị nó
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add('active');
    });
});

// ===== KIỂM TRA ĐĂNG NHẬP =====
addEventListener('load', function() {   //localStorage: Một nơi trình duyệt tự tạo ra để lưu tạm dữ liệu
    const isLoggedIn = localStorage.getItem('adminLoggedIn');   //getItem(...): là đọc dữ liệu đã lưu trong trình duyệt.
    if (isLoggedIn !== 'true') {
        // Nếu chưa đăng nhập, chuyển về trang login
        alert('Bạn cần đăng nhập trước!');
        location.href = 'login.html';
    }
});

// ===== HÀM ĐĂNG XUẤT =====
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {  //ok là true, cancel là false
        // Xóa thông tin đăng nhập
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminInfo');
        location.href = 'login.html'; 
    }
}

