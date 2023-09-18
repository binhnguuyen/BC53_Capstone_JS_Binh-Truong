const BASE_URL = "https://6500589318c34dee0cd4bff0.mockapi.io/smartphones";

// Cách 1
function getProductList(val) {
    // nhớ phải có return
    return axios({
        url: BASE_URL,
        method: "GET",
        // những cặp key-value khai báo bên trong object params sẽ đc gửi lên url theo định dạng
        // example.com/products?key1=value1&key2=value2
        params: {
            name: val || undefined,
        },
    });
}

function delProductList(id) {
    // nhớ phải có return
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
    });
}

function addProductList() {
    // nhớ phải có return
    return axios({
        url: BASE_URL,
        method: "POST",
    });
}

function editProductByID(id) {
    // nhớ phải có return
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "GET",
    });
}

function updateProductByID(id, sp) {
    // nhớ phải có return
    return axios({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        data: sp,
    });
}


// Cách 2
/*
var productServ = {
    getProductList() {
        return axios({
            url: BASE_URL,
            method: "GET",
        });
    },
    delProductByID: function (id) {
        return axios({
            url: `${BASE_URL}/${id}`,
            method: "DELETE",
        });
    },
    addProductList() {
        return axios({
            url: BASE_URL,
            method: "POST",
        });
    },
}
*/















