const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const hardPrice = require('./hardPrices.json');
const ss = require('simple-statistics');
const cors = require('cors');


const tokenMap = {
BNB:"0xb8c77482e45f1f44de1745f52c74426c631bdd52",
LINK:"0x514910771af9ca656af840dff83e8264ecf986ca",
BAT:"0x0d8775f648430679a709e98d2b0cb6250d2887ef",
ZRX:"0xe41d2489571d322189246dafa5ebde1f4699f498",
DAI:"0x6b175474e89094c44da98b954eedeac495271d0f"}

const port = process.env.PORT || 8040;

const db = new sqlite3.Database('rawdata.db', (err) => {
      if (err) {
        console.error(err.message);
        return err;
      }});

function getToken(token) {
  const params = {
      $token: token
  };
  let sql = `
  SELECT SUM(value) as volume, SUBSTR(block_timestamp,9,2) as day
  FROM tokens t 
  WHERE token_address = $token
  GROUP BY SUBSTR(block_timestamp,9,2)
  ORDER BY day`;
  return new Promise((resolve,reject) => {
    db.all(sql, params,(err, rows) => {
      if(err) { 
        console.dir(err.message);
        reject(err); }
      resolve(rows);
    });

  });    
  
}
    
function processToken(tokenData, tokenName){
  // We can hardcode it this time but should be a better way to load prices
  const volume = new Array(30).fill(0);
  tokenData.forEach(elem => {
    volume[parseInt(elem.day)-1] = elem.volume;
  });
  // Note: this is a very very bad way to do any estimate, we are only doing this here since we know the general price ranges of our tokens
const adjusted = hardPrice[tokenName].map(x => Math.round(x*10000) );
const cal = ss.sampleCorrelation(adjusted.slice(1), volume.slice(1));
  return {
    transfers: volume,
    prices: hardPrice[tokenName],
    correlation: cal,
  }

}



const backend = express();

backend.use(bodyParser.json({ extended: true }));
backend.use(cors());
backend.get('/check', (req,res) => {
    res.send("OK");
});



backend.post('/getDump', (req,res) => {
  const tokenName = req.body.token;
  const tokenAddress = tokenMap[tokenName];

  if(tokenAddress){
    getToken(tokenAddress).then(
      (result)=>{ 
        const data = processToken(result, tokenName);
        res.json(data); 
      
      }
    ).catch(err => {
      res.json({error: err, reason: "token fetch failed"})
    })
  }
  else{
    res.json({error: "Bad token"})
  }
  

});

backend.listen(port, () => console.log(`Running on port ${port}`) );
