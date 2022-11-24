function DanhSachNhanVien() {
    this.array = [];

    this.themNV = function (nv) {
        this.array.push(nv);
    };

    this.timViTriNV = function (taiKhoan) {
        var index = -1;
        for (var i = 0; i < this.array.length; i++) {
            var nv = this.array[i];
            if (nv.taiKhoan == taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    }

    this.xoaNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);
        if (index !== -1) {
            this.array.splice(index, 1);
        }
    };

    this.layChiTietNV = function (taiKhoan) {
        var index = this.timViTriNV(taiKhoan);
        if (index != -1) {
            return this.array[index];
        }
    }

    this.capNhatNV = function (nv) {
        var index = this.timViTriNV(nv.taiKhoan);
        console.log(index);
        if (index != -1) {
            this.array[index] = nv;
        }
    };

    this.timNV = function (keyword) {
        var mangTimKiem = [];
        for (var i = 0; i < this.array.length; i++) {
            var nv = this.array[i];
            var xepLoaiLowerCase = nv.xepLoai.toLowerCase();
            var keywordLowerCase = keyword.toLowerCase();
            if (xepLoaiLowerCase.indexOf(keywordLowerCase) != -1) {
                mangTimKiem.push(nv);
            }
        }
        return mangTimKiem;
    };
}