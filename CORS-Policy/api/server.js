const fs = require('fs');
const https = require('https');

const express = require('express');
const cors = require('cors');
const cookieParse = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParse());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Fake DB
const db = {
    users: [
        {
            id: 1,
            email: 'nguyenvana@gmail.com',
            password: '123456',
            name: 'Nguyễn Văn A'
        }
    ],
    posts: [
        {
            id: 1,
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            title: 'Title 2',
            description: 'Description 2'
        },
        {
            id: 3,
            title: 'Title 3',
            description: 'Description 3'
        }
    ]
}

// Session
const sessions = {}

// [GET] /api/posts
app.get('/api/posts', (req, res) => {
    res.json(db.posts);
});

//[POST] /api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401)
            .json({
                message: 'Unauthorized'
            });
    }

    // tạo phiên đăng nhập
    const sessionId = Date.now().toString();
    sessions[sessionId] = { sub: user.id };
    // sau dòng này thì session đã được tạo ra ở phía server

    //sau đó ta sẽ trả cho client cái sessionId này để client nó lưu vào cookie. lưu ý thực tế ta sẽ mã hóa cái sessionId này 
    res.setHeader(
        'Set-Cookie',
        `sessionId=${sessionId}; HttpOnly; Max-Age=3600; SameSite=None; Secure; Partitioned`
    ).json(user);
});

// [GET] /api/auth/me
app.get('/api/auth/me', (req, res) => {
    const session = sessions[req.cookies.sessionId];
    if (!session) {
        return res.status(401)
            .json({
                message: 'Unauthorized'
            });
    }
    const user = db.users.find(user => user.id === session.sub);

    if (!user) {
        return res.status(401)
            .json({
                message: 'Unauthorized'
            });
    }

    res.json(user);
});

https.createServer({
    key: fs.readFileSync('testcookie.com+2-key.pem'),
    cert: fs.readFileSync('testcookie.com+2.pem'),
}, app).listen(port, () => {
    console.log(`Demo app is running on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`Demo app is running on port ${port}`);
// });

// Server side rendering (SSR)
// Client side rendering (CSR)