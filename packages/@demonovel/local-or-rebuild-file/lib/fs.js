"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.saveJSON = exports.updateStat = exports.isOutdated = exports.checkStat = exports.getStat = void 0;
const fs_extra_1 = require("fs-extra");
function getStat(targetFile, statFile) {
    return (0, fs_extra_1.readJSON)(statFile)
        .catch(e => (0, fs_extra_1.stat)(targetFile));
}
exports.getStat = getStat;
async function checkStat(targetFile, options) {
    if (!options.force) {
        let stat = await getStat(targetFile, options.statFile);
        return isOutdated(stat, options);
    }
    return Promise.reject();
}
exports.checkStat = checkStat;
function isOutdated(stat, options) {
    return !stat || ((Date.now() - stat.mtimeMs) > options.ttl);
}
exports.isOutdated = isOutdated;
async function updateStat(targetFile, options) {
    return (0, fs_extra_1.outputJSON)(options.statFile, await (0, fs_extra_1.stat)(targetFile), {
        spaces: 2,
    });
}
exports.updateStat = updateStat;
function saveJSON(targetFile, data, options) {
    return (0, fs_extra_1.outputJSON)(targetFile, data, {
        spaces: 2,
    });
}
exports.saveJSON = saveJSON;
function saveFile(targetFile, data, options) {
    return (0, fs_extra_1.outputFile)(targetFile, data);
}
exports.saveFile = saveFile;
//# sourceMappingURL=fs.js.map