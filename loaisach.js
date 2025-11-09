/* ================================================= */
/* ==== ĐỌC LOẠI SÁCH TỪ BOOKS[] VÀ ĐỒNG BỘ ===== */
/* ================================================= */

// Danh sách loại sách thực tế từ mảng books (copy từ trang User)
const booksCategories = [
    "Văn học", "Tâm lý", "Thiếu nhi", "Tản văn", 
    "Học tập", "Kinh tế", "Kinh doanh", "Tiểu sử"
];

function generateNewId() {
    let max = 0;
    categories.forEach(cat => {
        const m = cat.id && cat.id.match(/LS0*([0-9]+)/i);
        if (m && m[1]) {
            const n = parseInt(m[1], 10);
            if (!isNaN(n) && n > max) max = n;
        }
    });
    const next = max + 1;
    return "LS" + String(next).padStart(3, '0');
} 
function initCategoriesFromBooks() {
    const stored = localStorage.getItem('categories');
    
    if (!stored) {
        // ✅ Lần đầu: Tạo từ danh sách books
        const defaultCategories = booksCategories.map((name, index) => ({
            id: "LS" + String(index + 1).padStart(3, '0'),
            name: name,
            status: "active"
        }));
        localStorage.setItem('categories', JSON.stringify(defaultCategories));
        return defaultCategories;
    }
    
    try {
        // ✅ CÓ localStorage → DÙNG LUÔN, KHÔNG THÊM GÌ CẢ!
        return JSON.parse(stored);
        
    } catch (e) {
        console.error('Lỗi đọc categories:', e);
        // Chỉ khi lỗi parse mới dùng fallback
        const fallback = booksCategories.map((name, index) => ({
            id: "LS" + String(index + 1).padStart(3, '0'),
            name: name,
            status: "active"
        }));
        localStorage.setItem('categories', JSON.stringify(fallback));
        return fallback;
    }
}



function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
}



function escapeHtml(text) {
    if (!text && text !== 0) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Hiển thị danh sách loại sách (4 cột) — Mã, Tên, Trạng thái, Thao tác
function displayCategories(filteredData = categories) {
    let html = '';
    filteredData.forEach((cat, index) => {
        const statusBadge = cat.status === 'active'
            ? '<span class="badge success">Hiển thị</span>'
            : '<span class="badge danger">Ẩn</span>';
        
        html += `<tr>`;
        html += `<td><strong>${escapeHtml(cat.id)}</strong></td>`;
        html += `<td>${escapeHtml(cat.name)}</td>`;
        html += `<td>${statusBadge}</td>`;
        // Thao tác: Sửa | Ẩn/Hiện | Xóa
        html += `<td>
                    <div class="action-btns">
                        <button class="btn-icon edit" onclick="editCategory(${index})" title="Sửa">
                            <i class='bx bx-edit'></i>
                        </button>
                        <button class="btn-icon toggle" onclick="toggleCategoryStatus(${index})" title="${cat.status === 'active' ? 'Ẩn' : 'Hiện'}">
                            <i class='bx ${cat.status === 'active' ? 'bx-hide' : 'bx-show'}'></i>
                        </button>
                    </div>
                 </td>`;
        html += `</tr>`;
    });

    const table = document.getElementById('categoriesTable');
    if (table) table.innerHTML = html;
}

function addCategory() {
    const input = prompt("📚 Nhập tên loại sách mới:");
    
    if (input === null) return; // Hủy
    
    const name = input.trim().replace(/\s+/g, ' '); // Chuẩn hóa
    
    // ✅ KIỂM TRA RỖNG
    if (!name) {
        alert("❌ Tên loại sách không được để trống!");
        return;
    }
    
    // ✅ KIỂM TRA TRÙNG (không phân biệt hoa thường)
    const isDuplicate = categories.some(cat => 
        cat.name.trim().toLowerCase() === name.toLowerCase()
    );
    
    if (isDuplicate) {
        alert(`❌ Loại sách "${name}" đã tồn tại!\n\n💡 Vui lòng chọn tên khác.`);
        return;
    }
    
    // ✅ KIỂM TRA ĐỘ DÀI
    if (name.length < 2) {
        alert("❌ Tên loại sách phải có ít nhất 2 ký tự!");
        return;
    }
    
    if (name.length > 50) {
        alert("❌ Tên loại sách không được vượt quá 50 ký tự!");
        return;
    }
    
    // Thêm mới
    const newId = generateNewId();
    categories.push({
        id: newId,
        name: name,
        status: "active"
    });
    
    saveCategories();
    displayCategories();
    alert(`✅ Đã thêm loại sách mới!\n\n📋 Mã: ${newId}\n📚 Tên: ${name}`);
}

function editCategory(index) {
    const cat = categories[index];
    if (!cat) return;
    
    const oldName = cat.name;
    const input = prompt("✏️ Nhập tên mới:", oldName);
    
    if (input === null) return; // Hủy
    
    const newName = input.trim().replace(/\s+/g, ' '); // Chuẩn hóa
    
    // ✅ KIỂM TRA RỖNG
    if (!newName) {
        alert("❌ Tên loại sách không được để trống!");
        return;
    }
    
    // Không đổi gì
    if (newName === oldName) {
        alert("ℹ️ Bạn chưa thay đổi tên loại sách.");
        return;
    }
    
    // ✅ KIỂM TRA TRÙNG (loại trừ chính nó)
    const isDuplicate = categories.some((cat, idx) => 
        idx !== index && cat.name.trim().toLowerCase() === newName.toLowerCase()
    );
    
    if (isDuplicate) {
        alert(`❌ Loại sách "${newName}" đã tồn tại!\n\n💡 Vui lòng chọn tên khác.`);
        return;
    }
    
    // ✅ KIỂM TRA ĐỘ DÀI
    if (newName.length < 2) {
        alert("❌ Tên loại sách phải có ít nhất 2 ký tự!");
        return;
    }
    
    if (newName.length > 50) {
        alert("❌ Tên loại sách không được vượt quá 50 ký tự!");
        return;
    }
    
    // Xác nhận nếu có sản phẩm
    const productCount = countProductsUsingCategory(oldName);
    if (productCount > 0) {
        const confirm = window.confirm(
            `⚠️ Có ${productCount} sản phẩm đang dùng loại "${oldName}"\n\n` +
            `Đổi thành "${newName}"?\n\n✅ Sản phẩm sẽ tự động cập nhật.`
        );
        if (!confirm) return;
    }
    
    // Cập nhật
    updateCategoryInProducts(oldName, newName);
    categories[index].name = newName;
    saveCategories();
    displayCategories();
    
    alert(`✅ Đã cập nhật!\n\n📚 ${newName}\n${productCount > 0 ? `📦 ${productCount} sản phẩm đã đồng bộ` : ''}`);
}

// function toggleCategoryStatus(index) {
//     const cat = categories[index];
//     if (!cat) return;
//     const action = cat.status === 'active' ? 'ẩn' : 'hiện';
//     if (confirm(`Bạn có chắc muốn ${action} loại sách "${cat.name}"?`)) {
//         categories[index].status = cat.status === 'active' ? 'hidden' : 'active';
//         saveCategories();
//         displayCategories();
//     }
// }
/* ================================================= */
/* ============ ẨN/HIỆN LOẠI SÁCH ================= */
/* ================================================= */

function toggleCategoryStatus(index) {
    const cat = categories[index];
    if (!cat) return;
    
    const action = cat.status === 'active' ? 'ẨN' : 'HIỆN';
    const productCount = countProductsUsingCategory(cat.name);
    
    let confirmMsg = `⚠️ Bạn có chắc muốn ${action} loại sách "${cat.name}"?`;
    
    if (productCount > 0) {
        confirmMsg += `\n\n📦 Hiện có ${productCount} sản phẩm thuộc loại này!`;
        confirmMsg += `\n✅ Các sản phẩm sẽ tự động ${action} theo`;
    }
    
    if (confirm(confirmMsg)) {
        const newStatus = cat.status === 'active' ? 'hidden' : 'active';
        
        // ✅ 1. Cập nhật trạng thái loại sách
        categories[index].status = newStatus;
        saveCategories();
        console.log(`✅ Đã ${action} loại sách "${cat.name}"`);
        
        // ✅ 2. Cập nhật trạng thái SẢN PHẨM theo
        if (productCount > 0) {
            updateProductsStatusByCategory(cat.name, newStatus);
        }
        
        displayCategories();
        
        // Reload trang Quản lý Sản phẩm nếu đang mở
        alert(`✅ Đã ${action} loại sách "${cat.name}"!\n\n${productCount > 0 ? `📦 ${productCount} sản phẩm đã ${action} theo\n\n🔄 Vui lòng REFRESH trang Quản lý Sản phẩm để xem thay đổi!` : ''}`);
    }
}
function updateProductsStatusByCategory(categoryName, status) {
    const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    let count = 0;

    products.forEach(product => {
        if (product.category === categoryName) {
            product.status = status;
            count++;
        }
    });

    if (count > 0) {
        localStorage.setItem('bookstore_products', JSON.stringify(products));
        console.log(`✅ Đã ${status === 'active' ? 'HIỆN' : 'ẨN'} ${count} sản phẩm thuộc loại "${categoryName}"`);
    } else {
        console.log(`⚠️ Không có sản phẩm nào thuộc loại "${categoryName}"`);
    }
}
// function deleteCategory(index) {
//     const cat = categories[index];
//     if (!cat) return;
    
//     // ✅ KIỂM TRA: Có sản phẩm nào đang dùng loại này không?
//     const productCount = countProductsUsingCategory(cat.name);
    
//     let confirmMsg = `⚠️ Bạn có chắc muốn XÓA loại sách "${cat.name}" (Mã: ${cat.id})?`;
    
//     if (productCount > 0) {
//         confirmMsg += `\n\n📦 Hiện có ${productCount} sản phẩm đang dùng loại này!`;
//         confirmMsg += `\n\n✅ Các sản phẩm sẽ được chuyển sang loại "Chưa phân loại"`;
//     }
    
//     confirmMsg += `\n\n❌ Thao tác này không thể hoàn tác!`;
    
//     if (confirm(confirmMsg)) {
//         // ✅ ĐỒNG BỘ: Xử lý sản phẩm trước khi xóa
//         if (productCount > 0) {
//             handleDeleteCategoryInProducts(cat.name);
//         }
        
//         categories.splice(index, 1);
//         saveCategories();
//         displayCategories();
        
//         alert(`✅ Đã xóa loại sách "${cat.name}"!\n\n${productCount > 0 ? `📦 ${productCount} sản phẩm đã chuyển sang "Chưa phân loại"` : ''}`);
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    // Đồng bộ lại categories từ books mỗi khi load trang
    categories = initCategoriesFromBooks();
    
    if (document.getElementById('categoriesTable')) {
        displayCategories();
    }
});
/* ================================================= */
/* ===== RESET DANH SÁCH LOẠI SÁCH VỀ MẶC ĐỊNH ===== */
/* ================================================= */

function resetCategories() {
    if (!confirm('⚠️ BẠN CÓ CHẮC MUỐN ĐẶT LẠI DANH SÁCH LOẠI SÁCH?\n\nThao tác này sẽ:\n✅ Khôi phục đầy đủ 8 loại sách CHUẨN từ mảng books[]\n✅ XÓA các loại sách không thuộc danh sách chuẩn\n✅ Đặt tất cả về trạng thái "Hiển thị"\n\n❌ Các loại sách bạn tự thêm sẽ BỊ XÓA!')) {
        return;
    }
    
    // Danh sách loại sách CHUẨN từ mảng books[] (chỉ 8 loại)
    const standardCategories = [
        "Văn học", "Tâm lý", "Thiếu nhi", "Tản văn", 
        "Học tập", "Kinh tế", "Kinh doanh", "Tiểu sử"
    ];
    
    // Tạo lại danh sách MỚI - CHỈ GIỮ CÁC LOẠI CHUẨN
    const resetCategories = standardCategories.map((name, index) => ({
        id: "LS" + String(index + 1).padStart(3, '0'),
        name: name,
        status: "active"
    }));
    
    // Sắp xếp theo tên (tùy chọn)
    resetCategories.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    
    // Cập nhật lại ID sau khi sắp xếp
    resetCategories.forEach((cat, index) => {
        cat.id = "LS" + String(index + 1).padStart(3, '0');
    });
    
    // Lưu vào localStorage
    localStorage.setItem('categories', JSON.stringify(resetCategories));
    categories = resetCategories;
    
    // Hiển thị lại bảng
    displayCategories();
    
    alert('✅ Đã đặt lại danh sách loại sách!\n\n📚 Tổng số loại sách: ' + resetCategories.length + '\n\nCác loại: ' + resetCategories.map(c => c.name).join(', '));
}
/* ================================================= */
/* ======= ĐỒNG BỘ VỚI QUẢN LÝ SẢN PHẨM ========== */
/* ================================================= */

// function updateCategoryInProducts(oldName, newName) {
//     const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
//     let updated = false;

//     products.forEach(product => {
//         if (product.category === oldName) {
//             product.category = newName;
//             updated = true;
//         }
//     });

//     if (updated) {
//         localStorage.setItem('bookstore_products', JSON.stringify(products));
//         console.log(`✅ Đã cập nhật loại sách "${oldName}" → "${newName}" trong sản phẩm`);
//     }
    
//     // ✅ THÊM DÒNG NÀY - Đồng bộ với User
//     updateCategoryInUserBooks(oldName, newName);
// }
function updateCategoryInProducts(oldName, newName) {
    console.log(`  🔍 Đọc localStorage.bookstore_products...`);
    const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    console.log(`  📦 Tổng sản phẩm: ${products.length}`);
    
    let count = 0;

    products.forEach((product, index) => {
        // Debug: Hiển thị TỪNG sản phẩm
        console.log(`    #${index}: "${product.name}" - category: "${product.category}"`);
        
        if (product.category === oldName) {
            console.log(`      ✅ MATCH! Đổi "${oldName}" → "${newName}"`);
            product.category = newName;
            count++;
        }
    });

    if (count > 0) {
        localStorage.setItem('bookstore_products', JSON.stringify(products));
        console.log(`  💾 Đã lưu ${count} sản phẩm vào localStorage`);
        console.log(`  ✅ Hoàn tất! ${count} sản phẩm đã cập nhật`);
    } else {
        console.log(`  ⚠️ KHÔNG tìm thấy sản phẩm nào có category = "${oldName}"`);
        console.log(`  💡 Gợi ý: Kiểm tra xem tên loại có chính xác không?`);
    }
    
    return count; // ✅ TRẢ VỀ SỐ LƯỢNG CẬP NHẬT
}
// Kiểm tra loại sách có đang được sử dụng không
function countProductsUsingCategory(categoryName) {
    const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
    return products.filter(p => p.category === categoryName).length;
}

// // Xử lý xóa loại sách → Chuyển sản phẩm sang "Chưa phân loại"
// function handleDeleteCategoryInProducts(categoryName) {
//     const products = JSON.parse(localStorage.getItem('bookstore_products') || '[]');
//     let updated = false;

//     products.forEach(product => {
//         if (product.category === categoryName) {
//             product.category = "Chưa phân loại";
//             updated = true;
//         }
//     });

//     if (updated) {
//         localStorage.setItem('bookstore_products', JSON.stringify(products));
//         console.log(`✅ Đã chuyển sản phẩm của loại "${categoryName}" sang "Chưa phân loại"`);
//     }
    
//     // ✅ THÊM DÒNG NÀY - Đồng bộ với User
//     handleDeleteCategoryInUserBooks(categoryName);
// }
/* ================================================= */
/* ======== ĐỒNG BỘ VỚI TRANG USER (books[]) ======= */
/* ================================================= */

// Cập nhật tên loại sách trong books[] của User
function updateCategoryInUserBooks(oldName, newName) {
    // Đọc books[] từ localStorage (nếu có)
    const userBooks = JSON.parse(localStorage.getItem('books_user') || '[]');
    let updated = false;

    userBooks.forEach(book => {
        if (book.category === oldName) {
            book.category = newName;
            updated = true;
        }
    });

    if (updated) {
        localStorage.setItem('books_user', JSON.stringify(userBooks));
        console.log(`✅ Đã cập nhật loại sách "${oldName}" → "${newName}" trong books[] User`);
    }
}

// // Xử lý xóa loại sách trong books[] User
// function handleDeleteCategoryInUserBooks(categoryName) {
//     const userBooks = JSON.parse(localStorage.getItem('books_user') || '[]');
//     let updated = false;

//     userBooks.forEach(book => {
//         if (book.category === categoryName) {
//             book.category = "Chưa phân loại";
//             updated = true;
//         }
//     });

//     if (updated) {
//         localStorage.setItem('books_user', JSON.stringify(userBooks));
//         console.log(`✅ Đã chuyển sách của loại "${categoryName}" sang "Chưa phân loại" trong User`);
//     }
// }