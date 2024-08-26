const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const cookieParse = require('cookie-parser');
const { base64url } = require('./helper');

const app = express();
const port = 3000;
const jwtSecret = 'upGMCa/gJAksoG0dVvFwd0tgW1sJBdu4SwIlQmj/2eTeMUiGc0XfSPGWXp59hvh56xjiRDa68fcl2Ipk9MXbIUULXL8jZYaq3qSaR3SlC/MNDQU1jvTXSlRM3mb2a4hLfIOewlENP7GdlxdCGQA5FshnPUG2Mk2IxnsItDvXooUTZ/2ODQqc8IygtUrPJozvnWoBsjKbI/glQ9lmfVT2Ksc9O3H3Az0t0/duphRDYu9zmASFi+lT5c2VFbbu4pcTO8IpH70wVV0jfPBd0uJfioIB/nuFK7JBm+Oe+a7kccZsAavFmXW6jc+iqeta1YL1BXkkupm4Vct3w3Xkf7DRwA==';

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

    //1. tạo Dữ liệu header + payload
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    //tạo payload, data cần lưu là gì:
    const payload = {
        sub: user.id,
        exp: Date.now() + 360000,
    };

    //2. tạo mã hóa base64(json(header & payload))
    const encoderHeader = base64url(JSON.stringify(header));
    const encoderPayload = base64url(JSON.stringify(payload));

    //3. tạo token data <header>.<payload>
    const tokenData = `${encoderHeader}.${encoderPayload}`;

    //4. tạo chữ ký
    const hmac = crypto.createHmac('sha256', jwtSecret);
    const signature = hmac.update(tokenData).digest('base64url');
    res.json({
        token: `${tokenData}.${signature}`
    });
});

// [GET] /api/auth/me
app.get('/api/auth/me', (req, res) => {
    const token = req.headers.authorization?.slice(7)
    if (!token) {
        return res.status(401)
            .json({
                message: 'Unauthorized'
            });
    }
    const [encoderHeader, encoderPayload, tokenSignature] = token.split('.');
    const tokenData = `${encoderHeader}.${encoderPayload}`;
    const hmac = crypto.createHmac('sha256', jwtSecret);
    const signature = hmac.update(tokenData).digest('base64url');
    if (signature !== tokenSignature) {
        return res.status(401)
            .json({
                message: 'Unauthorized'
            });
    }

    const payload = JSON.parse(atob(encoderPayload));
    const user = db.users.find(user => user.id === payload.sub);
    if (!user) {
        return res.status(401)
            .json({
                message: 'Unauthorized'
            });
    }

    if (payload.exp < Date.now()) {
        return res.status(401)
            .json({
                message: 'token expired'
            });
    }
    res.json(user);
});

app.listen(port, () => {
    console.log(`Demo app is running on port ${port}`);
});

// app.listen(port, () => {
//     console.log(`Demo app is running on port ${port}`);
// });

// Server side rendering (SSR)
// Client side rendering (CSR)