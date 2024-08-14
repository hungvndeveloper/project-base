const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
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
})

app.listen(port, () => {
    console.log(`Demo app is running on port ${port}`);
});

// Server side rendering (SSR)
// Client side rendering (CSR)