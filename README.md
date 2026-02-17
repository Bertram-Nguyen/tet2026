# 🧧 Lộc Tết 2026

Trang web lì xì cá nhân phong cách game Gacha, hiệu ứng pháo hoa và nhạc nền Tết.
Dự án được xây dựng bằng **React**, **TypeScript**, **Vite** và **TailwindCSS**.

🔗 **Demo:** [Link Github Pages của bạn sẽ hiện ở đây](https://yourusername.github.io/loctet2026/)

---

## ✨ Tính năng chính

- 🌸 **Giao diện:** Phong cách Pastel, hiệu ứng cánh hoa rơi, pháo hoa Canvas.
- 🧧 **Lì xì:** 2026 bao lì xì sắp xếp hình bông hoa, hiệu ứng mở bao Gacha.
- 🎵 **Âm thanh:** Nhạc nền Tết và tiếng xu rơi vui tai.
- 📊 **Dữ liệu:** Lưu trữ cục bộ (LocalStorage) để không mất lượt mở khi tải lại trang.
- 📝 **Thu thập thông tin:** Form nhập tên/STK gửi về **Google Sheets** (thông qua Google Form).

---

## 🚀 Cài đặt và Chạy thử (Local)

1. **Clone dự án về máy:**
   ```bash
   git clone https://github.com/yourusername/loctet2026.git
   cd loctet2026
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Chạy thử:**
   ```bash
   npm run dev
   ```
   Trang web sẽ chạy tại: `http://localhost:5173`

---

## ☁️ Hướng dẫn Deploy lên Github Pages

Dự án này đã cấu hình sẵn **Github Actions**. Bạn chỉ cần:

1. Vào **Settings** của Repository trên Github.
2. Chọn menu **Pages**.
3. Tại mục **Build and deployment**, chọn Source là **GitHub Actions**.
4. Push code lên nhánh `main`. Quá trình build sẽ tự động chạy.

---

## 📈 Cấu hình dữ liệu (Google Sheets)

Để nhận thông tin người dùng (Tên, STK) về Excel của bạn:

1. Tạo một **Google Form** với 3 câu hỏi: *Tên, Ngân hàng, Số tài khoản*.
2. Lấy link "Get pre-filled link" (Lấy liên kết điền trước).
3. Copy các ID (dạng `entry.123456`) và link Form.
4. Mở file `src/constants.ts` (hoặc `constants.ts`) và cập nhật:

```typescript
export const GOOGLE_FORM_CONFIG = {
  actionURL: "https://docs.google.com/forms/u/0/d/e/YOUR_FORM_ID/formResponse",
  entryIDs: {
    name: "entry.123456...",
    bank: "entry.234567...",
    account: "entry.345678..."
  }
};
```

---

## 🛠️ Cấu trúc thư mục

- `index.html`: File khởi chạy chính.
- `index.tsx`: Điểm bắt đầu của React.
- `App.tsx`: Logic chính của game.
- `components/`: Chứa các thành phần giao diện (Modal, Pháo hoa, v.v.).
- `constants.ts`: Chứa cấu hình (Lời chúc, Link ảnh, Config Form).
- `types.ts`: Định nghĩa kiểu dữ liệu.
- `utils.ts`: Các hàm hỗ trợ (Random, định dạng tiền).

---

Chúc mừng năm mới! 🎆
