'use strict'

require('dotenv').config();
var Twitter = require('twitter');
var rl = require('readline');
var sw = require('stopword');
var consoleTable = require('console.table');

var watson = require('watson-developer-cloud');//alchemyapi for sentiment analysis
var alchemy_language = watson.alchemy_language({
  api_key: process.env.API_KEY
})
 
var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});


 var read = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

  read.question("To assess sentiment analysis type the twitter handle: ", function (answer, count) {
  read.close();
  var options = {screen_name: answer, count: 500};
    client.get('statuses/user_timeline', options, function (err, data, response) {
    var tweets = '';
      console.log('Tweets' + ' ' + data.length);
        for (var i = 0; i < data.length; i++){
          var progress = i++;
            tweets += data[i].text;
            console.log('Tweets loading' + ' ' + Math.round(progress/data.length * 100) + '%');
}

  const oldString = tweets.toLowerCase().replace(/[^a-z\s]+/g, '').split(' ');
  const word = sw.removeStopwords(oldString); //Remove stop-words from tweets
    var wordCount = {};
      for (var i = 0; i < word.length; i++){
        wordCount[word[i]] = (wordCount[word[i]]) ? wordCount[word[i]] + 1 : 1; //To create a table of words in the tweets and their frequency
}



  var words = [];
    for (var i in wordCount)
      words.push([i, wordCount[i]])
      words.sort(function(a, b) { return b[1] - a[1]; //To sort words based on frequency from highest to lowest
})
      console.log("hey!!!!!")
      console.table('words    frequency', words.slice(0, 21));
 

  var parameters = {
    url: 'www.twitter.com/' + answer + '/'  };
    alchemy_language.sentiment(parameters, function (err, response) {
      if (err) {
        console.log('error:', err);
      }
      else {
        var docSentiment = response.docSentiment
        var sentiment = []
        for (var key in docSentiment){
          sentiment.push([key, docSentiment[key]])
 }
}
        console.table('sentiment    value', sentiment); //sentiment analysis with alchemy
         
});
});
});
