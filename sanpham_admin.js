const defaultProducts = [
    { id: "SP001", name: "Tôi thấy hoa vàng trên cỏ xanh", category: "Văn học", 
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "img/Img/Tôi_thấy_hoa_vàng_trên_cỏ_xanh.jpg",
      description: "Tiểu thuyết nhẹ nhàng về tuổi thơ, tình bạn và ký ức của Nguyễn Nhật Ánh.", status: "active" },
    { id: "SP002", name: "Đắc nhân tâm", category: "Tâm lý",
      author: "Dale Carnegie", publisher: "NXB Tổng hợp TP.HCM",
      image: "img/Img/Đắc_nhân_tâm.jpg",
      description: "Kinh điển về nghệ thuật giao tiếp, tạo ảnh hưởng và xây dựng mối quan hệ.", status: "active" },
    { id: "SP003", name: "Nhà giả kim", category: "Văn học",
      author: "Paulo Coelho", publisher: "NXB Văn học",
      image: "img/Img/Nhà_giả_kim_(sách).jpg",
      description: "Hành trình phiêu lưu và tìm kiếm ý nghĩa cuộc đời - tác phẩm truyền cảm hứng toàn cầu.", status: "active" },
    { id: "SP004", name: "Cho tôi xin một vé đi tuổi thơ", category: "Thiếu nhi",
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "img/Img/Cho_tôi_xin_một_vé_đi_tuổi_thơ.jpg",
      description: "Những truyện ngắn đầy ấm áp về tuổi thơ và ký ức.", status: "active" },
    { id: "SP005", name: "Dế mèn phiêu lưu ký", category: "Thiếu nhi",
      author: "Tô Hoài", publisher: "NXB Kim Đồng",
      image: "img/Img/Dế_mèn_phiêu_lưu_kí.jpg",
      description: "Tác phẩm thiếu nhi kinh điển, nhiều bài học nhân văn sâu sắc.", status: "active" },
    { id: "SP006", name: "Tuổi thơ dữ dội", category: "Văn học",
      author: "Phùng Quán", publisher: "NXB Văn học",
      image: "img/Img/Tuổi_thơ_dữ_dội.jpg",
      description: "Tiểu thuyết phản ánh cuộc sống thanh niên trong thời chiến.", status: "active" },
    { id: "SP007", name: "Số đỏ", category: "Văn học",
      author: "Vũ Trọng Phụng", publisher: "NXB Văn học",
      image: "img/Img/Số_đỏ.jpg",
      description: "Châm biếm xã hội Việt Nam đầu thế kỷ 20, cuốn sách hài hước sắc bén.", status: "active" },
    { id: "SP008", name: "Nỗi buồn chiến tranh", category: "Văn học",
      author: "Bảo Ninh", publisher: "NXB Hội Nhà văn",
      image: "img/Img/Nỗi_buồn_chiến_tranh.jpg",
      description: "Tác phẩm được đánh giá cao về chủ đề chiến tranh và mất mát.", status: "active" },
    { id: "SP009", name: "Tư duy nhanh và chậm", category: "Tâm lý",
      author: "Daniel Kahneman", publisher: "NXB Thế giới",
      image: "img/Img/Tư_duy_nhanh_và_chậm.jpg",
      description: "Giải thích 2 hệ suy nghĩ tác động đến quyết định con người.", status: "active" },
    { id: "SP010", name: "Tuổi trẻ đáng giá bao nhiêu", category: "Tản văn",
      author: "Rosie Nguyễn", publisher: "NXB Hội Nhà văn",
      image: "img/Img/Tuổi_trẻ_đáng_giá_bao_nhiêu.jpg",
      description: "Sách truyền cảm hứng về phát triển bản thân và hành trình sự nghiệp.", status: "active" },
    { id: "SP011", name: "Khởi nghiệp 4.0", category: "Kinh tế",
      author: "Nguyễn Hữu Thái Hòa", publisher: "NXB Lao động",
      image: "img/Img/Khởi_nghiệp_4.0.jpg",
      description: "Những ý tưởng & case-study về khởi nghiệp trong thời đại số.", status: "active" },
    { id: "SP012", name: "Hãy sống ở thể chủ động", category: "Tâm lý",
      author: "Tony Robbins", publisher: "NXB Thế giới",
      image: "img/Img/Hãy_sống_ở_thể_chủ_động.jpg",
      description: "Rèn luyện tư duy chủ động, dám nghĩ, dám làm.", status: "active" },
    { id: "SP013", name: "Làm đĩ", category: "Văn học",
      author: "Vũ Trọng Phụng", publisher: "NXB Văn học",
      image: "img/Img/Làm_đĩ.jpg",
      description: "Phản ánh những vấn đề xã hội và đạo đức.", status: "active" },
    { id: "SP014", name: "Tôi tài giỏi, bạn cũng thế!", category: "Học tập",
      author: "Adam Khoo", publisher: "NXB Tổng hợp TP.HCM",
      image: "img/Img/Tôi_tài_giỏi_bạn_cũng_thế!.jpg",
      description: "Câu chuyện truyền cảm hứng, phương pháp học tập hiệu quả.", status: "active" },
    { id: "SP015", name: "Kể chuyện trước giờ đi ngủ", category: "Thiếu nhi",
      author: "Nhiều tác giả", publisher: "NXB Kim Đồng",
      image: "img/Img/Kể-chuyện-trước-giờ-đi-ngủ.jpg",
      description: "Tập hợp các câu chuyện ngắn ấm áp cho bé trước khi ngủ.", status: "active" },
    { id: "SP016", name: "Bộ não và tâm trí", category: "Tâm lý",
      author: "Daniel Siegel", publisher: "NXB Thế giới",
      image: "img/Img/Bộ_não_và_tâm_trí.jpg",
      description: "Cuốn sách cung cấp các kiến thức về tâm lý học.", status: "active" },
    { id: "SP017", name: "Bạn đắt giá bao nhiêu?", category: "Tản văn",
      author: "Vãn Tình", publisher: "NXB Phụ nữ",
      image: "img/Img/Bạn_đắt_giá_bao_nhiêu.jpg",
      description: "Bao gồm hơn 40 câu chuyện thực tế về tình yêu, hôn nhân, gia đình.", status: "active" },
    { id: "SP018", name: "Một đời như kẻ tìm đường", category: "Tiểu sử",
      author: "Phan Châu Trinh", publisher: "NXB Trẻ",
      image: "img/Img/Một_đời_như_kẻ_tìm_đường.jpg",
      description: "Xoay quanh triết lý về lựa chọn, sự kiên trì và hành trình tự khám phá bản thân.", status: "active" },
    { id: "SP019", name: "3 người thầy vĩ đại", category: "Tâm lý",
      author: "Robin Sharma", publisher: "NXB Thế giới",
      image: "img/Img/3_người_thầy_vĩ_đại.jpg",
      description: "Sách truyền cảm hứng và phát triển bản thân (self-help).", status: "active" },
    { id: "SP020", name: "Những tù nhân của địa lý", category: "Học tập",
      author: "Tim Marshall", publisher: "NXB Thế giới",
      image: "img/Img/Những_tù_nhân_của_địa_lý.jpg",
      description: "Cuốn sách giải thích cách địa lý ràng buộc và định hình các quyết định của quốc gia.", status: "active" },
    { id: "SP021", name: "Tinh hoa trí tuệ do thái", category: "Kinh doanh",
      author: "Nhiều tác giả", publisher: "NXB Lao động",
      image: "img/Img/Tinh_hoa_trí_tuệ_do_thái.jpg",
      description: "Tác phẩm này khai thác những bài học sâu sắc về tư duy, đạo đức và cách sống.", status: "active" },
    { id: "SP022", name: "Nghĩ giàu và làm giàu", category: "Kinh doanh",
      author: "Napoleon Hill", publisher: "NXB Tổng hợp TP.HCM",
      image: "img/Img/Nghĩ_giàu_và_làm_giàu.jpg",
      description: "Cuốn sách kinh điển về phát triển tư duy thành công và làm giàu.", status: "active" },
    { id: "SP023", name: "Hiểu về trái tim", category: "Tâm lý",
      author: "Minh Niệm", publisher: "NXB Trẻ",
      image: "img/Img/Hiểu_về_trái_tim.jpg",
      description: "Cuốn sách kết hợp tư tưởng Phật giáo Đại thừa và thiền Vipassana.", status: "active" },
    { id: "SP024", name: "Đừng bao giờ đi ăn một mình", category: "Tâm lý",
      author: "Keith Ferrazzi", publisher: "NXB Trẻ",
      image: "img/Img/Đừng_bao_giờ_đi_ăn_một_mình.jpg",
      description: "Thay đổi cách bạn nhìn nhận về cuộc sống và giao tiếp xung quanh.", status: "active" },
    { id: "SP025", name: "Đọc vị bất kì ai", category: "Tâm lý",
      author: "David J. Lieberman", publisher: "NXB Thế giới",
      image: "img/Img/Đọc_vị_bất_kì_ai.jpg",
      description: "Cuốn sách hứa hẹn trang bị cho độc giả những công cụ tâm lý sắc bén.", status: "active" },
    { id: "SP026", name: "Ra bờ suối ngắm hoa kèn hồng", category: "Văn học",
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "img/Img/Ra_bờ_suối_ngắm_hoa_kèn_hồng.jpg",
      description: "Câu chuyện lãng mạn, trữ tình, sử dụng hình ảnh hoa kèn hồng.", status: "active" },
    { id: "SP027", name: "Con chim xanh biếc quay về", category: "Tản văn",
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "img/Img/Con_chim_xanh_biếc_quay_về.jpg",
      description: "Cuốn sách đi sâu vào các cung bậc tình yêu.", status: "active" }
];


// ============================================
// ✅ MIGRATION: Cập nhật author và publisher cho sản phẩm cũ
// ============================================

function migrateOldProducts() {
    const saved = localStorage.getItem('bookstore_products');
    if (!saved) return;
    
    try {
        let products = JSON.parse(saved);
        let hasChanged = false;
        
        console.log('🔍 Đang kiểm tra', products.length, 'sản phẩm...');
        
        products = products.map(product => {
            let updated = { ...product };
            
            // Tìm sản phẩm tương ứng trong defaultProducts
            const defaultProduct = defaultProducts.find(p => p.id === product.id);
            
            if (defaultProduct) {
                // ✅ THÊM AUTHOR NẾU CHƯA CÓ
                if (!updated.author || updated.author === 'Đang cập nhật' || updated.author === 'Chưa rõ') {
                    updated.author = defaultProduct.author;
                    hasChanged = true;
                    console.log(`✅ Cập nhật author cho ${product.id}: ${defaultProduct.author}`);
                }
                
                // ✅ THÊM PUBLISHER NẾU CHƯA CÓ
                if (!updated.publisher || updated.publisher === 'Đang cập nhật' || updated.publisher === 'Chưa rõ') {
                    updated.publisher = defaultProduct.publisher;
                    hasChanged = true;
                    console.log(`✅ Cập nhật publisher cho ${product.id}: ${defaultProduct.publisher}`);
                }
            }
            
            return updated;
        });
        
        if (hasChanged) {
            localStorage.setItem('bookstore_products', JSON.stringify(products));
            console.log('💾 Đã cập nhật author và publisher cho', products.length, 'sản phẩm');
        } else {
            console.log('✅ Tất cả sản phẩm đã có author và publisher');
        }
    } catch (e) {
        console.error('❌ Lỗi migration:', e);
    }
}

let products = [];

function saveToLocalStorage() {
    console.log('💾 Đang lưu', products.length, 'sản phẩm...');
    console.log('📦 Danh sách:', products);
    
    try {
        localStorage.setItem('bookstore_products', JSON.stringify(products));
        console.log('✅ Lưu thành công!');
    } catch (e) {
        console.error('❌ LỖI LƯU:', e);
        alert('❌ Không thể lưu! Lỗi: ' + e.message);
    }
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('bookstore_products');
    if (saved) {
        try {
            products = JSON.parse(saved);
            console.log('📦 Đã load', products.length, 'sản phẩm từ localStorage');
            
            // ✅ CHẠY MIGRATION NGAY SAU KHI LOAD
            migrateOldProducts();
            
            // ✅ LOAD LẠI SAU KHI MIGRATION
            const updated = localStorage.getItem('bookstore_products');
            if (updated) {
                products = JSON.parse(updated);
            }
        } catch (e) {
            console.error("❌ Lỗi parse JSON:", e);
            products = [...defaultProducts];
            saveToLocalStorage();
        }
    } else {
        console.log('🆕 Lần đầu load, tạo 27 sản phẩm mặc định');
        products = [...defaultProducts];
        saveToLocalStorage();
    }
}

function loadCategoriesFromAdmin() {
    const stored = localStorage.getItem('categories');
    if (!stored) {
        return ['Văn học', 'Tâm lý', 'Thiếu nhi', 'Tản văn', 'Học tập', 'Kinh tế', 'Kinh doanh', 'Tiểu sử'];
    }
    
    try {
        const allCategories = JSON.parse(stored);
        return allCategories
            .filter(cat => cat.status === 'active')
            .map(cat => cat.name)
            .sort((a, b) => a.localeCompare(b, 'vi'));
    } catch (e) {
        console.error('❌ Lỗi đọc categories:', e);
        return ['Văn học', 'Tâm lý', 'Thiếu nhi', 'Kinh tế'];
    }
}

function generateProductId() {
    if (products.length === 0) return "SP001";
    
    const lastId = products[products.length - 1].id;
    const lastNumber = parseInt(lastId.replace('SP', ''));
    const newNumber = lastNumber + 1;
    
    return "SP" + String(newNumber).padStart(3, '0');
}

function displayProducts() {
    let html = '';
    
    if (!products || products.length === 0) {
        html = '<tr><td colspan="9" style="text-align: center; padding: 40px;">Chưa có sản phẩm nào</td></tr>';
    } else {
        products.forEach((product, index) => {
            const productId = product.id || 'N/A';
            const productName = product.name || 'Chưa đặt tên';
            
            // ✅ SỬA: Ưu tiên lấy từ product, nếu không có thì mới hiển thị "Đang cập nhật"
            const productAuthor = product.author || 'Đang cập nhật';
            const productPublisher = product.publisher || 'Đang cập nhật';
            
            const productCategory = product.category || 'Chưa phân loại';
            const productImage = product.image || 'https://via.placeholder.com/100x100?text=No+Image';
            const productDescription = product.description || 'Chưa có mô tả';
            const productStatus = product.status || 'active';
            
            const statusBadge = productStatus === 'active' 
                ? '<span class="badge success">Đang bán</span>' 
                : '<span class="badge danger">Ẩn</span>';
            
            const shortDescription = productDescription.length > 50 
                ? productDescription.substring(0, 50) + '...' 
                : productDescription;
            
            html += `<tr>`;
            html += `<td><strong>${productId}</strong></td>`;
            html += `<td><img src="${productImage}" alt="${productName}" class="product-thumbnail" onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'"></td>`;
            html += `<td>${productName}</td>`;
            html += `<td>${productAuthor}</td>`;  // ✅ HIỂN THỊ TÁC GIẢ
            html += `<td>${productPublisher}</td>`;  // ✅ HIỂN THỊ NXB
            html += `<td>${productCategory}</td>`;
            html += `<td><span class="description-text">${shortDescription}</span></td>`;
            html += `<td>${statusBadge}</td>`;
            html += `<td>
                        <div class="action-btns">
                            <button class="btn-icon edit" onclick="openEditProductModal(${index})" title="Sửa">
                                <i class='bx bx-edit'></i>
                            </button>
                            <button class="btn-icon toggle" onclick="toggleProductStatus(${index})" title="${productStatus === 'active' ? 'Ẩn' : 'Hiện'}">
                                <i class='bx ${productStatus === 'active' ? 'bx-hide' : 'bx-show'}'></i>
                            </button>
                        </div>
                     </td>`;
            html += `</tr>`;
        });
    }
    
    const table = document.getElementById('productsTable');
    if (table) {
        table.innerHTML = html;
    }
}
function openAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.style.display = 'block';
    
    document.getElementById('addProductForm').reset();
    document.getElementById('newProductId').value = generateProductId();
    
    const categorySelect = document.getElementById('newProductCategory');
    if (categorySelect) {
        const categories = loadCategoriesFromAdmin();
        categorySelect.innerHTML = '<option value="">-- Chọn loại sách --</option>';
        categories.forEach(catName => {
            const option = document.createElement('option');
            option.value = catName;
            option.textContent = catName;
            categorySelect.appendChild(option);
        });
    }
    
    const preview = document.getElementById('newProductImagePreview');
    const noPreview = document.getElementById('noImagePreview');
    if (preview) preview.style.display = 'none';
    if (noPreview) {
        noPreview.style.display = 'block';
        noPreview.textContent = '📷 Chọn file ảnh ở trên để xem trước';
    }
}

function closeAddProductModal() {
    document.getElementById('addProductModal').style.display = 'none';
}

function openEditProductModal(index) {
    const modal = document.getElementById('editProductModal');
    modal.style.display = 'block';
    
    const product = products[index];
    
    document.getElementById('editProductIndex').value = index;
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    
    // ✅ FIX: Sử dụng đúng ID cho edit modal
    const editAuthorInput = document.getElementById('editProductAuthor');
    const editPublisherInput = document.getElementById('editProductPublisher');
    
    if (editAuthorInput) editAuthorInput.value = product.author || '';
    if (editPublisherInput) editPublisherInput.value = product.publisher || '';
    
    // ❌ XÓA DÒNG NÀY (vì không dùng URL nữa)
    // document.getElementById('editProductImage').value = product.image;
    
    document.getElementById('editProductDescription').value = product.description || '';
    
    const categorySelect = document.getElementById('editProductCategory');
    if (categorySelect) {
        const categories = loadCategoriesFromAdmin();
        categorySelect.innerHTML = '<option value="">-- Chọn loại sách --</option>';
        categories.forEach(catName => {
            const option = document.createElement('option');
            option.value = catName;
            option.textContent = catName;
            if (catName === product.category) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });
    }
    
    // ✅ FIX: Hiển thị ảnh hiện tại ĐÚNG CÁCH
    const preview = document.getElementById('editProductImagePreview');
    if (preview) {
        preview.src = product.image || 'https://via.placeholder.com/300x400?text=No+Image';
        preview.style.display = 'block'; // ✅ ĐẢM BẢO HIỆN ẢNH
        preview.style.maxWidth = '100%';
        preview.style.maxHeight = '300px';
        preview.style.borderRadius = '8px';
        
        // ✅ XỬ LÝ NẾU ẢNH BỊ LỖI
        preview.onerror = function() {
            this.src = 'https://via.placeholder.com/300x400?text=Image+Error';
        };
    }
}

function closeEditProductModal() {
    document.getElementById('editProductModal').style.display = 'none';
}

function toggleProductStatus(index) {
    const product = products[index];
    const action = product.status === 'active' ? 'ẨN' : 'HIỆN';
    
    if (confirm(`⚠️ Bạn có chắc muốn ${action} sản phẩm này?\n\n${product.id} - ${product.name}`)) {
        const scrollY = window.scrollY;
        
        products[index].status = product.status === 'active' ? 'hidden' : 'active';
        saveToLocalStorage();
        displayProducts();
        
        setTimeout(() => window.scrollTo(0, scrollY), 0);
    }
}

window.onclick = function(event) {
    const addModal = document.getElementById('addProductModal');
    const editModal = document.getElementById('editProductModal');
    
    if (event.target == addModal) {
        closeAddProductModal();
    }
    if (event.target == editModal) {
        closeEditProductModal();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Quản lý Sản phẩm loaded!");
    
    if (document.getElementById('productsTable')) {
        loadFromLocalStorage();
        displayProducts();
    }
    
    // ✅ XỬ LÝ PREVIEW ẢNH KHI CHỌN FILE (MODAL THÊM MỚI)
    const newImageFile = document.getElementById('newProductImageFile');
    if (newImageFile) {
        newImageFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            // Kiểm tra định dạng file
            if (!file.type.startsWith('image/')) {
                alert('❌ Vui lòng chọn file ảnh hợp lệ!');
                this.value = '';
                return;
            }
            
            // Kiểm tra kích thước file (tối đa 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('❌ Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.');
                this.value = '';
                return;
            }
            
            // Đọc file và hiển thị preview
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('newProductImagePreview');
                const noPreview = document.getElementById('noImagePreview');
                
                preview.src = event.target.result;
                preview.style.display = 'block';
                noPreview.style.display = 'none';
            };
            reader.readAsDataURL(file);
        });
    }
    
    // ✅ XỬ LÝ PREVIEW ẢNH KHI CHỌN FILE (MODAL SỬA)
    const editImageFile = document.getElementById('editProductImageFile');
    if (editImageFile) {
        editImageFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (!file.type.startsWith('image/')) {
                alert('❌ Vui lòng chọn file ảnh hợp lệ!');
                this.value = '';
                return;
            }
            
            if (file.size > 2 * 1024 * 1024) {
                alert('❌ Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.');
                this.value = '';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('editProductImagePreview');
                preview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
    
   // ✅ XỬ LÝ FORM THÊM SẢN PHẨM MỚI
const addForm = document.getElementById('addProductForm');
if (addForm) {
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // ✅ 1. LẤY GIÁ TRỊ TỪ FORM
        const productId = document.getElementById('newProductId').value.trim();
        const category = document.getElementById('newProductCategory').value.trim();
        const name = document.getElementById('newProductName').value.trim();
        const author = document.getElementById('newProductAuthor').value.trim();
        const publisher = document.getElementById('newProductPublisher').value.trim();
        const description = document.getElementById('newProductDescription').value.trim();
        const fileInput = document.getElementById('newProductImageFile');
        const file = fileInput.files[0];

        // ✅ 2. VALIDATE DỮ LIỆU
        if (!category) {
            alert('❌ Vui lòng chọn loại sản phẩm!');
            return;
        }
        
        if (!name) {
            alert('❌ Vui lòng nhập tên sản phẩm!');
            return;
        }
        
        if (!author) {
            alert('❌ Vui lòng nhập tác giả!');
            return;
        }
        
        if (!publisher) {
            alert('❌ Vui lòng nhập nhà xuất bản!');
            return;
        }
        
        if (!description) {
            alert('❌ Vui lòng nhập mô tả sản phẩm!');
            return;
        }
        
        if (!file) {
            alert('❌ Vui lòng chọn ảnh sản phẩm!');
            return;
        }
        
        // ✅ 3. KIỂM TRA TRÙNG SẢN PHẨM
        const isDuplicate = products.some(p =>
            p.name.toLowerCase() === name.toLowerCase() &&
            p.category.toLowerCase() === category.toLowerCase() &&
            p.author.toLowerCase() === author.toLowerCase()
        );
        
        if (isDuplicate) {
            alert('❌ Đã có sản phẩm này!\n\nVui lòng kiểm tra lại:\n- Tên: ' + name + '\n- Loại: ' + category + '\n- Tác giả: ' + author);
            return;
        }
        
        // ✅ 4. ĐỌC FILE ẢNH VÀ LƯU SẢN PHẨM
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64Image = event.target.result;
            
            // Tạo sản phẩm mới
            const newProduct = {
                id: productId,
                category: category,
                name: name,
                author: author,
                publisher: publisher,
                image: base64Image,
                description: description,
                status: 'active',
                costPrice: 0,  // ✅ Thêm giá vốn mặc định
                profitRate: 10, // ✅ Thêm tỷ lệ lợi nhuận mặc định
                price: 0        // ✅ Thêm giá bán mặc định
            };

            console.log('📦 Sản phẩm mới:', newProduct);
            
            // Thêm vào mảng
            products.push(newProduct);
            
            // Lưu vào localStorage
            saveToLocalStorage();
            
            // Hiển thị lại bảng
            displayProducts();
            
            // Đóng modal
            closeAddProductModal();
            
            // Thông báo thành công
            alert('✅ Đã thêm sản phẩm mới thành công!\n\n' +
                  '📋 Mã: ' + productId + '\n' +
                  '📚 Tên: ' + name + '\n' +
                  '✍️ Tác giả: ' + author + '\n' +
                  '🏢 NXB: ' + publisher);
        };
        
        reader.onerror = function() {
            alert('❌ Lỗi đọc file ảnh! Vui lòng thử lại.');
        };
        
        reader.readAsDataURL(file);
    });
}
    
    // ✅ XỬ LÝ FORM SỬA SẢN PHẨM
    const editForm = document.getElementById('editProductForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const index = parseInt(document.getElementById('editProductIndex').value);
            const fileInput = document.getElementById('editProductImageFile');
            
            // Hàm cập nhật sản phẩm
            const updateProduct = function(imageData) {
                products[index].category = document.getElementById('editProductCategory').value;
                products[index].name = document.getElementById('editProductName').value;
                
                const editAuthorInput = document.getElementById('editProductAuthor');
                const editPublisherInput = document.getElementById('editProductPublisher');
                
                products[index].author = editAuthorInput ? editAuthorInput.value : '';
                products[index].publisher = editPublisherInput ? editPublisherInput.value : '';
                
                // ✅ CHỈ CẬP NHẬT ẢNH NẾU CÓ CHỌN FILE MỚI
                if (imageData) {
                    products[index].image = imageData;
                }
                
                products[index].description = document.getElementById('editProductDescription').value;
                
                saveToLocalStorage();
                displayProducts();
                closeEditProductModal();
                
                alert('✅ Đã cập nhật sản phẩm thành công!');
            };
            
            // Nếu có chọn file mới
            if (fileInput.files && fileInput.files[0]) {
                const file = fileInput.files[0];
                
                if (!file.type.startsWith('image/')) {
                    alert('❌ Vui lòng chọn file ảnh hợp lệ!');
                    return;
                }
                
                if (file.size > 2 * 1024 * 1024) {
                    alert('❌ Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB.');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(event) {
                    updateProduct(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                // Không đổi ảnh, giữ nguyên
                updateProduct(null);
            }
        });
    }
});

window.addEventListener('storage', (e) => {
    if (e.key === 'categories') {
        console.log('🔄 Loại sách đã thay đổi!');
        const addModal = document.getElementById('addProductModal');
        const editModal = document.getElementById('editProductModal');
        
        if (addModal && addModal.style.display === 'block') {
            closeAddProductModal();
            setTimeout(openAddProductModal, 100);
        }
        
        if (editModal && editModal.style.display === 'block') {
            const index = document.getElementById('editProductIndex')?.value;
            if (index) {
                closeEditProductModal();
                setTimeout(() => openEditProductModal(parseInt(index)), 100);
            }
        }
    }
});