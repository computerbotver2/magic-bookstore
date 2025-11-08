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
        console.log(`📦 Đã load ${adminProducts.length} sản phẩm từ Admin`);
        return adminProducts
            .filter(p => p.status === 'active')
            .map(p => ({
                id: p.id,
                name: p.name,
                category: p.category
            }));
    }
    
    // Nếu không có sản phẩm trong Admin, dùng danh sách mặc định
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
    
    console.log(`📚 Dùng ${defaultBooks.length} sách mặc định`);
    return defaultBooks;
}

// ============================================
// ✅ POPULATE DROPDOWN "LOẠI SÁCH" TỰ ĐỘNG
// ============================================

function populateCategoryFilter() {
    const products = getProductsFromAdmin();
    const categories = [...new Set(products.map(p => p.category))].sort();
    
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="">-- Chọn loại sách --</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
        console.log(`✅ Đã load ${categories.length} loại sách vào dropdown`);
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
    
    if (!productCode) {
        alert("⚠️ Vui lòng nhập mã sản phẩm!");
        return;
    }
    
    // ✅ TÌM THÔNG TIN SẢN PHẨM
    const products = getProductsFromAdmin();
    const product = products.find(p => p.id === productCode);
    
    if (!product) {
        alert(`❌ Không tìm thấy sản phẩm: ${productCode}`);
        return;
    }
    
    const productName = product.name;
    const category = product.category;
    
    // ✅ ĐỌC TỒN KHO THỰC TẾ
    const bookId = parseInt(productCode.replace('SP', '').replace(/^0+/, '')) || 0;
    const realStock = getCurrentStock(bookId);
    
    // ✅ ĐỌC GIAO DỊCH TỪ INVENTORY (NẾU CÓ)
    inventory = loadInventory();
    
    let filtered = inventory.filter(item => item.id === productCode);
    
    if (fromDate && toDate) {
        filtered = filtered.filter(item => {
            return item.date >= fromDate && item.date <= toDate;
        });
    }
    
    const dateRange = fromDate && toDate ? `${fromDate} đến ${toDate}` : 'Tất cả';
    
    // ✅ TÍNH GIAO DỊCH TRONG KHOẢNG THỜI GIAN
    const totalImport = filtered.filter(x => x.type === 'Nhập').reduce((sum, x) => sum + x.quantity, 0);
    const totalExport = filtered.filter(x => x.type === 'Xuất').reduce((sum, x) => sum + x.quantity, 0);
    
    // ✅ KẾT QUẢ THEO LOẠI TRA CỨU
    let result = 0;
    let displayType = transactionType || 'Tất cả';
    
    if (transactionType === 'Tồn') {
        // ✅ DÙNG TỒN THỰC TẾ
        result = realStock;
    } else if (transactionType === 'Nhập') {
        result = totalImport;
    } else if (transactionType === 'Xuất') {
        result = totalExport;
    } else {
        // ✅ HIỂN THỊ ĐẦY ĐỦ: Nhập/Xuất TRONG KHOẢNG + Tồn THỰC TẾ
        result = { 
            totalImport: totalImport, 
            totalExport: totalExport, 
            totalStock: realStock  // ← TỒN THỰC TẾ
        };
    }
    
    showProductResult(productCode, productName, category, displayType, dateRange, result);
}

// ============================================
// LỌC THEO LOẠI SÁCH
// ============================================

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    const transactionType = document.getElementById('categoryTransactionType').value;
    const fromDate = document.getElementById('categoryFromDate').value;
    const toDate = document.getElementById('categoryToDate').value;
    
    if (!category) {
        alert("⚠️ Vui lòng chọn loại sách!");
        return;
    }
    
    // ✅ TÌM TẤT CẢ SẢN PHẨM THUỘC LOẠI NÀY
    const products = getProductsFromAdmin();
    const productsInCategory = products.filter(p => p.category === category);
    
    if (productsInCategory.length === 0) {
        alert(`❌ Không có sản phẩm thuộc loại: ${category}`);
        return;
    }
    
    // ✅ TÍNH TỒN THỰC TẾ CHO TẤT CẢ SẢN PHẨM TRONG LOẠI
    let totalStockInCategory = 0;
    productsInCategory.forEach(p => {
        const bookId = parseInt(p.id.replace('SP', '').replace(/^0+/, '')) || 0;
        totalStockInCategory += getCurrentStock(bookId);
    });
    
    // ✅ ĐỌC GIAO DỊCH TỪ INVENTORY
    inventory = loadInventory();
    
    let filtered = inventory.filter(item => item.category === category);
    
    if (fromDate && toDate) {
        filtered = filtered.filter(item => {
            return item.date >= fromDate && item.date <= toDate;
        });
    }
    
    const dateRange = fromDate && toDate ? `${fromDate} đến ${toDate}` : 'Tất cả';
    
    // ✅ TÍNH GIAO DỊCH TRONG KHOẢNG THỜI GIAN
    const totalImport = filtered.filter(x => x.type === 'Nhập').reduce((sum, x) => sum + x.quantity, 0);
    const totalExport = filtered.filter(x => x.type === 'Xuất').reduce((sum, x) => sum + x.quantity, 0);
    
    // ✅ KẾT QUẢ THEO LOẠI TRA CỨU
    let result = 0;
    let displayType = transactionType || 'Tất cả';
    
    if (transactionType === 'Tồn') {
        result = totalStockInCategory;  // ✅ TỒN THỰC TẾ
    } else if (transactionType === 'Nhập') {
        result = totalImport;
    } else if (transactionType === 'Xuất') {
        result = totalExport;
    } else {
        result = { 
            totalImport: totalImport, 
            totalExport: totalExport, 
            totalStock: totalStockInCategory  // ✅ TỒN THỰC TẾ
        };
    }
    
    showCategoryResult(category, displayType, dateRange, result);
}

// ============================================
// HIỂN THỊ POPUP - LỌC MÃ SẢN PHẨM
// ============================================

function showProductResult(productId, productName, category, type, dateRange, result) {
    const resultBody = document.getElementById('resultTableBody');
    
    let resultHTML = '';
    
    if (typeof result === 'object') {
        resultHTML = `
            <tr>
                <td><strong>Mã sản phẩm:</strong></td>
                <td>${productId}</td>
            </tr>
            <tr>
                <td><strong>Tên sản phẩm:</strong></td>
                <td>${productName}</td>
            </tr>
            <tr>
                <td><strong>Loại sách:</strong></td>
                <td>${category}</td>
            </tr>
            <tr>
                <td><strong>Loại tra cứu:</strong></td>
                <td>${type}</td>
            </tr>
            <tr>
                <td><strong>Khoảng thời gian:</strong></td>
                <td>${dateRange}</td>
            </tr>
            <tr>
                <td><strong>Kết quả:</strong></td>
                <td>
                    <div style="line-height: 1.8;">
                        <span style="color: #16a34a; font-weight: 600;">Nhập (trong khoảng): ${result.totalImport}</span><br>
                        <span style="color: #dc2626; font-weight: 600;">Xuất (trong khoảng): ${result.totalExport}</span><br>
                        <span style="color: #2563eb; font-weight: 700; font-size: 1.2em;">Tồn (hiện tại): ${result.totalStock}</span>
                    </div>
                </td>
            </tr>
        `;
    } else {
        resultHTML = `
            <tr>
                <td><strong>Mã sản phẩm:</strong></td>
                <td>${productId}</td>
            </tr>
            <tr>
                <td><strong>Tên sản phẩm:</strong></td>
                <td>${productName}</td>
            </tr>
            <tr>
                <td><strong>Loại sách:</strong></td>
                <td>${category}</td>
            </tr>
            <tr>
                <td><strong>Loại tra cứu:</strong></td>
                <td>${type}</td>
            </tr>
            <tr>
                <td><strong>Khoảng thời gian:</strong></td>
                <td>${dateRange}</td>
            </tr>
            <tr>
                <td><strong>Kết quả:</strong></td>
                <td><strong style="font-size: 1.5em; color: #2563eb;">${result}</strong></td>
            </tr>
        `;
    }
    
    resultBody.innerHTML = resultHTML;
    
    const popup = document.getElementById('resultPopup');
    popup.classList.add('active');
}

// ============================================
// HIỂN THỊ POPUP - LỌC LOẠI SÁCH
// ============================================

function showCategoryResult(category, type, dateRange, result) {
    const resultBody = document.getElementById('resultTableBody');
    
    let resultHTML = '';
    
    if (typeof result === 'object') {
        resultHTML = `
            <tr>
                <td><strong>Loại sách:</strong></td>
                <td>${category}</td>
            </tr>
            <tr>
                <td><strong>Loại tra cứu:</strong></td>
                <td>${type}</td>
            </tr>
            <tr>
                <td><strong>Khoảng thời gian:</strong></td>
                <td>${dateRange}</td>
            </tr>
            <tr>
                <td><strong>Kết quả:</strong></td>
                <td>
                    <div style="line-height: 1.8;">
                        <span style="color: #16a34a; font-weight: 600;">Nhập (trong khoảng): ${result.totalImport}</span><br>
                        <span style="color: #dc2626; font-weight: 600;">Xuất (trong khoảng): ${result.totalExport}</span><br>
                        <span style="color: #2563eb; font-weight: 700; font-size: 1.2em;">Tồn (hiện tại): ${result.totalStock}</span>
                    </div>
                </td>
            </tr>
        `;
    } else {
        resultHTML = `
            <tr>
                <td><strong>Loại sách:</strong></td>
                <td>${category}</td>
            </tr>
            <tr>
                <td><strong>Loại tra cứu:</strong></td>
                <td>${type}</td>
            </tr>
            <tr>
                <td><strong>Khoảng thời gian:</strong></td>
                <td>${dateRange}</td>
            </tr>
            <tr>
                <td><strong>Kết quả:</strong></td>
                <td><strong style="font-size: 1.5em; color: #2563eb;">${result}</strong></td>
            </tr>
        `;
    }
    
    resultBody.innerHTML = resultHTML;
    
    const popup = document.getElementById('resultPopup');
    popup.classList.add('active');
}

// ============================================
// ĐÓNG POPUP KẾT QUẢ
// ============================================

function closeResultPopup() {
    const popup = document.getElementById('resultPopup');
    popup.classList.remove('active');
}

// ============================================
// KHỞI TẠO KHI TRANG LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('inventoryTable')) {
        inventory = loadInventory();
        displayInventory();
        
        // ✅ POPULATE DROPDOWN LOẠI SÁCH
        populateCategoryFilter();
        
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
    }
});