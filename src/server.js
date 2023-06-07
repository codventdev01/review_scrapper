const express = require('express');
const getReviews = require('./getReviews')
app = express();

app.get('/', async (req, res) => {
    try {
        const query = req.query.url;
        const data = await getReviews(query)
        res.json(data);
    }catch(e) {
        res.send(e);
    }
})

app.listen(3000, () => {
    console.log("server on");
})