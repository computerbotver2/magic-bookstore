// /* ================================================= */
// /* ============= CÀI ĐẶT VÀ HẰNG SỐ ============== */
// /* ================================================= */

// // ✅ MỚI: Quản lý tập trung các key của localStorage
// const STORAGE_KEYS = {
//     CATEGORIES: 'categories',
//     PRODUCTS: 'bookstore_products',
//     USER_BOOKS: 'books_user'
// };

// // Biến toàn cục để lưu trữ danh sách loại sách
// let categories = []; 

// // ✅ MỚI: Biến toàn cục để lưu index của loại sách đang được sửa
// let editingIndex = null; 

// // Danh sách loại sách thực tế từ mảng books (copy từ trang User)
// const booksCategories = [
//     "Văn học", "Tâm lý", "Thiếu nhi", "Tản văn", 
//     "Học tập", "Kinh tế", "Kinh doanh", "Tiểu sử"
// ];

// function generateNewId() {
//     let max = 0;
//     categories.forEach(cat => {
//         const m = cat.id && cat.id.match(/LS0*([0-9]+)/i);
//         if (m && m[1]) {
//             const n = parseInt(m[1], 10);
//             if (!isNaN(n) && n > max) max = n;
//         }
//     });
//     const next = max + 1;
//     return "LS" + String(next).padStart(3, '0'); 
// }

// /**
//  * ✅ ĐÃ SỬA: Sắp xếp theo tên trước khi gán ID
//  * Logic này giờ đã đồng nhất với hàm resetCategories()
//  */
// function createDefaultCategories() {
//     // 1. Tạo danh sách từ mảng gốc
//     let defaultCategories = booksCategories.map(name => ({
//         name: name,
//         status: "active"
//     }));
    
//     // 2. Sắp xếp theo tên (Alphabet)
//     defaultCategories.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    
//     // 3. Gán ID sau khi đã sắp xếp
//     defaultCategories.forEach((cat, index) => {
//         cat.id = "LS" + String(index + 1).padStart(3, '0');
//     });
    
//     return defaultCategories;
// }

// function initCategoriesFromBooks() {
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    
//     if (!stored) {
//         // ✅ Lần đầu: Tạo từ danh sách (đã sửa logic)
//         const defaultCategories = createDefaultCategories();
//         localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
//         return defaultCategories;
//     }
    
//     try {
//         // ✅ Có localStorage: Dùng dữ liệu đã lưu
//         return JSON.parse(stored);
//     } catch (e) {
//         console.error('Lỗi đọc categories:', e);
//         // Fallback khi lỗi parse (cũng dùng logic đã sửa)
//         const fallback = createDefaultCategories();
//         localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(fallback));
//         return fallback;
//     }
// }

// function saveCategories() {
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
// }

// function escapeHtml(text) {
//     if (text === null || text === undefined) return '';
//     return String(text)
//         .replace(/&/g, "&amp;")
//         .replace(/</g, "&lt;")
//         .replace(/>/g, "&gt;")
//         .replace(/"/g, "&quot;")
//         .replace(/'/g, "&#039;");
// }

// /* ================================================= */
// /* ============ HIỂN THỊ DANH SÁCH ================= */
// /* ================================================= */

// function displayCategories(filteredData = categories) {
//     let html = '';
//     const tableBody = document.getElementById('categoriesTable');
//     if (!tableBody) return; 
    
//     filteredData.forEach((cat, index) => {
//         const statusActive = cat.status === 'active';
//         const statusBadge = statusActive
//             ? '<span class="badge success">Hiển thị</span>'
//             : '<span class="badge danger">Ẩn</span>';
        
//         html += `<tr>`;
//         html += `<td><strong>${escapeHtml(cat.id)}</strong></td>`;
//         html += `<td>${escapeHtml(cat.name)}</td>`;
//         html += `<td>${statusBadge}</td>`;
//         html += `<td>
//                     <div class="action-btns">
//                         <button class="btn-icon edit" onclick="editCategory(${index})" title="Sửa">
//                             <i class='bx bx-edit'></i>
//                         </button>
//                         <button class="btn-icon toggle" onclick="toggleCategoryStatus(${index})" title="${statusActive ? 'Ẩn' : 'Hiện'}">
//                             <i class='bx ${statusActive ? 'bx-hide' : 'bx-show'}'></i>
//                         </button>
//                     </div>
//                 </td>`;
//         html += `</tr>`;
//     });

//     tableBody.innerHTML = html;
// }

// /* ================================================= */
// /* ============ VALIDATION TÊN (HÀM MỚI) =========== */
// /* ================================================= */

// /**
//  * ✅ HÀM MỚI: Dùng để kiểm tra tên loại sách (cho cả Thêm và Sửa)
//  * @param {string} name - Tên cần kiểm tra.
//  * @param {number | null} currentIndex - Index của loại sách đang sửa (để loại trừ chính nó).
//  * @returns {string | null} - Trả về null nếu hợp lệ, ngược lại trả về thông báo lỗi.
//  */
// function validateCategoryName(name, currentIndex = null) {
//     // 1. Rỗng
//     if (!name) {
//         return "❌ Tên loại sách không được để trống!";
//     }
    
//     // 2. Độ dài
//     if (name.length < 2) {
//         return "❌ Tên loại sách phải có ít nhất 2 ký tự!";
//     }
//     if (name.length > 50) {
//         return "❌ Tên loại sách không được vượt quá 50 ký tự!";
//     }
    
//     // 3. Trùng lặp
//     const isDuplicate = categories.some((cat, idx) => 
//         // Nếu là SỬA (currentIndex != null) thì phải loại trừ chính nó (idx != currentIndex)
//         (currentIndex === null || idx !== currentIndex) &&
//         cat.name.trim().toLowerCase() === name.toLowerCase()
//     );
    
//     if (isDuplicate) {
//         return `❌ Loại sách "${name}" đã tồn tại!`;
//     }
    
//     return null; // Hợp lệ
// }


// /* ================================================= */
// /* ============= THÊM MỚI LOẠI SÁCH ================ */
// /* ================================================= */

// function addCategory() {
//     const inputElement = document.getElementById("newCategoryName");
//     if (inputElement) inputElement.value = ""; // Xóa giá trị cũ
    
//     const popupElement = document.getElementById("addCategoryPopup");
//     if (popupElement) {
//         popupElement.style.display = "flex";
//         if (inputElement) inputElement.focus(); // Tập trung vào input
//     }
// }

// function closeAddCategoryPopup() {
//     const popupElement = document.getElementById("addCategoryPopup");
//     if (popupElement) popupElement.style.display = "none";
// }

// function confirmAddCategory() {
//     const inputElement = document.getElementById("newCategoryName");
//     if (!inputElement) return;

//     const name = inputElement.value.trim().replace(/\s+/g, ' ');
    
//     // ✅ THAY ĐỔI: Dùng hàm validateCategoryName mới
//     // Tham số thứ 2 là 'null' vì đây là THÊM MỚI, không cần loại trừ index nào
//     const error = validateCategoryName(name, null);
    
//     if (error) {
//         alert(error);
//         return;
//     }
    
//     // ✅ 4. Thêm mới
//     const newId = generateNewId();
//     categories.push({
//         id: newId,
//         name: name,
//         status: "active"
//     });
    
//     saveCategories();
//     displayCategories();
//     closeAddCategoryPopup();
    
//     alert(`✅ Đã thêm loại sách mới!\n\n📋 Mã: ${newId}\n📚 Tên: ${name}`);
// }

// /* ================================================= */
// /* ========= SỬA TÊN LOẠI SÁCH (DÙNG MODAL) ======== */
// /* ================================================= */

// /**
//  * ✅ HÀM MỚI (Đã sửa): Mở Modal và đổ dữ liệu
//  * @param {number} index - Index của loại sách cần sửa trong mảng categories
//  */
// function editCategory(index) {
//     const cat = categories[index];
//     if (!cat) return;

//     editingIndex = index; // Lưu index đang sửa
    
//     const popup = document.getElementById("editCategoryPopup");
//     const input = document.getElementById("editCategoryName");
//     // Giả định có element này để hiển thị tên cũ, nếu không có thì bỏ qua dòng này
//     const oldNameDisplay = document.getElementById("editCategoryOldName"); 

//     if (!popup || !input) return;

//     input.value = cat.name;
//     if (oldNameDisplay) oldNameDisplay.textContent = cat.name; // Hiển thị tên cũ

//     popup.style.display = "flex"; // Mở Modal Sửa
//     input.focus();
// }

// /**
//  * ✅ HÀM MỚI: Đóng Modal Sửa
//  */
// function closeEditCategoryPopup() {
//     const popup = document.getElementById("editCategoryPopup");
//     if (popup) popup.style.display = "none";
//     editingIndex = null; // Xóa index sau khi đóng
// }

// /**
//  * ✅ HÀM MỚI: Xử lý xác nhận Sửa tên
//  */
// function confirmEditCategory() {
//     if (editingIndex === null) return;
    
//     const cat = categories[editingIndex];
//     const inputElement = document.getElementById("editCategoryName");
//     if (!inputElement || !cat) return;

//     const oldName = cat.name;
//     const newName = inputElement.value.trim().replace(/\s+/g, ' ');

//     // 1. Không đổi gì
//     if (newName === oldName) {
//         alert("ℹ️ Bạn chưa thay đổi tên loại sách.");
//         return;
//     }

//     // 2. Dùng hàm validateCategoryName mới (truyền editingIndex)
//     const error = validateCategoryName(newName, editingIndex);

//     if (error) {
//         alert(error);
//         return;
//     }
    
//     // 3. Xác nhận & Cập nhật
//     const productCount = countProductsUsingCategory(oldName);
//     let confirmUpdate = true;
    
//     if (productCount > 0) {
//         confirmUpdate = window.confirm(
//             `⚠️ Có ${productCount} sản phẩm đang dùng loại "${oldName}"\n\n` +
//             `Đổi thành "${newName}"?\n\n✅ Sản phẩm sẽ tự động cập nhật.`
//         );
//     }
    
//     if (!confirmUpdate) return;
    
//     // Cập nhật tên trong sản phẩm và User Books
//     updateCategoryInProducts(oldName, newName);
//     updateCategoryInUserBooks(oldName, newName);

//     // Cập nhật tên trong Categories
//     categories[editingIndex].name = newName;
//     saveCategories();
//     displayCategories();
//     closeEditCategoryPopup(); // Đóng modal

//     alert(`✅ Đã cập nhật!\n\n📚 ${newName}\n${productCount > 0 ? `📦 ${productCount} sản phẩm đã đồng bộ` : ''}`);
// }

// /* ================================================= */
// /* ============ ẨN/HIỆN LOẠI SÁCH ================= */
// /* ================================================= */

// function toggleCategoryStatus(index) {
//     const cat = categories[index];
//     if (!cat) return;
    
//     const action = cat.status === 'active' ? 'ẨN' : 'HIỆN';
//     const productCount = countProductsUsingCategory(cat.name);
    
//     let confirmMsg = `⚠️ Bạn có chắc muốn ${action} loại sách "${cat.name}"?`;
    
//     if (productCount > 0) {
//         confirmMsg += `\n\n📦 Hiện có ${productCount} sản phẩm thuộc loại này!`;
//         confirmMsg += `\n✅ Các sản phẩm sẽ tự động ${action} theo`;
//     }
    
//     if (confirm(confirmMsg)) {
//         const newStatus = cat.status === 'active' ? 'hidden' : 'active';
        
//         categories[index].status = newStatus;
//         saveCategories();
        
//         if (productCount > 0) {
//             updateProductsStatusByCategory(cat.name, newStatus);
//         }
        
//         displayCategories();
        
//         alert(`✅ Đã ${action} loại sách "${cat.name}"!\n\n${productCount > 0 ? `📦 ${productCount} sản phẩm đã ${action} theo\n\n🔄 Vui lòng REFRESH trang Quản lý Sản phẩm để xem thay đổi!` : ''}`);
//     }
// }

// /* ================================================= */
// /* ======= ĐỒNG BỘ VỚI QUẢN LÝ SẢN PHẨM ========== */
// /* ================================================= */

// function countProductsUsingCategory(categoryName) {
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
//     return products.filter(p => p.category === categoryName).length;
// }

// function updateCategoryInProducts(oldName, newName) {
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
//     let count = 0;

//     products.forEach(product => {
//         if (product.category === oldName) {
//             product.category = newName;
//             count++;
//         }
//     });

//     if (count > 0) {
//         // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//         localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
//         console.log(`✅ Đã cập nhật tên loại sách "${oldName}" → "${newName}" trong ${count} sản phẩm`);
//     } else {
//         console.log(`⚠️ KHÔNG tìm thấy sản phẩm nào có category = "${oldName}" để đổi tên.`);
//     }
    
//     return count;
// }

// function updateProductsStatusByCategory(categoryName, status) {
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     const products = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
//     let count = 0;

//     products.forEach(product => {
//         if (product.category === categoryName) {
//             product.status = status;
//             count++;
//         }
//     });

//     if (count > 0) {
//         // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//         localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
//         console.log(`✅ Đã ${status === 'active' ? 'HIỆN' : 'ẨN'} ${count} sản phẩm thuộc loại "${categoryName}"`);
//     } else {
//         console.log(`⚠️ Không có sản phẩm nào thuộc loại "${categoryName}" để đổi trạng thái`);
//     }
// }

// /* ================================================= */
// /* ======== ĐỒNG BỘ VỚI TRANG USER (books[]) ======= */
// /* ================================================= */

// function updateCategoryInUserBooks(oldName, newName) {
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     const userBooks = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_BOOKS) || '[]');
//     let count = 0;

//     userBooks.forEach(book => {
//         if (book.category === oldName) {
//             book.category = newName;
//             count++;
//         }
//     });

//     if (count > 0) {
//         // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//         localStorage.setItem(STORAGE_KEYS.USER_BOOKS, JSON.stringify(userBooks));
//         console.log(`✅ Đã cập nhật tên loại sách "${oldName}" → "${newName}" trong ${count} books[] User`);
//     }
// }

// /* ================================================= */
// /* ===== RESET DANH SÁCH LOẠI SÁCH VỀ MẶC ĐỊNH ===== */
// /* ================================================= */

// function resetCategories() {
//     if (!confirm('⚠️ BẠN CÓ CHẮC MUỐN ĐẶT LẠI DANH SÁCH LOẠI SÁCH?\n\nThao tác này sẽ:\n✅ Khôi phục đầy đủ 8 loại sách CHUẨN từ mảng books[]\n✅ XÓA các loại sách không thuộc danh sách chuẩn\n✅ Đặt tất cả về trạng thái "Hiển thị"\n\n❌ Các loại sách bạn tự thêm sẽ BỊ XÓA!')) {
//         return;
//     }
    
//     // Hàm này đã dùng logic chuẩn (Sắp xếp -> Gán ID)
//     // nên ta có thể gọi lại hàm createDefaultCategories() đã tạo ở trên
//     const resetCategories = createDefaultCategories();
    
//     // Lưu và cập nhật biến toàn cục
//     // ✅ THAY ĐỔI: Dùng hằng số STORAGE_KEYS
//     localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(resetCategories));
//     categories = resetCategories;
    
//     displayCategories();
    
//     alert('✅ Đã đặt lại danh sách loại sách!\n\n📚 Tổng số loại sách: ' + resetCategories.length + '\n\nCác loại: ' + resetCategories.map(c => c.name).join(', '));
// }

// /* ================================================= */
// /* ================ CHẠY KHI TẢI TRANG =============== */
// /* ================================================= */

// document.addEventListener('DOMContentLoaded', function() {
//     categories = initCategoriesFromBooks();
    
//     if (document.getElementById('categoriesTable')) {
//         displayCategories();
//     }
    
//     const addBtn = document.getElementById('addCategoryBtn');
//     if (addBtn) addBtn.onclick = addCategory;
// });
/* ================================================= */
/* ==== ĐỌC LOẠI SÁCH TỪ BOOKS[] VÀ ĐỒNG BỘ ===== */
/* ================================================= */

// Danh sách loại sách thực tế từ mảng books (copy từ trang User)
const booksCategories = [
    "Văn học", "Tâm lý", "Thiếu nhi", "Tản văn", 
    "Học tập", "Kinh tế", "Kinh doanh", "Tiểu sử"
];
let editingCategoryIndex = null;

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

// function addCategory() {
//     const input = prompt("📚 Nhập tên loại sách mới:");
    
//     if (input === null) return; // Hủy
    
//     const name = input.trim().replace(/\s+/g, ' '); // Chuẩn hóa
    
//     // ✅ KIỂM TRA RỖNG
//     if (!name) {
//         alert("❌ Tên loại sách không được để trống!");
//         return;
//     }
    
//     // ✅ KIỂM TRA TRÙNG (không phân biệt hoa thường)
//     const isDuplicate = categories.some(cat => 
//         cat.name.trim().toLowerCase() === name.toLowerCase()
//     );
    
//     if (isDuplicate) {
//         alert(`❌ Loại sách "${name}" đã tồn tại!\n\n💡 Vui lòng chọn tên khác.`);
//         return;
//     }
    
//     // ✅ KIỂM TRA ĐỘ DÀI
//     if (name.length < 2) {
//         alert("❌ Tên loại sách phải có ít nhất 2 ký tự!");
//         return;
//     }
    
//     if (name.length > 50) {
//         alert("❌ Tên loại sách không được vượt quá 50 ký tự!");
//         return;
//     }
    
//     // Thêm mới
//     const newId = generateNewId();
//     categories.push({
//         id: newId,
//         name: name,
//         status: "active"
//     });
    
//     saveCategories();
//     displayCategories();
//     alert(`✅ Đã thêm loại sách mới!\n\n📋 Mã: ${newId}\n📚 Tên: ${name}`);
// }
// --- Mở modal ---
function addCategory() {
    document.getElementById('newCategoryName').value = '';
    document.getElementById('newCategoryError').textContent = '';
    document.getElementById('addCategoryModal').style.display = 'block';
    document.getElementById('newCategoryName').focus();
}
// --- Đóng modal ---
function closeAddCategoryModal() {
    document.getElementById('addCategoryModal').style.display = 'none';
}
// --- Xử lý xác nhận thêm ---
document.getElementById('addCategoryForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('newCategoryName').value.trim().replace(/\s+/g, ' ');

    // Validation giống alert
    if (!name) {
        document.getElementById('newCategoryError').textContent = "❌ Tên loại sách không được để trống!";
        return;
    }
    if (name.length < 2) {
        document.getElementById('newCategoryError').textContent = "❌ Tên loại sách phải có ít nhất 2 ký tự!";
        return;
    }
    if (name.length > 50) {
        document.getElementById('newCategoryError').textContent = "❌ Tên loại sách không được vượt quá 50 ký tự!";
        return;
    }
    const isDuplicate = categories.some(cat =>
        cat.name.trim().toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
        document.getElementById('newCategoryError').textContent =
            `❌ Loại sách "${name}" đã tồn tại!`;
        return;
    }

    // Thêm mới
    const newId = generateNewId();
    categories.push({ id: newId, name: name, status: "active" });
    saveCategories();
    displayCategories();
    closeAddCategoryModal();
    alert(`✅ Đã thêm loại sách mới!\n\n📋 Mã: ${newId}\n📚 Tên: ${name}`);
};

// --- Đóng modal khi bấm ra ngoài ---
window.onclick = function(event) {
    if (event.target == document.getElementById('addCategoryModal')) {
        closeAddCategoryModal();
    }
};
// function editCategory(index) {
//     const cat = categories[index];
//     if (!cat) return;
    
//     const oldName = cat.name;
//     const input = prompt("✏️ Nhập tên mới:", oldName);
    
//     if (input === null) return; // Hủy
    
//     const newName = input.trim().replace(/\s+/g, ' '); // Chuẩn hóa
    
//     // ✅ KIỂM TRA RỖNG
//     if (!newName) {
//         alert("❌ Tên loại sách không được để trống!");
//         return;
//     }
    
//     // Không đổi gì
//     if (newName === oldName) {
//         alert("ℹ️ Bạn chưa thay đổi tên loại sách.");
//         return;
//     }
    
//     // ✅ KIỂM TRA TRÙNG (loại trừ chính nó)
//     const isDuplicate = categories.some((cat, idx) => 
//         idx !== index && cat.name.trim().toLowerCase() === newName.toLowerCase()
//     );
    
//     if (isDuplicate) {
//         alert(`❌ Loại sách "${newName}" đã tồn tại!\n\n💡 Vui lòng chọn tên khác.`);
//         return;
//     }
    
//     // ✅ KIỂM TRA ĐỘ DÀI
//     if (newName.length < 2) {
//         alert("❌ Tên loại sách phải có ít nhất 2 ký tự!");
//         return;
//     }
    
//     if (newName.length > 50) {
//         alert("❌ Tên loại sách không được vượt quá 50 ký tự!");
//         return;
//     }
    
//     // Xác nhận nếu có sản phẩm
//     const productCount = countProductsUsingCategory(oldName);
//     if (productCount > 0) {
//         const confirm = window.confirm(
//             `⚠️ Có ${productCount} sản phẩm đang dùng loại "${oldName}"\n\n` +
//             `Đổi thành "${newName}"?\n\n✅ Sản phẩm sẽ tự động cập nhật.`
//         );
//         if (!confirm) return;
//     }
    
//     // Cập nhật
//     updateCategoryInProducts(oldName, newName);
//     categories[index].name = newName;
//     saveCategories();
//     displayCategories();
    
//     alert(`✅ Đã cập nhật!\n\n📚 ${newName}\n${productCount > 0 ? `📦 ${productCount} sản phẩm đã đồng bộ` : ''}`);
// }
// Mở modal Sửa, truyền index vào
function editCategory(index) {
    editingCategoryIndex = index;
    document.getElementById('editCategoryName').value = categories[index].name;
    document.getElementById('editCategoryError').textContent = '';
    document.getElementById('editCategoryModal').style.display = 'block';
    document.getElementById('editCategoryName').focus();
}
// Đóng modal Sửa
function closeEditCategoryModal() {
    document.getElementById('editCategoryModal').style.display = 'none';
    editingCategoryIndex = null;
}

// Xử lý xác nhận sửa
document.getElementById('editCategoryForm').onsubmit = function(e) {
    e.preventDefault();
    const newName = document.getElementById('editCategoryName').value.trim().replace(/\s+/g, ' ');
    if (editingCategoryIndex === null) return;

    // Validation
    if (!newName) {
        document.getElementById('editCategoryError').textContent = "❌ Tên loại sách không được để trống!";
        return;
    }
    if (newName.length < 2) {
        document.getElementById('editCategoryError').textContent = "❌ Tên loại sách phải có ít nhất 2 ký tự!";
        return;
    }
    if (newName.length > 50) {
        document.getElementById('editCategoryError').textContent = "❌ Tên loại sách không được vượt quá 50 ký tự!";
        return;
    }
    // Loại trừ chính nó
    const isDuplicate = categories.some((cat, idx) =>
        idx !== editingCategoryIndex && cat.name.trim().toLowerCase() === newName.toLowerCase()
    );
    if (isDuplicate) {
        document.getElementById('editCategoryError').textContent =
            `❌ Loại sách "${newName}" đã tồn tại!`;
        return;
    }

    // Không thay đổi
    if (newName === categories[editingCategoryIndex].name) {
        document.getElementById('editCategoryError').textContent = "ℹ️ Bạn chưa đổi tên.";
        return;
    }

    // Nếu có sản phẩm dùng loại này, xác nhận
    const oldName = categories[editingCategoryIndex].name;
    const productCount = countProductsUsingCategory(oldName);
    if (productCount > 0) {
        if (!confirm(`⚠️ Có ${productCount} sản phẩm dùng "${oldName}". Đổi thành "${newName}"?\n(Sản phẩm sẽ tự động cập nhật)`)) {
            return;
        }
        updateCategoryInProducts(oldName, newName);
        updateCategoryInUserBooks(oldName, newName);
    }

    // Cập nhật
    categories[editingCategoryIndex].name = newName;
    saveCategories();
    displayCategories();
    closeEditCategoryModal();
    alert(`✅ Đã cập nhật!\n\n📚 ${newName}${productCount > 0 ? `\n📦 ${productCount} sản phẩm đã đồng bộ` : ''}`);
};

// Đóng modal sửa khi bấm ra ngoài
window.onclick = function(event) {
    if (event.target == document.getElementById('addCategoryModal')) {
        closeAddCategoryModal();
    }
    if (event.target == document.getElementById('editCategoryModal')) {
        closeEditCategoryModal();
    }
};
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
//             updated = true;loadCategories
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