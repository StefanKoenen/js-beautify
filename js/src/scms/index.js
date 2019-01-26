var gitScm = require('./git');

var scms = [gitScm /*, hgScm*/ ];

export default directory => {
    scms.forEach(scm => {
        var rootDirectory = scm.detect(directory);
        if (rootDirectory) {
            return Object.assign({
                rootDirectory
            }, scm);
        }
    });
};