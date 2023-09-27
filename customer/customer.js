/**
 * @param {*} fetchProductsList
 * Chức năng: hàm lấy product từ API và render ra giao diện
 * Tham số: không
 * Chú ý:
 */
function fetchProductsList() {
  // trước khi load axios
  onLoading();

  // định nghĩa bên ProductsServ
  getProductList()
    // thành công thì in ra sp
    .then(function (res) {
      // console.log("res", res.data);
      renderProductsList(res.data);
      offLoading();
    })
    // thất bại thì báo lỗi, hoặc in ra thông báo tuỳ mình
    .catch(function (err) {
      offLoading();
      console.log("err", err);
    });
  // cách 2: productServ().getProductList();
}

fetchProductsList();

/**
 * @param {*} filSP
 * Chức năng: hàm lọc sản phẩm
 * Tham số: không
 * Chú ý:
 */
function filSP() {
  var filterSP = document.querySelector("#filterSP").value;
  console.log("filterSP: ", filterSP);
  var tbFilterSP = document.querySelector("#tbFilterSP");
  var filterResult = [];
  var all = "All";

  getProductList()
    // thành công thì in ra sp
    .then(function (res) {
      var sp = res.data;

      if (filterSP === all) {
        renderProductsList(sp);
      } else {
        for (var i = 0; i < sp.length; i++) {
          if (filterSP === sp[i].type) {
            filterResult.push(sp[i]);
          }
        }
        renderProductsList(filterResult);
      }
      if (filterSP != all) {
        if (filterResult.length == 0) {
          tbFilterSP.classList.remove("d-none");
          tbFilterSP.classList.add("d-block");
        } else {
          tbFilterSP.classList.remove("d-block");
          tbFilterSP.classList.add("d-none");
        }
      }

      offLoading();
    })
    // thất bại thì báo lỗi, hoặc in ra thông báo tuỳ mình
    .catch(function (err) {
      offLoading();
      console.log("err", err);
    });
}

/**
 * @param {*} filSP
 * Chức năng: hàm thêm sản phẩm vào cart
 * Tham số: không
 * Chú ý:
 */
function plusOneToCart(idSP) {
  var alreadyInCart = false;
  var idToDel;
  var quantityInCart;

  editProductByID(idSP)
    .then(function (res) {
      // gán cái get đc cho các yếu tố của sản phẩm muốn đựng trong cart
      var idSP = res.data.id;
      var nameSP = res.data.name;
      var priceSP = res.data.price;
      var imgSP = res.data.img;
      var quantitySP = 1;

      var cartSP = new ProductInCart(idSP, nameSP, priceSP, imgSP, quantitySP);

      // kiểm tra xem dưới local storage có sp chưa!
      if (dsspInCart.product != null) {
        for (var i = 0; i < dsspInCart.product.length; i++) {
          if (dsspInCart.product[i].id != cartSP.id) {
            // do nothing
          } else {
            // nếu trùng thì cho trạng thái alreadyInCart sang true
            alreadyInCart = true;
            // lấy id trùng đó gán vào biến
            idToDel = cartSP.id;
            // lấy số lượng của id sp đó gán vào biến
            quantityInCart = dsspInCart.product[i].quantity;
            break;
          }
        }
      } else {
        // do nothing
      }

      // nếu chưa có thì mới thêm sp vô cart
      if (!alreadyInCart) {
        // cho sp vào cart
        dsspInCart._themSanPham(cartSP);
      } else {
        // Xoá sp có id trùng với sp định lưu vào
        dsspInCart._xoaSanPham(idToDel);
        //tăng số lượng lên 1
        quantityInCart += 1;
        // gán vào biến trong cart
        cartSP.quantity = quantityInCart;
        // cho sp vào cart
        dsspInCart._themSanPham(cartSP);
      }

      if (dsspInCart.product.length == 0) {
        var productTable = (document.querySelector("#inner").innerHTML = `
          <h3 class=".text-danger">Chưa có hàng trong giỏ</h3>
        `);
      } else {
        // render ra cart
        renderProductsToCart(dsspInCart.product);
      }

      // lưu sp xuống dưới local storage
      // localStorage: nơi lưu trữ (chỉ chấp nhận json) - json là 1 kiểudữ liệu
      // JSON.stringify: convert array to json
      var data = JSON.stringify(dsspInCart.product);
      // lưu data xuống localStorage
      localStorage.setItem("DSSP", data);

      // DOM số lượng product ra bên cạnh giỏ hàng
      calcNumOfProduct();

      // DOM tổng tiền của sản phẩm trong giỏ ra
      thanhTien();
      
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

/**
 * @param {*} filSP
 * Chức năng: hàm thêm sản phẩm vào cart
 * Tham số: không
 * Chú ý:
 */
function minusOneFromCart(idSP) {
  var alreadyInCart = false;
  var idToDel;
  var quantityInCart;

  editProductByID(idSP)
    .then(function (res) {
      // gán cái get đc cho các yếu tố của sản phẩm muốn đựng trong cart
      var idSP = res.data.id;
      var nameSP = res.data.name;
      var priceSP = res.data.price;
      var imgSP = res.data.img;
      var quantitySP = 1;

      var cartSP = new ProductInCart(idSP, nameSP, priceSP, imgSP, quantitySP);

      // kiểm tra xem dưới local storage có sp chưa!
      if (dsspInCart.product != null) {
        for (var i = 0; i < dsspInCart.product.length; i++) {
          if (dsspInCart.product[i].id != cartSP.id) {
            // do nothing
          } else {
            // nếu trùng thì cho trạng thái alreadyInCart sang true
            alreadyInCart = true;
            // lấy id trùng đó gán vào biến
            idToDel = cartSP.id;
            // lấy số lượng của id sp đó gán vào biến
            quantityInCart = dsspInCart.product[i].quantity;
            break;
          }
        }
      } else {
        // do nothing
      }

      // nếu chưa có thì mới thêm sp vô cart
      if (!alreadyInCart) {
        // cho sp vào cart
        dsspInCart._themSanPham(cartSP);
      } else {
        // Xoá sp có id trùng với sp định lưu vào
        dsspInCart._xoaSanPham(idToDel);
        //giảm số lượng lên 1
        quantityInCart -= 1;
        if (quantityInCart === 0) {
          dsspInCart._xoaSanPham(idToDel);
        } else {
          // gán vào biến trong cart
          cartSP.quantity = quantityInCart;
          // cho sp vào cart
          dsspInCart._themSanPham(cartSP);
        }
      }

      if (dsspInCart.product.length == 0) {
        var productTable = (document.querySelector("#inner").innerHTML = `
          <h3 class=".text-danger">Chưa có hàng trong giỏ</h3>
        `);
      } else {
        // render ra cart
        renderProductsToCart(dsspInCart.product);
      }

      // lưu sp xuống dưới local storage
      // localStorage: nơi lưu trữ (chỉ chấp nhận json) - json là 1 kiểudữ liệu
      // JSON.stringify: convert array to json
      var data = JSON.stringify(dsspInCart.product);
      // lưu data xuống localStorage
      localStorage.setItem("DSSP", data);

      // DOM số lượng product ra bên cạnh giỏ hàng
      calcNumOfProduct();

      // DOM tổng tiền của sản phẩm trong giỏ ra
      thanhTien();
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

/**
 * @param {*} calcNumOfProduct
 * Chức năng: hàm lọc sản phẩm
 * Tham số: không
 * Chú ý:
 */
function calcNumOfProduct() {
  var res;
  var numOfProduct = getEle("#numOfProduct");
  var sum = 0;
  for (var i = 0; i < dsspInCart.product.length; i++) {
    sum += dsspInCart.product[i].quantity;
  }
  res = `
    ${sum}
  `;
  numOfProduct.innerHTML = res;
}

// DOM số lượng product ra bên cạnh giỏ hàng
calcNumOfProduct();

/**
 * @param {*} calcNumOfProduct
 * Chức năng: hàm lọc sản phẩm
 * Tham số: không
 * Chú ý:
 */
function thanhTien() {
  var res;
  var sum = 0;
  var num;
  var thanhTien = getEle("#thanhTien");
  for (var i = 0; i < dsspInCart.product.length; i++) {
    sum += dsspInCart.product[i].tinhTienSanPham();
    num += dsspInCart.product[i].quantity;
    // sum += dsspInCart.product[i].quantity * dsspInCart.product[i].price;
  }
  
  if ( num !== 0 ) {
    res = `
      <h3>Thành tiền: </h3>
      <h4><span>$</span><spanclass="mr-auto">${sum}</spanclass=></h4>
    `;
  }
  else {
    res = ``;
  }
  thanhTien.innerHTML = res;
}

