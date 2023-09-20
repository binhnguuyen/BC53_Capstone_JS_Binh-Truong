// Kiểm tra xem có rỗng, bỏ trống
function kiemTraRong(value, id, message) {
    // .trim() để xoá dấu cách " " đầu và cuối
    // và phải là chuỗi ký tự
    if (value.trim() === "") {
        id.innerHTML = message;
        return false;
    }
    else {
        id.style.display = "none";
        return true;
    }
}

// kiểm tra xem có trùng hay ko
function kiemTraTrung(value, dsnv, id, message) {
    // findIndex' tìm vị trí index, khi mà thoả đk tìm thấy thì trả về vị trí index, còn khi ko thoả dk trả về false
    // cái này có nghĩa là gán giá trị value cho val xong return giá trị val
    var viTri = dsnv.findIndex(checkIndex);
    function checkIndex(nv) {
        return nv.tkNV == value;
    }

    // không tìm thấy sẽ sẽ trả lại true
    if (viTri == -1) {
        id.innerHTML = "";
        return true;
    } 
    // tìm thấy thì gán lỗi và trả false
    else {
        id.innerHTML = message;
        return false;
    }
}

// kiểm tra độ dài
function kiemTraDoDai(value, id, min, max, message) {
    var length = value.length;
    if (length >= min && length <= max) {
        id.innerHTML = "";
        return true;
    } else {
        id.innerHTML = message;
        return false;
    }
}

// kiểm tra các ký tự trong mail
function kiemTraEmail(value, id, message) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // re là phương thức (method) regex để kiểm tra ký tự trong dãy
    var isEmail = re.test(value);
    if (isEmail) {
        id.innerHTML = "";
        return true;
    }
    else {
        id.innerHTML = message;
        return false;
    }
}

// kiểm tra các ký tự trong tiếng Việt
function kiemTraChuoi(value, id, message) {
    const re =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

    var isString = re.test(value);
    if (isString) {
        id.innerHTML = "";
        return true;
    } else {
        id.innerHTML = message;
        return false;
    }
}

// kiểm tra mật khẩu
function kiemTraMatKhau(value, id, message) {
    // ^: bắt đầu chuỗi
    // (?=.*\d): kt ký số
    // (?=.*[a-z]): kt chữ thường
    // (?=.*[A-Z]): kt chữ in hoa
    // (?=.*[^a-zA-Z0-9]): kt số, chữ thường, chữ in hoa
    // (?!.*\s): kt khoảng trắng
    // {8,20}: độ dài 8-20 ký tự
    // $: kết thúc chuỗi
    const re =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

    var isPassword = re.test(value);
    if (isPassword) {
        id.innerHTML = "";
        return true;
    } else {
        id.innerHTML = message;
        return false;
    }
}

// Kiểm tra số
function kiemTraSo(value, id, message) {
    const re = /^[0-9]+$/;

    var isString = re.test(value);
    if (isString) {
        id.innerHTML = "";
        return true;
    } else {
        id.innerHTML = message;
        return false;
    }
}


// kiểm tra định dạng ngày
function kiemTraDinhDangNgay(value, id, message) {
    // ^: bắt đầu chuỗi
    // (0?[1-9]|[12][0-9]|3[01]): kt ký số
    // [\/\-]: kt chữ thường
    // (0?[1-9]|1[012]): kt chữ in hoa
    // d{4}: kt số có 4 chữ số
    // $: kết thúc chuỗi

    // định dạng cho dd/mm/yyyy
    // nhưng chấp nhận luôn một số lỗi như tháng 2 có 29, 30, 31 ngày
    // const re =
    //     /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    // định dạng cho dd/mm/yyyy
    // ko chấp nhận bất cứ lỗi nào
    const re =
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    var isDay = re.test(value);
    if (isDay) {
        id.innerHTML = "";
        return true;
    } else {
        id.innerHTML = message;
        return false;
    }
}

function kiemTraTrung(value, ds, id, message) {

    var viTri = ds.findIndex(checkIndex);
    function checkIndex(val) {
        // cái này có nghĩa là gán giá trị value cho val xong return giá trị val
        return val == value;
    }

    // Tìm trong mảng chức vụ, ko tìm thấy thì gáng lỗi và trả false
    if (viTri == -1) {
        // không tìm thấy
        id.innerHTML = message;
        return false;
    } 
    // tìm thấy thì trả true
    else {
        id.innerHTML = "";
        return true;
    }
}

function kiemTraSo(value, id, message) {
    const re = /^[0-9]+$/;

    var isString = re.test(value);
    if (isString) {
        id.innerHTML = "";
        return true;
    } else {
        id.innerHTML = message;
        return false;
    }
}

function kiemTraLonNho(value, id, min, max, message) {

    if (Number(value) >= min && Number(value) <= max) {
        id.innerHTML = "";
        return true;
    }
    else {
        id.innerHTML = message;
        return false;
    }
}

// kiểm tra xem có trùng loại nhân viên hay ko
function kiemTraLoai(value, dsnv, id, message) {
    // findIndex' tìm vị trí index, khi mà thoả đk tìm thấy thì trả về vị trí index, còn khi ko thoả dk trả về false
    var viTri = [];
    // viTri += dsnv.findIndex(checkIndex);
    // function checkIndex(nv) {
    //     return nv.xepLoai() == value;
    // }

    for ( var i = 0; i = dsnv.length; i++ ) {
        if( dsnv.xepLoai() == value ) {
            viTri += value;
        }
    }
    // không tìm thấy sẽ sẽ trả lại true
    if (viTri == -1) {
        id.innerHTML = message;
        return false;
    } 
    // tìm thấy thì gán lỗi và trả false
    else {
        id.innerHTML = "";
        return viTri;
    }
}
