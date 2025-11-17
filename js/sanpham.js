/* ==== DỮ LIỆU SÁCH MẶC ĐỊNH ==== */
const books = [
  {id:1, title:"Tôi thấy hoa vàng trên cỏ xanh", author:"Nguyễn Nhật Ánh", category:"Văn học", publisher: "NXB Trẻ", price:85000,
   img:"img/Img/Tôi_thấy_hoa_vàng_trên_cỏ_xanh.jpg",
   desc:"Tiểu thuyết nhẹ nhàng về tuổi thơ, tình bạn và ký ức của Nguyễn Nhật Ánh."},
  {id:2, title:"Đắc nhân tâm", author:"Dale Carnegie", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:99000,
   img:"img/Img/Đắc_nhân_tâm.jpg",
   desc:"Kinh điển về nghệ thuật giao tiếp, tạo ảnh hưởng và xây dựng mối quan hệ."},
  {id:3, title:"Nhà giả kim", author:"Paulo Coelho", category:"Văn học", publisher: "NXB Văn học", price:105000,
   img:"img/Img/Nhà_giả_kim_(sách).jpg ",
   desc:"Hành trình phiêu lưu và tìm kiếm ý nghĩa cuộc đời - tác phẩm truyền cảm hứng toàn cầu."},
  {id:4, title:"Cho tôi xin một vé đi tuổi thơ", author:"Nguyễn Nhật Ánh", category:"Thiếu nhi", publisher: "NXB Trẻ", price:78000,
   img:"img/Img/Cho_tôi_xin_một_vé_đi_tuổi_thơ.jpg",
   desc:"Những truyện ngắn đầy ấm áp về tuổi thơ và ký ức."},
  {id:5, title:"Dế mèn phiêu lưu ký", author:"Tô Hoài", category:"Thiếu nhi", publisher: "NXB Kim Đồng", price:54000,
   img:"img/Img/Dế_mèn_phiêu_lưu_kí.jpg",
   desc:"Tác phẩm thiếu nhi kinh điển, nhiều bài học nhân văn sâu sắc."},
  {id:6, title:"Tuổi thơ dữ dội", author:"Phùng Quán", category:"Văn học", publisher: "NXB Trẻ", price:99000,
   img:"img/Img/Tuổi_thơ_dữ_dội.jpg",
   desc:"Tiểu thuyết phản ánh cuộc sống thanh niên trong thời chiến."},
  {id:7, title:"Số đỏ", author:"Vũ Trọng Phụng", category:"Văn học", publisher: "NXB Văn học", price:69000,
   img:"img/Img/Số_đỏ.jpg",
   desc:"Châm biếm xã hội Việt Nam đầu thế kỷ 20."},
  {id:8, title:"Nỗi buồn chiến tranh", author:"Bảo Ninh", category:"Văn học", publisher: "NXB Trẻ", price:129000,
   img:"img/Img/Nỗi_buồn_chiến_tranh.jpg",
   desc:"Tác phẩm về chiến tranh và mất mát."},
  {id:9, title:"Tư duy nhanh và chậm", author:"Daniel Kahneman", category:"Tâm lý", publisher: "Alpha Books", price:170000,
   img:"img/Img/Tư_duy_nhanh_và_chậm.jpg",
   desc:"Giải thích 2 hệ suy nghĩ tác động đến quyết định con người."},
  {id:10, title:"Tuổi trẻ đáng giá bao nhiêu", author:"Rosie Nguyễn", category:"Tản văn", publisher: "NXB Nhã Nam", price:120000,
   img:"img/Img/Tuổi_trẻ_đáng_giá_bao_nhiêu.jpg",
   desc:"Sách truyền cảm hứng về phát triển bản thân."},
  {id:11, title:"Khởi nghiệp 4.0", author:"Nhiều tác giả", category:"Kinh tế", publisher: "NXB Kinh tế", price:150000,
   img:"img/Img/Khởi_nghiệp_4.0.jpg",
   desc:"Những ý tưởng về khởi nghiệp trong thời đại số."},
  {id:12, title:"Hãy sống ở thể chủ động", author:"Nguyễn Tuấn Quỳnh", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:88000,
   img:"img/Img/Hãy_sống_ở_thể_chủ_động.jpg",
   desc:"Rèn luyện tư duy chủ động."},
  {id:13, title:"Làm đĩ", author:"Vũ Trọng Phụng", category:"Văn học", publisher: "NXB Văn học", price:93000,
   img:"img/Img/Làm_đĩ.jpg",
   desc:"Phản ánh vấn đề xã hội và đạo đức."},
  {id:14, title:"Tôi tài giỏi, bạn cũng thế!", author:"Adam Khoo", category:"Học tập", publisher: "NXB Phụ nữ", price:68000,
   img:"img/Img/Tôi_tài_giỏi_bạn_cũng_thế!.jpg",
   desc:"Câu chuyện truyền cảm hứng, phương pháp học tập hiệu quả."},
  {id:15, title:"Kể chuyện trước giờ đi ngủ", author:"Nhiều tác giả", category:"Thiếu nhi", publisher: "NXB Kim Đồng", price:59000,
   img:"img/Img/Kể-chuyện-trước-giờ-đi-ngủ.jpg",
   desc:"Tập hợp câu chuyện ngắn ấm áp cho bé."},
  {id:16, title:"Bộ não và tâm trí", author:"Nhiều tác giả", category:"Tâm lý", publisher: "Alpha Books", price:99000,
   img:"img/Img/Bộ_não_và_tâm_trí.jpg",
   desc:"Kiến thức về tâm lý học."},
  {id:17, title:"Bạn đắt giá bao nhiêu?", author:"Văn Tình", category:"Tản văn", publisher: "NXB Phụ nữ", price:70000,
   img:"img/Img/Bạn_đắt_giá_bao_nhiêu.jpg",
   desc:"Câu chuyện về tình yêu, hôn nhân, gia đình."},
  {id:18, title:"Một đời như kẻ tìm đường", author:"Phan Văn Trường", category:"Tiểu sử", publisher: "NXB Trẻ", price:95000,
   img:"img/Img/Một_đời_như_kẻ_tìm_đường.jpg",
   desc:"Triết lý về lựa chọn và hành trình tự khám phá."},
  {id:19, title:"3 người thầy vĩ đại", author:"Robin Sharma", category:"Tâm lý", publisher: "NXB Trẻ", price:110000,
   img:"img/Img/3_người_thầy_vĩ_đại.jpg",
   desc:"Sách truyền cảm hứng và phát triển bản thân."},
  {id:20, title:"Những tù nhân của địa lý", author:"Tim Marshall", category:"Học tập", publisher: "NXB Hội Nhà văn", price:125000,
   img:"img/Img/Những_tù_nhân_của_địa_lý.jpg",
   desc:"Địa lý và ảnh hưởng đến lịch sử."},
  {id:21, title:"Tinh hoa trí tuệ do thái", author:"Từ Quang Á", category:"Kinh doanh", publisher: "NXB Kinh tế", price:115000,
   img:"img/Img/Tinh_hoa_trí_tuệ_do_thái.jpg",
   desc:"Bài học về tư duy và kinh doanh."},
  {id:22, title:"Nghĩ giàu và làm giàu", author:"Napoleon Hill", category:"Kinh doanh", publisher: "NXB Tổng hợp TP.HCM", price:109000,
   img:"img/Img/Nghĩ_giàu_và_làm_giàu.jpg",
   desc:"Sách kinh điển về phát triển tư duy thành công."},
  {id:23, title:"Hiểu về trái tim", author:"Minh Niệm", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:99000,
   img:"img/Img/Hiểu_về_trái_tim.jpg",
   desc:"Kết hợp tư tưởng Phật giáo và thiền Vipassana."},
  {id:24, title:"Đừng bao giờ đi ăn một mình", author:"Keith Ferrazzi", category:"Tâm lý", publisher: "NXB Trẻ", price:89000,
   img:"img/Img/Đừng_bao_giờ_đi_ăn_một_mình.jpg",
   desc:"Thay đổi cách giao tiếp."},
  {id:25, title:"Đọc vị bất kì ai", author:"David J. Lieberman", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:113000,
   img:"img/Img/Đọc_vị_bất_kì_ai.jpg",
   desc:"Nhận diện sự thật và làm chủ giao tiếp."},
  {id:26, title:"Ra bờ suối ngắm hoa kèn hồng", author:"Nguyễn Nhật Ánh", category:"Văn học", publisher: "NXB Trẻ", price:97000,
   img:"img/Img/Ra_bờ_suối_ngắm_hoa_kèn_hồng.jpg",
   desc:"Câu chuyện lãng mạn, trữ tình."},
  {id:27, title:"Con chim xanh biếc quay về", author:"Nguyễn Nhật Ánh", category:"Tản văn", publisher: "NXB Trẻ", price:99000,
   img:"img/Img/Con_chim_xanh_biếc_quay_về.jpg",
   desc:"Cung bậc tình yêu đẹp đẽ."}
];

/* ================================================= */
/* ===== ĐỌC SẢN PHẨM TỪ ADMIN VÀ KẾT HỢP ======== */
/* ================================================= */

function getBooksFromAdmin() {
  console.log('📚 Đang đọc sách từ Admin...');
  const stored = localStorage.getItem('bookstore_products');
  
  if (!stored) {
      console.log('⚠️ Chưa có sản phẩm từ Admin, dùng 27 sách mặc định');
      return books;
  }
  
  try {
      const adminProducts = JSON.parse(stored);
      console.log(`📦 Admin có ${adminProducts.length} sản phẩm`);
      
      const hiddenNames = adminProducts
          .filter(p => p.status === 'hidden')
          .map(p => p.name.toLowerCase());
      
      console.log(`🔒 Có ${hiddenNames.length} sản phẩm đã ẩn:`, hiddenNames);
      
      const convertedBooks = adminProducts
          .filter(product => product.status === 'active')
          .map(product => {
              const defaultBook = books.find(b => 
                  b.title.toLowerCase() === product.name.toLowerCase()
              );
              
              let bookId;
              if (defaultBook) {
                  bookId = defaultBook.id;
              } else {
                  const match = product.id.match(/\d+/);
                  bookId = match ? parseInt(match[0]) : 1000;
              }
              
              return {
                id: bookId,
                title: product.name || 'Chưa đặt tên',
                author: product.author || defaultBook?.author || 'Đang cập nhật',  // ✅ SỬA
                category: product.category || 'Chưa phân loại',
                publisher: product.publisher || defaultBook?.publisher || 'Đang cập nhật',  // ✅ SỬA
                price: product.price || 110000,
                img: product.image || 'https://via.placeholder.com/300x400?text=No+Image',
                desc: product.description || 'Chưa có mô tả'
              };
          });
      
      console.log(`✅ Đã chuyển đổi ${convertedBooks.length} sản phẩm ACTIVE từ Admin`);
      
      const allBooks = [...convertedBooks];
      
      books.forEach(defaultBook => {
          const titleLower = defaultBook.title.toLowerCase();
          
          if (hiddenNames.includes(titleLower)) {
              console.log(`⏭️ Bỏ qua sách mặc định đã ẨN: ${defaultBook.title}`);
              return;
          }
          
          const exists = allBooks.find(b => 
              b.title.toLowerCase() === titleLower
          );
          
          if (!exists) {
              allBooks.push(defaultBook);
          }
      });
      
      console.log(`📚 Tổng cộng: ${allBooks.length} sách`);
      return allBooks;
      
  } catch (e) {
      console.error('❌ Lỗi đọc sản phẩm từ Admin:', e);
      return books;
  }
}
/* ================================================= */
/* ==== ĐỌC LOẠI SÁCH TỪ LOCALSTORAGE (ADMIN) ==== */
/* ================================================= */

function getCategoriesFromAdmin() {
    const stored = localStorage.getItem('categories');
    
    if (!stored) {
        const categoriesFromBooks = Array.from(new Set(books.map(b => b.category))).sort();
        const autoCategories = categoriesFromBooks.map((name, index) => ({
            id: "LS" + String(index + 1).padStart(3, '0'),
            name: name,
            status: "active"
        }));
        localStorage.setItem('categories', JSON.stringify(autoCategories));
        return autoCategories;
    }
    
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error('❌ Lỗi đọc categories:', e);
        const fallback = Array.from(new Set(books.map(b => b.category))).sort();
        return fallback.map((name, index) => ({
            id: "LS" + String(index + 1).padStart(3, '0'),
            name: name,
            status: "active"
        }));
    }
}

/* ==== Globals ==== */
const perPage = 6;
let currentPage = 1;

// ✅ ĐỌC SÁCH TỪ ADMIN + MẶC ĐỊNH
let allBooks = getBooksFromAdmin();
let filtered = [...allBooks];

// ✅ Đọc categories từ localStorage
const allCategoriesData = getCategoriesFromAdmin();
const categories = allCategoriesData
    .filter(cat => cat.status === 'active')
    .map(cat => cat.name)
    .sort((a, b) => a.localeCompare(b, 'vi'));

const publishers = Array.from(new Set(allBooks.map(b => b.publisher))).sort();

/* ===== DOM refs ===== */
const qName = document.getElementById('qName');
const qCat = document.getElementById('qCat');
const qPub = document.getElementById('qPub'); 
// ❌ ĐÃ XÓA QAUTHOR
const qMin = document.getElementById('qMin');
const qMax = document.getElementById('qMax');
const btnSearch = document.getElementById('btnSearch');
const productGrid = document.getElementById('productGrid');
const pagination = document.getElementById('pagination');
const catList = document.getElementById('catList');

/* ===== Fill categories ===== */
function initCategories(){
  categories.forEach(c=>{
    const opt = document.createElement('option'); opt.value=c; opt.textContent=c;
    qCat.appendChild(opt);
  });
  const all = document.createElement('div'); all.className='cat-item active'; all.textContent='Tất cả';
  catList.appendChild(all);
  all.addEventListener('click', ()=>{ document.querySelectorAll('.cat-item').forEach(x=>x.classList.remove('active')); all.classList.add('active'); qCat.value=''; doSearch(); });

  categories.forEach(c=>{const div = document.createElement('div'); div.className='cat-item'; div.textContent=c;
    div.addEventListener('click', ()=>{
      document.querySelectorAll('.cat-item').forEach(x=>x.classList.remove('active'));
      div.classList.add('active');
      qCat.value = c;
      doSearch();
    });
    catList.appendChild(div);
  });
}

/* ===== Fill publishers ===== */
function initPublishers(){
  const publisherList = Array.from(new Set(allBooks.map(b => b.publisher))).sort();
  publisherList.forEach(p=>{
    const opt = document.createElement('option'); opt.value=p; opt.textContent=p;
    qPub.appendChild(opt);
  });
}

/* ===== Render grid ===== */
function renderGrid(page=1){
  productGrid.innerHTML = ""; 
  const start = (page-1)*perPage;
  const pageItems = filtered.slice(start, start+perPage);

  if(pageItems.length===0){
    productGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)">Không tìm thấy sản phẩm.</div>`;
    renderPagination(); 
    return;
  } 
  
  pageItems.forEach(b=>{
    const div = document.createElement('article');
    div.className='card';
    
    const cover = document.createElement('div');
    cover.className = 'cover';
    cover.style.backgroundImage = `url('${b.img}')`;
    cover.onclick = () => openModal(b); 
    
    const meta = document.createElement('div');
    meta.className = 'meta';
    
    const infoBlock = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = b.title;
    title.onclick = () => openModal(b); 
    //////backup_products.txt
    const author = document.createElement('div');
    author.className = 'author';
    author.style.marginBottom = '4px';
    author.style.fontSize = '13px';
    author.style.color = '#666';
    author.textContent = b.author || 'Tác giả chưa rõ';  // ✅ THÊM FALLBACK
    
    const publisher = document.createElement('div');
    publisher.className = 'muted-small';
    publisher.style.fontSize = '12px';
    publisher.style.color = '#999';
    publisher.textContent = `NXB: ${b.publisher || 'Đang cập nhật'}`;  // ✅ THÊM FALLBACK
    // ✅ HIỂN THỊ TỒN KHO TRONG CARD
    const stockDiv = document.createElement('div');
    stockDiv.className = 'muted-small';
    const stockQty = getStockQuantity(b.id);
    if (stockQty > 0) {
        stockDiv.innerHTML = `<span style="color: #16a34a;">✓ Còn ${stockQty} cuốn</span>`;
    } else {
        stockDiv.innerHTML = `<span style="color: #dc2626;">✗ Hết hàng</span>`;
    }

    infoBlock.append(title, author, publisher, stockDiv); // ← Sửa dòng này
    
    
    const actionBlock = document.createElement('div');
    
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = `${numberWithCommas(b.price)}đ`;
    
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.className = 'card-qty';
    qtyInput.value = 1;
    qtyInput.min = 1;
    const qtyInputId = `qty-${b.id}`; 
    qtyInput.id = qtyInputId; 
    
    const btnAdd = document.createElement('button');
    btnAdd.className = 'btn-add';
    btnAdd.textContent = 'Thêm';
    btnAdd.onclick = (e) => {
      e.stopPropagation(); 
      const quantity = parseInt(document.getElementById(qtyInputId).value) || 1;
      const success = coreAddToCart(b, quantity);
      if (success) {
        alert(`Đã thêm ${quantity} cuốn "${b.title}" vào giỏ hàng!`);
        document.getElementById(qtyInputId).value = 1; 
      }
    };
    
    const btnBuy = document.createElement('button');
    btnBuy.className = 'btn-buy-now';
    btnBuy.textContent = 'Mua ngay';
    btnBuy.onclick = (e) => {
      e.stopPropagation(); 
      const quantity = parseInt(document.getElementById(qtyInputId).value) || 1;
      const success = coreAddToCart(b, quantity); 
      if (success) {
        window.location.href = 'giohang.html';
      }
    };
    
    actions.append(qtyInput, btnAdd, btnBuy);
    actionBlock.append(price, actions); 
    meta.append(infoBlock, actionBlock);
    div.append(cover, meta);
    productGrid.appendChild(div);
  });

  renderPagination();
}

/* ===== Pagination ===== */
function renderPagination(){
  pagination.innerHTML = "";
  const total = Math.ceil(filtered.length / perPage) || 1;
  const prev = document.createElement('button'); prev.innerText='‹';
  prev.disabled = currentPage===1;
  prev.onclick = ()=>{ if(currentPage>1){ currentPage--; renderGrid(currentPage); window.scrollTo({top:200,behavior:'smooth'}); } };
  pagination.appendChild(prev);
  const start = Math.max(1, currentPage - 3);
  const end = Math.min(total, start + 6);
  for(let i=start;i<=end;i++){
    const btn = document.createElement('button'); btn.textContent = i;
    if(i===currentPage) btn.classList.add('active');
    btn.onclick = ()=>{ currentPage = i; renderGrid(currentPage); window.scrollTo({top:200,behavior:'smooth'}); };
    pagination.appendChild(btn);
  }
  const next = document.createElement('button'); next.innerText='›';
  next.disabled = currentPage===total;
  next.onclick = ()=>{ if(currentPage<total){ currentPage++; renderGrid(currentPage); window.scrollTo({top:200,behavior:'smooth'}); } };
  pagination.appendChild(next);
}

/* ============================================ */
/* ===== ✅ HÀM TÌM KIẾM ĐÃ SỬA ===== */
/* ============================================ */
function doSearch(){
  const name = (qName.value || "").trim().toLowerCase();
  const cat = (qCat.value || "").trim();
  const pub = (qPub.value || "").trim(); 
  // ❌ ĐÃ XÓA TÁC GIẢ
  const min = parseFloat(qMin.value) || 0;
  const max = (qMax.value!=='') ? parseFloat(qMax.value) : Infinity;

  filtered = allBooks.filter(b=>{
    const byName = !name || b.title.toLowerCase().includes(name);
    const byCat = !cat || b.category === cat;
    const byPub = !pub || b.publisher === pub; 
    // ❌ ĐÃ XÓA TÁC GIẢ
    const byPrice = (b.price >= min && b.price <= max);
    
    return byName && byCat && byPub && byPrice; // ❌ ĐÃ XÓA byAuthor
  });

  currentPage = 1;
  renderGrid();
}

/* ===== Modal ===== */
const modal = document.getElementById('modal');
const modalQtyInput = document.getElementById('modalQtyInput'); 
const modalBtnAdd = document.getElementById('modalBtnAdd'); 
const modalBtnBuy = document.getElementById('modalBtnBuy'); 

function openModal(book){
  document.getElementById('modalImg').src = book.img;
  document.getElementById('modalTitle').textContent = book.title;
  document.getElementById('modalAuthor').textContent = 'Tác giả: ' + book.author;
  document.getElementById('modalCategory').textContent = 
    `Phân loại: ${book.category} | NXB: ${book.publisher}`;
  document.getElementById('modalPrice').textContent = numberWithCommas(book.price) + 'đ';
  document.getElementById('modalDesc').textContent = book.desc;
  // ✅ HIỂN THỊ TỒN KHO
  const stockQty = getStockQuantity(book.id);
  const stockElement = document.getElementById('modalStock');
  if (stockElement) {
      if (stockQty > 0) {
          stockElement.innerHTML = `<span style="color: #16a34a; font-weight: 600;">✓ ${stockQty} cuốn</span>`;
      } else {
          stockElement.innerHTML = `<span style="color: #dc2626; font-weight: 600;">✗ Hết hàng</span>`;
      }
  }
  modalQtyInput.value = 1;
  
  modalBtnAdd.onclick = () => {
    const quantity = parseInt(modalQtyInput.value) || 1;
    if (quantity < 1) {
        alert("Số lượng phải ít nhất là 1");
        modalQtyInput.value = 1;
        return;
    }
    const success = coreAddToCart(book, quantity);
    if (success) {
      alert(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng!`);
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  };
  
  modalBtnBuy.onclick = () => {
    const quantity = parseInt(modalQtyInput.value) || 1;
    if (quantity < 1) {
        alert("Số lượng phải ít nhất là 1");
        modalQtyInput.value = 1;
        return;
    }
    const success = coreAddToCart(book, quantity);
    if (success) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      window.location.href = 'giohang.html';
    }
  };
  
  modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false');
}

document.getElementById('closeModal').addEventListener('click', ()=>{ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); });
modal.addEventListener('click', (e)=>{ if(e.target===modal) { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } });

/* ===== Add to cart ===== */
function coreAddToCart(book, quantityToAdd) {
  const loggedInUserJSON = sessionStorage.getItem('currentUser');
  if (!loggedInUserJSON) {
    alert('Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng.');
    window.location.href = 'dangki.html'; 
    return false; 
  }
  // ✅ KIỂM TRA TỒN KHO
  const stockQty = getStockQuantity(book.id);
  if (stockQty === 0) {
      alert(`❌ Sản phẩm "${book.title}" hiện đã hết hàng!`);
      return false;
  }
  if (quantityToAdd > stockQty) {
      alert(`⚠️ Chỉ còn ${stockQty} cuốn "${book.title}" trong kho!\nVui lòng giảm số lượng.`);
      return false;
  }
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const loggedInUser = JSON.parse(loggedInUserJSON);
  let userIndex = users.findIndex(u => u.username === loggedInUser.username);

  if (userIndex === -1) {
    alert('Lỗi: Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
    return false; 
  }
  
  if (!users[userIndex].cart) {
    users[userIndex].cart = [];
  }
  let cart = users[userIndex].cart;
  let existingItem = cart.find(item => item.id === book.id);
  
  if (existingItem) {
    existingItem.quantity += quantityToAdd;
  } else {
    cart.push({
      id: book.id,
      title: book.title,
      img: book.img,
      price: book.price,
      quantity: quantityToAdd
    });
  }
  
  users[userIndex].cart = cart;
  localStorage.setItem('users', JSON.stringify(users));
  sessionStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

  return true; 
}
/* ===== ĐỌC TỒN KHO TỪ LOCALSTORAGE ===== */
function getStockQuantity(bookId) {
    const stockData = JSON.parse(localStorage.getItem('bookstore_stock') || '{}');
    
    // ✅ Chuyển bookId về STRING để khớp với key trong storage
    const key = String(bookId);
    const qty = parseInt(stockData[key]) || 0;
    
    console.log(`📦 Tồn kho ID ${bookId} (key="${key}"):`, qty);
    return qty;
}
/* ===== Utils ===== */
function numberWithCommas(x){ return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

/* ============================================ */
/* ===== ✅ INIT (ĐÃ THÊM LOGIC TOGGLE) ===== */
/* ============================================ */
initCategories();
initPublishers(); 
renderGrid();

btnSearch.addEventListener('click', doSearch);
qName.addEventListener('keyup', (e)=>{ if(e.key==='Enter') doSearch(); });
// ❌ ĐÃ XÓA LISTENER CỦA QAUTHOR

// ✅ THÊM LOGIC CHO NÚT LỌC NÂNG CAO (MỚI)
const btnAdvancedSearch = document.getElementById('btnAdvancedSearch');
if (btnAdvancedSearch) {
    btnAdvancedSearch.addEventListener('click', doSearch);
}

// ✅ THÊM LOGIC CHO NÚT TÌM KIẾM NÂNG CAO
const btnToggleAdvanced = document.getElementById('btnToggleAdvanced');
const advancedSearchContainer = document.getElementById('advancedSearchContainer');

if (btnToggleAdvanced && advancedSearchContainer) {
    btnToggleAdvanced.addEventListener('click', () => {
        const isActive = advancedSearchContainer.classList.toggle('active');
        const arrow = btnToggleAdvanced.querySelector('span');
        if (arrow) {
            arrow.textContent = isActive ? '▴' : '▾';
            arrow.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
}


document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
});

/* ===== Check account status ===== */
function checkAccountStatus() {
  const currentUserStr = sessionStorage.getItem('currentUser');
  if (!currentUserStr) return;
  
  try {
    const currentUser = JSON.parse(currentUserStr);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const latestUser = users.find(u => u.username === currentUser.username);
    
    if (!latestUser) {
      alert('⚠️ Tài khoản không tồn tại!');
      sessionStorage.removeItem('currentUser');
      window.location.href = 'dangki.html';
      return;
    }
    
    if (latestUser.status === 'locked') {
      alert('🔒 Tài khoản đã bị khóa!');
      sessionStorage.removeItem('currentUser');
      window.location.href = 'dangki.html';
      return;
    }
    
    sessionStorage.setItem('currentUser', JSON.stringify(latestUser));
    
  } catch (error) {
    console.error('❌ Lỗi kiểm tra tài khoản:', error);
  }
}

checkAccountStatus();
setInterval(checkAccountStatus, 5000);

/* ================================================= */
/* ===== TỰ ĐỘNG CẬP NHẬT KHI ADMIN THAY ĐỔI ===== */
/* ================================================= */

function refreshFromAdmin() {
    console.log('🔄 Đang refresh từ Admin...');
    
    allBooks = getBooksFromAdmin();
    
    // ✅ BẮT BUỘC phải cập nhật filtered
    const name = (qName.value || "").trim().toLowerCase();
    const cat = (qCat.value || "").trim();
    const pub = (qPub.value || "").trim();
    // ❌ ĐÃ XÓA TÁC GIẢ
    const min = parseFloat(qMin.value) || 0;
    const max = (qMax.value !== '') ? parseFloat(qMax.value) : Infinity;

    filtered = allBooks.filter(b => {
        const byName = !name || b.title.toLowerCase().includes(name);
        const byCat = !cat || b.category === cat;
        const byPub = !pub || b.publisher === pub;
        // ❌ ĐÃ XÓA TÁC GIẢ
        const byPrice = (b.price >= min && b.price <= max);
        return byName && byCat && byPub && byPrice; // ❌ ĐÃ XÓA byAuthor
    });
    
    // ✅ Reset về trang 1 nếu sản phẩm bị ẩn
    const totalPages = Math.ceil(filtered.length / perPage) || 1;
    if (currentPage > totalPages) {
        currentPage = 1;
    }
    
    renderGrid(currentPage);
    
    // ✅ Cập nhật categories
    const newCategoriesData = getCategoriesFromAdmin();
    const newCategories = newCategoriesData
        .filter(cat => cat.status === 'active')
        .map(cat => cat.name)
        .sort((a, b) => a.localeCompare(b, 'vi'));
    
    qCat.innerHTML = '<option value="">-- Tất cả --</option>';
    newCategories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        qCat.appendChild(opt);
    });
    
    catList.innerHTML = '';
    const all = document.createElement('div');
    all.className = 'cat-item active';
    all.textContent = 'Tất cả';
    all.addEventListener('click', () => {
        document.querySelectorAll('.cat-item').forEach(x => x.classList.remove('active'));
        all.classList.add('active');
        qCat.value = '';
        doSearch();
    });
    catList.appendChild(all);
    
    newCategories.forEach(c => {
        const div = document.createElement('div');
        div.className = 'cat-item';
        div.textContent = c;
        div.addEventListener('click', () => {
            document.querySelectorAll('.cat-item').forEach(x => x.classList.remove('active'));
            div.classList.add('active');
            qCat.value = c;
            doSearch();
        });
        catList.appendChild(div);
    });
    
    qPub.innerHTML = '<option value="">-- Tất cả --</option>';
    const newPublishers = Array.from(new Set(allBooks.map(b => b.publisher))).sort();
    newPublishers.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        qPub.appendChild(opt);
    });
    
    console.log(`✅ Đã cập nhật: ${allBooks.length} sách, ${filtered.length} hiển thị`);
}

// ❌ ĐÃ XÓA BỎ LỆNH HẸN GIỜ GÂY KHÓ CHỊU
// setInterval(refreshFromAdmin, 5000); 

// Lắng nghe storage event (Vẫn giữ lại, cái này tốt cho việc đồng bộ)
window.addEventListener('storage', (e) => {
    if (e.key === 'bookstore_products' || e.key === 'categories') {
        console.log('📢 Admin đã thay đổi:', e.key);
        refreshFromAdmin();
    }
});