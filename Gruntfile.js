/*
 * grunt-ractive-parse
 * https://github.com/alisonailea/grunt-ractive-parse
 *
 * Copyright (c) 2014 Alison Stump
 * Licensed under the MIT license.
 */

'use strict';
var Ractive = require('ractive'),
    path = require('path');

module.exports = function (grunt) {
  var desc = 'pre-parse Ractive templates for use in MVC projects';
  grunt.registerMultiTask('ractive_parse', desc, make);

  function make(){
      this.files.forEach(function(file){
          var templates = file.src.map(parse);
          grunt.file.write(file.dest,
              'Ext.define("Savanna.components.templates", {\n' + templates.join(',\n') + '\n}');
      });
  }

  function parse(template){
      var name = path.basename(template, '.html'),
          html = grunt.file.read(template),
          parsed = Ractive.parse(html);

      return  '\t' + name + ': ' + JSON.stringify(parsed);
  }
};