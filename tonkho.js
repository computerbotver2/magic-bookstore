// Dữ liệu tồn kho
let inventory = [
    { id: "SP001", name: "Đắc Nhân Tâm", opening: 100, import: 50, export: 80, closing: 70, minStock: 20 },
    { id: "SP002", name: "Nhà Giả Kim", opening: 80, import: 40, export: 95, closing: 25, minStock: 30 },
    { id: "SP003", name: "Sapiens", opening: 50, import: 30, export: 65, closing: 15, minStock: 20 },
    { id: "SP004", name: "Tuổi Trẻ Đáng Giá", opening: 120, import: 60, export: 70, closing: 110, minStock: 25 },
    { id: "SP005", name: "Cà Phê Cùng Tony", opening: 40, import: 20, export: 48, closing: 12, minStock: 15 },
];

// Hiển thị bảng tồn kho
function displayInventory(filteredData = inventory) {
    let html = '';
    filteredData.forEach(item => {
        const status = item.closing <= item.minStock ? 'low-stock' : 'in-stock';
        const badge = status === 'low-stock' ? 
            `<span class="badge danger">Sắp hết</span>` : 
            `<span class="badge success">Đủ hàng</span>`;
        
        html += `<tr>`;
        html += `<td><strong>${item.id}</strong></td>`;
        html += `<td>${item.name}</td>`;
        html += `<td>${item.opening}</td>`;
        html += `<td class="text-success">+${item.import}</td>`;
        html += `<td class="text-danger">-${item.export}</td>`;
        html += `<td><strong>${item.closing}</strong></td>`;
        html += `<td>${badge}</td>`;
        html += `</tr>`;
    });
    
    const table = document.getElementById('inventoryTable');
    if (table) {
        table.innerHTML = html;
    }
    
    updateStats();
}

// Cập nhật thống kê
function updateStats() {
    const total = inventory.length;
    const lowStock = inventory.filter(item => item.closing <= item.minStock).length;
    const inStock = total - lowStock;
    
    const totalEl = document.getElementById('totalProducts');
    const lowEl = document.getElementById('lowStockCount');
    const inEl = document.getElementById('inStockCount');
    
    if (totalEl) totalEl.textContent = total;
    if (lowEl) lowEl.textContent = lowStock;
    if (inEl) inEl.textContent = inStock;
}

// Lọc tồn kho
function filterInventory() {
    const filter = document.getElementById('inventoryFilter').value;
    
    let filtered = inventory;
    
    if (filter === 'low') {
        filtered = inventory.filter(item => item.closing <= item.minStock);
    } else if (filter === 'normal') {
        filtered = inventory.filter(item => item.closing > item.minStock);
    }
    
    displayInventory(filtered);
}

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('inventoryTable')) {
        displayInventory();
        // Set ngày hiện tại
        const today = new Date().toISOString().split('T')[0];
        const fromDate = document.getElementById('inventoryFromDate');
        const toDate = document.getElementById('inventoryToDate');
        if (fromDate && toDate) {
            fromDate.value = today;
            toDate.value = today;
        }
    }
});