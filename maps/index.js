try {
    module.exports = (() => require('fs')
        .readdirSync(__dirname)
        .filter(fileName => !!/.json$/ig.test(fileName))
        .map(fileName => fileName.split('.')[0])
        .reduce((defaultExportObj, nextFileName) => {
            try {
                return {
                    ...defaultExportObj,
                    [nextFileName]: JSON.stringify(require(__dirname + `/${nextFileName}`)),
                };
            } catch (err) {
                throw err;
            }
        }, {}))();
} catch(e) {
    return false;
}