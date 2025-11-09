// ============================================
// BIẾN TOÀN CỤC
// ============================================

let importOrders = [];

const importStatusText = {
    pending: "Chờ nhập",
    completed: "Đã hoàn thành"
};

const importStatusClass = {
    pending: "warning",
    completed: "success"
};

// ============================================
// LƯU DỮ LIỆU
// ============================================

function saveImportOrders() {
    localStorage.setItem('importOrders', JSON.stringify(importOrders));
}

// ============================================
// HIỂN THỊ DANH SÁCH
// ============================================

function displayImportOrders(filteredData = importOrders) {
    let html = '';
    
    if (filteredData.length === 0) {
        html = '<tr><td colspan="6" style="text-align:center;padding:20px;color:#999;">Chưa có phiếu nhập nào</td></tr>';
    } else {
        filteredData.forEach((order, index) => {
            // Tìm index thực trong mảng gốc
            const realIndex = importOrders.findIndex(o => o.id === order.id);
            
            html += `<tr>`;
            html += `<td><strong>${order.id}</strong></td>`;
            html += `<td>${order.date}</td>`;
            
            // HIỂN THỊ CHI TIẾT SẢN PHẨM TRONG CELL
            html += `<td style="text-align: left;">`;
            order.products.forEach(p => {
                html += `<div style="margin: 3px 0;">
                            • ${p.name}: <strong>${p.quantity}</strong> × ${p.importPrice.toLocaleString()}₫ 
                            = <strong>${(p.quantity * p.importPrice).toLocaleString()}₫</strong>
                         </div>`;
            });
            html += `</td>`;
            
            html += `<td><strong style="color: #e74c3c;">${order.total.toLocaleString()}₫</strong></td>`;
            html += `<td><span class="badge ${importStatusClass[order.status]}">${importStatusText[order.status]}</span></td>`;
            
            html += `<td><div class="action-btns">`;
            
            // CHỈ CHO SỬA KHI PENDING
            if (order.status === 'pending') {
                html += `
                    <button class="btn-icon edit" onclick="editImport(${realIndex})" title="Sửa">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="btn-icon view" onclick="completeImport(${realIndex})" title="Hoàn thành">
                        <i class='bx bx-check'></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteImport(${realIndex})" title="Xóa">
                        <i class='bx bx-trash'></i>
                    </button>`;
            } else {
                html += `<span style="color: #95a5a6;">Đã hoàn thành</span>`;
            }
            
            html += `</div></td>`;
            html += `</tr>`;
        });
    }
    
    const table = document.getElementById('importOrdersTable');
    if (table) {
        table.innerHTML = html;
    }
}

// ============================================
// THÊM PHIẾU NHẬP MỚI
// ============================================

function addImportOrder() {
    const products = [];
    let total = 0;
    
    // Nhập ngày
    const dateInput = prompt("Nhập ngày nhập hàng (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    if (!dateInput || !/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
        alert("❌ Ngày không hợp lệ!");
        return;
    }
    
    // Nhập sản phẩm (vòng lặp)
    while (true) {
        const productName = prompt("Nhập tên sản phẩm (hoặc bỏ trống để kết thúc):");
        if (!productName || productName.trim() === "") break;
        
        const quantity = parseInt(prompt(`Số lượng ${productName}:`));
        if (!quantity || quantity <= 0) {
            alert("❌ Số lượng không hợp lệ!");
            continue;
        }
        
        // ✅ GIÁ NHẬP CỐ ĐỊNH = 100,000₫ (KHÔNG CHO NHẬP)
        const importPrice = 100000;
        console.log(`💰 Giá nhập mặc định: ${importPrice.toLocaleString()}₫`);
                
        products.push({
            name: productName.trim(),
            quantity: quantity,
            importPrice: importPrice
        });
        
        total += quantity * importPrice;
        
        const continueAdd = confirm(`✅ Đã thêm ${productName}\nTiếp tục thêm sản phẩm?`);
        if (!continueAdd) break;
    }
    
    if (products.length === 0) {
        alert("❌ Phải có ít nhất 1 sản phẩm!");
        return;
    }
    
    const newId = "PN" + String(importOrders.length + 1).padStart(3, '0');
    
    importOrders.push({
        id: newId,
        date: dateInput,
        status: "pending",
        products: products,
        total: total
    });
    
    saveImportOrders();
    displayImportOrders();
    alert(`✅ Đã tạo phiếu nhập ${newId}!\nTổng: ${total.toLocaleString()}₫`);
}

// ============================================
// SỬA PHIẾU NHẬP - CHỈ KHI PENDING
// ============================================

function editImport(index) {
    const order = importOrders[index];
    
    // KIỂM TRA TRẠNG THÁI
    if (order.status !== 'pending') {
        alert("❌ Chỉ có thể sửa phiếu nhập chưa hoàn thành!");
        return;
    }
    
    // 1️⃣ SỬA NGÀY (TÙY CHỌN)
    const changeDate = confirm("Bạn có muốn thay đổi ngày nhập không?");
    if (changeDate) {
        const newDate = prompt("Nhập ngày mới (YYYY-MM-DD):", order.date);
        if (newDate && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
            order.date = newDate;
        }
    }
    
    // 2️⃣ HIỂN THỊ DANH SÁCH SẢN PHẨM
    let productList = "📦 Danh sách sản phẩm hiện tại:\n\n";
    order.products.forEach((p, i) => {
        productList += `${i + 1}. ${p.name} - SL: ${p.quantity} - Giá: ${p.importPrice.toLocaleString()}₫\n`;
    });
    alert(productList);
    
    // 3️⃣ CHỌN SẢN PHẨM CẦN SỬA
    const productIndex = parseInt(prompt("Nhập số thứ tự sản phẩm cần sửa (hoặc 0 để hủy):")) - 1;
    
    if (productIndex < 0 || productIndex >= order.products.length) {
        alert("❌ Đã hủy sửa!");
        return;
    }
    
    const p = order.products[productIndex];
    
    // 4️⃣ SỬA THÔNG TIN SẢN PHẨM
    const newName = prompt("Tên sản phẩm:", p.name);
    if (newName && newName.trim() !== "") {
        p.name = newName.trim();
    }
    
    const newQty = parseInt(prompt("Số lượng:", p.quantity));
    if (newQty && newQty > 0) {
        p.quantity = newQty;
    }
    
    const newPrice = parseInt(prompt("Giá nhập:", p.importPrice));
    if (newPrice && newPrice > 0) {
        p.importPrice = newPrice;
    }
    
        // 5️⃣ TÍNH LẠI TỔNG
    order.total = order.products.reduce((sum, p) => sum + (p.quantity * p.importPrice), 0);

    // 6️⃣ CẬP NHẬT GIÁ VỐN VÀO BOOKSTORE_PRODUCTS
    const defaultBooks = [
        {id:1, title:"Tôi thấy hoa vàng trên cỏ xanh"},
        {id:2, title:"Đắc nhân tâm"},
        {id:3, title:"Nhà giả kim"},
        {id:4, title:"Cho tôi xin một vé đi tuổi thơ"},
        {id:5, title:"Dế mèn phiêu lưu ký"},
        {id:6, title:"Tuổi thơ dữ dội"},
        {id:7, title:"Số đỏ"},
        {id:8, title:"Nỗi buồn chiến tranh"},
        {id:9, title:"Tư duy nhanh và chậm"},
        {id:10, title:"Tuổi trẻ đáng giá bao nhiêu"},
        {id:11, title:"Khởi nghiệp 4.0"},
        {id:12, title:"Hãy sống ở thể chủ động"},
        {id:13, title:"Làm đĩ"},
        {id:14, title:"Tôi tài giỏi, bạn cũng thế!"},
        {id:15, title:"Kể chuyện trước giờ đi ngủ"},
        {id:16, title:"Bộ não và tâm trí"},
        {id:17, title:"Bạn đắt giá bao nhiêu?"},
        {id:18, title:"Một đời như kẻ tìm đường"},
        {id:19, title:"3 người thầy vĩ đại"},
        {id:20, title:"Những tù nhân của địa lý"},
        {id:21, title:"Tinh hoa trí tuệ do thái"},
        {id:22, title:"Nghĩ giàu và làm giàu"},
        {id:23, title:"Hiểu về trái tim"},
        {id:24, title:"Đừng bao giờ đi ăn một mình"},
        {id:25, title:"Đọc vị bất kì ai"},
        {id:26, title:"Ra bờ suối ngắm hoa kèn hồng"},
        {id:27, title:"Con chim xanh biếc quay về"}
    ];

    const bookName = p.name.toLowerCase().trim();
    const defaultBook = defaultBooks.find(b => 
        b.title.toLowerCase().trim() === bookName
    );

    if (defaultBook) {
        const bookId = defaultBook.id;
        const productCode = "SP" + String(bookId).padStart(3, '0');
        
        const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
        const productInAdmin = products.find(pr => pr.id === productCode);
        
        if (productInAdmin) {
            productInAdmin.costPrice = p.importPrice;
            const profitRate = productInAdmin.profitRate || 10;
            const profit = (p.importPrice * profitRate) / 100;
            productInAdmin.price = Math.round(p.importPrice + profit);
            
            localStorage.setItem('bookstore_products', JSON.stringify(products));
            console.log(`💰 Đã cập nhật giá vốn ${p.name}: ${p.importPrice.toLocaleString()}₫ → Giá bán: ${productInAdmin.price.toLocaleString()}₫`);
            
            // ✅ TRIGGER SỰ KIỆN ĐỂ GIABAN.JS CẬP NHẬT
            window.dispatchEvent(new Event('storage'));
        }
    }

    saveImportOrders();
    displayImportOrders();
    alert("✅ Đã cập nhật phiếu nhập và giá vốn!");
}
// ============================================
// HOÀN THÀNH PHIẾU NHẬP - CẬP NHẬT TỒN KHO
// ============================================

// ============================================
// HOÀN THÀNH PHIẾU NHẬP - CẬP NHẬT TỒN KHO (✅ HỖ TRỢ SẢN PHẨM MỚI)
// ============================================

function completeImport(index) {
    if (confirm("✅ Xác nhận hoàn thành phiếu nhập?\nSau khi hoàn thành sẽ KHÔNG THỂ SỬA!")) {
        const order = importOrders[index];
        
        const adminProducts = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
        
        const defaultBooks = [
            {id:1, title:"Tôi thấy hoa vàng trên cỏ xanh", category:"Văn học"},
            {id:2, title:"Đắc nhân tâm", category:"Tâm lý"},
            {id:3, title:"Nhà giả kim", category:"Văn học"},
            {id:4, title:"Cho tôi xin một vé đi tuổi thơ", category:"Thiếu nhi"},
            {id:5, title:"Dế mèn phiêu lưu ký", category:"Thiếu nhi"},
            {id:6, title:"Tuổi thơ dữ dội", category:"Văn học"},
            {id:7, title:"Số đỏ", category:"Văn học"},
            {id:8, title:"Nỗi buồn chiến tranh", category:"Văn học"},
            {id:9, title:"Tư duy nhanh và chậm", category:"Tâm lý"},
            {id:10, title:"Tuổi trẻ đáng giá bao nhiêu", category:"Tản văn"},
            {id:11, title:"Khởi nghiệp 4.0", category:"Kinh tế"},
            {id:12, title:"Hãy sống ở thể chủ động", category:"Tâm lý"},
            {id:13, title:"Làm đĩ", category:"Văn học"},
            {id:14, title:"Tôi tài giỏi, bạn cũng thế!", category:"Học tập"},
            {id:15, title:"Kể chuyện trước giờ đi ngủ", category:"Thiếu nhi"},
            {id:16, title:"Bộ não và tâm trí", category:"Tâm lý"},
            {id:17, title:"Bạn đắt giá bao nhiêu?", category:"Tản văn"},
            {id:18, title:"Một đời như kẻ tìm đường", category:"Tiểu sử"},
            {id:19, title:"3 người thầy vĩ đại", category:"Tâm lý"},
            {id:20, title:"Những tù nhân của địa lý", category:"Học tập"},
            {id:21, title:"Tinh hoa trí tuệ do thái", category:"Kinh doanh"},
            {id:22, title:"Nghĩ giàu và làm giàu", category:"Kinh doanh"},
            {id:23, title:"Hiểu về trái tim", category:"Tâm lý"},
            {id:24, title:"Đừng bao giờ đi ăn một mình", category:"Tâm lý"},
            {id:25, title:"Đọc vị bất kì ai", category:"Tâm lý"},
            {id:26, title:"Ra bờ suối ngắm hoa kèn hồng", category:"Văn học"},
            {id:27, title:"Con chim xanh biếc quay về", category:"Tản văn"}
        ];
        
        // ✅ ĐỌC INVENTORY HIỆN TẠI
        let inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
        
        order.products.forEach(product => {
            let bookId = null;
            let bookCategory = null;
            let productCode = null;
            const bookName = product.name.toLowerCase().trim();
            
            // ✅ 1️⃣ TÌM TRONG defaultBooks (27 cuốn cố định)
            const defaultBook = defaultBooks.find(b => 
                b.title.toLowerCase().trim() === bookName
            );
            
            if (defaultBook) {
                bookId = defaultBook.id;
                bookCategory = defaultBook.category;
                productCode = "SP" + String(bookId).padStart(3, '0');
                console.log(`📚 Tìm thấy trong 27 cuốn: ${product.name} → ${productCode}`);
            } else {
                // ✅ 2️⃣ TÌM TRONG adminProducts (sản phẩm do admin thêm)
                const adminProduct = adminProducts.find(p => 
                    p.name.toLowerCase().trim() === bookName && p.status === 'active'
                );
                
                if (adminProduct) {
                    // ✅ SẢN PHẨM MỚI → LẤY ID TỪ ADMIN
                    productCode = adminProduct.id; // VD: "SP028", "SP999"
                    bookId = parseInt(productCode.replace('SP', '').replace(/^0+/, '')) || 999;
                    bookCategory = adminProduct.category;
                    
                    console.log(`🆕 Tìm thấy sản phẩm mới: ${product.name} → ${productCode} (ID: ${bookId})`);
                } else {
                    // ❌ KHÔNG TÌM THẤY TRONG CẢ 2 → BỎ QUA
                    console.warn(`⚠️ Không tìm thấy sản phẩm: ${product.name}`);
                    alert(`⚠️ Không tìm thấy sản phẩm "${product.name}" trong hệ thống!\n\nVui lòng thêm sản phẩm này vào "Quản lý Sản phẩm" trước.`);
                    return; // Skip sản phẩm này
                }
            }
            
            // ✅ 3️⃣ CẬP NHẬT TỒN KHO
            const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
            stockData[bookId] = (stockData[bookId] || 0) + product.quantity;
            localStorage.setItem('bookstore_stock', JSON.stringify(stockData));
            
            // ✅ 4️⃣ CẬP NHẬT GIÁ VỐN VÀO BOOKSTORE_PRODUCTS
            const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
            const productInAdmin = products.find(p => p.id === productCode);
            if (productInAdmin) {
                productInAdmin.costPrice = product.importPrice;
                
                // Tính lại giá bán
                const profitRate = productInAdmin.profitRate || 10;
                const profit = (product.importPrice * profitRate) / 100;
                productInAdmin.price = Math.round(product.importPrice + profit);
                
                console.log(`💰 Cập nhật giá vốn ${product.name}: ${product.importPrice.toLocaleString()}₫ → Giá bán: ${productInAdmin.price.toLocaleString()}₫`);
            }
            localStorage.setItem('bookstore_products', JSON.stringify(products));
            
            // ✅ 5️⃣ GHI LOG VÀO INVENTORY
            inventory.push({
                id: productCode,
                name: product.name,
                category: bookCategory,
                date: order.date,
                type: "Nhập",
                quantity: product.quantity
            });
            
            console.log(`✅ Cộng tồn kho: ${product.name} (${productCode}, ID: ${bookId}) +${product.quantity} → Tổng: ${stockData[bookId]}`);
        });
        
        // ✅ LƯU INVENTORY
        localStorage.setItem('inventory', JSON.stringify(inventory));
        
        order.status = "completed";
        saveImportOrders();
        displayImportOrders();
        
        alert("✅ Đã hoàn thành phiếu nhập và cập nhật tồn kho!");
    }
}

// ============================================
// XÓA PHIẾU NHẬP
// ============================================

function deleteImport(index) {
    if (confirm("❌ Bạn có chắc muốn xóa phiếu nhập này?")) {
        importOrders.splice(index, 1);
        saveImportOrders();
        displayImportOrders();
        alert("✅ Đã xóa phiếu nhập!");
    }
}

// ============================================
// TÌM KIẾM
// ============================================

function filterImportOrders() {
    const dateInput = document.getElementById('importDate').value;
    const statusInput = document.getElementById('importStatus').value;
    
    let filtered = importOrders;
    
    if (dateInput) {
        filtered = filtered.filter(o => o.date === dateInput);
    }
    
    if (statusInput) {
        filtered = filtered.filter(o => o.status === statusInput);
    }
    
    displayImportOrders(filtered);
}

// ============================================
// KHỞI TẠO DỮ LIỆU TỒN KHO BAN ĐẦU
// ============================================

function initializeDefaultStock() {
    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
    
    // Nếu chưa có dữ liệu → Tạo tồn kho = 0 cho tất cả sách
    if (Object.keys(stockData).length === 0) {
        const defaultStock = {};
        
        // ✅ KHỞI TẠO TỒN KHO = 0 CHO TẤT CẢ 27 CUỐN
        for (let i = 1; i <= 27; i++) {
            defaultStock[i] = 0;
        }
        
        localStorage.setItem('bookstore_stock', JSON.stringify(defaultStock));
        console.log('✅ Đã khởi tạo tồn kho = 0 cho 27 cuốn sách');
    }
}

// ============================================
// KHỞI TẠO KHI TRANG LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ✅ KHỞI TẠO TỒN KHO
    initializeDefaultStock();
    // ✅ LOAD LẠI DỮ LIỆU TỪ LOCALSTORAGE (KHÔNG CÓ DỮ LIỆU MẪU)
    importOrders = JSON.parse(localStorage.getItem('importOrders')) || [];
    
    // ✅ LƯU LẠI VÀO LOCALSTORAGE
    saveImportOrders();
    
    // ✅ HIỂN THỊ
    if (document.getElementById('importOrdersTable')) {
        displayImportOrders();
    }
});
// ============================================
// TỰ ĐỘNG ĐỒNG BỘ TỒN KHO CHO PHIẾU ĐÃ HOÀN THÀNH
// ============================================

// ============================================
// TỰ ĐỘNG ĐỒNG BỘ TỒN KHO CHO PHIẾU ĐÃ HOÀN THÀNH (CHẠY 1 LẦN DUY NHẤT)
// ============================================

function syncCompletedOrders() {
    // ✅ KIỂM TRA ĐÃ SYNC CHƯA
    const syncedFlag = localStorage.getItem('inventory_synced');
    if (syncedFlag === 'true') {
        console.log('✅ Đã đồng bộ inventory trước đó, bỏ qua...');
        return; // ← DỪNG LẠI, KHÔNG CHẠY NỮA
    }
    
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const orders = JSON.parse(localStorage.getItem('importOrders') || '[]');
    
    const completedOrders = orders.filter(o => o.status === 'completed');
    
    // Lấy danh sách phiếu đã có trong inventory
    const syncedOrderIds = new Set(inventory.map(i => i.orderId).filter(Boolean));
    
    let hasSync = false; // ← ĐẾM XEM CÓ SYNC GÌ KHÔNG
    
    completedOrders.forEach(order => {
        // Nếu phiếu chưa được ghi vào inventory
        if (!syncedOrderIds.has(order.id)) {
            console.log(`🔄 Đang đồng bộ phiếu ${order.id}...`);
            hasSync = true;
            
            const defaultBooks = [
                {id:1, title:"Tôi thấy hoa vàng trên cỏ xanh", category:"Văn học"},
                {id:2, title:"Đắc nhân tâm", category:"Tâm lý"},
                {id:3, title:"Nhà giả kim", category:"Văn học"},
                {id:4, title:"Cho tôi xin một vé đi tuổi thơ", category:"Thiếu nhi"},
                {id:5, title:"Dế mèn phiêu lưu ký", category:"Thiếu nhi"},
                {id:6, title:"Tuổi thơ dữ dội", category:"Văn học"},
                {id:7, title:"Số đỏ", category:"Văn học"},
                {id:8, title:"Nỗi buồn chiến tranh", category:"Văn học"},
                {id:9, title:"Tư duy nhanh và chậm", category:"Tâm lý"},
                {id:10, title:"Tuổi trẻ đáng giá bao nhiêu", category:"Tản văn"},
                {id:11, title:"Khởi nghiệp 4.0", category:"Kinh tế"},
                {id:12, title:"Hãy sống ở thể chủ động", category:"Tâm lý"},
                {id:13, title:"Làm đĩ", category:"Văn học"},
                {id:14, title:"Tôi tài giỏi, bạn cũng thế!", category:"Học tập"},
                {id:15, title:"Kể chuyện trước giờ đi ngủ", category:"Thiếu nhi"},
                {id:16, title:"Bộ não và tâm trí", category:"Tâm lý"},
                {id:17, title:"Bạn đắt giá bao nhiêu?", category:"Tản văn"},
                {id:18, title:"Một đời như kẻ tìm đường", category:"Tiểu sử"},
                {id:19, title:"3 người thầy vĩ đại", category:"Tâm lý"},
                {id:20, title:"Những tù nhân của địa lý", category:"Học tập"},
                {id:21, title:"Tinh hoa trí tuệ do thái", category:"Kinh doanh"},
                {id:22, title:"Nghĩ giàu và làm giàu", category:"Kinh doanh"},
                {id:23, title:"Hiểu về trái tim", category:"Tâm lý"},
                {id:24, title:"Đừng bao giờ đi ăn một mình", category:"Tâm lý"},
                {id:25, title:"Đọc vị bất kì ai", category:"Tâm lý"},
                {id:26, title:"Ra bờ suối ngắm hoa kèn hồng", category:"Văn học"},
                {id:27, title:"Con chim xanh biếc quay về", category:"Tản văn"}
            ];
            
            order.products.forEach(product => {
                const bookName = product.name.toLowerCase().trim();
                const defaultBook = defaultBooks.find(b => 
                    b.title.toLowerCase().trim() === bookName
                );
                
                if (defaultBook) {
                    const bookId = defaultBook.id;
                    const productCode = "SP" + String(bookId).padStart(3, '0');
                    
                    // ✅ CẬP NHẬT TỒN KHO
                    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
                    stockData[bookId] = (stockData[bookId] || 0) + product.quantity;
                    localStorage.setItem('bookstore_stock', JSON.stringify(stockData));
                    
                    // ✅ GHI LOG VÀO INVENTORY
                    inventory.push({
                        id: productCode,
                        name: product.name,
                        category: defaultBook.category,
                        date: order.date,
                        type: "Nhập",
                        quantity: product.quantity,
                        orderId: order.id
                    });
                    console.log(`✅ Đã sync: ${product.name} từ ${order.id} → Tồn: ${stockData[bookId]}`);
                }
            });
        }
    });
    
    if (hasSync) {
        localStorage.setItem('inventory', JSON.stringify(inventory));
        localStorage.setItem('inventory_synced', 'true'); // ← ĐÁNH DẤU ĐÃ SYNC
        console.log('✅ Hoàn tất đồng bộ, đánh dấu để không chạy lại!');
    }
}

// Gọi khi load trang
syncCompletedOrders();
// ============================================
// RESET BỘ LỌC
// ============================================

function resetFilter() {
    document.getElementById('importDate').value = '';
    document.getElementById('importStatus').value = '';
    displayImportOrders(); // Hiển thị tất cả
}