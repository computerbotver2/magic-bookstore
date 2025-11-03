// Dữ liệu giá bán
let pricingData = [
    { id: "SP001", name: "The Lumina Chronicles", costPrice: 120000, profitRate: 30 },
    { id: "SP002", name: "The Journey of a Thousand Steps", costPrice: 90000, profitRate: 35 },
    { id: "SP003", name: "Ignite Your Inner Universe", costPrice: 80000, profitRate: 25 },
    { id: "SP004", name: "The Magical Treehouse Adventure", costPrice: 110000, profitRate: 30 },
    { id: "SP005", name: "Stardust & Serendipity", costPrice: 70000, profitRate: 20 },
    { id: "SP006", name: "Whispers of the Wildflower Heart", costPrice: 120000, profitRate: 30 },
    { id: "SP007", name: "Echoes of Cosmos", costPrice: 90000, profitRate: 35 },
    { id: "SP008", name: "Wuthering Heights", costPrice: 80000, profitRate: 25 },
    { id: "SP009", name: "The Eldoria Chronicles", costPrice: 110000, profitRate: 30 },
    { id: "SP010", name: "The Silk Road Odyssey", costPrice: 70000, profitRate: 20 },
    { id: "SP011", name: "Nightmare Echoes", costPrice: 70000, profitRate: 20 },
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