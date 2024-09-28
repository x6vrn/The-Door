const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 1337;

app.use(bodyParser.json());

const correctUsername = 'admin';
const correctUid = 1;

app.post('/update-user', (req, res) => {
    const { username, uid } = req.body;

    if (username === correctUsername && uid === correctUid) {
        res.send('Flag: CTF{IDOR_Vulnerability_Success}');
    } else {
        res.send('Error: Sorry You Dont have permission');
    }
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>The DOOR Challenge</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background: #f4f4f9;
                }
                .container {
                    text-align: center;
                    background-color: #ffffff;
                    padding: 50px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                button {
                    background-color: #004ff8f8;
                    color: white;
                    padding: 15px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #276bfff8;
                }
                p {
                    color: #555;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>The Door Challenge</h1>
                <p>Click the button to check your permission:</p>
                <button onclick="sendRequest()">Check Permission</button>
            </div>
            <script>
                function sendRequest() {
                    fetch('/update-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: 'user',
                            uid: 2
                        }),
                    })
                    .then(response => response.text())
                    .then(data => alert(data));
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`The DOOR challenge app listening at http://localhost:${port}`);
});
