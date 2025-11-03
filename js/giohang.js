// js/giohang.js

// Hàm cập nhật số lượng
function updateQuantity(index, value, isAbsolute = false) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        let newQuantity;
        if (isAbsolute) {
            newQuantity = parseInt(value);
        } else {
            newQuantity = parseInt(cart[index].quantity) + parseInt(value);
        }

        if (newQuantity < 1) {
            newQuantity = 1;
        }
        cart[index].quantity = newQuantity;

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Hàm xóa sản phẩm
function removeCart(indexCart) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
        cart.splice(indexCart, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Hàm hiển thị giỏ hàng
function displayCart() {
    const cartLayout = document.querySelector('.cart-layout');
    
    // LẤY DỮ LIỆU SẢN PHẨM TỪ LOCALSTORAGE
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    
    // LẤY GIỎ HÀNG TỪ LOCALSTORAGE
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartLayout.innerHTML = `
            <p>Giỏ hàng của bạn đang trống.</p>
            <a href="./sanpham.html" class="btn-continue-shopping">
                <i class="fa-solid fa-arrow-left"></i>
                Tiếp tục mua sắm
            </a>
        `;
        return;
    }

    var itemCartHtml = "";
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        let item = cart[i];
        
        // Dùng 'allProducts' từ localStorage để tìm thông tin
        let product = allProducts.find(p => p.id === item.id);

        if (product) {
            let itemTotal = product.price * item.quantity;
            total += itemTotal;

            itemCartHtml += `
                <tr>
                    <td class="cart-item-product">
                        <img src="${product.img}" alt="${product.name}">
                        <div class="info">
                            <p class="name">${product.name}</p>
                            <p class="author">${product.author}</p>
                        </div>
                    </td>
                    <td class="cart-item-price">${product.price.toLocaleString('vi-VN')}đ</td>
                    <td class="cart-item-quantity">
                        <div class="input-quantity">
                            <button class="btn-quantity btn1" onclick="updateQuantity(${i}, -1)">-</button>
                            <input type="number" name="quantity" value="${item.quantity}" onchange="updateQuantity(${i}, this.value, true)">
                            <button class="btn-quantity btn2" onclick="updateQuantity(${i}, 1)">+</button>
                        </div>
                    </td>
                    <td class="cart-item-total">${itemTotal.toLocaleString('vi-VN')}đ</td>
                    <td class="cart-item-remove">
                        <i class="fa-solid fa-trash-can" onclick="removeCart(${i})"></i>
                    </td>
                </tr>
            `;
        }
    }
    
    cartLayout.innerHTML = `
        <div class="cart-items-list">
            <table>
                <tr>
                    <th class="col-product">Sản phẩm</th>
                    <th class="col-price">Đơn giá</th>
                    <th class="col-quantity">Số lượng</th>
                    <th class="col-total">Thành tiền</th>
                    <th class="col-remove">Xóa</th>
                </tr>
                ${itemCartHtml}
            </table>
        </div>                
        <div class="cart-summary">
            <h2>Tổng cộng giỏ hàng</h2>
            <div class="summary-row">
                <span>Tạm tính</span>
                <span>${total.toLocaleString('vi-VN')}đ</span>
            </div>
            <div class="summary-row">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
            </div>
            <div class="summary-row total">
                <span>Tổng cộng</span>
                <span>${total.toLocaleString('vi-VN')}đ</span>
            </div>
            <button class="btn-checkout">Tiến hành thanh toán</button>
            <a href="./sanpham.html" class="btn-continue-shopping">
                <i class="fa-solid fa-arrow-left"></i>
                Tiếp tục mua sắm
            </a>
        </div>
    `;
}

// Chạy hàm displayCart() ngay khi tải trang
displayCart();