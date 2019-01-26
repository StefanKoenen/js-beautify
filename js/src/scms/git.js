'use strict';

var execa = require('execa'),
    findUp = require('find-up'),
    dirname = require('path');

exports.name = 'git';

exports.detect = function (directory) {
    var gitDirectory = findUp.sync('.git', {
        cwd: directory
    });
    if (gitDirectory) {
        return dirname(gitDirectory);
    }
};

exports.runGit = function (directory, args) {
    execa.sync('git', args, {
        cwd: directory
    });
};

exports.getLines = function (execaResult) {
    return execaResult.stdout.split('\n');
};

// var getSinceRevision = function (directory, {
//     staged,
//     branch
// }) {
//     try {
//         var revision = staged ?
//             'HEAD' :
//             runGit(directory, [
//                 'merge-base',
//                 'HEAD',
//                 branch || 'master',
//             ]).stdout.trim();
//         return runGit(directory, ['rev-parse', '--short', revision]).stdout.trim();
//     } catch (error) {
//         if (
//             /HEAD/.test(error.message) ||
//             (staged && /Needed a single revision/.test(error.message))
//         ) {
//             return null;
//         }
//         throw error;
//     }
// };

exports.getChangedFiles = function (directory, revision, staged) {
    return [].concat(exports.getLines(
        exports.runGit(
            directory,
            [
                'diff',
                '--name-only',
                staged ? '--cached' : null,
                '--diff-filter=ACMRTUB',
                revision
            ].filter(Boolean)
        )
    )).concat((staged ? [] :
        exports.getLines(
            exports.runGit(directory, ['ls-files', '--others', '--exclude-standard'])
        ))).filter(Boolean);
};

// var getUnstagedChangedFiles = directory => {
//     return getChangedFiles(directory, null, false);
// };

// var stageFile = function (directory, file) {
//     runGit(directory, ['add', file]);
// };