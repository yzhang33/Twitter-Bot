console.log('Hello twitter man 🤖');
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();

const config = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.TOKEN,
    token_secret: process.env.TOKEN_SECRET,
    env: 'test',
    ngrok: 'test',
};

const Twitter = require("./twitter.js");
const twitter = new Twitter(config);
var dict = {};
try{
    var data = fs.readFileSync('./dict.txt','utf8');
    data = data.split('\n');
    for(var i=0;i<data.length;i++){
        var ret = data[i].replace(/\[(.*?)\]/g,'');
        dict[i] = ret;
    }
}catch(err){
    console.error(err);
}
//console.log(dict);

pushTweet();
setInterval(pushTweet,10000);

async function pushTweet(){
    //console.log(twitter.config);
    var num = Math.floor((Math.random() * Object.keys(dict).length));
    if(dict[num] !== undefined){
        var str = dict[num].split(/\/(.*?)\//);
        var chinese_words = str[0];
        var translate = str[1];
        var msg = chinese_words + '\n' + translate;
        const response = await twitter.tweet(msg);
        console.log(response);
    }
    
}