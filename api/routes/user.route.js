import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();
/**
sau khi nhận request từ brower với uri /:id, request này sẽ chạy qua middleware verifyToken
sau khi chạy vào verify token, nếu tất cả mọi thứ ổn thỏa, thì ở middleware đang được xử lý là 
kiểm tra user và set userId, isSeller vào request từ việc verify token sử dụng jwwt.verify. 
ở cuối hàm này ta cần gọi hàm next() để đi đến function tiếp theo trong chain là deleteUser
.nếu không gọi hàm next() thì request sẽ dừng tại hàm verifyToken này.
nhớ lưu ý về thứ tự các app.use trong file server.js
 */
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
export default router;
