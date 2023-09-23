function renderProductsList(productsList) {
  var content = "";

  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];
    var contentTr = `
            <div class="my-4 col-12 col-lg-4 col-sm-6">
                <div class="card animate__animated animate__zoomIn">
                    <img src="${product.img}" class="card-img-top" alt="" width="200" height="300">
                    <div>
                        <h5>${product.name}</h5>
                        <p><span>Price </span>${product.price}<span> $</span></p>
                        <p>${product.desc}</p>
                    </div>
                </div>
            </div> 
        `;
    /*`
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>
                    <img src="${product.img}" alt="" width="200" height="200" />
                </td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-warning" onclick="editProduct(${product.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="delProduct(${product.id})">Xoá</button>
                </td>
            </tr>
        `
        */
    content += contentTr;
  }

  // in danh sách ra table
  var productTable = document.querySelector("#customerDSSP");
  productTable.innerHTML = content;
}

function getEle(selector) {
  return document.querySelector(selector);
}

// lấy thông tin từ form
function getInfo() {
  var id = document.querySelector("#maSP").value;
  var nameProduct = getEle("#TenSP").value;
  var priceProduct = getEle("#GiaSP").value;
  var screenProduct = getEle("#screenSP").value;
  var bkCamProduct = getEle("#backCameraSP").value;
  var frCamProduct = getEle("#frontCameraSP").value;
  var imageProduct = getEle("#HinhSP").value;
  var describeProduct = getEle("#descSP").value;
  var typeProduct = getEle("#loaiSP").value;

  return new Product(
    id,
    nameProduct,
    priceProduct,
    screenProduct,
    bkCamProduct,
    frCamProduct,
    imageProduct,
    describeProduct,
    typeProduct
  );
}

// Tạo 2 hàm lúc loading khi đang khi request cho backend
function onLoading() {
  document.querySelector("#spinner").style.display = "flex";
}

function offLoading() {
  document.querySelector("#spinner").style.display = "none";
}

function validationSP(value) {
  var tbmaSP = getEle("#tbmaSP");
  var nameProduct = getEle("#tbTenSP");
  var priceProduct = getEle("#tbGiaSP");
  var screenProduct = getEle("#tbscreenSP");
  var backCameraProduct = getEle("#tbbackCameraSP");
  var frontCameraProduct = getEle("#tbfrontCameraSP");
  var imageProduct = getEle("#tbHinhSP");
  var describeProduct = getEle("#tbdescSP");
  var typeProduct = getEle("#tbloaiSP");

  var messBlankName = "Tên sản phẩm không đc để trống";
  var messBlankPrice = "Giá sản phẩm không đc để trống";
  var messMinMaxPrice = "Giá phải là số trong 50000-100000000";
  var messCheckNnum = "Giá sản phẩm phải là số";
  var messBlankScreen = "Màn hình sản phẩm không đc để trống";
  var messBlankBKCam = "Camera sau không đc để trống";
  var messBlankFRCam = "Camera trước không đc để trống";

  var messBlankImg = "Link hình ảnh sản phẩm không đc để trống";
  var messBlankDesc = "Mô tả sản phẩm không đc để trống";
  var messCheckType = "Hãng sản xuất không hợp lệ";

  // kiểm tra tên sp có bỏ trống hay ko
  var valid = kiemTraRong(value.name, nameProduct, messBlankName);

  // kiểm tra giá sp có bỏ trống, có phải là số và nằm trong đúng khung giá hay ko
  valid &=
    kiemTraRong(value.price, priceProduct, messBlankPrice) &&
    kiemTraSo(value.price, priceProduct, messCheckNnum) &&
    kiemTraLonNho(value.price, priceProduct, 50000, 100000000, messMinMaxPrice);

  // kiểm tra màn hình sp có bỏ trống hay ko
  valid &= kiemTraRong(value.screen, screenProduct, messBlankScreen);

  // kiểm tra camera sau sp có bỏ trống hay ko
  valid &= kiemTraRong(value.backCamera, backCameraProduct, messBlankBKCam);

  // kiểm tra camera trước sp có bỏ trống hay ko
  valid &= kiemTraRong(value.frontCamera, frontCameraProduct, messBlankFRCam);

  // kiểm tra hình ảnh sp có bỏ trống hay ko
  valid &= kiemTraRong(value.img, imageProduct, messBlankImg);

  // kiểm tra miêu tả sp có bỏ trống hay ko
  valid &= kiemTraRong(value.desc, describeProduct, messBlankDesc);

  // kiểm tra loại sp có bỏ trống hay ko
  var hangSX = ["apple", "samsung"];
  valid &= kiemTraTrung(value.type, hangSX, typeProduct, messCheckType);

  if (valid) {
    return valid;
  } else {
    nameProduct.style.display = "block";
    priceProduct.style.display = "block";
    screenProduct.style.display = "block";
    backCameraProduct.style.display = "block";
    frontCameraProduct.style.display = "block";
    imageProduct.style.display = "block";
    describeProduct.style.display = "block";
    typeProduct.style.display = "block";
  }
}
