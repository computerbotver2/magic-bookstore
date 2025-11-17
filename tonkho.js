// ============================================
// ĐỌC/GHI DỮ LIỆU TỪ LOCALSTORAGE
// ============================================
function loadInventory() {
    const saved = localStorage.getItem('inventory');
    if (saved) {
        return JSON.parse(saved);
    }
    return [];
}

function saveInventory(data) {
    localStorage.setItem('inventory', JSON.stringify(data));
}

let inventory = loadInventory();
let currentDisplayMode = 'transaction'; // Mặc định: Nhập/Xuất

// ============================================
// ✅ ĐỌC TỒN KHO THỰC TẾ TỪ LOCALSTORAGE
// ============================================
function getCurrentStock(bookId) {
    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
    return stockData[bookId] || 0;
}

// ============================================
// ✅ ĐỌC DANH SÁCH SẢN PHẨM TỪ ADMIN
// ============================================
function getProductsFromAdmin() {
    const adminProducts = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    
    if (adminProducts.length > 0) {
        return adminProducts
            .filter(p => p.status === 'active')
            .map(p => ({
                id: p.id,
                name: p.name,
                category: p.category
            }));
    }
    
    const defaultBooks = [
        {id:"SP001", name:"Tôi thấy hoa vàng trên cỏ xanh", category:"Văn học"},
        {id:"SP002", name:"Đắc nhân tâm", category:"Tâm lý"},
        {id:"SP003", name:"Nhà giả kim", category:"Văn học"},
        {id:"SP004", name:"Cho tôi xin một vé đi tuổi thơ", category:"Thiếu nhi"},
        {id:"SP005", name:"Dế mèn phiêu lưu ký", category:"Thiếu nhi"},
        {id:"SP006", name:"Tuổi thơ dữ dội", category:"Văn học"},
        {id:"SP007", name:"Số đỏ", category:"Văn học"},
        {id:"SP008", name:"Nỗi buồn chiến tranh", category:"Văn học"},
        {id:"SP009", name:"Tư duy nhanh và chậm", category:"Tâm lý"},
        {id:"SP010", name:"Tuổi trẻ đáng giá bao nhiêu", category:"Tản văn"},
        {id:"SP011", name:"Khởi nghiệp 4.0", category:"Kinh tế"},
        {id:"SP012", name:"Hãy sống ở thể chủ động", category:"Tâm lý"},
        {id:"SP013", name:"Làm đĩ", category:"Văn học"},
        {id:"SP014", name:"Tôi tài giỏi, bạn cũng thế!", category:"Học tập"},
        {id:"SP015", name:"Kể chuyện trước giờ đi ngủ", category:"Thiếu nhi"},
        {id:"SP016", name:"Bộ não và tâm trí", category:"Tâm lý"},
        {id:"SP017", name:"Bạn đắt giá bao nhiêu?", category:"Tản văn"},
        {id:"SP018", name:"Một đời như kẻ tìm đường", category:"Tiểu sử"},
        {id:"SP019", name:"3 người thầy vĩ đại", category:"Tâm lý"},
        {id:"SP020", name:"Những tù nhân của địa lý", category:"Học tập"},
        {id:"SP021", name:"Tinh hoa trí tuệ do thái", category:"Kinh doanh"},
        {id:"SP022", name:"Nghĩ giàu và làm giàu", category:"Kinh doanh"},
        {id:"SP023", name:"Hiểu về trái tim", category:"Tâm lý"},
        {id:"SP024", name:"Đừng bao giờ đi ăn một mình", category:"Tâm lý"},
        {id:"SP025", name:"Đọc vị bất kì ai", category:"Tâm lý"},
        {id:"SP026", name:"Ra bờ suối ngắm hoa kèn hồng", category:"Văn học"},
        {id:"SP027", name:"Con chim xanh biếc quay về", category:"Tản văn"}
    ];
    
    return defaultBooks;
}

// ============================================

// ============================================
// ============================================
// ✅ THAY ĐỔI CHẾ ĐỘ HIỂN THỊ (KHÔNG ĐỒNG BỘ)
// ============================================
function changeDisplayMode() {
    // Không cần đồng bộ 2 dropdown nữa - chỉ cập nhật currentDisplayMode
    const mode1 = document.getElementById('displayMode1').value;
    const mode2 = document.getElementById('displayMode2').value;
    
    // Lấy giá trị từ dropdown được click
    currentDisplayMode = event.target.value;
    
    if (currentDisplayMode === 'stock') {
        displayStockTable();
    } else {
        displayTransactionTable();
    }
}
// ============================================
// HIỂN THỊ BẢNG TỒN KHO
// ============================================
function displayStockTable() {
    // Cập nhật header
    const header = document.getElementById('tableHeader');
    header.innerHTML = `
        <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Loại sách</th>
            <th>Số lượng tồn</th>
            <th>Trạng thái</th>
        </tr>
    `;
    
    const products = getProductsFromAdmin();
    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
    
    let html = '';
    
    if (products.length === 0) {
        html = '<tr><td colspan="5" style="text-align:center;padding:20px;color:#999;">Chưa có sản phẩm nào</td></tr>';
    } else {
        products.forEach(product => {
            const bookId = parseInt(product.id.replace('SP', '').replace(/^0+/, '')) || 0;
            const stock = stockData[bookId] || 0;
            
            let statusBadge = '';
            if (stock === 0) {
                statusBadge = '<span class="badge danger">❌ Hết hàng</span>';
            } else if (stock <= 5) {
                statusBadge = '<span class="badge warning">⚠️ Sắp hết</span>';
            } else {
                statusBadge = '<span class="badge success">✅ Còn hàng</span>';
            }
            
            html += `<tr>`;
            html += `<td><strong>${product.id}</strong></td>`;
            html += `<td>${product.name}</td>`;
            html += `<td>${product.category}</td>`;
            html += `<td><strong style="font-size: 16px; color: ${stock === 0 ? '#ef4444' : stock <= 5 ? '#f59e0b' : '#10b981'}">${stock}</strong></td>`;
            html += `<td>${statusBadge}</td>`;
            html += `</tr>`;
        });
    }
    
    const table = document.getElementById('inventoryTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// HIỂN THỊ BẢNG TỒN KHO (LỊCH SỬ GIAO DỊCH)
// ============================================
function displayInventory(filteredData = inventory) {
    let html = '';
    
    if (filteredData.length === 0) {
        html = '<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">Chưa có giao dịch nào</td></tr>';
    } else {
        filteredData.forEach(item => {
            const typeClass = item.type === 'Nhập' ? 'badge success' : 'badge danger';
            
            html += `<tr>`;
            html += `<td><strong>${item.id}</strong></td>`;
            html += `<td>${item.name}</td>`;
            html += `<td>${item.category}</td>`;
            html += `<td>${item.date}</td>`;
            html += `<td><span class="${typeClass}">${item.type}</span></td>`;
            html += `<td><strong>${item.quantity}</strong></td>`;
            html += `</tr>`;
        });
    }
    
    const table = document.getElementById('inventoryTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// LỌC THEO MÃ SẢN PHẨM
// ============================================
function filterInventory() {
    const productCode = document.getElementById('searchProductId').value.trim().toUpperCase();
    const transactionType = document.getElementById('transactionType').value;
    const fromDate = document.getElementById('inventoryFromDate').value;
    const toDate = document.getElementById('inventoryToDate').value;
    
    // ✅ ĐỌC CHẾ ĐỘ TỪ DROPDOWN 1
    const mode = document.getElementById('displayMode1').value;
    
    if (!productCode) {
        alert("⚠️ Vui lòng nhập mã sản phẩm!");
        return;
    }
    
    const products = getProductsFromAdmin();
    const product = products.find(p => p.id === productCode);
    
    if (!product) {
        alert(`❌ Không tìm thấy sản phẩm: ${productCode}`);
        return;
    }
    
    // ✅ CHẾ ĐỘ TỒN KHO
    if (mode === 'stock') {
        const bookId = parseInt(productCode.replace('SP', '').replace(/^0+/, '')) || 0;
        const stock = getCurrentStock(bookId);
        
        // Hiển thị tồn kho trong bảng
        const header = document.getElementById('tableHeader');
        header.innerHTML = `
            <tr>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Loại sách</th>
                <th>Số lượng tồn</th>
                <th>Trạng thái</th>
            </tr>
        `;
        
        let statusBadge = '';
        if (stock === 0) {
            statusBadge = '<span class="badge danger">❌ Hết hàng</span>';
        } else if (stock <= 5) {
            statusBadge = '<span class="badge warning">⚠️ Sắp hết</span>';
        } else {
            statusBadge = '<span class="badge success">✅ Còn hàng</span>';
        }
        
        const html = `
            <tr>
                <td><strong>${product.id}</strong></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td><strong style="font-size: 16px; color: ${stock === 0 ? '#ef4444' : stock <= 5 ? '#f59e0b' : '#10b981'}">${stock}</strong></td>
                <td>${statusBadge}</td>
            </tr>
        `;
        
        document.getElementById('inventoryTable').innerHTML = html;
        alert(`✅ Tồn kho: ${stock} cuốn`);
        return;
    }
    
    // ✅ CHẾ ĐỘ NHẬP/XUẤT
    inventory = loadInventory();
    let filtered = inventory.filter(item => item.id === productCode);
    
    if (fromDate && toDate) {
        filtered = filtered.filter(item => item.date >= fromDate && item.date <= toDate);
    }
    
    if (transactionType) {
        filtered = filtered.filter(item => item.type === transactionType);
    }
    
    if (filtered.length === 0) {
        alert(`❌ Không tìm thấy giao dịch nào!`);
        displayTransactionTable();
        return;
    }
    
    // Hiển thị kết quả trong bảng
    const header = document.getElementById('tableHeader');
    header.innerHTML = `
        <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Loại sách</th>
            <th>Ngày</th>
            <th>Loại giao dịch</th>
            <th>Số lượng</th>
        </tr>
    `;
    
    displayInventory(filtered);
    alert(`✅ Tìm thấy ${filtered.length} giao dịch`);
}

// ============================================
// LỌC THEO LOẠI SÁCH
// ============================================
function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const transactionType = document.getElementById('categoryTransactionType').value;
    const fromDate = document.getElementById('categoryFromDate').value;
    const toDate = document.getElementById('categoryToDate').value;
    
    const mode = document.getElementById('displayMode2').value;
    
    console.log('🔍 LỌC THEO LOẠI:', category);
    
    if (!category) {
        alert("⚠️ Vui lòng chọn loại sách!");
        return;
    }
    
    const products = getProductsFromAdmin();
    const productsInCategory = products.filter(p => p.category === category);
    
    console.log(`📦 Có ${productsInCategory.length} sản phẩm loại "${category}"`);
    
    if (productsInCategory.length === 0) {
        alert(`❌ Không có sản phẩm thuộc loại: ${category}`);
        return;
    }
    
    // ✅ CHẾ ĐỘ TỒN KHO
    if (mode === 'stock') {
        const header = document.getElementById('tableHeader');
        header.innerHTML = `
            <tr>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Loại sách</th>
                <th>Số lượng tồn</th>
                <th>Trạng thái</th>
            </tr>
        `;
        
        const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
        let html = '';
        
        productsInCategory.forEach(product => {
            const bookId = parseInt(product.id.replace('SP', '').replace(/^0+/, '')) || 0;
            const stock = stockData[bookId] || 0;
            
            let statusBadge = '';
            if (stock === 0) {
                statusBadge = '<span class="badge danger">❌ Hết hàng</span>';
            } else if (stock <= 5) {
                statusBadge = '<span class="badge warning">⚠️ Sắp hết</span>';
            } else {
                statusBadge = '<span class="badge success">✅ Còn hàng</span>';
            }
            
            html += `<tr>`;
            html += `<td><strong>${product.id}</strong></td>`;
            html += `<td>${product.name}</td>`;
            html += `<td>${product.category}</td>`;
            html += `<td><strong style="font-size: 16px;">${stock}</strong></td>`;
            html += `<td>${statusBadge}</td>`;
            html += `</tr>`;
        });
        
        document.getElementById('inventoryTable').innerHTML = html;
        alert(`✅ Hiển thị tồn kho của ${productsInCategory.length} sản phẩm thuộc loại "${category}"`);
        return;
    }
    
    // ✅ CHẾ ĐỘ NHẬP/XUẤT
    inventory = loadInventory();
    
    console.log(`📊 Tổng giao dịch: ${inventory.length}`);
    
    // ✅ LẤY TẤT CẢ MÃ SẢN PHẨM THUỘC LOẠI NÀY
    const productIds = productsInCategory.map(p => p.id);
    console.log(`🔑 Mã sản phẩm cần tìm:`, productIds);
    
    // ✅ LỌC THEO MÃ SẢN PHẨM (KHÔNG THEO CATEGORY NỮA)
    let filtered = inventory.filter(item => productIds.includes(item.id));
    
    console.log(`✅ Tìm được ${filtered.length} giao dịch theo mã sản phẩm`);
    
    if (fromDate && toDate) {
        filtered = filtered.filter(item => item.date >= fromDate && item.date <= toDate);
        console.log(`📅 Sau lọc theo ngày: ${filtered.length}`);
    }
    
    if (transactionType) {
        filtered = filtered.filter(item => item.type === transactionType);
        console.log(`🔄 Sau lọc theo loại giao dịch: ${filtered.length}`);
    }
    
    if (filtered.length === 0) {
        alert(`❌ Không tìm thấy giao dịch nào cho loại "${category}"!`);
        displayTransactionTable();
        return;
    }
    
    const header = document.getElementById('tableHeader');
    header.innerHTML = `
        <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Loại sách</th>
            <th>Ngày</th>
            <th>Loại giao dịch</th>
            <th>Số lượng</th>
        </tr>
    `;
    
    displayInventory(filtered);
    alert(`✅ Tìm thấy ${filtered.length} giao dịch cho loại "${category}"`);
}
// ============================================
// HIỂN THỊ TẤT CẢ
// ============================================
function showAllInventory() {
    document.getElementById('searchProductId').value = '';
    document.getElementById('transactionType').value = '';
    document.getElementById('inventoryFromDate').value = '';
    document.getElementById('inventoryToDate').value = '';
    
    document.getElementById('categoryFilter').value = '';
    document.getElementById('categoryTransactionType').value = '';
    document.getElementById('categoryFromDate').value = '';
    document.getElementById('categoryToDate').value = '';
    
    // Reset về chế độ giao dịch
    document.getElementById('displayMode1').value = 'transaction';
    document.getElementById('displayMode2').value = 'transaction';
    
    displayTransactionTable();
}
// ============================================
// ✅ POPULATE DROPDOWN LOẠI SÁCH - CHỈ LẤY TỪ ADMIN
// ============================================
function populateCategoryFilter() {
    // ✅ CHỈ LẤY TỪ PRODUCTS (ADMIN)
    const products = getProductsFromAdmin();
    
    // Lấy danh sách loại từ products
    const categories = [...new Set(products.map(p => p.category))]
        .filter(c => c && c.trim() !== '') // Loại bỏ rỗng
        .sort();
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">Chọn loại sách</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }
    
    console.log('📋 Danh sách loại sách từ Admin:', categories);
}
// ============================================
// HIỂN THỊ CẢNH BÁO TỒN KHO
// ============================================
function showStockWarning() {
    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
    const products = getProductsFromAdmin();
    
    let outOfStockList = [];
    let lowStockList = [];
    
    products.forEach(product => {
        const bookId = parseInt(product.id.replace('SP', '').replace(/^0+/, '')) || 0;
        const qty = stockData[bookId] || 0;
        
        if (qty === 0) {
            outOfStockList.push(product.name);
        } else if (qty <= 5) {
            lowStockList.push(`${product.name} (còn ${qty})`);
        }
    });
    
    let message = '📊 TÌNH TRẠNG TỒN KHO\n\n';
    
    if (outOfStockList.length === 0 && lowStockList.length === 0) {
        message += '✅ Tất cả sản phẩm đều còn hàng đầy đủ!';
        alert(message);
        return;
    }
    
    if (outOfStockList.length > 0) {
        message += `❌ HẾT HÀNG (${outOfStockList.length} sản phẩm):\n`;
        outOfStockList.slice(0, 5).forEach(name => {
            message += `   • ${name}\n`;
        });
        if (outOfStockList.length > 5) {
            message += `   ... và ${outOfStockList.length - 5} sản phẩm khác\n`;
        }
        message += '\n';
    }
    
    if (lowStockList.length > 0) {
        message += `⚠️ SẮP HẾT HÀNG (${lowStockList.length} sản phẩm):\n`;
        lowStockList.slice(0, 5).forEach(name => {
            message += `   • ${name}\n`;
        });
        if (lowStockList.length > 5) {
            message += `   ... và ${lowStockList.length - 5} sản phẩm khác\n`;
        }
    }
    
    message += '\n💡 Vui lòng nhập hàng kịp thời!';
    alert(message);
}

// ============================================
// KHỞI TẠO KHI TRANG LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('inventoryTable')) {
        inventory = loadInventory();
        populateCategoryFilter();
        displayTransactionTable(); // Mặc định hiển thị giao dịch
        
        const today = new Date().toISOString().split('T')[0];
        
        const fromDate = document.getElementById('inventoryFromDate');
        const toDate = document.getElementById('inventoryToDate');
        if (fromDate && toDate) {
            fromDate.value = today;
            toDate.value = today;
        }
        
        const categoryFromDate = document.getElementById('categoryFromDate');
        const categoryToDate = document.getElementById('categoryToDate');
        if (categoryFromDate && categoryToDate) {
            categoryFromDate.value = today;
            categoryToDate.value = today;
        }
        
        setTimeout(() => {
            const inventoryPage = document.getElementById('inventory');
            if (inventoryPage && inventoryPage.classList.contains('active')) {
                showStockWarning();
            }
        }, 500);
    }
});

window.addEventListener('storage', function(e) {
    if (e.key === 'bookstore_products' || e.key === 'categories') {
        if (typeof populateCategoryFilter === 'function') {
            populateCategoryFilter();
        }
        if (currentDisplayMode === 'stock') {
            displayStockTable();
        } else {
            displayTransactionTable();
        }
    }
});function displayTransactionTable(filteredData = inventory) {
    // Cập nhật header
    const header = document.getElementById('tableHeader');
    header.innerHTML = `
        <tr>
            <th>Mã sách</th>
            <th>Tên sách</th>
            <th>Loại sách</th>
            <th>Ngày</th>
            <th>Loại giao dịch</th>
            <th>Số lượng</th>
        </tr>
    `;
    let html = '';
    if (filteredData.length === 0) {
        html = '<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">Chưa có giao dịch nào</td></tr>';
    } else {
        filteredData.forEach(item => {
            const typeClass = item.type === 'Nhập' ? 'badge success' : 'badge danger';
            html += `<tr>`;
            html += `<td><strong>${item.id}</strong></td>`;
            html += `<td>${item.name}</td>`;
            html += `<td>${item.category}</td>`;
            html += `<td>${item.date}</td>`;
            html += `<td><span class="${typeClass}">${item.type}</span></td>`;
            html += `<td><strong>${item.quantity}</strong></td>`;
            html += `</tr>`;
        });
    }
    const table = document.getElementById('inventoryTable');
    if (table) {
        table.innerHTML = html;
    }
}