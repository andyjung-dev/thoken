const express = require('express');
const bodyParser = require('body-parser');

const port = 9000;
const backend = express();

backend.use(bodyParser.json({ extended: true }));

backend.post('/getDump', (req,res) => {
    console.dir(req.body);
    const test = ["aaaa"];
    res.send(test);


});


backend.listen(port, () => console.log(`Running on port ${port}`) );




function getDumpByDate(token, date){
    return [];

}