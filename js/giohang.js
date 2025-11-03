/* ==== TRẠNG THÁI (STATE) ==== */
let cart = []; 
let currentUser = null; 

/* ==== DOM REFS ==== */
const cartItemsList = document.getElementById('cartItemsList');
const cartSummary = document.getElementById('cartSummary');
const summarySubtotal = document.getElementById('summarySubtotal');
const summaryTotal = document.getElementById('summaryTotal');

// DOM Refs (CẬP NHẬT) cho Form Giao Hàng
const radioUseSaved = document.getElementById('radio-use-saved');
const radioUseNew = document.getElementById('radio-use-new');
const savedAddressBox = document.getElementById('saved-address-box');
const newAddressForm = document.getElementById('new-address-form');

// DOM Refs (MỚI) cho các trường trong Box/Form
const savedName = document.getElementById('saved-name');
const savedPhone = document.getElementById('saved-phone');
const savedAddress = document.getElementById('saved-address');
const infoName = document.getElementById('info-name');
const infoPhone = document.getElementById('info-phone');
const infoAddress = document.getElementById('info-address');

// DOM Refs cho Nút Đặt Hàng
const btnPlaceOrder = document.getElementById('btn-place-order');

// DOM Refs cho Modal "Xem Lại"
const orderSuccessModal = document.getElementById('order-success-modal');
const closeSuccessModal = document.getElementById('close-success-modal');
const orderIdSpan = document.getElementById('order-id');
const orderNameSpan = document.getElementById('order-name');
const orderPhoneSpan = document.getElementById('order-phone');
const orderAddressSpan = document.getElementById('order-address');
const orderDetailsSummary = document.getElementById('order-details-summary');
const orderTotalSpan = document.getElementById('order-total');


/* ==== HÀM (FUNCTIONS) ==== */

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Tải giỏ hàng VÀ thông tin user (CẬP NHẬT)
 */
function loadCart() {
  const loggedInUserJSON = sessionStorage.getItem('currentUser');
  
  if (!loggedInUserJSON) {
    cart = [];
    currentUser = null;
    return;
  }
  
  const loggedInUser = JSON.parse(loggedInUserJSON);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUserFromDB = users.find(u => u.username === loggedInUser.username);
  
  if (currentUserFromDB) {
    currentUser = currentUserFromDB; 
    cart = currentUserFromDB.cart || []; 
    
    // *** CẬP NHẬT MỚI: Logic chọn địa chỉ ***
    
    // 1. Kiểm tra xem user có địa chỉ đã lưu không (và sđt, tên)
    const hasSavedAddress = currentUser.address && currentUser.address.trim() !== '';
    const hasSavedInfo = currentUser.phone && currentUser.phone.trim() !== '';

    if (hasSavedAddress && hasSavedInfo) {
      // 2. NẾU CÓ: Hiển thị box "Đã lưu"
      savedName.textContent = currentUser.username;
      savedPhone.textContent = currentUser.phone;
      savedAddress.textContent = currentUser.address;
      
      radioUseSaved.checked = true;
      radioUseSaved.disabled = false;
      savedAddressBox.classList.remove('hidden');
      newAddressForm.classList.add('hidden');
      
    } else {
      // 3. NẾU KHÔNG CÓ: Buộc dùng "Địa chỉ mới"
      radioUseSaved.checked = false;
      radioUseSaved.disabled = true; // Vô hiệu hóa nút "Đã lưu"
      radioUseNew.checked = true;
      
      savedAddressBox.classList.add('hidden');
      newAddressForm.classList.remove('hidden');

      // Tải trước thông tin (nếu có) vào form mới
      infoName.value = currentUser.username || '';
      infoPhone.value = currentUser.phone || '';
      infoAddress.value = currentUser.address || ''; // Sẽ là rỗng
    }
    
  } else {
    cart = [];
    currentUser = null;
  }
}

/**
 * Lưu giỏ hàng VÀ user vào storage (Giữ nguyên)
 */
function saveCartAndUser() {
  if (!currentUser) return; 

  currentUser.cart = cart;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  let userIndex = users.findIndex(u => u.username === currentUser.username);
  
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
}

/**
 * Cập nhật số lượng (Giữ nguyên)
 */
function updateQuantity(id, newQuantity) {
  const item = cart.find(i => i.id === id);
  if (item) {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      item.quantity = newQuantity;
      saveCartAndUser(); 
      renderCart(); 
    }
  }
}

/**
 * Xóa sản phẩm (Giữ nguyên)
 */
function removeItem(id) {
  if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
    cart = cart.filter(i => i.id !== id);
    saveCartAndUser(); 
    renderCart(); 
  }
}

/**
 * Cập nhật tóm tắt (Giữ nguyên)
 */
function updateSummary() {
  if (cart.length === 0 || !currentUser) {
    cartSummary.style.display = 'none'; 
    return;
  }
  cartSummary.style.display = 'block'; 
  
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  summarySubtotal.textContent = numberWithCommas(subtotal) + 'đ';
  summaryTotal.textContent = numberWithCommas(subtotal) + 'đ';
}

/**
 * Hiển thị giỏ hàng (Giữ nguyên)
 */
function renderCart() {
  cartItemsList.innerHTML = '';

  if (!currentUser) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <p>Bạn cần <a href="dangki.html" style="color:var(--primary); font-weight:bold;">đăng nhập</a> để xem giỏ hàng.</p>
      </div>
    `;
    updateSummary();
    return;
  }
  
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty">
        <p>Giỏ hàng của bạn đang trống.</p>
        <a href="./sanpham.html" class="btn-primary">Tiếp tục mua sắm</a>
      </div>
    `;
    updateSummary();
    return;
  }
  
  cart.forEach(item => {
    const itemTotalPrice = item.price * item.quantity;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="item-info">
        <div class="item-title">${item.title}</div>
        <div class="item-price">${numberWithCommas(item.price)}đ</div>
      </div>
      <div class="item-quantity">
        <button class="qty-btn" data-id="${item.id}" data-change="-1">‒</button>
        <input type="number" value="${item.quantity}" min="1" readonly>
        <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
      </div>
      <div class="item-total-price">${numberWithCommas(itemTotalPrice)}đ</div>
      <button class="item-remove" data-id="${item.id}">✕</button>
    `;
    cartItemsList.appendChild(itemDiv);
  });
  
  updateSummary();
}

/**
 * Xử lý click trong giỏ hàng (Giữ nguyên)
 */
function handleCartClick(event) {
  const target = event.target;
  if (target.classList.contains('qty-btn')) {
    const id = parseInt(target.dataset.id);
    const change = parseInt(target.dataset.change);
    const item = cart.find(i => i.id === id);
    if (item) updateQuantity(id, item.quantity + change);
  }
  if (target.classList.contains('item-remove')) {
    const id = parseInt(target.dataset.id);
    removeItem(id);
  }
}

/**
 * ==== HÀM MỚI: Xử lý đặt hàng (CẬP NHẬT) ====
 */
function placeOrder() {
  if (!currentUser) {
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    window.location.href = 'dangki.html';
    return;
  }
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống, không thể đặt hàng.");
    return;
  }
  
  let shippingInfo = {};
  
  // *** CẬP NHẬT: Lấy thông tin giao hàng dựa trên lựa chọn ***
  if (radioUseSaved.checked) {
    // 1. Lấy từ địa chỉ đã lưu
    shippingInfo = {
      name: currentUser.username,
      phone: currentUser.phone,
      address: currentUser.address
    };
  } else {
    // 2. Lấy từ form địa chỉ mới
    shippingInfo = {
      name: infoName.value.trim(),
      phone: infoPhone.value.trim(),
      address: infoAddress.value.trim()
    };
    
    // 3. Validate form mới
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Vui lòng điền đầy đủ Tên, Số điện thoại và Địa chỉ giao hàng mới.");
      return;
    }
  }

  // Lấy phương thức thanh toán
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Tạo đối tượng Đơn Hàng Mới
  const newOrder = {
    id: 'DH' + Date.now(),
    date: new Date().toISOString(),
    items: [...cart], 
    total: totalAmount,
    paymentMethod: paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến',
    shippingAddress: shippingInfo // Sử dụng đối tượng shippingInfo
  };

  // Lưu đơn hàng vào user
  if (!currentUser.orders) {
    currentUser.orders = [];
  }
  currentUser.orders.push(newOrder);

  // Xóa giỏ hàng
  cart = []; 
  currentUser.cart = []; 

  // Lưu thay đổi vào Storage
  saveCartAndUser();

  // Hiển thị Modal "Xem Lại"
  orderIdSpan.textContent = newOrder.id;
  orderNameSpan.textContent = newOrder.shippingAddress.name;
  orderPhoneSpan.textContent = newOrder.shippingAddress.phone;
  orderAddressSpan.textContent = newOrder.shippingAddress.address;
  orderTotalSpan.textContent = numberWithCommas(newOrder.total) + 'đ';
  
  orderDetailsSummary.innerHTML = newOrder.items.map(item => 
    `<div>${item.title} <strong>(x${item.quantity})</strong></div>`
  ).join('');

  orderSuccessModal.style.display = 'flex';

  // Vẽ lại trang (giỏ hàng sẽ trống)
  renderCart();
}


/* ==== KHỞI TẠO (INIT) (CẬP NHẬT) ==== */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();   
  renderCart(); 
  
  // Listener cho danh sách sản phẩm
  cartItemsList.addEventListener('click', handleCartClick);

  // Listener cho nút ĐẶT HÀNG
  if (btnPlaceOrder) {
    btnPlaceOrder.addEventListener('click', placeOrder);
  }
  
  // Listener cho nút Đóng Modal "Xem Lại"
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', () => {
      orderSuccessModal.style.display = 'none';
    });
  }
  
  // *** CẬP NHẬT: Listeners cho nút Radio chọn địa chỉ ***
  if (radioUseSaved) {
    radioUseSaved.addEventListener('change', () => {
      if (radioUseSaved.checked) {
        savedAddressBox.classList.remove('hidden');
        newAddressForm.classList.add('hidden');
      }
    });
  }
  if (radioUseNew) {
    radioUseNew.addEventListener('change', () => {
      if (radioUseNew.checked) {
        savedAddressBox.classList.add('hidden');
        newAddressForm.classList.remove('hidden');
        
        // Tải trước thông tin (nếu có) vào form mới
        infoName.value = currentUser.username || '';
        infoPhone.value = currentUser.phone || '';
      }
    });
  }
});