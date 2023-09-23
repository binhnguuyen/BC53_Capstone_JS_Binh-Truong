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
      } 
      else {
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
        } 
        else {
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
