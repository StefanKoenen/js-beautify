"use strict";
var gitScm = require('./git');

var scms = [gitScm /*, hgScm*/ ];

exports.directory = function (directory) {
    scms.forEach(function (scm) {
        var rootDirectory = scm.detect(directory);
        if (rootDirectory) {
            return Object.assign({
                rootDirectory: rootDirectory
            }, scm);
        }
    });
};