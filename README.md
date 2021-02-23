# read-vietnamese-numbers

### Introduction

API đọc số thành chữ trong Tiếng Việt.
Bao gồm API được viết bằng NodeJS và TypeScript, cộng với một trang web đơn giản để demo. Tất cả đã được deploy lên VPS của tôi.

Live demo: [http://tonghoangvu.xyz:3000/](http://tonghoangvu.xyz:3000/)

### Features

Trang web có thể đọc được các số tiếng Việt:
* Số âm, số dương, số thập phân
* Chữ số lên tới hàng tỉ tỉ
* Độ dài không giới hạn (chỉ cần thêm các lớp khác cao hơn tỉ tỉ)
* Các tùy chọn khác như đơn vị tính, dấu phân tách, bỏ qua phần 000 ở giữa

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

```shell
npm install
yarn install
```

**Step 2**: Để chạy server trên môi trường test (local)

```shell
npm run dev
yarn run dev
```

**Step 3**: Chạy server trên VPS hoặc server (production)

```shell
npm run start
yarn run start
```

Sau đó truy cập vào [http://localhost:3000](http://localhost:3000) để xem kết quả.

### TEST

```shell
npm run test:e2e
yarn run test:e2e
```

### Support

Hãy star cho repository này hoặc follow tôi nếu bạn thấy hay nhé!
