// let pricingData = [];

// // ✅ Tỉ lệ lợi nhuận mặc định theo loại
// let profitRateByCategory = {
//     "Văn học": 30,
//     "Tâm lý": 35,
//     "Thiếu nhi": 30,
//     "Tản văn": 25,
//     "Học tập": 30,
//     "Kinh tế": 35,
//     "Kinh doanh": 35,
//     "Tiểu sử": 30
// };

// // ============================================
// // ✅ ĐỌC SẢN PHẨM TỪ ADMIN
// // ============================================
// function loadProductsFromAdmin() {
//     const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    
//     if (products.length === 0) {
//         console.warn('⚠️ Không có sản phẩm trong Admin!');
//         return [];
//     }
    
//     // Chỉ lấy sản phẩm active
//     return products
//         .filter(p => p.status === 'active')
//         .map(p => {
//             // Lấy giá nhập từ phiếu nhập (nếu có)
//             const costPrice = getLatestImportPrice(p.name) || 100000; // Giá mặc định
            
//             // Lấy tỉ lệ lợi nhuận (nếu đã lưu, nếu không thì lấy theo loại)
//             const profitRate = p.profitRate || profitRateByCategory[p.category] || 30;
            
//             return {
//                 id: p.id,
//                 name: p.name,
//                 category: p.category,
//                 costPrice: costPrice,
//                 profitRate: profitRate
//             };
//         });
// }

// // ============================================
// // ✅ LẤY GIÁ NHẬP MỚI NHẤT TỪ PHIẾU NHẬP
// // ============================================
// function getLatestImportPrice(productName) {
//     const importOrders = JSON.parse(localStorage.getItem('importOrders') || '[]');
    
//     // Tìm ngược từ phiếu mới nhất
//     for (let i = importOrders.length - 1; i >= 0; i--) {
//         const order = importOrders[i];
//         if (order.status === 'completed') {
//             const product = order.products.find(p => p.name === productName);
//             if (product) {
//                 return product.importPrice;
//             }
//         }
//     }
    
//     return null; // Không tìm thấy
// }

// // ============================================
// // ✅ LƯU TỶ LỆ LỢI NHUẬN VÀO SẢN PHẨM
// // ============================================
// function saveProfitRateToProducts() {
//     const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    
//     pricingData.forEach(item => {
//         const product = products.find(p => p.id === item.id);
//         if (product) {
//             product.profitRate = item.profitRate;
//             product.costPrice = item.costPrice;
            
//             // Tính giá bán
//             const profit = (item.costPrice * item.profitRate) / 100;
//             product.salePrice = item.costPrice + profit;
//         }
//     });
    
//     localStorage.setItem('bookstore_products', JSON.stringify(products));
//     console.log('💾 Đã lưu giá bán vào bookstore_products');
// }

// // ============================================
// // HIỂN THỊ BẢNG GIÁ
// // ============================================
// function displayPricing(filteredData = pricingData) {
//     let html = '';
    
//     if (filteredData.length === 0) {
//         html = '<tr><td colspan="7" style="text-align:center; padding:40px; color:#999;">Chưa có sản phẩm nào</td></tr>';
//     } else {
//         filteredData.forEach((item, index) => {
//             let profit = (item.costPrice * item.profitRate) / 100;
//             let salePrice = item.costPrice + profit;
            
//             html += `<tr>`;
//             html += `<td>${item.id}</td>`;
//             html += `<td>${item.name}</td>`;
//             html += `<td><strong>${item.category}</strong></td>`;
//             html += `<td>${item.costPrice.toLocaleString()}₫</td>`;
//             html += `<td><input type="number" value="${item.profitRate}" min="0" max="100" 
//                         onchange="updateItemProfit(${index}, this.value)" style="width:60px"></td>`;
//             html += `<td class="text-success">${profit.toLocaleString()}₫</td>`;
//             html += `<td class="text-primary"><strong>${salePrice.toLocaleString()}₫</strong></td>`;
//             html += `</tr>`;
//         });
//     }
    
//     const table = document.getElementById('pricingTable');
//     if (table) {
//         table.innerHTML = html;
//     }
// }

// // ============================================
// // CẬP NHẬT TỶ LỆ THEO LOẠI
// // ============================================
// function updateCategoryRate() {
//     const category = document.getElementById('categorySelect').value;
//     const newRate = parseFloat(document.getElementById('categoryRate').value);
    
//     if (!category) {
//         alert("⚠️ Vui lòng chọn loại sách!");
//         return;
//     }
    
//     if (isNaN(newRate) || newRate < 0 || newRate > 100) {
//         alert("⚠️ Tỉ lệ không hợp lệ!");
//         return;
//     }
    
//     // Cập nhật tỉ lệ cho loại
//     profitRateByCategory[category] = newRate;
    
//     // Áp dụng cho TẤT CẢ sản phẩm thuộc loại đó
//     pricingData.forEach(item => {
//         if (item.category === category) {
//             item.profitRate = newRate;
//         }
//     });
    
//     // ✅ LƯU VÀO LOCALSTORAGE
//     saveProfitRateToProducts();
    
//     displayPricing();
//     alert(`✅ Đã cập nhật tỉ lệ ${newRate}% cho loại "${category}"`);
// }

// // ============================================
// // TÌM KIẾM SẢN PHẨM
// // ============================================
// function searchPricing() {
//     const keyword = document.getElementById('searchPricing').value.trim().toLowerCase();
    
//     if (!keyword) {
//         alert("⚠️ Vui lòng nhập từ khóa tìm kiếm!");
//         return;
//     }
    
//     const filtered = pricingData.filter(item => 
//         item.id.toLowerCase().includes(keyword) || 
//         item.name.toLowerCase().includes(keyword)
//     );
    
//     if (filtered.length === 0) {
//         alert(`❌ Không tìm thấy sản phẩm: "${keyword}"`);
//         displayPricing(); // Hiển thị lại toàn bộ
//         return;
//     }
    
//     displayPricing(filtered);
//     alert(`✅ Tìm thấy ${filtered.length} sản phẩm`);
// }

// // ============================================
// // CẬP NHẬT TỶ LỆ TỪNG SẢN PHẨM
// // ============================================
// function updateItemProfit(index, newRate) {
//     pricingData[index].profitRate = parseFloat(newRate) || 0;
    
//     // ✅ LƯU VÀO LOCALSTORAGE
//     saveProfitRateToProducts();
    
//     displayPricing();
// }

// // ============================================
// // ✅ POPULATE DROPDOWN LOẠI SÁCH
// // ============================================
// function populateCategoryDropdown() {
//     const categories = [...new Set(pricingData.map(p => p.category))].sort();
    
//     const select = document.getElementById('categorySelect');
//     if (select) {
//         select.innerHTML = '<option value="">Chọn loại...</option>';
//         categories.forEach(cat => {
//             const option = document.createElement('option');
//             option.value = cat;
//             option.textContent = cat;
//             select.appendChild(option);
//         });
//     }
// }

// // ============================================
// // KHỞI TẠO KHI TRANG LOAD
// // ============================================
// document.addEventListener('DOMContentLoaded', function() {
//     if (document.getElementById('pricingTable')) {
//         console.log('🚀 Quản lý Giá bán loaded!');
        
//         // ✅ ĐỌC DỮ LIỆU TỪ ADMIN
//         pricingData = loadProductsFromAdmin();
        
//         console.log(`📦 Đã load ${pricingData.length} sản phẩm từ Admin`);
        
//         // Hiển thị bảng
//         displayPricing();
        
//         // Populate dropdown
//         populateCategoryDropdown();
//     }
// });
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
            // ✅ Lấy giá vốn từ phiếu nhập (nếu có), không thì = 100k
            // const costPrice = getLatestImportPrice(p.name) || DEFAULT_COST_PRICE;
            // ✅ GIÁ VỐN CỐ ĐỊNH = 100,000₫
            const costPrice = DEFAULT_COST_PRICE;
            // ✅ Lấy tỉ lệ lợi nhuận (nếu đã lưu, nếu không thì = 10%)
            const profitRate = p.profitRate || profitRateByCategory[p.category] || DEFAULT_PROFIT_RATE;
            
            return {
                id: p.id,
                name: p.name,
                category: p.category,
                costPrice: p.costPrice || DEFAULT_COST_PRICE,
                profitRate: profitRate
            };
        });
}

// ============================================
// ✅ LẤY GIÁ NHẬP MỚI NHẤT TỪ PHIẾU NHẬP
// ============================================
function getLatestImportPrice(productName) {
    const importOrders = JSON.parse(localStorage.getItem('importOrders') || '[]');
    
    // Tìm ngược từ phiếu mới nhất
    for (let i = importOrders.length - 1; i >= 0; i--) {
        const order = importOrders[i];
        if (order.status === 'completed') {
            const product = order.products.find(p => p.name === productName);
            if (product) {
                return product.importPrice;
            }
        }
    }
    
    return null; // Không tìm thấy → Dùng giá mặc định 100k
}

// ============================================
// ✅ LƯU GIÁ BÁN VÀO BOOKSTORE_PRODUCTS
// ============================================
function savePricingToProducts() {
    const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    
    pricingData.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.profitRate = item.profitRate;
            product.costPrice = item.costPrice;
            
            // ✅ TÍNH GIÁ BÁN
            const profit = (item.costPrice * item.profitRate) / 100;
            product.price = Math.round(item.costPrice + profit); // Làm tròn
        }
    });
    
    localStorage.setItem('bookstore_products', JSON.stringify(products));
    console.log('💾 Đã lưu giá bán vào bookstore_products');
    
    // ✅ TRIGGER SỰ KIỆN ĐỂ GIAO DIỆN USER CẬP NHẬT
    window.dispatchEvent(new Event('storage'));
}

// ============================================
// HIỂN THỊ BẢNG GIÁ
// ============================================
function displayPricing(filteredData = pricingData) {
    let html = '';
    
    if (filteredData.length === 0) {
        html = '<tr><td colspan="7" style="text-align:center; padding:40px; color:#999;">Chưa có sản phẩm nào</td></tr>';
    } else {
        filteredData.forEach((item, index) => {
            // Tìm index thực trong mảng gốc
            const realIndex = pricingData.findIndex(p => p.id === item.id);
            
            let profit = (item.costPrice * item.profitRate) / 100;
            let salePrice = item.costPrice + profit;
            
            html += `<tr>`;
            html += `<td>${item.id}</td>`;
            html += `<td>${item.name}</td>`;
            html += `<td><strong>${item.category}</strong></td>`;
            html += `<td>${item.costPrice.toLocaleString()}₫</td>`;
            html += `<td><input type="number" value="${item.profitRate}" min="0" max="100" 
                        onchange="updateItemProfit(${realIndex}, this.value)" style="width:60px; padding:4px;"></td>`;
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
    
    // Cập nhật tỉ lệ cho loại
    profitRateByCategory[category] = newRate;
    
    // Áp dụng cho TẤT CẢ sản phẩm thuộc loại đó
    pricingData.forEach(item => {
        if (item.category === category) {
            item.profitRate = newRate;
        }
    });
    
    // ✅ LƯU VÀO LOCALSTORAGE
    savePricingToProducts();
    
    displayPricing();
    alert(`✅ Đã cập nhật tỉ lệ ${newRate}% cho loại "${category}"`);
}

// ============================================
// TÌM KIẾM SẢN PHẨM
// ============================================
function searchPricing() {
    const keyword = document.getElementById('searchPricing').value.trim().toLowerCase();
    
    if (!keyword) {
        displayPricing(); // Hiển thị lại toàn bộ
        return;
    }
    
    const filtered = pricingData.filter(item => 
        item.id.toLowerCase().includes(keyword) || 
        item.name.toLowerCase().includes(keyword)
    );
    
    if (filtered.length === 0) {
        alert(`❌ Không tìm thấy sản phẩm: "${keyword}"`);
        displayPricing(); // Hiển thị lại toàn bộ
        return;
    }
    
    displayPricing(filtered);
}

// ============================================
// CẬP NHẬT TỶ LỆ TỪNG SẢN PHẨM
// ============================================
function updateItemProfit(index, newRate) {
    pricingData[index].profitRate = parseFloat(newRate) || 0;
    
    // ✅ LƯU VÀO LOCALSTORAGE
    savePricingToProducts();
    
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
        
        // ✅ ĐỌC DỮ LIỆU TỪ ADMIN
        pricingData = loadProductsFromAdmin();
        
        console.log(`📦 Đã load ${pricingData.length} sản phẩm từ Admin`);
        
        // ✅ LƯU GIÁ BÁN LẦN ĐẦU (để User đọc được)
        savePricingToProducts();
        
        // Hiển thị bảng
        displayPricing();
        
        // Populate dropdown
        populateCategoryDropdown();
    }
});

// ============================================
// TỰ ĐỘNG REFRESH KHI NHẬP HÀNG THAY ĐỔI GIÁ VỐN
// ============================================

window.addEventListener('storage', (e) => {
    if (e.key === 'bookstore_products') {
        console.log('📢 Giá vốn đã thay đổi, đang refresh...');
        
        // ✅ LOAD LẠI DỮ LIỆU
        pricingData = loadProductsFromAdmin();
        
        // ✅ HIỂN THỊ LẠI BẢNG
        displayPricing();
        
        console.log('✅ Đã cập nhật giá vốn mới!');
    }
});

// ✅ TỰ ĐỘNG REFRESH MỖI 3 GIÂY (BACKUP)
setInterval(() => {
    const newData = loadProductsFromAdmin();
    
    // So sánh xem có thay đổi không
    const hasChanged = newData.some((item, index) => {
        const oldItem = pricingData[index];
        return oldItem && (
            oldItem.costPrice !== item.costPrice ||
            oldItem.profitRate !== item.profitRate
        );
    });
    
    if (hasChanged) {
        console.log('🔄 Phát hiện thay đổi giá vốn, đang refresh...');
        pricingData = newData;
        displayPricing();
    }
}, 3000);