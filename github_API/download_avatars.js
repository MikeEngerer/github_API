var request = require('request');
var fs = require('fs');
var GITHUB_TOKEN = require('./secrets')
var input = [process.argv[2], process.argv[3]]

// this function takes in user input from node (via input[0], input[1]) and submits a request with these paramaters
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

//submits second request using the list of avatar URLs and, when passed to cb, downloads and writes to filepath indicated by user login
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
//for each user, their avatar is DL to avatars/<login>
var cb = function(err, body) {
	if (err) {
		console.log(err)
	};
	var parsedJSON = JSON.parse(body);
		for (key in parsedJSON) {
			downloadImageByURL(parsedJSON[key].avatar_url, "./avatars/" + parsedJSON[key].login + ".jpg")
		}
};

//only submits requests if user inputs both arguments (repoOwner, repoName)
if (input[0] && input[1]) {
	getRepoContributors(input[0], input[1], cb)
} else {
	console.log("Invalid input, please try again.")
}

