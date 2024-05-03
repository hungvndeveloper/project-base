/*
Gửi dữ liệu từ form HTML => Google Sheets

Kiến thức cần có:
- Javascript căn bản
- XMLHttpRequest
- Đối tượng URLSearchParams
*/

document.querySelector("#submit_form").onsubmit = function (e) {
  e.preventDefault();

  //Truy cập vào msg
  let msgObj = document.querySelector(".msg");

  //Reset thông báo
  msgObj.innerText = "";

  // Truy cập vào thành phần HTML tương ứng
  let fullNameObj = document.querySelector('input[name="fullname"]');

  let emailObj = document.querySelector('input[name="email"]');

  let phoneObj = document.querySelector('input[name="phone"]');

  //Lấy giá trị người dùng nhập vào
  let fullName = fullNameObj.value;
  let email = emailObj.value;
  let phone = phoneObj.value;

  //Validate form

  //Reset thông báo
  let requireObj = document.querySelectorAll(".required");
  if (requireObj.length > 0) {
    requireObj.forEach(function (item) {
      item.innerText = "";
    });
  }

  let errors = {};

  if (fullName.trim() == "") {
    errors["fullname"] = "Họ tên không được để trống";
    fullNameObj.parentElement.querySelector(".required").innerHTML =
      errors["fullname"];
  }

  if (email.trim() == "") {
    errors["email"] = "Email không được để trống";
    emailObj.parentElement.querySelector(".required").innerHTML =
      errors["email"];
  }

  if (phone.trim() == "") {
    errors["phone"] = "Điện thoại không được để trống";
    phoneObj.parentElement.querySelector(".required").innerHTML =
      errors["phone"];
  }

  if (Object.keys(errors).length == 0) {
    //Không có lỗi gì
    let data = {
      fullName,
      email,
      phone,
    };

    // Ví dụ 1
    // let queryString = new URLSearchParams(data);
    // queryString = queryString.toString();

    // msgObj.innerHTML = '<div class="alert alert-success text-center">Đang xử lý...</div>';

    // let xhr = new XMLHttpRequest();
    // xhr.open("POST", "/server", true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // msgObj.innerHTML = '<div class="alert alert-success text-center">Gửi dữ liệu thành công</div>';

    // fullNameObj.value = '';
    // emailObj.value = '';
    // phoneObj.value = '';

    // xhr.send(queryString);

    // Ví dụ 2
    // Gửi dữ liệu đến Google Form
    // fetch("[FORM_URL]", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // })
    // .then(() => console.log("Dữ liệu đã được gửi"))
    // .catch((error) => console.error("Lỗi khi gửi dữ liệu:", error));

    // Ví dụ 3:
    // const xhr = new XMLHttpRequest();

    // const data = {
    //   name: "John Doe",
    //   email: "johndoe@example.com",
    // };

    // xhr.open("POST", "[FORM_URL]");
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.send(JSON.stringify(data));

    // xhr.onload = () => {
    //   if (xhr.status === 200) {
    //     console.log("Dữ liệu đã được gửi");
    //   } else {
    //     console.error("Lỗi khi gửi dữ liệu:", xhr.statusText);
    //   }
    // };

    // Ví dụ 4
    

  } else {
    msgObj.innerHTML =
      '<div class="alert alert-danger text-center">Vui lòng kiểm tra dữ liệu</div>';
  }
};
