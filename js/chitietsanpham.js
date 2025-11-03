// js/chitietsanpham.js

// Hàm này chạy ngay khi trang được tải
window.onload = function() {
    loadProductDetails();
};

function loadProductDetails() {
    // LẤY DỮ LIỆU TỪ LOCALSTORAGE
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

    // Lấy ID sản phẩm từ URL (ví dụ: ?id=sp001)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        document.getElementById('product-main').innerHTML = "<h1>Không tìm thấy sản phẩm</h1>";
        return;
    }

    // Tìm sản phẩm trong danh sách 'allProducts'
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        document.getElementById('product-main').innerHTML = "<h1>Sản phẩm không tồn tại</h1>";
        return;
    }

    // Cập nhật các phần tử HTML với thông tin sản phẩm
    const productMain = document.getElementById('product-main');
    productMain.querySelector('.img-main img').src = product.img;
    productMain.querySelector('.img-main img').alt = product.name;
    productMain.querySelector('#product-information H1').textContent = product.name;
    productMain.querySelector('#product-information .author').textContent = product.author;
    productMain.querySelector('#product-information .price').textContent = `${product.price.toLocaleString('vi-VN')}đ`;

    // Đặt data-product-id để hàm addToCart biết cần thêm gì
    productMain.setAttribute('data-product-id', product.id);
}


// Hàm này giữ nguyên
function saveToCart(newItem){
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    var exitsProduct = cart.findIndex(item => item.id === newItem.id);
    if(exitsProduct <= -1 ){
        cart.push(newItem);
    }else {
        // Chuyển đổi quantity sang số nguyên trước khi cộng
        cart[exitsProduct].quantity = parseInt(cart[exitsProduct].quantity) + parseInt(newItem.quantity);
    }

    localStorage.setItem('cart',JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!'); // Thêm thông báo
}

// Hàm này giữ nguyên
function addToCart(){
    var productId = document.getElementById("product-main").getAttribute("data-product-id");
    var productQuantity = parseInt(document.getElementById("quantity").value);

    const newItem = {
            id: productId,
            quantity: productQuantity
        };
    
    saveToCart(newItem);
}