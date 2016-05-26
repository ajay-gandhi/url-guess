#!/usr/bin/env node
'use strict';

var rp     = require('request-promise'),
    pargs  = require('minimist');

var argv = pargs(process.argv.slice(2), {
  boolean: ['v']
});

var base = 'http://goo.gl/';

var generate_string = function (len) {
  var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return (new Array(len)).fill(0).map(function () {
    return char_list.charAt(Math.floor(Math.random() * char_list.length));
  }).join('');
}

var test_new = function () {
  var next_str = generate_string(6);

  rp({
    uri: 'http://goo.gl/' + next_str,
    resolveWithFullResponse: true
  })
  .then(function (response) {
    if (argv.v) console.log(next_str, 'valid:', base + next_str);
    else        console.log(base + next_str);
  })
  .catch(function (err) {
    if (argv.v) console.log(next_str, 'failed');
    test_new();
  });
}
test_new();

