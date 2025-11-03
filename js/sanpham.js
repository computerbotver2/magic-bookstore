// js/sanpham.js

// LẤY DỮ LIỆU TỪ LOCALSTORAGE
const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

const productsPerPage = 8;
function displayProduct(page){
    page = parseInt(page);
    var productGrid = document.getElementById("product-grid");
    var item = "";
    var start = (page-1)*productsPerPage;
    var end = start+productsPerPage;

    if(end > allProducts.length){
        end = allProducts.length;
    }

    for(var i=start;i<end;i++){
        // Sửa link để trỏ đến trang chi tiết
        item +=`
                <a href="./chitietsanpham.html?id=${allProducts[i].id}">
                    <div class="product-card">
                        <img src="${allProducts[i].img}" alt="${allProducts[i].name}">
                        <div class="information">
                            <h4>${allProducts[i].name}</h4>
                            <p>${allProducts[i].author}</p>
                            <p>${allProducts[i].price.toLocaleString('vi-VN')}đ</p>
                        </div>               
                    </div>
                </a>`
    }
    productGrid.innerHTML=`${item}`;

    var pagination = document.getElementById("pagination");
    var lastPage = Math.ceil(allProducts.length/productsPerPage);
    var nextPage = page+1;
    var prevPage = page-1;
    var btn = `<button value="1" onclick="displayProduct(this.value)">Trang đầu</button>`;
    if(page==1){
        btn+=`
            <button class="active" value="1" onclick="displayProduct(this.value)">1</button>`;
            if(2<=lastPage){
                btn+=`<button value="2" onclick="displayProduct(this.value)">2</button>`;
            }
            if(3<=lastPage){
                btn+=`<button value="3" onclick="displayProduct(this.value)">3</button>`;
            }

    }else{
        btn+=`
            <button value="${prevPage}" onclick="displayProduct(this.value)">${prevPage}</button>
            <button value="${page}" class="active" onclick="displayProduct(this.value)">${page}</button>`;
            if((nextPage)<=lastPage){
                btn+=`<button value="${nextPage}" onclick="displayProduct(this.value)">${nextPage}</button>`;
            }
        }
    btn+=`<button value="${lastPage}" onclick="displayProduct(this.value)">Trang cuối</button>`;       
    pagination.innerHTML= btn;            
}

displayProduct(1);