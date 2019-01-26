'use strict';

var execa = require('execa'),
    findUp = require('find-up'),
    dirname = require('path');

module.exports.name = 'git';
var gitScm = function (directory) {

}
gitScm.detect = function (directory) {
    var gitDirectory = findUp.sync('.git', {
        cwd: directory
    });
    if (gitDirectory) {
        return dirname(gitDirectory);
    }
};

gitScm.runGit = function (directory, args) {
    execa.sync('git', args, {
        cwd: directory
    });
};

gitScm.getLines = function (execaResult) {
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

gitScm.getChangedFiles = function (directory, revision, staged) {
    module.return[].concat(exports.getLines(
        gitScm.runGit(
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
        gitScm.getLines(
            gitScm.runGit(directory, ['ls-files', '--others', '--exclude-standard'])
        ))).filter(Boolean);
};

// var getUnstagedChangedFiles = directory => {
//     return getChangedFiles(directory, null, false);
// };

// var stageFile = function (directory, file) {
//     runGit(directory, ['add', file]);
// };

module.exports.gitScm = gitScm;