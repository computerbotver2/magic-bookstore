// ============================================
// BIẾN TOÀN CỤC
// ============================================

let importOrders = [];
let importEditIndex = null;
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

// KIỂM TRA LOG TỒN KHO ĐÃ TỒN TẠI CHƯA
function isInventoryEntryExist(arr, log) {
    return arr.some(item =>
        item.id === log.id &&
        item.date === log.date &&
        item.type === log.type &&
        item.quantity === log.quantity &&
        item.name === log.name &&
        (item.orderId ? item.orderId === log.orderId : true)
    );
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
            const realIndex = importOrders.findIndex(o => o.id === order.id);
            html += `<tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.date}</td>
                <td style="text-align: left;">`;
            order.products.forEach(p => {
                html += `<div>• ${p.name}: <strong>${p.quantity}</strong> × ${(p.importPrice).toLocaleString()}₫ = <strong>${(p.quantity * p.importPrice).toLocaleString()}₫</strong></div>`;
            });
            html += `</td>
                <td><strong style="color: #e74c3c;">${order.total.toLocaleString()}₫</strong></td>
                <td><span class="badge ${order.status === 'pending' ? 'warning':'success'}">${importStatusText[order.status]}</span></td>
                <td><div class="action-btns">`;
            if (order.status === 'pending') {
                html += `
                    <button class="btn-icon edit" onclick="openImportEditModal(${realIndex})" title="Sửa">
                        <i class='bx bx-edit'></i>
                    </button>
                    <button class="btn-icon finish" onclick="completeImport(${realIndex})" title="Hoàn thành">
                        <i class='bx bx-check'></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteImport(${realIndex})" title="Xóa">
                        <i class='bx bx-trash'></i>
                    </button>`;
            } else {
                html += `<span style="color: #95a5a6;">Đã hoàn thành</span>`;
            }
            html += `</div></td></tr>`;
        });
    }
    const table = document.getElementById('importOrdersTable');
    if (table) table.innerHTML = html;
}
// ----- Modal logic -----
function openImportModal(isEdit=false, editIndex=null) {
    const modal = document.getElementById('importModal');
    document.getElementById('importProductError').textContent = '';
    if (isEdit && editIndex !== null) {
        // Sửa phiếu
        importEditIndex = editIndex;
        const order = importOrders[editIndex];
        document.getElementById('importModalTitle').textContent = 'Sửa Phiếu Nhập';
        document.getElementById('importIndex').value = editIndex;
        document.getElementById('importId').value = order.id;
        document.getElementById('importDate').value = order.date;

        renderImportProductRows(order.products);
        calculateImportTotal();
    } else {
        // Thêm phiếu
        importEditIndex = null;
        document.getElementById('importModalTitle').textContent = 'Thêm Phiếu Nhập Mới';
        document.getElementById('importIndex').value = '';
        document.getElementById('importId').value = 'PN' + String(importOrders.length+1).padStart(3, '0');
        document.getElementById('importDate').value = new Date().toISOString().slice(0,10);
        renderImportProductRows([]);
        calculateImportTotal();
    }
    modal.style.display = 'block';
}
function closeImportModal() {
    document.getElementById('importModal').style.display = 'none';
}
function openImportEditModal(index) { openImportModal(true,index); }

// ------ HÀM render bảng sp nhập cho modal ------
function getAdminProductList() {
    const ps = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    return ps.filter(p => p.status === 'active').map(p => ({id:p.id, name:p.name}));
}
let currentImportProducts = [];
function renderImportProductRows(products) {
    currentImportProducts = products.slice();
    const tbody = document.getElementById('importProductRows');
    const allProducts = getAdminProductList();
    let rows = '';
    products.forEach((prod, i) => {
        rows += `<tr>
            <td>
                <select onchange="changeImportProductName(${i},this)">
                    <option value="">Chọn sản phẩm...</option>
                    ${allProducts.map(ap => 
                      `<option value="${ap.name}" ${ap.name===prod.name?'selected':''}
                        ${products.some((p,idx)=>p.name===ap.name&&idx!==i)?'disabled':''}>
                        ${ap.name}
                      </option>`
                    ).join('')}
                </select>
            </td>
            <td><input type="number" min="1" value="${prod.quantity}" onchange="changeImportProductQty(${i},this)" required></td>
            <td><input type="number" min="1" value="${prod.importPrice}" onchange="changeImportProductPrice(${i},this)" required></td>
            <td><span>${(prod.quantity*prod.importPrice).toLocaleString()}₫</span></td>
            <td><button type="button" class="delete-row-btn" onclick="deleteImportProductRow(${i})">&#10006;</button></td>
        </tr>`;
    });
    tbody.innerHTML = rows;
    calculateImportTotal();
}
function addImportProductRow() {
    const allProducts = getAdminProductList();
    const usedNames = currentImportProducts.map(p=>p.name);
    const availableProd = allProducts.find(p=>!usedNames.includes(p.name));
    if (!availableProd) {
        document.getElementById('importProductError').textContent="Đã chọn hết sản phẩm! Không thể thêm.";
        return;
    }
    currentImportProducts.push({
        name: availableProd.name,
        quantity: 1,
        importPrice: 100000
    });
    renderImportProductRows(currentImportProducts);
}

function changeImportProductName(i, select) {
    const val = select.value;
    if (!val) return;
    if (currentImportProducts.some((p,idx)=>p.name===val&&idx!==i)) {
        document.getElementById('importProductError').textContent='Sản phẩm đã có trong phiếu nhập, vui lòng sửa dòng trước!';
        select.value=''; return;
    }
    currentImportProducts[i].name = val;
    document.getElementById('importProductError').textContent='';
    renderImportProductRows(currentImportProducts);
}
function changeImportProductQty(i, input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) {input.value=1; val=1;}
    currentImportProducts[i].quantity = val;
    calculateImportTotal();
    renderImportProductRows(currentImportProducts);
}
function changeImportProductPrice(i, input) {
    let val = parseInt(input.value);
    if (isNaN(val) || val < 1) {input.value=100000; val=100000;}
    currentImportProducts[i].importPrice = val;
    calculateImportTotal();
    renderImportProductRows(currentImportProducts);
}
function deleteImportProductRow(i) {
    currentImportProducts.splice(i, 1);
    renderImportProductRows(currentImportProducts);
}
function calculateImportTotal() {
    let sum = currentImportProducts.reduce((acc,p)=>acc+p.quantity*p.importPrice,0);
    document.getElementById('importTotal').textContent = sum.toLocaleString()+'₫';
}

// ----- Submit/save -----
document.getElementById('importForm').onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('importId').value.trim();
    const date = document.getElementById('importDate').value;
    const status = 'pending';
    // Validation
    if (!date) { alert('Ngày nhập không được để trống!'); return; }
    if (!currentImportProducts.length) {
        document.getElementById('importProductError').textContent='Cần nhập ít nhất 1 sản phẩm!';
        return;
    }
    for (let p of currentImportProducts) {
        if (!p.name||!p.quantity||!p.importPrice) {
            document.getElementById('importProductError').textContent="Sản phẩm, số lượng, giá phải nhập đầy đủ!";
            return;
        }
        if (currentImportProducts.filter(x=>x.name===p.name).length > 1) {
            document.getElementById('importProductError').textContent="Không được chọn 2 sản phẩm giống nhau!";
            return;
        }
        if (parseInt(p.quantity) < 1 || parseInt(p.importPrice) < 1) {
            document.getElementById('importProductError').textContent="Số lượng và giá phải là số nguyên dương!";
            return;
        }
    }
    let productsCopy = currentImportProducts.map(p=>({...p}));
    let total = productsCopy.reduce((acc,p)=>acc+p.quantity*p.importPrice,0);

    if (importEditIndex !== null) {
        importOrders[importEditIndex].date = date;
        importOrders[importEditIndex].products = productsCopy;
        importOrders[importEditIndex].total = total;
    } else {
        importOrders.push({ id, date, status, products: productsCopy, total });
    }
    saveImportOrders();
    displayImportOrders();
    closeImportModal();
    alert('✅ Lưu phiếu nhập thành công!');
};

// --- KHỞI TẠO ---
document.addEventListener('DOMContentLoaded', function() {
    importOrders = JSON.parse(localStorage.getItem('importOrders')) || [];
    saveImportOrders();
    if (document.getElementById('importOrdersTable')) {
        displayImportOrders();
    }
    // Gắn nút modal
    const btnAdd = document.querySelector("#imports .btn.btn-primary");
    if (btnAdd) btnAdd.onclick = ()=>openImportModal(false,null);
});


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
            let logItem = {
                id: productCode,
                name: product.name,
                category: bookCategory,
                date: order.date,
                type: "Nhập",
                quantity: product.quantity,
                orderId: order.id
            };
            if (!isInventoryEntryExist(inventory, logItem)) {
                inventory.push(logItem);
            }
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
                    let logItem = {
                        id: productCode,
                        name: product.name,
                        category: bookCategory,
                        date: order.date,
                        type: "Nhập",
                        quantity: product.quantity,
                        orderId: order.id
                    };
                    if (!isInventoryEntryExist(inventory, logItem)) {
                        inventory.push(logItem);
                    }
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
