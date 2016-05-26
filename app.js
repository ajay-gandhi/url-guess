#!/usr/bin/env node
'use strict';

var http  = require('http'),
    pargs = require('minimist');

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

  http.get(base + next_str, function (res) {
    if (res.statusCode == 200) {
      // Success!
      if (argv.v) console.log(next_str, 'valid:', base + next_str);
      else        console.log(base + next_str);

    } else {
      // Try again
      if (argv.v) console.log(next_str, 'failed');
      test_new();
    }
  }).on('error', (e) => {
    console.log('Got error:', e);
  });
}
test_new();

