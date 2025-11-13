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

// DOM Refs cho Modal "Xem Lại" (Thành công)
const orderSuccessModal = document.getElementById('order-success-modal');
const closeSuccessModal = document.getElementById('close-success-modal');
const orderIdSpan = document.getElementById('order-id');
const orderNameSpan = document.getElementById('order-name');
const orderPhoneSpan = document.getElementById('order-phone');
const orderAddressSpan = document.getElementById('order-address');
const orderDetailsSummary = document.getElementById('order-details-summary');
const orderTotalSpan = document.getElementById('order-total');

// ✅ DOM Refs cho Modal "Xác Nhận" (MỚI)
const orderConfirmModal = document.getElementById('order-confirm-modal');
const btnCancelConfirm = document.getElementById('btn-cancel-confirm');
const btnFinalConfirm = document.getElementById('btn-final-confirm');
const confirmNameSpan = document.getElementById('order-confirm-name');
const confirmPhoneSpan = document.getElementById('order-confirm-phone');
const confirmAddressSpan = document.getElementById('order-confirm-address');
const confirmDetailsSummary = document.getElementById('order-confirm-details');
const confirmTotalSpan = document.getElementById('order-confirm-total');


/* ==== HÀM (FUNCTIONS) ==== */

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Tải giỏ hàng VÀ thông tin user (Giữ nguyên)
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

// ================================================
// === ✅ HÀM (MỚI): HIỂN THỊ MODAL XÁC NHẬN
// ================================================
function showConfirmModal() {
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
  
  // 1. Lấy thông tin giao hàng dựa trên lựa chọn
  if (radioUseSaved.checked) {
    shippingInfo = {
      name: currentUser.username,
      phone: currentUser.phone,
      address: currentUser.address
    };
  } else {
    shippingInfo = {
      name: infoName.value.trim(),
      phone: infoPhone.value.trim(),
      address: infoAddress.value.trim()
    };
    
    // 2. Validate form mới
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      alert("Vui lòng điền đầy đủ Tên, Số điện thoại và Địa chỉ giao hàng mới.");
      return;
    }
  }

  // 3. Lấy thông tin thanh toán và tổng tiền
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // 4. Đổ dữ liệu vào Modal Xác Nhận
  confirmNameSpan.textContent = shippingInfo.name;
  confirmPhoneSpan.textContent = shippingInfo.phone;
  confirmAddressSpan.textContent = shippingInfo.address;
  confirmTotalSpan.textContent = numberWithCommas(totalAmount) + 'đ';
  
  confirmDetailsSummary.innerHTML = cart.map(item => 
    `<div>${item.title} <strong>(x${item.quantity})</strong></div>`
  ).join('');

  // 5. Hiển thị Modal Xác Nhận
  orderConfirmModal.style.display = 'flex';

  // 6. Gán sự kiện cho nút "XÁC NHẬN MUA" (cuối cùng)
  // Dùng .onclick để đảm bảo ghi đè sự kiện cũ (nếu có)
  btnFinalConfirm.onclick = () => {
    // Ẩn modal xác nhận
    orderConfirmModal.style.display = 'none';
    
    // Gọi hàm thực thi đặt hàng
    executePlaceOrder(shippingInfo, totalAmount, paymentMethod);
  };
}

// ================================================
// === ✅ HÀM (ĐÃ SỬA): CHỈ THỰC THI ĐẶT HÀNG
// ================================================
function executePlaceOrder(shippingInfo, totalAmount, paymentMethod) {
  // Logic tạo đơn hàng (đã được di chuyển từ hàm placeOrder cũ)
  const newOrder = {
    id: 'DH' + Date.now(),
    date: new Date().toISOString(),
    items: [...cart], 
    total: totalAmount,
    paymentMethod: paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến',
    shippingAddress: shippingInfo 
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

  // Hiển thị Modal "Thành Công"
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

  // ✅ Listener cho nút ĐẶT HÀNG (đã thay đổi)
  if (btnPlaceOrder) {
    btnPlaceOrder.addEventListener('click', showConfirmModal); // Gọi hàm hiển thị modal
  }
  
  // Listener cho nút Đóng Modal "Thành Công"
  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', () => {
      orderSuccessModal.style.display = 'none';
    });
  }
  
  // ✅ (MỚI) Listener cho nút Hủy trên Modal Xác Nhận
  if (btnCancelConfirm) {
    btnCancelConfirm.addEventListener('click', () => {
      orderConfirmModal.style.display = 'none';
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

/* ================================================= */
/* ===== KIỂM TRA TRẠNG THÁI TÀI KHOẢN REALTIME ===== */
/* ================================================= */

function checkAccountStatus() {
  const currentUserStr = sessionStorage.getItem('currentUser');
  if (!currentUserStr) return; // Chưa đăng nhập thì không kiểm tra
  
  try {
    const loggedInUser = JSON.parse(currentUserStr);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const latestUser = users.find(u => u.username === loggedInUser.username);
    
    // 1. Tài khoản bị xóa
    if (!latestUser) {
      alert('⚠️ Tài khoản không tồn tại. Vui lòng liên hệ Admin!');
      sessionStorage.removeItem('currentUser');
      window.location.href = 'dangki.html';
      return;
    }
    
    // 2. Tài khoản bị khóa
    if (latestUser.status === 'locked') {
      alert('🔒 Tài khoản của bạn đã bị khóa bởi Admin!\nBạn sẽ được đăng xuất.');
      sessionStorage.removeItem('currentUser');
      window.location.href = 'dangki.html';
      return;
    }
    
    // 3. Admin yêu cầu đổi mật khẩu
    if (latestUser.requirePasswordChange === true) {
      alert('⚠️ Admin yêu cầu bạn đổi mật khẩu.\nVui lòng đổi mật khẩu để tiếp tục!');
      window.location.href = 'dangki.html';
      return;
    }
    
    // 4. Cập nhật thông tin mới nhất
    sessionStorage.setItem('currentUser', JSON.stringify(latestUser));
    
    // 5. Đồng bộ currentUser global (nếu có thay đổi)
    if (currentUser && currentUser.username === latestUser.username) {
      currentUser = latestUser;
      // Cập nhật lại giỏ hàng nếu có thay đổi từ tab khác
      if (JSON.stringify(cart) !== JSON.stringify(latestUser.cart || [])) {
        cart = latestUser.cart || [];
        renderCart();
      }
    }
    
  } catch (error) {
    console.error('❌ Lỗi kiểm tra trạng thái tài khoản:', error);
  }
}

// Kiểm tra ngay khi load trang
checkAccountStatus();

// Kiểm tra mỗi 2 giây
setInterval(checkAccountStatus, 2000);