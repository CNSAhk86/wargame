const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let lastMessage = "";

const flag = process.env.FLAG;

app.get('/', (req, res) => {
    res.render('index', { lastMessage: lastMessage, isAdmin: false });
});

app.post('/submit', (req, res) => {
    const userInput = req.body.userInput;
    const isAdmin = req.query.isAdmin === 'true';

    if (isAdmin) {
        lastMessage = flag.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else {
        lastMessage = userInput;
    }

    res.render('index', { lastMessage: lastMessage, isAdmin: isAdmin });
});

app.listen(port, () => {
    console.log(`접속 링크: http://localhost:${port}`);
    console.log(`자자, 그럼 해킹을 시작해볼까요? 드가보자~~`);
});