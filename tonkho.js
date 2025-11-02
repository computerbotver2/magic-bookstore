// Dữ liệu tồn kho
let inventory = [
    { id: "SP001", name: "The Lumina Chronicles: Whispers of the Sunstone Oracle", opening: 100, import: 50, export: 80, closing: 70, minStock: 20 },
    { id: "SP002", name: "The Journey of a Thousand Steps: A Life Lived in Pursuit of Dreams", opening: 80, import: 40, export: 95, closing: 25, minStock: 30 },
    { id: "SP003", name: "Ignite Your Inner Universe: Unlock Your Potential & Create Your Reality", opening: 50, import: 30, export: 65, closing: 15, minStock: 20 },
    { id: "SP004", name: "The Magical Treehouse Adventure: A Tale of Friendship and Flying Wishes", opening: 120, import: 60, export: 70, closing: 110, minStock: 25 },
    { id: "SP005", name: "Stardust & Serendipity: A Love Story Written in the Stars", opening: 40, import: 20, export: 48, closing: 12, minStock: 15 },
    { id: "SP006", name: "Whispers of the Wildflower Heart: A Timeless Romance Blossom", opening: 100, import: 50, export: 80, closing: 70, minStock: 20 },
    { id: "SP007", name: "Echoes of Cosmos: Across the Quantum Divide", opening: 80, import: 40, export: 95, closing: 25, minStock: 30 },
    { id: "SP008", name: "Wuthering Heights: A Novel of Passion and Vengeance", opening: 50, import: 30, export: 65, closing: 15, minStock: 20 },
    { id: "SP009", name: "The Eldoria Chronicles: Quest for the Starfall Blade", opening: 120, import: 60, export: 70, closing: 110, minStock: 25 },
    { id: "SP010", name: "The Silk Road Odyssey: A Nomad's Journey to the Ends of Earth", opening: 40, import: 20, export: 48, closing: 12, minStock: 15 },
    { id: "SP011", name: "Nightmare Echoes: When the Past Haunts", opening: 40, import: 20, export: 48, closing: 12, minStock: 15 },
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
