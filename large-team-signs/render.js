#!/usr/bin/env nodejs

var teams = require('../teams').map(function(team) {
  //var longestWord = team.teamName.split(' ').map(function(word) {
    //return word.length;
  //}).sort()[0];
  if (team.teamName.length <= 5) {
    team.hasShortName = true;
  } else if (team.teamName.length > 10) {
    team.hasLongName = true;
  }
  return team;
});

console.log(teams);

var handlebars = require('handlebars');

var fs = require('fs');
var path = require('path');

var templateFileName = path.join(__dirname, 'template.html');

if (!fs.existsSync(templateFileName)) {
  console.error('ERROR: Could not find ' + templateFileName);
  process.exit(1);
}

var template = handlebars.compile(fs.readFileSync(templateFileName, 'utf-8'));

var renderedHtml = template({teams: teams});

fs.writeFileSync(path.join(__dirname, 'index.html'), renderedHtml);
