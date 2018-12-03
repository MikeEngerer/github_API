var request = require('request');
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

var cb = function(err, body) {
	if (err) throw err;
	var parsedJSON = JSON.parse(body);
	parsedJSON.forEach(function(obj) {
		console.log(obj.avatar_url);
	});
};

getRepoContributors("jquery", "jquery", cb)

