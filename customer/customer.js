function fetchProductsList() {
  // trước khi load axios
  onLoading();

  // gọi axios ra
  // axios({
  //     url: "https://6500589318c34dee0cd4bff0.mockapi.io/products",
  //     method: "GET",
  // })
  //     // ở đây then chỉ cần data thôi nên chỉ cần res.data
  //     .then(function (res) {
  //         console.log('res: ', res.data);
  //         renderProductList(res.data);
  //         // sau khi load đc data từ backend rồi
  //         offLoading();
  //     })
  //     .catch(function (err) {
  //         console.log('err: ', err);
  //     });

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

// biến cart phải là global để nội dung trong nó ko bị xoá khi function addToCart chạy
var cartSP = [];
var cartSPQuan = [];
var quantity = 0;

function addToCart(idSP) {
  var alreadyInCart = false;
  editProductByID(idSP)
    .then(function (res) {
      // gán cái get đc cho sp
      var sp = res.data;

      if (cartSP.length == 0) {
        cartSP.push(sp);
        cartSPQuan.push(quantity);
      } else {
        for (var i = 0; i < cartSP.length; i++) {
          if (cartSP[i].id != sp.id) {
            // do nothing
          } 
          else {
            alreadyInCart = true;
          }
        }
        if ( !alreadyInCart ) {
          cartSP.push(sp);
        }
      }

      if (cartSP.length == 0) {
        var productTable = (document.querySelector("#inner").innerHTML = `
          <h3 class=".text-danger">Chưa có hàng trong giỏ</h3>
        `);
      } 
      else {
        renderProductsToCart(cartSP);
      }

      /*
      // hiển thị thông tin sp cần sửa lên modal
      document.querySelector("#maSP").value = sp.id;
      document.querySelector("#TenSP").value = sp.name;
      document.querySelector("#GiaSP").value = sp.price;
      document.querySelector("#screenSP").value = sp.screen;
      document.querySelector("#backCameraSP").value = sp.backCamera;
      document.querySelector("#frontCameraSP").value = sp.frontCamera;
      document.querySelector("#HinhSP").value = sp.img;
      document.querySelector("#descSP").value = sp.desc;
      document.querySelector("#loaiSP").value = sp.type;
      */
    })
    .catch(function (err) {
      //   offLoading();
      console.log("err", err);
    });
}
