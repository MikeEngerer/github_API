var request = require('request');
var GITHUB_TOKEN = require('./secrets.js')

function getRepoContributors(repoOwner, repoName, cb) {
 
  var options = {
  	url: "https://api.github.com/repos/${repoOwner}/${repoName}/contributors",
  	headers: {
  		'User-Agent': 'request',
  		Authorization: GITHUB_TOKEN
  	}
  }
  request(options, function(err, res, body) {
  	cb(err, body)
  })
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});