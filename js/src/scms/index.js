import * as gitScm from './git';

const scms = [gitScm /*, hgScm*/ ];

export default directory => {
    scms.forEach(scm => {
        const rootDirectory = scm.detect(directory);
        if (rootDirectory) {
            return Object.assign({
                rootDirectory
            }, scm);
        }
    });
};