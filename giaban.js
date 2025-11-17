let pricingData = [];

// ✅ Tỉ lệ lợi nhuận mặc định (10%)
const DEFAULT_PROFIT_RATE = 10;
const DEFAULT_COST_PRICE = 100000;

// ✅ Tỉ lệ lợi nhuận mặc định theo loại (có thể tùy chỉnh)
let profitRateByCategory = {
    "Văn học": 10,
    "Tâm lý": 10,
    "Thiếu nhi": 10,
    "Tản văn": 10,
    "Học tập": 10,
    "Kinh tế": 10,
    "Kinh doanh": 10,
    "Tiểu sử": 10
};

// ============================================
// ✅ ĐỌC SẢN PHẨM TỪ ADMIN
// ============================================
function loadProductsFromAdmin() {
    const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    
    if (products.length === 0) {
        console.warn('⚠️ Không có sản phẩm trong Admin!');
        return [];
    }
    
    // Chỉ lấy sản phẩm active
    return products
        .filter(p => p.status === 'active')
        .map(p => {
            const costPrice = p.costPrice || DEFAULT_COST_PRICE;
            const profitRate = p.profitRate || profitRateByCategory[p.category] || DEFAULT_PROFIT_RATE;
            
            return {
                id: p.id,
                name: p.name,
                category: p.category,
                costPrice: costPrice,
                profitRate: profitRate
            };
        });
}

function savePricingToProducts() {
    let products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');

    if (!products || products.length === 0) {
        console.warn('Không có sản phẩm nào trong localStorage, không cập nhật giá!');
        return;
    }

    pricingData.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.profitRate = item.profitRate;
            product.costPrice = item.costPrice;
            const profit = (item.costPrice * item.profitRate) / 100;
            product.price = Math.round(item.costPrice + profit);
        }
    });

    localStorage.setItem('bookstore_products', JSON.stringify(products));
    console.log('💾 Đã lưu giá bán vào bookstore_products');
    window.dispatchEvent(new Event('storage'));
}

// ============================================
// HIỂN THỊ BẢNG GIÁ
// ============================================
// ============================================
// HIỂN THỊ BẢNG GIÁ (CÓ NÚT SỬA)
// ============================================
function displayPricing(filteredData = pricingData) {
    let html = '';
    
    if (filteredData.length === 0) {
        html = '<tr><td colspan="7" style="text-align:center; padding:40px; color:#999;">Chưa có sản phẩm nào</td></tr>';
    } else {
        filteredData.forEach((item, index) => {
            const realIndex = pricingData.findIndex(p => p.id === item.id);
            
            let profit = (item.costPrice * item.profitRate) / 100;
            let salePrice = item.costPrice + profit;
            
            html += `<tr data-index="${realIndex}">`;
            html += `<td>${item.id}</td>`;
            html += `<td>${item.name}</td>`;
            html += `<td><strong>${item.category}</strong></td>`;
            html += `<td>${item.costPrice.toLocaleString()}₫</td>`;
            html += `<td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <input type="number" 
                                   class="rate-input" 
                                   value="${item.profitRate}" 
                                   min="0" 
                                   max="100" 
                                   onchange="showEditButton(${realIndex})" 
                                   data-original="${item.profitRate}"
                                   style="width:70px; padding:8px; border: 2px solid #e2e8f0; border-radius:6px; text-align:center; font-weight:600;">
                            <button class="btn-edit-rate" 
                                    id="editBtn${realIndex}" 
                                    onclick="confirmUpdateRate(${realIndex})" 
                                    style="display:none; padding:6px 12px; background:#10b981; color:white; border:none; border-radius:6px; cursor:pointer; font-size:13px; font-weight:600; transition: all 0.3s;">
                                <i class='bx bx-check'></i> Sửa
                            </button>
                        </div>
                     </td>`;
            html += `<td class="text-success"><strong>${Math.round(profit).toLocaleString()}₫</strong></td>`;
            html += `<td class="text-primary"><strong>${Math.round(salePrice).toLocaleString()}₫</strong></td>`;
            html += `</tr>`;
        });
    }
    
    const table = document.getElementById('pricingTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// ✅ HIỂN THỊ NÚT SỬA KHI THAY ĐỔI %
// ============================================
function showEditButton(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    if (!row) return;
    
    const input = row.querySelector('.rate-input');
    const editBtn = document.getElementById(`editBtn${index}`);
    const originalValue = parseFloat(input.getAttribute('data-original'));
    const newValue = parseFloat(input.value);
    
    if (newValue !== originalValue && !isNaN(newValue)) {
        input.style.borderColor = '#f59e0b';
        input.style.background = '#fef3c7';
        editBtn.style.display = 'inline-flex';
        editBtn.style.animation = 'fadeIn 0.3s';
    } else {
        input.style.borderColor = '#e2e8f0';
        input.style.background = 'white';
        editBtn.style.display = 'none';
    }
}

// ============================================
// ✅ XÁC NHẬN CẬP NHẬT KHI BẤM NÚT SỬA
// ============================================
function confirmUpdateRate(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    if (!row) return;
    
    const input = row.querySelector('.rate-input');
    const newRate = parseFloat(input.value);
    
    if (isNaN(newRate) || newRate < 0 || newRate > 100) {
        alert('⚠️ Tỷ lệ phải từ 0 đến 100%!');
        return;
    }
    
    // Cập nhật dữ liệu
    pricingData[index].profitRate = newRate;
    
    // Lưu vào localStorage
    savePricingToProducts();
    
    // Cập nhật lại giá trị gốc
    input.setAttribute('data-original', newRate);
    input.style.borderColor = '#e2e8f0';
    input.style.background = 'white';
    
    // Ẩn nút Sửa
    const editBtn = document.getElementById(`editBtn${index}`);
    editBtn.style.display = 'none';
    
    // Refresh hiển thị để cập nhật Lợi nhuận và Giá bán
    displayPricing();
    
    alert(`✅ Đã cập nhật tỷ lệ thành ${newRate}%!`);
}

// ============================================
// XÓA HÀM updateItemProfit CŨ (KHÔNG CẦN NỮA)
// ============================================
// function updateItemProfit() { ... } ← XÓA DÒNG NÀY

// ============================================
// CẬP NHẬT TỶ LỆ THEO LOẠI
// ============================================
function updateCategoryRate() {
    const category = document.getElementById('categorySelect').value;
    const newRate = parseFloat(document.getElementById('categoryRate').value);
    
    if (!category) {
        alert("⚠️ Vui lòng chọn loại sách!");
        return;
    }
    
    if (isNaN(newRate) || newRate < 0 || newRate > 100) {
        alert("⚠️ Tỉ lệ không hợp lệ!");
        return;
    }
    
    profitRateByCategory[category] = newRate;
    
    pricingData.forEach(item => {
        if (item.category === category) {
            item.profitRate = newRate;
        }
    });
    
    savePricingToProducts();
    displayPricing();
    alert(`✅ Đã cập nhật tỉ lệ ${newRate}% cho loại "${category}"`);
}

// ============================================
// ✅ TÌM KIẾM ĐƠN GIẢN - CHỌN 1 TRONG 3
// ============================================
function searchPricing() {
    const searchType = document.getElementById('searchType').value;
    const searchValue = parseFloat(document.getElementById('searchValue').value);
    
    if (!searchValue || searchValue < 0) {
        alert('⚠️ Vui lòng nhập giá trị hợp lệ!');
        return;
    }
    
    let filtered = [];
    
    if (searchType === 'costPrice') {
        filtered = pricingData.filter(item => item.costPrice === searchValue);
    } 
    else if (searchType === 'profitRate') {
        filtered = pricingData.filter(item => item.profitRate === searchValue);
    } 
    else if (searchType === 'salePrice') {
        filtered = pricingData.filter(item => {
            const profit = (item.costPrice * item.profitRate) / 100;
            const salePrice = Math.round(item.costPrice + profit);
            return salePrice === searchValue;
        });
    }
    
    if (filtered.length === 0) {
        alert(`❌ Không tìm thấy sản phẩm có ${getSearchTypeName(searchType)} = ${searchValue.toLocaleString()}!`);
        displayPricing();
        return;
    }
    
    displayPricing(filtered);
    alert(`✅ Tìm thấy ${filtered.length} sản phẩm có ${getSearchTypeName(searchType)} = ${searchValue.toLocaleString()}`);
}

function getSearchTypeName(type) {
    const names = {
        'costPrice': 'Giá vốn',
        'profitRate': '% Lợi nhuận',
        'salePrice': 'Giá bán'
    };
    return names[type] || 'Giá trị';
}

// ============================================
// ĐẶT LẠI BỘ LỌC
// ============================================
function resetSearch() {
    document.getElementById('searchValue').value = '';
    document.getElementById('searchType').value = 'costPrice';
    displayPricing();
}


// ============================================
// ✅ POPULATE DROPDOWN LOẠI SÁCH
// ============================================
function populateCategoryDropdown() {
    const categories = [...new Set(pricingData.map(p => p.category))].sort();
    
    const select = document.getElementById('categorySelect');
    if (select) {
        select.innerHTML = '<option value="">Chọn loại...</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        });
    }
}

// ============================================
// KHỞI TẠO KHI TRANG LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('pricingTable')) {
        console.log('🚀 Quản lý Giá bán loaded!');
        
        pricingData = loadProductsFromAdmin();
        console.log(`📦 Đã load ${pricingData.length} sản phẩm từ Admin`);
        
        savePricingToProducts();
        displayPricing();
        populateCategoryDropdown();
    }
});

// ============================================
// ✅ TỰ ĐỘNG REFRESH (GỘP CHUNG 1 LISTENER)
// ============================================
window.addEventListener('storage', function(e) {
    if (e.key === 'bookstore_products' || e.key === 'categories') {
        console.log('📢 Dữ liệu đã thay đổi, đang refresh...');
        
        // Reload data
        if (typeof loadProductsFromAdmin === 'function') {
            pricingData = loadProductsFromAdmin();
        }
        
        // Update UI
        if (typeof populateCategoryDropdown === 'function') {
            populateCategoryDropdown();
        }
        if (typeof displayPricing === 'function') {
            displayPricing();
        }
        
        console.log('✅ Đã cập nhật dữ liệu mới!');
    }
});