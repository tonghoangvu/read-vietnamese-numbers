# read-vietnamese-numbers

### Introduction

API đọc số thành chữ trong Tiếng Việt.
Bao gồm API được viết bằng NodeJS và TypeScript, cộng với một trang web đơn giản để demo. Tất cả đã được deploy lên VPS của tôi.

Live demo: [http://103.110.84.48:8080/](http://103.110.84.48:8080/)

### Features

Trang web có thể đọc được các số tiếng Việt:
* Số âm, số dương
* Chữ số lên tới hàng tỉ tỉ
* Độ dài không giới hạn (chỉ cần thêm các lớp khác cao hơn tỉ tỉ)
* Các tùy chọn khác như đơn vị tính, dấu phân tách, bỏ qua phần 000 ở giữa

Tuy nhiên API vẫn chưa hỗ trợ đọc số thập phân, sẽ được cải tiến sau.

### API

API duy nhất dùng để đọc chuỗi số thành chữ trong tiếng Việt.

```
/read?number=-00012345
```

API có thêm các query param để tùy chỉnh kết quả trả về:

* `separator`: dấu phân cách giữa các từ (mặc định là khoảng trắng). Ví dụ separator là dấu *_* thì kết quả của *123* là *một_trăm_hai_mươi_ba_đơn_vị*
* `unit`: đơn vị tính ở cuối cùng (mặc định là đơn vị). Ví dụ unit là *đồng* thì kết quả của *1000000* là *một triệu đồng*

### Installation

**Step 1**: Cài đặt các dependency cần thiết (dùng NPM hoặc Yarn)

```
npm install
yarn install
```

**Step 2**: Để chạy server trên môi trường test (local)

```
npm run dev
yarn run dev
```

**Step 3**: Chạy server trên VPS hoặc server (production)

```
npm run start
yarn run start
```

### Support

Hãy star cho repository này hoặc follow tôi nếu bạn thấy hay nhé!
