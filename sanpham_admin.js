const defaultProducts = [
    { id: "SP001", name: "Tôi thấy hoa vàng trên cỏ xanh", category: "Văn học", 
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "https://upload.wikimedia.org/wikipedia/vi/3/3d/T%C3%B4i_th%E1%BA%A5y_hoa_v%C3%A0ng_tr%C3%AAn_c%E1%BB%8F_xanh.jpg",
      description: "Tiểu thuyết nhẹ nhàng về tuổi thơ, tình bạn và ký ức của Nguyễn Nhật Ánh.", status: "active" },
    { id: "SP002", name: "Đắc nhân tâm", category: "Tâm lý",
      author: "Dale Carnegie", publisher: "NXB Tổng hợp TP.HCM",
      image: "https://i.pinimg.com/1200x/1c/22/df/1c22df7132ad8f1358688b23831e9eaf.jpg",
      description: "Kinh điển về nghệ thuật giao tiếp, tạo ảnh hưởng và xây dựng mối quan hệ.", status: "active" },
    { id: "SP003", name: "Nhà giả kim", category: "Văn học",
      author: "Paulo Coelho", publisher: "NXB Văn học",
      image: "https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg",
      description: "Hành trình phiêu lưu và tìm kiếm ý nghĩa cuộc đời - tác phẩm truyền cảm hứng toàn cầu.", status: "active" },
    { id: "SP004", name: "Cho tôi xin một vé đi tuổi thơ", category: "Thiếu nhi",
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "https://i.pinimg.com/736x/7e/46/f0/7e46f046c4b1bd0e625053087cd9158c.jpg",
      description: "Những truyện ngắn đầy ấm áp về tuổi thơ và ký ức.", status: "active" },
    { id: "SP005", name: "Dế mèn phiêu lưu ký", category: "Thiếu nhi",
      author: "Tô Hoài", publisher: "NXB Kim Đồng",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/91/B%C3%ACa_D%E1%BA%BF_M%C3%A8n_Phi%C3%AAu_L%C6%B0u_K%C3%BD_c%E1%BB%A7a_NXB_T%C3%A2n_D%C3%A2n.jpg",
      description: "Tác phẩm thiếu nhi kinh điển, nhiều bài học nhân văn sâu sắc.", status: "active" },
    { id: "SP006", name: "Tuổi thơ dữ dội", category: "Văn học",
      author: "Phùng Quán", publisher: "NXB Văn học",
      image: "https://i.pinimg.com/1200x/ce/a4/21/cea421166a7265a3edaf6ff1cee84318.jpg",
      description: "Tiểu thuyết phản ánh cuộc sống thanh niên trong thời chiến.", status: "active" },
    { id: "SP007", name: "Số đỏ", category: "Văn học",
      author: "Vũ Trọng Phụng", publisher: "NXB Văn học",
      image: "https://i.pinimg.com/1200x/8f/90/d6/8f90d60881926f64042f0471f4ebf94d.jpg",
      description: "Châm biếm xã hội Việt Nam đầu thế kỷ 20, cuốn sách hài hước sắc bén.", status: "active" },
    { id: "SP008", name: "Nỗi buồn chiến tranh", category: "Văn học",
      author: "Bảo Ninh", publisher: "NXB Hội Nhà văn",
      image: "https://i.pinimg.com/736x/eb/17/e8/eb17e825f75c890e40387880eff085d9.jpg",
      description: "Tác phẩm được đánh giá cao về chủ đề chiến tranh và mất mát.", status: "active" },
    { id: "SP009", name: "Tư duy nhanh và chậm", category: "Tâm lý",
      author: "Daniel Kahneman", publisher: "NXB Thế giới",
      image: "https://i.pinimg.com/736x/1e/a3/97/1ea397a98ed76e0c403241a132a3b07d.jpg",
      description: "Giải thích 2 hệ suy nghĩ tác động đến quyết định con người.", status: "active" },
    { id: "SP010", name: "Tuổi trẻ đáng giá bao nhiêu", category: "Tản văn",
      author: "Rosie Nguyễn", publisher: "NXB Hội Nhà văn",
      image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg",
      description: "Sách truyền cảm hứng về phát triển bản thân và hành trình sự nghiệp.", status: "active" },
    { id: "SP011", name: "Khởi nghiệp 4.0", category: "Kinh tế",
      author: "Nguyễn Hữu Thái Hòa", publisher: "NXB Lao động",
      image: "https://i.pinimg.com/1200x/b0/24/d4/b024d4efaafc873aa43790199e8f2486.jpg",
      description: "Những ý tưởng & case-study về khởi nghiệp trong thời đại số.", status: "active" },
    { id: "SP012", name: "Hãy sống ở thể chủ động", category: "Tâm lý",
      author: "Tony Robbins", publisher: "NXB Thế giới",
      image: "https://i.pinimg.com/736x/66/49/fd/6649fd19ea16771ed7fa6d3731a01190.jpg",
      description: "Rèn luyện tư duy chủ động, dám nghĩ, dám làm.", status: "active" },
    { id: "SP013", name: "Làm đĩ", category: "Văn học",
      author: "Vũ Trọng Phụng", publisher: "NXB Văn học",
      image: "https://i.pinimg.com/736x/7f/41/c4/7f41c46ffc85489b239a5c3f2409f936.jpg",
      description: "Phản ánh những vấn đề xã hội và đạo đức.", status: "active" },
    { id: "SP014", name: "Tôi tài giỏi, bạn cũng thế!", category: "Học tập",
      author: "Adam Khoo", publisher: "NXB Tổng hợp TP.HCM",
      image: "https://i.pinimg.com/736x/9f/0c/cc/9f0ccce351725eaaf44ce10a11d9b3bc.jpg",
      description: "Câu chuyện truyền cảm hứng, phương pháp học tập hiệu quả.", status: "active" },
    { id: "SP015", name: "Kể chuyện trước giờ đi ngủ", category: "Thiếu nhi",
      author: "Nhiều tác giả", publisher: "NXB Kim Đồng",
      image: "https://cdn.hstatic.net/products/200000343865/10-phut-ke-chuyen-truoc-gio-di-ngu_tap-1_bia_17888c5e3c1540f49713dd68fabada03_master.jpg",
      description: "Tập hợp các câu chuyện ngắn ấm áp cho bé trước khi ngủ.", status: "active" },
    { id: "SP016", name: "Bộ não và tâm trí", category: "Tâm lý",
      author: "Daniel Siegel", publisher: "NXB Thế giới",
      image: "https://i.pinimg.com/1200x/ce/4c/ef/ce4cef5c17e21586c619367555f0afb1.jpg",
      description: "Cuốn sách cung cấp các kiến thức về tâm lý học.", status: "active" },
    { id: "SP017", name: "Bạn đắt giá bao nhiêu?", category: "Tản văn",
      author: "Vãn Tình", publisher: "NXB Phụ nữ",
      image: "https://i.pinimg.com/736x/91/c3/a0/91c3a091704af2298fe2686f68fca8cd.jpg",
      description: "Bao gồm hơn 40 câu chuyện thực tế về tình yêu, hôn nhân, gia đình.", status: "active" },
    { id: "SP018", name: "Một đời như kẻ tìm đường", category: "Tiểu sử",
      author: "Phan Châu Trinh", publisher: "NXB Trẻ",
      image: "https://i.pinimg.com/1200x/34/e9/7a/34e97a45aef8725d9acb4802bf3d6cca.jpg",
      description: "Xoay quanh triết lý về lựa chọn, sự kiên trì và hành trình tự khám phá bản thân.", status: "active" },
    { id: "SP019", name: "3 người thầy vĩ đại", category: "Tâm lý",
      author: "Robin Sharma", publisher: "NXB Thế giới",
      image: "https://i.pinimg.com/736x/98/e7/72/98e772c428b841aa88a595abda50f936.jpg",
      description: "Sách truyền cảm hứng và phát triển bản thân (self-help).", status: "active" },
    { id: "SP020", name: "Những tù nhân của địa lý", category: "Học tập",
      author: "Tim Marshall", publisher: "NXB Thế giới",
      image: "https://i.pinimg.com/736x/3f/c2/70/3fc270a525142c166bc67ba2efe59d9d.jpg",
      description: "Cuốn sách giải thích cách địa lý ràng buộc và định hình các quyết định của quốc gia.", status: "active" },
    { id: "SP021", name: "Tinh hoa trí tuệ do thái", category: "Kinh doanh",
      author: "Nhiều tác giả", publisher: "NXB Lao động",
      image: "https://i.pinimg.com/1200x/8c/8b/ad/8c8badc6e347491face9e45f95f918bf.jpg",
      description: "Tác phẩm này khai thác những bài học sâu sắc về tư duy, đạo đức và cách sống.", status: "active" },
    { id: "SP022", name: "Nghĩ giàu và làm giàu", category: "Kinh doanh",
      author: "Napoleon Hill", publisher: "NXB Tổng hợp TP.HCM",
      image: "https://i.pinimg.com/736x/e6/2f/42/e62f42cd1f4a34ade468bd0ed00615c8.jpg",
      description: "Cuốn sách kinh điển về phát triển tư duy thành công và làm giàu.", status: "active" },
    { id: "SP023", name: "Hiểu về trái tim", category: "Tâm lý",
      author: "Minh Niệm", publisher: "NXB Trẻ",
      image: "https://i.pinimg.com/1200x/38/5a/c3/385ac303dfd1902031328884f33e57c5.jpg",
      description: "Cuốn sách kết hợp tư tưởng Phật giáo Đại thừa và thiền Vipassana.", status: "active" },
    { id: "SP024", name: "Đừng bao giờ đi ăn một mình", category: "Tâm lý",
      author: "Keith Ferrazzi", publisher: "NXB Trẻ",
      image: "https://i.pinimg.com/1200x/52/82/65/5282658fd4dfe57b0017020f44484833.jpg",
      description: "Thay đổi cách bạn nhìn nhận về cuộc sống và giao tiếp xung quanh.", status: "active" },
    { id: "SP025", name: "Đọc vị bất kì ai", category: "Tâm lý",
      author: "David J. Lieberman", publisher: "NXB Thế giới",
      image: "https://i.pinimg.com/736x/d6/ae/7b/d6ae7bd49f81978f3b913ec3a10ee0c2.jpg",
      description: "Cuốn sách hứa hẹn trang bị cho độc giả những công cụ tâm lý sắc bén.", status: "active" },
    { id: "SP026", name: "Ra bờ suối ngắm hoa kèn hồng", category: "Văn học",
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "https://i.pinimg.com/736x/1c/37/87/1c3787a6e1ff9a1f335034bf6f2ef73a.jpg",
      description: "Câu chuyện lãng mạn, trữ tình, sử dụng hình ảnh hoa kèn hồng.", status: "active" },
    { id: "SP027", name: "Con chim xanh biếc quay về", category: "Tản văn",
      author: "Nguyễn Nhật Ánh", publisher: "NXB Trẻ",
      image: "https://i.pinimg.com/1200x/9c/da/85/9cda85b18790f015f91b689ee2adc90e.jpg",
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
    localStorage.setItem('bookstore_products', JSON.stringify(products));
    console.log('💾 Đã lưu', products.length, 'sản phẩm');
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
        noPreview.textContent = 'Ảnh sẽ hiển thị ở đây sau khi nhập URL';
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
    
    document.getElementById('editProductImage').value = product.image;
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
    
    const preview = document.getElementById('editProductImagePreview');
    if (preview) {
        preview.src = product.image;
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
    
    const imageInput = document.getElementById('newProductImage');
    if (imageInput) {
        imageInput.addEventListener('input', function() {
            const url = this.value;
            const preview = document.getElementById('newProductImagePreview');
            const noPreview = document.getElementById('noImagePreview');
            
            if (url) {
                preview.src = url;
                preview.style.display = 'block';
                noPreview.style.display = 'none';
                
                preview.onerror = function() {
                    this.style.display = 'none';
                    noPreview.style.display = 'block';
                    noPreview.textContent = '❌ URL ảnh không hợp lệ';
                };
            } else {
                preview.style.display = 'none';
                noPreview.style.display = 'block';
                noPreview.textContent = 'Ảnh sẽ hiển thị ở đây sau khi nhập URL';
            }
        });
    }
    
    const editImageInput = document.getElementById('editProductImage');
    if (editImageInput) {
        editImageInput.addEventListener('input', function() {
            const url = this.value;
            const preview = document.getElementById('editProductImagePreview');
            
            if (url && preview) {
                preview.src = url;
                preview.onerror = function() {
                    this.src = 'https://via.placeholder.com/200x200?text=Invalid+URL';
                };
            }
        });
    }
    
    const addForm = document.getElementById('addProductForm');
    if (addForm) {
        addForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Lấy dữ liệu sản phẩm mới
            const newProduct = {
                id: document.getElementById('newProductId').value,
                category: document.getElementById('newProductCategory').value.trim(),
                name: document.getElementById('newProductName').value.trim(),
                author: document.getElementById('newProductAuthor').value.trim(),
                publisher: document.getElementById('newProductPublisher').value.trim(),
                image: document.getElementById('newProductImage').value.trim(),
                description: document.getElementById('newProductDescription').value.trim(),
                status: 'active'
            };

            // =========================== //
            // 💥 KIỂM TRA TRÙNG SẢN PHẨM  //
            // =========================== //
            const isDuplicate = products.some(p =>
                p.name.toLowerCase() === newProduct.name.toLowerCase() &&
                p.category.toLowerCase() === newProduct.category.toLowerCase() &&
                p.author.toLowerCase() === newProduct.author.toLowerCase() &&
                p.publisher.toLowerCase() === newProduct.publisher.toLowerCase()
            );
            if (isDuplicate) {
                alert('❌ Đã có sản phẩm này! Vui lòng kiểm tra lại Tên, Thể loại, Tác giả, Nhà xuất bản.');
                return; // Không thêm sản phẩm mới nữa
            }

            // ✅ Debug log
            console.log('🆕 Sản phẩm mới:', newProduct);

            products.push(newProduct);
            saveToLocalStorage();
            displayProducts();
            closeAddProductModal();
            alert('✅ Đã thêm sản phẩm mới thành công!');
        });
    }
    
    const editForm = document.getElementById('editProductForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const index = parseInt(document.getElementById('editProductIndex').value);
            
            products[index].category = document.getElementById('editProductCategory').value;
            products[index].name = document.getElementById('editProductName').value;
            
            // ✅ FIX: Sử dụng đúng ID cho edit
            const editAuthorInput = document.getElementById('editProductAuthor');
            const editPublisherInput = document.getElementById('editProductPublisher');
            
            products[index].author = editAuthorInput ? editAuthorInput.value : '';
            products[index].publisher = editPublisherInput ? editPublisherInput.value : '';
            products[index].image = document.getElementById('editProductImage').value;
            products[index].description = document.getElementById('editProductDescription').value;
            
            saveToLocalStorage();
            displayProducts();
            closeEditProductModal();
            
            alert('✅ Đã cập nhật sản phẩm thành công!');
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