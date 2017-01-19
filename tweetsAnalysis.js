'use strict'

var watson = require('watson-developer-cloud');
var alchemy_language = watson.alchemy_language({
  api_key: '753422bdb920d98776a725a24ddbdd9c14ebbb3f'
})

var Twitter = require('twitter');
var rl = require('readline');
var sw = require('stopword');
var Table = require('easy-table');
var consoleTable = require('console.table');
 
var client = new Twitter({
  consumer_key: 'kNWbOtCaNjp7rXajQcs0A0UJB',
  consumer_secret: '9xnaeb0oHXJlwBvMTHXPc7v1ftjgrpRqkpUD6aMkTHO96tG1fU',
  access_token_key: '821062173959028736-kMnEV9zjAyY8IMMP3iRy2JTRHHSYe9j',
  access_token_secret: '8tMzx9qApEhOUiSP9W7KpGVOSFYmHfKHCCBBio78vIGx2',
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
        wordCount[word[i]] = (wordCount[word[i]]) ? wordCount[word[i]] + 1 : 1; //To create a table of words in tweets and frequency
}



  var words = [];
    for (var i in wordCount)
      words.push([i, wordCount[i]])
      words.sort(function(a, b) { return b[1] - a[1]; //To sort words based on frequency 
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
        console.table('sentiment    value', sentiment); //sentiment analysis with alchemy
        //console.table(JSON.stringify(response, null, 2));
 }
         
});
});
});
