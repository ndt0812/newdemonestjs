<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 🚀 Admin API Demo

## 📌 Giới thiệu
Đây là bản demo API dành cho Admin, được xây dựng với **NestJS**, **PostgreSQL**, và **Cache** để quản lý authentication.  
API này cung cấp các tính năng quản lý **User**, **Admin**, và **lịch sử truy cập**.  

🔗 **Link Swagger UI:** [https://newdemonestjs.onrender.com/api](https://newdemonestjs.onrender.com/api)  
📌 **Bản demo được deploy tại Render.com**  

---

## 🔑 **Hướng dẫn sử dụng**
### **1️⃣ Đăng ký tài khoản**  
📌 **Chỉ dành cho User, không phải Admin.**  

- **Endpoint:** `POST /auth/register`  
- **Body Request:**  
  ```json
  {
    "UserName": "ducthang",
    "DisplayName": "Duc Thang Nguyen",
    "Password": "Thang12345-",
    "RePassword": "Thang12345-"
  }
  ```
- **Validate mật khẩu:**  
  - Tối thiểu **6 ký tự**.  
  - Ít nhất **1 chữ cái viết hoa**.  
  - Ít nhất **1 ký tự đặc biệt**.  
  - Không chứa khoảng trắng.  

---

### **2️⃣ Đăng nhập**
- **Endpoint:** `POST /auth/login`  
- **Body Request:**  
  ```json
  {
    "UserName": "admin",
    "Password": "Admin@123"
  }
  ```
- **Response:**  
  ```json
  {
    "status": true,
    "token": "JWT_TOKEN",
    "tokenExpires": 1741608425413,
    "data": {
      "Info": {
        "Id": 12,
        "UserName": "admin",
        "DisplayName": "admin",
        "IsAdmin": true
      }
    }
  }
  ```
📌 **Hướng dẫn sử dụng Token**  
- Khi gọi API, bạn cần **gửi Token trong Response**:  
  ```
  Authorize: <JWT_TOKEN>
  ```

---

### **3️⃣ Check thông tin tài khoản**  
📌 **Lấy thông tin của tài khoản đang đăng nhập.**  
- **Endpoint:** `GET /auth/info`  
- **Response:** Thông tin của tài khoản.  

---

### **4️⃣ Đăng xuất**  
📌 **Xóa token khỏi bộ nhớ cache (Redis).**  
- **Endpoint:** `POST /auth/logout`  
- **Hành động:** Token sẽ bị xóa khỏi bộ lưu trữ của Cache, user cần đăng nhập lại để sử dụng API.  

---

### **5️⃣ Đổi mật khẩu**  
📌 **Nhập mật khẩu cũ và nhập mật khẩu mới 2 lần.**  
- **Endpoint:** `POST /auth/change-password`  
- **Body Request:**  
  ```json
  {
    "oldPassword": "Admin@123",
    "newPassword": "NewPass123!",
    "confirmPassword": "NewPass123!"
  }
  ```

---

### **6️⃣ Lấy danh sách User**  
📌 **Phân quyền theo cấp bậc User/Admin:**  
- **Admin** có thể xem tất cả User.  
- **User** chỉ thấy những người dùng khác cũng là **User**.  
- **Endpoint:** `GET /user/get-users`  

---

### **7️⃣ Tạo User**  
📌 **Chỉ Admin mới được phép tạo User.**  
- **Endpoint:** `POST /user/create`  
- **Body Request:**  
  ```json
  {
    "UserName": "YourUserName",
    "DisplayName": "YourName",
    "Password": "123456",
    "RePassword": "123456",
    "IsAdmin": false
  }
  ```
📌 **Validate Password** (giống như phần đăng ký).  

---

### **8️⃣ Sửa thông tin cá nhân**  
📌 **Chỉnh sửa thông tin của tài khoản đang đăng nhập.**  
- **Endpoint:** `POST /user/update-info`  
- **Body Request:**  
  ```json
  {
    "UserName": "YourUserName",
    "DisplayName": "YourName"
  }
  ```

---

### **9️⃣ Lấy thông tin của một User cụ thể**  
📌 **Chỉ Admin mới có quyền xem thông tin chi tiết của User khác.**  
- **Endpoint:** `GET /user/update/:id`  
- **Yêu cầu:** Cung cấp `id` của User.  

---

### **🔟 Sửa thông tin User**  
📌 **Chỉ Admin mới được phép chỉnh sửa thông tin User khác.**  
- **Endpoint:** `POST /user/update/:id`  
- **Yêu cầu:** Nhập `id` của User cần chỉnh sửa.  
- **Body Request:**  
  ```json
  {
    "UserName": "YourUserName",
    "DisplayName": "YourName",
    "IsAdmin": false
  }
  ```

---

### **1️⃣1️⃣ Xóa User**  
📌 **Chỉ Admin mới được phép xóa User.**  
- **Endpoint:** `DELETE /user/remove/:id`  
- **Yêu cầu:** Cung cấp `id` của User cần xóa.  

---

### **1️⃣2️⃣ Truy xuất lịch sử đăng nhập**  
📌 **Admin có thể xem lịch sử đăng nhập & đăng xuất của User.**  
- **Endpoint:** `GET /user-access/get`  
- **Response:** Trả về danh sách lịch sử truy cập.  

---

## 📬 **Liên hệ**
- **Người thực hiện:** Nguyễn Đức Thắng  
- **Email:** thangcntt812@gmail.com 
- **GitHub:** [https://github.com/ndt0812](https://github.com/ndt0812)  

