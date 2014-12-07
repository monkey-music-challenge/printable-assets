#!/usr/bin/env nodejs

var fs = require('fs');
var path = require('path');

var teamsFileName = path.join(__dirname, 'teams_linebroken.tsv');

if (!fs.existsSync(teamsFileName)) {
  console.err('ERROR: Could not find ' + teamsFileName);
  process.exit(1);
}

var parseContestant = function(str) {
  var parts = str.trim().split(/<|>/);
  return {
    name: parts[0].trim(),
    email: parts[1].trim()
  };
};

var parseTeam = function(str) {
  var parts = str.trim().split('\t');
  return {
    teamName: parts[0],
    contestants: [parseContestant(parts[1]), parseContestant(parts[2])]
  };
};

module.exports = fs.readFileSync(teamsFileName, 'utf-8')
    .trim().split('\n')
    .filter(function(line) {
      return !/Cancelled/.test(line);
    }).map(parseTeam);
