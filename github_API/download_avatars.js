var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets.js')

function getRepoContributors(repoOwner, repoName, cb) {
 
  var options = {
	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  	headers: {
  		'User-Agent': 'request',
  		Authorization: GITHUB_TOKEN
  	}
  }

  request(options, function(err, res, body) {
  	cb(err, body)
  })
}

function downloadImageByURL(url, filePath) {
	request.get(url)
		.pipe(fs.createWriteStream("./avatars.jpg"));
}

var cb = function(err, body) {
	if (err) throw err;
	var parsedJSON = JSON.parse(body);
	parsedJSON.forEach(function(obj) {
		console.log(obj.avatar_url);
	});
};


downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
// getRepoContributors("jquery", "jquery", cb)

