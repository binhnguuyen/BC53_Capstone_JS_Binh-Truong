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