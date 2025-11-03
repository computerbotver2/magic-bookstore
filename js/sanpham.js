/* ==== DỮ LIỆU SÁCH (Đã có publisher) ==== */
const books = [
  {id:1, title:"Tôi thấy hoa vàng trên cỏ xanh", author:"Nguyễn Nhật Ánh", category:"Văn học", publisher: "NXB Trẻ", price:85000,
   img:"https://upload.wikimedia.org/wikipedia/vi/3/3d/T%C3%B4i_th%E1%BA%A5y_hoa_v%C3%A0ng_tr%C3%AAn_c%E1%BB%8F_xanh.jpg",
   desc:"Tiểu thuyết nhẹ nhàng về tuổi thơ, tình bạn và ký ức của Nguyễn Nhật Ánh."},
  {id:2, title:"Đắc nhân tâm", author:"Dale Carnegie", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:99000,
   img:"https://i.pinimg.com/1200x/1c/22/df/1c22df7132ad8f1358688b23831e9eaf.jpg",
   desc:"Kinh điển về nghệ thuật giao tiếp, tạo ảnh hưởng và xây dựng mối quan hệ."},
  {id:3, title:"Nhà giả kim", author:"Paulo Coelho", category:"Văn học", publisher: "NXB Văn học", price:105000,img:"https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg",
   desc:"Hành trình phiêu lưu và tìm kiếm ý nghĩa cuộc đời - tác phẩm truyền cảm hứng toàn cầu."},
  {id:4, title:"Cho tôi xin một vé đi tuổi thơ", author:"Nguyễn Nhật Ánh", category:"Thiếu nhi", publisher: "NXB Trẻ", price:78000,
   img:"https://i.pinimg.com/736x/7e/46/f0/7e46f046c4b1bd0e625053087cd9158c.jpg",
   desc:"Những truyện ngắn đầy ấm áp về tuổi thơ và ký ức."},
  {id:5, title:"Dế mèn phiêu lưu ký", author:"Tô Hoài", category:"Thiếu nhi", publisher: "NXB Kim Đồng", price:54000,
   img:"httpshttps://upload.wikimedia.org/wikipedia/commons/9/91/B%C3%ACa_D%E1%BA%BF_M%C3%A8n_Phi%C3%AAu_L%C6%B0u_K%C3%BD_c%E1%BB%A7a_NXB_T%C3%A2n_D%C3%A2n.jpg",
   desc:"Tác phẩm thiếu nhi kinh điển, nhiều bài học nhân văn sâu sắc."},
  {id:6, title:"Tuổi thơ dữ dội", author:"Phùng Quán", category:"Văn học", publisher: "NXB Trẻ", price:99000,
   img:"https://i.pinimg.com/1200x/ce/a4/21/cea421166a7265a3edaf6ff1cee84318.jpg",
   desc:"Tiểu thuyết phản ánh cuộc sống thanh niên trong thời chiến - bản tiếng Việt."},
  {id:7, title:"Số đỏ", author:"Vũ Trọng Phụng", category:"Văn học", publisher: "NXB Văn học", price:69000,
   img:"https://i.pinimg.com/1200x/8f/90/d6/8f90d60881926f64042f0471f4ebf94d.jpg",
   desc:"Châm biếm xã hội Việt Nam đầu thế kỷ 20, cuốn sách hài hước sắc bén."},
  {id:8, title:"Nỗi buồn chiến tranh", author:"Bảo Ninh", category:"Văn học", publisher: "NXB Trẻ", price:129000,
   img:"https://i.pinimg.com/736x/eb/17/e8/eb17e825f75c890e40387880eff085d9.jpg",
   desc:"Tác phẩm được đánh giá cao về chủ đề chiến tranh và mất mát."},
  {id:9, title:"Tư duy nhanh và chậm", author:"Daniel Kahneman", category:"Tâm lý", publisher: "Alpha Books", price:170000,
   img:"https://i.pinimg.com/736x/1e/a3/97/1ea397a98ed76e0c403241a132a3b07d.jpg",
   desc:"Giải thích 2 hệ suy nghĩ tác động đến quyết định con người."},
  {id:10, title:"Tuổi trẻ đáng giá bao nhiêu", author:"Rosie Nguyễn", category:"Tản văn", publisher: "NXB Nhã Nam", price:120000,
   img:"https://i.pinimg.com/736x/99/f3/60/99f360b56e_5901ce2423ecbd5ca2de55.jpg",
   desc:"Sách truyền cảm hứng về phát triển bản thân và hành trình sự nghiệp."},
  {id:11, title:"Khởi nghiệp 4.0", author:"Nhiều tác giả", category:"Kinh tế", publisher: "NXB Kinh tế", price:150000,
   img:"https://i.pinimg.com/1200x/b0/24/d4/b024d4efaafc873aa43790199e8f2486.jpg",
   desc:"Những ý tưởng & case-study về khởi nghiệp trong thời đại số."},
  {id:12, title:"Hãy sống ở thể chủ động", author:"Nguyễn Tuấn Quỳnh", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:88000,
   img:"https://i.pinimg.com/736x/66/49/fd/6649fd19ea16771ed7fa6d3731a01190.jpg",
   desc:"Rèn luyện tư duy chủ động, dám nghĩ, dám làm, không đổ lỗi cho hoàn cảnh mà thay vào đó tìm kiếm và tạo ra cơ hội cho chính mình."},
  {id:13, title:"Làm đĩ", author:"Vũ Trọng Phụng", category:"Văn học", publisher: "NXB Văn học", price:93000,img:"https://i.pinimg.com/736x/7f/41/c4/7f41c46ffc85489b239a5c3f2409f936.jpg",
   desc:"Phản ánh những vấn đề xã hội và đạo đức, đặc biệt là về giới tính và sự suy đồi đạo đức trong xã hội lúc bấy giờ, gây nhiều tranh cãi khi xuất bản."},
  {id:14, title:"Tôi tài giỏi, bạn cũng thế!", author:"Adam Khoo", category:"Học tập", publisher: "NXB Phụ nữ", price:68000,
   img:"https://i.pinimg.com/736x/9f/0c/cc/9f0ccce351725eaaf44ce10a11d9b3bc.jpg",
   desc:"Câu chuyện truyền cảm hứng, phương pháp học tập hiệu quả, phát triển bản thân."},
  {id:15, title:"Kể chuyện trước giờ đi ngủ", author:"Nhiều tác giả", category:"Thiếu nhi", publisher: "NXB Kim Đồng", price:59000,
   img:"https://i.pinimg.com/736x/0e/3b/59/0e_3b_59113b1887a735efc588e21ad34a.jpg",
   desc:"Tập hợp các câu chuyện ngắn ấm áp cho bé trước khi ngủ."},
  {id:16, title:"Bộ não và tâm trí", author:"Nhiều tác giả", category:"Tâm lý", publisher: "Alpha Books", price:99000,
   img:"https://i.pinimg.com/1200x/ce/4c/ef/ce4cef5c17e21586c619367555f0afb1.jpg",
   desc:"Cuốn sách cung cấp các kiến thức về tâm lý học, đặc biệt tập trung vào mảng tâm lý học bất thường. "},
  {id:17, title:"Bạn đắt giá bao nhiêu?", author:"Văn Tình", category:"Tản văn", publisher: "NXB Phụ nữ", price:70000,
   img:"https://i.pinimg.com/736x/91/c3/a0/91c3a091704af2298fe2686f68fca8cd.jpg",
   desc:"Bao gồm hơn 40 câu chuyện thực tế về tình yêu, hôn nhân, gia đình và sự nghiệp."},
  {id:18, title:"Một đời như kẻ tìm đường", author:"Phan Văn Trường", category:"Tiểu sử", publisher: "NXB Trẻ", price:95000,
   img:"https://i.pinimg.com/1200x/34/e9/7a/34e97a45aef8725d9acb4802bf3d6cca.jpg",
   desc:"Xoay quanh triết lý về lựa chọn, sự kiên trì và hành trình tự khám phá bản thân."},
  {id:19, title:"3 người thầy vĩ đại", author:"Robin Sharma", category:"Tâm lý", publisher: "NXB Trẻ", price:110000,
   img:"https://i.pinimg.com/736x/98/e7/72/98e772c428b841aa88a595abda50f936.jpg",
   desc:"Sách truyền cảm hứng và phát triển bản thân (self-help)."},
  {id:20, title:"Những tù nhân của địa lý", author:"Tim Marshall", category:"Học tập", publisher: "NXB Hội Nhà văn", price:125000,
   img:"https://i.pinimg.com/736x/3f/c2/70/3fc270a525142c166bc67ba2efe59d9d.jpg",
   desc:"Cuốn sách giải thích cách địa lý ràng buộc và định hình các quyết định của quốc gia, từ đó ảnh hưởng đến lịch sử và các sự kiện hiện tại."},
  {id:21, title:"Tinh hoa trí tuệ do thái", author:"Từ Quang Á", category:"Kinh doanh", publisher: "NXB Kinh tế", price:115000,
   img:"https://i.pinimg.com/1200x/8c/8b/ad/8c8badc6e347491face9e45f95f918bf.jpg",
   desc:"Tác phẩm này khai thác những bài học sâu sắc về tư duy, đạo đức và cách sống từ dân tộc Do Thái, nổi tiếng với trí tuệ và sự khéo léo trong kinh doanh."},
  {id:22, title:"Nghĩ giàu và làm giàu", author:"Napoleon Hill", category:"Kinh doanh", publisher: "NXB Tổng hợp TP.HCM", price:109000,
   img:"https://i.pinimg.com/736x/e6/2f/42/e62f42cd1f4a34ade468bd0ed00615c8.jpg",
   desc:"Cuốn sách kinh điển về phát triển tư duy thành công và làm giàu."},{id:23, title:"Hiểu về trái tim", author:"Minh Niệm", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:99000,
   img:"https://i.pinimg.com/1200x/38/5a/c3/385ac303dfd1902031328884f33e57c5.jpg",
   desc:"Cuốn sách kết hợp tư tưởng Phật giáo Đại thừa và thiền Vipassana để hướng dẫn thực hành đối diện, chuyển hóa cảm xúc và chữa lành tâm hồn."},
  {id:24, title:"Đừng bao giờ đi ăn một mình", author:"Keith Ferrazzi và Tahl Raz", category:"Tâm lý", publisher: "NXB Trẻ", price:89000,
   img:"https://i.pinimg.com/1200x/52/82/65/5282658fd4dfe57b0017020f44484833.jpg",
   desc:"Thay đổi cách bạn nhìn nhận về cuộc sống và giao tiếp xung quanh."},
  {id:25, title:"Đọc vị bất kì ai", author:"David J. Lieberman", category:"Tâm lý", publisher: "NXB Tổng hợp TP.HCM", price:113000,
   img:"https://i.pinimg.com/736x/d6/ae/7b/d6ae7bd49f81978f3b913ec3a10ee0c2.jpg",
   desc:"Cuốn sách hứa hẹn trang bị cho độc giả những công cụ tâm lý sắc bén để nhận diện sự thật, phát hiện điều gian dối và làm chủ mọi tình huống giao tiếp."},
  {id:26, title:"Ra bờ suối ngắm hoa kèn hồng", author:"Nguyễn Nhật Ánh", category:"Văn học", publisher: "NXB Trẻ", price:97000,
   img:"https://i.pinimg.com/736x/1c/37/87/1c3787a6e1ff9a1f335034bf6f2ef73a.jpg",
   desc:"câu chuyện lãng mạn, trữ tình, sử dụng hình ảnh hoa kèn hồng để gợi nhớ về những cảm xúc tuổi trẻ và kỷ niệm."},
  {id:27, title:"Con chim xanh biếc quay về", author:"Nguyễn Nhật Ánh", category:"Tản văn", publisher: "NXB Trẻ", price:99000,
   img:"https://i.pinimg.com/1200x/9c/da/85/9cda85b18790f015f91b689ee2adc90e.jpg",
   desc:" Cuốn sách đi sâu vào các cung bậc tình yêu, bao gồm cả những tình huống tréo ngoe và những khoảnh khắc đẹp đẽ. "},
];

/* ==== Globals cho tìm & phân trang ==== */
const perPage = 6;
let currentPage = 1;
let filtered = [...books];
const categories = Array.from(new Set(books.map(b=>b.category))).sort();
const publishers = Array.from(new Set(books.map(b=>b.publisher))).sort();

/* ===== DOM refs (CẬP NHẬT) ===== */
const qName = document.getElementById('qName');
const qCat = document.getElementById('qCat');
const qPub = document.getElementById('qPub'); 
const qAuthor = document.getElementById('qAuthor'); // <-- THÊM MỚI
const qMin = document.getElementById('qMin');
const qMax = document.getElementById('qMax');
const btnSearch = document.getElementById('btnSearch');
const productGrid = document.getElementById('productGrid');
const pagination = document.getElementById('pagination');
const catList = document.getElementById('catList');

/* ===== Fill category selects & sidebar ===== */
function initCategories(){
  categories.forEach(c=>{
    const opt = document.createElement('option'); opt.value=c; opt.textContent=c;
    qCat.appendChild(opt);
  });
  const all = document.createElement('div'); all.className='cat-item active'; all.textContent='Tất cả'; all.dataset.cat='';
  catList.appendChild(all);
  all.addEventListener('click', ()=>{ document.querySelectorAll('.cat-item').forEach(x=>x.classList.remove('active')); all.classList.add('active'); qCat.value=''; doSearch(); });

  categories.forEach(c=>{const div = document.createElement('div'); div.className='cat-item'; div.textContent=c; div.dataset.cat=c;
    div.addEventListener('click', ()=>{
      document.querySelectorAll('.cat-item').forEach(x=>x.classList.remove('active'));
      div.classList.add('active');
      qCat.value = c;
      doSearch();
    });
    catList.appendChild(div);
  });
}

/* ===== Fill publishers select ===== */
function initPublishers(){
  publishers.forEach(p=>{
    const opt = document.createElement('option'); opt.value=p; opt.textContent=p;
    qPub.appendChild(opt);
  });
}

/* ===== Render products (grid) with pagination (Đã có NXB) ===== */
function renderGrid(page=1){
  productGrid.innerHTML = "";
  const start = (page-1)*perPage;
  const pageItems = filtered.slice(start, start+perPage);

  if(pageItems.length===0){
    productGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)">Không tìm thấy sản phẩm.</div>`;
  } else {
    pageItems.forEach(b=>{
      const div = document.createElement('article'); div.className='card'; div.tabIndex=0;
      div.innerHTML = `
        <div class="cover" style="background-image:url('${b.img}');background-size:cover;background-position:center;"></div>
        <div class="meta">
          <div>
            <div class="title">${escapeHtml(b.title)}</div>
            <div class="author" style="margin-bottom: 4px;">${escapeHtml(b.author)}</div>
            <div class="muted-small">NXB: ${escapeHtml(b.publisher)}</div>
          </div>
          <div style="margin-top:10px">
            <div class="price">${numberWithCommas(b.price)}đ</div>
          </div>
        </div>
      `;
      div.addEventListener('click', ()=>openModal(b));
      productGrid.appendChild(div);
    });
  }
  renderPagination();
}

/* ===== Pagination buttons ===== */
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

/* ===== Search logic (CẬP NHẬT) ===== */
function doSearch(){
  const name = (qName.value || "").trim().toLowerCase();
  const cat = (qCat.value || "").trim();
  const pub = (qPub.value || "").trim(); 
  const author = (qAuthor.value || "").trim().toLowerCase(); // <-- Lấy giá trị Tác giả
  const min = parseFloat(qMin.value) || 0;
  const max = (qMax.value!=='') ? parseFloat(qMax.value) : Infinity;

  filtered = books.filter(b=>{
    const byName = !name || b.title.toLowerCase().includes(name);
    const byCat = !cat || b.category === cat;
    const byPub = !pub || b.publisher === pub; 
    const byAuthor = !author || b.author.toLowerCase().includes(author); // <-- Thêm logic lọc Tác giả
    const byPrice = (b.price >= min && b.price <= max);
    
    return byName && byCat && byPub && byAuthor && byPrice; // <-- Cập nhật return
  });

  currentPage = 1;
  renderGrid();
}

/* ===== Modal details (Đã có NXB) ===== */
const modal = document.getElementById('modal');
const modalBuyButton = modal.querySelector('.btn-buy');
const modalQtyInput = document.getElementById('modalQtyInput'); 

function openModal(book){
  document.getElementById('modalImg').src = book.img;
  document.getElementById('modalTitle').textContent = book.title;
  document.getElementById('modalAuthor').textContent = 'Tác giả: ' + book.author;
  document.getElementById('modalCategory').textContent = 
    `Phân loại: ${book.category} | NXB: ${book.publisher}`;
  document.getElementById('modalPrice').textContent = numberWithCommas(book.price) + 'đ';
  document.getElementById('modalDesc').textContent = book.desc;
  
  modalQtyInput.value = 1;
  
  modalBuyButton.onclick = () => {
    const quantity = parseInt(modalQtyInput.value) || 1;
    if (quantity < 1) {
        alert("Số lượng phải ít nhất là 1");
        modalQtyInput.value = 1;
        return;
    }
    addToCart(book, quantity);
  };
  
  modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false');
}

document.getElementById('closeModal').addEventListener('click', ()=>{ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); });
modal.addEventListener('click', (e)=>{ if(e.target===modal) { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } });

/* ===== Hàm addToCart (logic đăng nhập) ===== */
function addToCart(book, quantityToAdd) {
  const loggedInUserJSON = sessionStorage.getItem('currentUser');
  if (!loggedInUserJSON) {
    alert('Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng.');
    window.location.href = 'dangki.html'; 
    return; 
  }
  
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const loggedInUser = JSON.parse(loggedInUserJSON);
  let userIndex = users.findIndex(u => u.username === loggedInUser.username);

  if (userIndex === -1) {
    alert('Lỗi: Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
    return;
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

  alert(`Đã thêm ${quantityToAdd} cuốn "${book.title}" vào giỏ hàng!`);
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}

/* ===== Utils ===== */
function numberWithCommas(x){ return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function escapeHtml(unsafe) {
  return unsafe.replace(/[&<"'>]/g, function(m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[m]; });
}

/* ===== Init (Đã cập nhật) ===== */
initCategories();
initPublishers(); 
renderGrid();

/* Events (CẬP NHẬT) */
btnSearch.addEventListener('click', doSearch);
qName.addEventListener('keyup', (e)=>{ if(e.key==='Enter') doSearch(); });
qAuthor.addEventListener('keyup', (e)=>{ if(e.key==='Enter') doSearch(); }); // <-- THÊM MỚI

/* Accessibility */
document.addEventListener('keydown', (e)=>{
  const active = document.activeElement;
  if(e.key === 'Escape') { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
  if(active && active.classList && active.classList.contains('card')){
    if(e.key === 'ArrowRight' && active.nextElementSibling) active.nextElementSibling.focus();
    if(e.key === 'ArrowLeft' && active.previousElementSibling) active.previousElementSibling.focus();
    if(e.key === 'Enter') active.click();
  }
});