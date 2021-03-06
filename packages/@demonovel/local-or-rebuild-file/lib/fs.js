"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = exports.saveJSON = exports.checkStat = exports.getStat = void 0;
const fs_extra_1 = require("fs-extra");
function getStat(targetFile, statFile) {
    return fs_extra_1.readJSON(statFile)
        .catch(e => fs_extra_1.stat(targetFile))
        .catch(r => Promise.reject());
}
exports.getStat = getStat;
async function checkStat(targetFile, options) {
    if (!options.force) {
        let stat = await getStat(targetFile, options.statFile);
        return (stat && (Date.now() - stat.mtimeMs) < options.ttl);
    }
    return Promise.reject();
}
exports.checkStat = checkStat;
async function saveJSON(targetFile, data, options) {
    await fs_extra_1.outputJSON(targetFile, data, {
        spaces: 2,
    });
    await fs_extra_1.outputJSON(options.statFile, await fs_extra_1.stat(targetFile), {
        spaces: 2,
    });
}
exports.saveJSON = saveJSON;
async function saveFile(targetFile, data, options) {
    await fs_extra_1.outputFile(targetFile, data);
    await fs_extra_1.outputJSON(options.statFile, await fs_extra_1.stat(targetFile), {
        spaces: 2,
    });
}
exports.saveFile = saveFile;
//# sourceMappingURL=fs.js.map