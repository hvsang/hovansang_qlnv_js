var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV() {
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value * 1;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value * 1;

    var isValid = true;

    // Check validation
    // Tài khoản nv
    isValid &= validation.kiemTraRong(taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản nhân viên!") && validation.kiemTraDoDaiKyTu(taiKhoan, "tbTKNV", "(*) Vui lòng nhập ký tự 4-6!", 4, 6) && validation.kiemTraKySo(taiKhoan, "tbTKNV", "(*) Vui lòng chỉ nhập ký số!") && validation.kiemTraTrungTKNV(taiKhoan, "tbTKNV", "Tài khoản nhân viên đã tồn tại", dsnv.array);
    // Tên nv
    isValid &= validation.kiemTraRong(hoTen, "tbTen", "(*) Vui lòng nhập họ và tên!") && validation.kiemTraChuoiKyTu(hoTen, "tbTen", "Vui lòng nhập chuỗi ký tự");
    // Email nv
    isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email!") && validation.kiemTraEmail(email, "tbEmail", "(*) Vui lòng nhập đúng định dạng email!");
    // Mật khẩu nv
    isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui lòng nhập mật khẩu!") && validation.kiemTraDoDaiKyTu(matKhau, "tbMatKhau", "(*) Vui lòng nhập ký tự 6-10!", 6, 10) && validation.kiemTraPassword(matKhau, "tbMatKhau", "(*) Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!");
    // Ngày làm nv
    // isValid = validation.kiemTraRong(ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm!") && validation.kiemTraNgayLam(ngayLam, "tbNgay", "(*) Vui lòng nhập đúng định dạng!");
    // Lương cơ bản nv
    isValid &= validation.kiemTraRong(luongCoBan, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản nhân viên!") && validation.kiemTraLuongCoBan(luongCoBan, "tbLuongCB", "(*) Lương cơ bản 1 000 000 - 20 000 000!");
    // Chức vụ
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng nhập đúng chức vụ!");
    // Giờ làm nv
    isValid &= validation.kiemTraRong(gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm!") && validation.kiemTraGioLam(gioLam, "tbGiolam", "(*) Số giờ làm trong tháng 80 - 200 giờ!");

    if (!isValid) return;

    var nv = new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    nv.tinhTongLuong();
    nv.tinhXepLoai();

    return nv;
}

function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class="btn btn-info" onclick="btnEdit('${nv.taiKhoan}')">Edit</button>
                    <button class="btn btn-danger" onclick="btnDelete('${nv.taiKhoan}')">Delete</button>
                </td>                
            </tr>
        `
    }
    getEle("tableDanhSach").innerHTML = content;
}

// thêm nhân viên
getEle("btnThemNV").addEventListener("click", function () {
    var nv = layThongTinNV();

    if (nv) {
        dsnv.themNV(nv);
        renderTable(dsnv.array);
        setLocalStorage();
    }
})

function setLocalStorage() {
    //convert JSON => string
    var dataString = JSON.stringify(dsnv.array);
    //lưu data xuống LocalStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //convert string => JSON
        dsnv.array = JSON.parse(dataString);
        // render lại table
        renderTable(dsnv.array);
    }
}

// delete nv
function btnDelete(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.array);
    setLocalStorage();
}

// edit nv
function btnEdit(taiKhoan) {
    var nv = dsnv.layChiTietNV(taiKhoan);
    if (nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCoBan;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
}

//update nv
getEle("btnCapNhat").addEventListener("click", function () {
    var nv = layThongTinNV();
    console.log(nv);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.array);
    setLocalStorage();
})

//tìm kiếm nv

getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timNV(keyword);
    renderTable(mangTimKiem);
})

