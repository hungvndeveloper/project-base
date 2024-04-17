import axios from "axios";

//Tạo 1 axios instance và chúng ta cho bất kỳ url nào vào đây và withCredentials: true
//để không phải viết lại nhiều lần cái url và withCredentials này nhiều lần
const newRequest = axios.create({
    baseURL: "http://localhost:8800/api/",
    withCredentials: true,
});

export default newRequest;
