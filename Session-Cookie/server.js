const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

//Session
const sessions = {};

// Fake DB (MySQL, MongDB)
const db = {
    users: [
        {
            id: 1,
            email: "nguyenvana@gmail.com",
            // không dùng plain text như này mà chúng ta sẽ hash nó sử dụng các hàm băm hoặc là các hàm mã hóa 1 chiều
            // đại khái nếu lưu plain text password thì nếu bị hack database người ta biết hết mật khẩu của tài khoản
            // mà các bạn đã mã hóa, băm nó ra thì những cái phương án xử lý password như vậy thì sẽ không quy đổi ngược
            // lại được thế nên là nó sẽ an toàn hơn
            password: "123456",
            name: "Nguyễn Văn A",
        },
    ],
};

// [GET]
app.get("/", (req, res) => {
    // res.send("<h1>Xin chào anh em nha!</h1>");
    res.render("pages/index");
});

// [GET] /login
app.get("/login", (req, res) => {
    res.render("pages/login");
});

// [POST] /login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(
        (user) => user.email === email && user.password === password
    );
    if (user) {
        const sessionId = Date.now().toString();
        sessions[sessionId] = {
            userId: user.id,
            // createAt:
            // maxAge: 3600
        };

        console.log(sessions);

        res.setHeader(
            "Set-Cookie",
            `sessionId=${sessionId}; max-age=3600; httpOnly`
        ).redirect("/dashboard");
        return;
    }
    res.send("Tài khoản hoặc mật khẩu không hợp lệ");
});

// [GET] /dashboard
app.get("/dashboard", (req, res) => {
    const session = sessions[req.cookies.sessionId];
    if (!session) {
        res.redirect("/login");
    }

    const user = db.users.find((user) => user.id === session.userId);

    if (!user) {
        res.redirect("/login");
    }
    res.render("pages/dashboard", { user });
});

// [GET] /logout
app.get("/logout", (req, res) => {
    delete req.cookies.sessionId;
    res.setHeader(
        "Set-Cookie",
        `sessionId=; max-age=0`
    ).redirect("/login");
});

app.listen(port, () => {
    console.log(`Demo app is running on port ${port}`);
});

// Loopback: 127.0.0.1/::1/localhost
// fullstack.edu.vn
// HTTP -> stateless
// stateful
