/*

Use Commonmark to parse *.md files and make them available via grunt.data.markdown

*/

var path = require("path");
var typo = require("typogr");
var stmd = require("commonmark");
var writer = new stmd.HtmlRenderer();
var reader = new stmd.Parser();

//monkey-patch writer to handle typographical entities
var escape = writer.escape;
writer.escape = function(str) {
  return escape(str, true);
};

module.exports = function(grunt) {

  grunt.registerTask("markdown", "Renders .md to HTML on grunt.data.markdown", function() {

    grunt.task.requires("state");

    //ignore markdown files inside the JS folder that come from Bower or libraries
    var files = grunt.file.expand("src/**/*.md", "!src/js/**/*.md");
    grunt.data.markdown = {};

    files.forEach(function(filename) {
      var input = grunt.file.read(filename);
      var parsed = reader.parse(input);

      var walker = parsed.walker();
      //merge text nodes together
      var e;
      var previous;
      while (e = walker.next()) {
        var node = e.node;
        //is this an adjacent text node?
        if (node && previous && previous.parent == node.parent && previous.type == "Text" && node.type == "Text") {
          previous.literal += node.literal;
          // grunt.log.oklns(previous.literal);
          node.unlink();
        } else {
          previous = node;
        }
      }
      //second pass, run Typogr on the text
      walker = parsed.walker();
      while (e = walker.next()) {
        if (e.node && e.node.type == "Text") {
          e.node.literal = typo.smartypants(e.node.literal);
        }
      }

      var output = writer.render(parsed);
      var sansExtension = path.basename(filename).replace(/\..*?$/, "");
      grunt.data.markdown[sansExtension] = output;
    });

  });

};