var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets')
var input = [process.argv[2], process.argv[3]]

function getRepoContributors(repoOwner, repoName, cb) {
 
  var options = {
	url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  	headers: {
  		'User-Agent': 'request',
  		'Authorization': 'token ' + GITHUB_TOKEN.GITHUB_TOKEN
  	}
  }

  request(options, function(err, res, body) {
  	cb(err, body)
  })
}

function downloadImageByURL(url, filePath) {
	var options = {
	url: url,
  	headers: {
  		'User-Agent': 'request',
  		'Authorization': 'token ' + GITHUB_TOKEN.GITHUB_TOKEN
  	}
  }
	request(options).pipe(fs.createWriteStream(filePath));
}

var cb = function(err, body) {
	if (err) {
		console.log(err)
	};
	var parsedJSON = JSON.parse(body);
		for (key in parsedJSON) {
			downloadImageByURL(parsedJSON[key].avatar_url, "./avatars/" + parsedJSON[key].login + ".jpg")
		}
};


// downloadImageByURL("https://avatars3.githubusercontent.com/u/1199584?v=4", "./avatars.jpg")
if (input[0] && input[1]) {
	getRepoContributors(input[0], input[1], cb)
} else {
	console.log("Invalid input, please try again.")
}

