#!/usr/bin/env nodejs

var teams = require('../teams');

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
