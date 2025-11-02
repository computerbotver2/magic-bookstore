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

// Open management page
function openPage(pageId) {
    // Hide all pages first
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Hide menu
    document.body.classList.add('page-active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Back to menu
function backToMenu() {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show menu
    document.body.classList.remove('page-active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}