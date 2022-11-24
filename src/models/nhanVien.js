function NhanVien(_taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function () {
        if (this.chucVu == "sep") {
            this.tongLuong = this.luongCoBan * 3;
        } else if (this.chucVu == "truongPhong") {
            this.tongLuong = this.luongCoBan * 2;
        } else if (this.chucVu == "nhanVien") {
            this.tongLuong = this.luongCoBan;
        }
    }

    this.tinhXepLoai = function () {
        if (this.gioLam >= 192) {
            this.xepLoai += "Xuất sắc";
        } else if (this.gioLam >= 176 && this.gioLam <= 192) {
            this.xepLoai += "Giỏi";
        } else if (this.gioLam >= 160 && this.gioLam <= 176) {
            this.xepLoai += "Khá";
        } else if (this.gioLam >= 0 && this.gioLam <= 160) {
            this.xepLoai += "Trung bình";
        }
    }
}