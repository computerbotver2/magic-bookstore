// Dữ liệu giá bán
let pricingData = [
    { id: "SP001", name: "Đắc Nhân Tâm", costPrice: 60000, profitRate: 30 },
    { id: "SP002", name: "Nhà Giả Kim", costPrice: 55000, profitRate: 35 },
    { id: "SP003", name: "Sapiens", costPrice: 140000, profitRate: 25 },
    { id: "SP004", name: "Tuổi Trẻ Đáng Giá Bao Nhiêu", costPrice: 50000, profitRate: 30 },
];

let defaultProfitRate = 30; // Tỷ lệ lợi nhuận mặc định

// Hiển thị bảng giá
function displayPricing() {
    let html = '';
    pricingData.forEach((item, index) => {
        let profit = (item.costPrice * item.profitRate) / 100;
        let salePrice = item.costPrice + profit;
        
        html += `<tr>`;
        html += `<td>${item.id}</td>`;
        html += `<td>${item.name}</td>`;
        html += `<td>${item.costPrice.toLocaleString()}₫</td>`;
        html += `<td><input type="number" value="${item.profitRate}" min="0" max="100" 
                    onchange="updateItemProfit(${index}, this.value)" style="width:60px"></td>`;
        html += `<td class="text-success">${profit.toLocaleString()}₫</td>`;
        html += `<td class="text-primary"><strong>${salePrice.toLocaleString()}₫</strong></td>`;
        html += `<td>
                    <button class="btn-icon edit" onclick="applyDefaultRate(${index})" title="Áp dụng tỷ lệ mặc định">
                        <i class='bx bx-refresh'></i>
                    </button>
                 </td>`;
        html += `</tr>`;
    });
    
    const table = document.getElementById('pricingTable');
    if (table) {
        table.innerHTML = html;
    }
}

// Cập nhật tỷ lệ lợi nhuận mặc định
function updateProfitRate() {
    const input = document.getElementById('profitRate');
    defaultProfitRate = parseFloat(input.value) || 30;
    document.getElementById('currentProfitRate').textContent = defaultProfitRate + '%';
    alert(`Đã cập nhật tỷ lệ lợi nhuận mặc định: ${defaultProfitRate}%`);
}

// Cập nhật lợi nhuận từng sản phẩm
function updateItemProfit(index, newRate) {
    pricingData[index].profitRate = parseFloat(newRate) || 0;
    displayPricing();
}

// Áp dụng tỷ lệ mặc định
function applyDefaultRate(index) {
    pricingData[index].profitRate = defaultProfitRate;
    displayPricing();
}

// Khởi tạo khi load trang
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('pricingTable')) {
        displayPricing();
        document.getElementById('currentProfitRate').textContent = defaultProfitRate + '%';
    }
});