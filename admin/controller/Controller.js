function renderProductsList(productsList) {
    var content = "";
    
    for( var i = 0; i < productsList.length; i++ ){
        var product = productsList[i];
        var contentTr = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <img src="${product.img}" alt="" width="200" height="150" />
                </td>
                <td>${product.desc}</td>
                <td>
                    <button class="btn btn-warning" onclick="editProduct(${product.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="delProduct(${product.id})">Xoá</button>
                </td>
            </tr>
        `
        content += contentTr;
    }

    // in danh sách ra table
    var productTable = document.querySelector("#tblDanhSachSP");
    productTable.innerHTML = content;
}

// lấy thông tin từ form
function getInfo() {
    var id = document.querySelector("#maSP").value;
    nameProduct = document.querySelector("#TenSP").value;
    priceProduct = document.querySelector("#GiaSP").value;
    imageProduct = document.querySelector("#HinhSP").value;
    describeProduct = document.querySelector("#loaiSP").value;

    return new Product(id, nameProduct, priceProduct, imageProduct, describeProduct);
}

// Tạo 2 hàm lúc loading khi đang khi request cho backend
function onLoading() {
    document.querySelector("#spinner").style.display = "flex";
}

function offLoading() {
    document.querySelector("#spinner").style.display = "none";
}









