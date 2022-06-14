const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.send('Hello');
});

app.listen(port, ()=>{
    console.log(`listening to port ${port} `);
});