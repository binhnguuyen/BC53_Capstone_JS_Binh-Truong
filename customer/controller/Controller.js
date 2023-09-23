function renderProductsList(productsList) {
  var content = "";

  for (var i = 0; i < productsList.length; i++) {
    var product = productsList[i];
    var contentTr = `
            <div class="my-4 col-12 col-lg-4 col-sm-6">
                <div class="card animate__animated animate__zoomIn">
                    <img src="${product.img}" class="card-img-top" alt="" width="200" height="350">
                    <div>
                        <h5>${product.name}</h5>
                        <p><span>Price </span>${product.price}<span> $</span></p>
                        <p>${product.desc}</p>
                    </div>
                </div>
            </div> 
        `;
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









