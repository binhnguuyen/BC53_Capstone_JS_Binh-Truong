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
      console.log("res", res.data);
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

//Xóa SP

function delProduct(id) {
  // định nghĩa bên ProductsServ
  delProductList(id)
    .then(function (res) {
      // gọi lại api lấy lại tất cả sp trên server về sau khi xóa thành công để render ra ds mới nhất
      fetchProductsList();
      console.log("sản phẩm bị xóa", res.data);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

// Thêm SP
function addProduct() {
  // lấy sp từ form
  var sp = getInfo();
  console.log("sp: ", sp);

  // Validation check
  var valid = validationSP(sp);
  if (valid) {
    // định nghĩa bên ProductsServ
    addProductList(sp)
      .then(function (res) {
        console.log("res", res);
        //   tắt modal của bs sau khi thêm thành công

        // document.getElementById('myModal')
        $("#myModal").modal("hide");

        //lấy danh sách sp mới nhất từ server
        fetchProductsList();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

// Cập nhật sản phẩm
// Bước 1: lấy thông tin sp cẩn sửa show lên form
function editProduct(id) {
  editProductByID(id)
    .then(function (res) {
      console.log("res", res.data);
      // gán cái get đc cho sp
      var sp = res.data;

      // hiển thị thông tin sp cần sửa lên modal
      document.querySelector("#maSP").value = sp.id;
      document.querySelector("#TenSP").value = sp.name;
      document.querySelector("#GiaSP").value = sp.price;
      document.querySelector("#HinhSP").value = sp.image;
      document.querySelector("#loaiSP").value = sp.describe;
      // mở modal
      $("#myModal").modal("show");
    })
    .catch(function (err) {
      offLoading();
      console.log("err", err);
    });
}
// Bước 2: lấy thông tin từ form sau khi chỉnh sửa
function updateProduct() {
  var sp = getInfo();
  updateProductByID(sp.id, sp)
    .then(function (res) {
      console.log("res", res.data);
      //tắt modal sau khi update thành công
      $("#myModal").modal("hide");
      //lấy danh sách sp mới nhất từ server
      fetchProductsList();
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

// chức năng tìm kiếm
function searchProductByName() {
  var searchName = document
    .querySelector("#txtSearch")
    .value.trim()
    ?.toLowerCase();
  // gọi data từ API
  getProductList()
    .then(function (res) {
      var productList = res.data;
      // tìm kiếm trong danh sách sp mà có tên sau khi đã chuyển về từ thường mà có gồm từ khoá mà muốn tra
      var result = productList.filter(function (sp) {
        return sp.name.toLowerCase().includes(searchName);
      });

      //render lại kết quả tìm thấy
      renderProductsList(result);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

// tìm kiếm bằng sự kiện nhấn nút enter
document
  .querySelector("#txtSearch")
  .addEventListener("keydown", function (event) {
    console.log("event", event);
    console.log("event.target", event.target);
    console.log("event.target.value", event.target.value);
    // event là 1 obj chứa thông tin về sự kiện
    // event.target: trả ra cái thẻ element phát sinh ra sự kiện
    // event.key: trả ra phím vừa mới nhấn
    if (event.key !== "Enter") return;

    var name = event.target.value;

    getProductList(name)
      .then(function (res) {
        // console.log('res.data: ', res.data);
        //render lại kết quả tìm thấy
        renderProductsList(res.data);
      })
      .catch(function (err) {
        console.log("err", err);
      });
  });

// chức năng sắp xếp tăng dần
function sortInAscending() {
  // gọi data từ API
  getProductList()
    .then(function (res) {
      var productList = res.data;
      // sử dụng hàm sort để sắp xếp tăng dần
      var result = productList.sort(function (a, b) {
        return parseFloat(a.price) - parseFloat(b.price);
      });

      // render lại kết quả tìm thấy
      renderProductsList(result);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}

// chức năng sắp xếp giảm dần
function sortInAscending() {
  // gọi data từ API
  getProductList()
    .then(function (res) {
      var productList = res.data;
      // sử dụng hàm sort để sắp xếp tăng dần
      var result = productList.sort(function (a, b) {
        return parseFloat(b.price) - parseFloat(a.price);
      });

      // render lại kết quả tìm thấy
      renderProductsList(result);
    })
    .catch(function (err) {
      console.log("err", err);
    });
}
