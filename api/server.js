/**
- Thứ tự thực hiện middleware và số lượng đối số trong hàm callback
    - Thứ tự thực hiện middleware:
        - Middleware được thực thi theo thứ tự được khai báo trong mã.
        - Middleware được đặt trước sẽ được thực thi trước, sau đó đến các middleware được đặt sau.
- Số lượng đối số trong hàm callback:
    - Số lượng đối số trong hàm callback của middleware không ảnh hưởng đến thứ tự thực hiện.
    - Nó chỉ ảnh hưởng đến chức năng của middleware.
- Ví dụ:
    app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
    });

    app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
    });

    app.get('/', (req, res) => {
    res.send('Hello World!');
    });

    app.listen(3000);
- Trong ví dụ này, cả hai middleware đều có 3 đối số: req, res và next.
- Tuy nhiên, middleware 1 sẽ được thực thi trước middleware 2 vì nó được khai báo trước.

- Bảng sau đây tóm tắt số lượng đối số phổ biến trong hàm callback của middleware và chức năng của chúng:

    Số lượng đối    số	Chức năng
    4	            Middleware xử lý lỗi
    3	            Middleware thông thường
    2	            Middleware chỉ xử lý request và response

- Lưu ý:
    - Bạn có thể sử dụng bất kỳ số lượng đối số nào trong hàm callback của middleware.
    - Tuy nhiên, 3 đối số là phổ biến nhất.
    - Middleware xử lý lỗi phải có 4 đối số.

Kết luận:

    - Thứ tự thực hiện middleware được xác định bởi thứ tự khai báo trong mã, không phải bởi số lượng đối số trong hàm callback.
      Số lượng đối số chỉ ảnh hưởng đến chức năng của middleware.

- Hàm app.listen(3000); được đặt ở cuối cùng để đảm bảo rằng tất cả các middleware và tuyến đường đã được định nghĩa trước
  khi máy chủ Express bắt đầu lắng nghe các yêu cầu.
#################################
- Hàm next
    Hàm next được sử dụng trong middleware để chuyển tiếp yêu cầu đến middleware tiếp theo trong chuỗi.
    Nó hoạt động như một cờ hiệu để cho biết middleware hiện tại đã hoàn tất việc xử lý yêu cầu và middleware tiếp theo có thể bắt đầu.

- Cách thức hoạt động:
    - Khi một middleware được gọi, nó có thể thực hiện một số thao tác với yêu cầu và phản hồi.
    - Nếu middleware muốn chuyển tiếp yêu cầu đến middleware tiếp theo, nó cần gọi hàm next.
    - Nếu middleware không gọi next, yêu cầu sẽ không được chuyển tiếp và sẽ dừng lại tại middleware hiện tại.
- Ví dụ:
    app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
    });

    app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
    });

    app.get('/', (req, res) => {
    res.send('Hello World!');
    });

    app.listen(3000);

    - Trong ví dụ này, khi một yêu cầu được gửi đến /, nó sẽ được xử lý bởi hai middleware trước khi đến được tuyến đường. 
    - Mỗi middleware sẽ ghi nhật ký một thông báo vào bảng điều khiển và sau đó gọi next để chuyển tiếp yêu cầu đến middleware tiếp theo.

- Lưu ý:
    - Hàm next không bắt buộc phải được gọi trong middleware.
    - Nếu bạn không gọi next, yêu cầu sẽ dừng lại tại middleware hiện tại.
    - Bạn có thể sử dụng next để chuyển tiếp yêu cầu đến một middleware cụ thể.

- Công dụng khác của next:
    - Bỏ qua các middleware: Bạn có thể sử dụng next('route') để bỏ qua các middleware còn lại và chuyển tiếp yêu cầu đến một tuyến đường cụ thể.
    - Gửi lỗi: Bạn có thể sử dụng next(new Error('Error message')) để gửi một lỗi đến middleware xử lý lỗi.
- Kết luận:
    - Hàm next là một phần quan trọng trong việc xử lý các yêu cầu trong ứng dụng Express. 
    - Nó cho phép bạn kiểm soát luồng yêu cầu và chuyển tiếp yêu cầu đến các middleware khác nhau.
*/



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import uploadRoute from "./routes/upload.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
mongoose.set("strictQuery", true);
dotenv.config();
app.use(express.urlencoded({
    extended: true
}))

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.log(error.message);
    }
};

// cần sử dụng thư viện này vì nếu ta gọi từ ứng bên client chạy react đến api, sẽ gặp lỗi 
// cors policy vì chúng ta đang cố truy cập đến api từ một nơi khác. thư viện này cho phép ta
// nói với ứng dụng là cho phép domain này truy cập vào api của chúng ta
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/upload", uploadRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).send(errorMessage);
});
app.listen(8000, () => {
    connect();
    console.log("Backend server is running");
});
