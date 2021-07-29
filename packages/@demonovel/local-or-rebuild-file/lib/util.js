"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
const path_1 = require("path");
function handleOptions(targetFile, options) {
    var _a;
    options = {
        ...options,
    };
    targetFile = (0, path_1.resolve)(targetFile);
    (_a = options.statFile) !== null && _a !== void 0 ? _a : (options.statFile = targetFile + '.stat');
    options.statFile = (0, path_1.resolve)(options.statFile);
    if ((options.ttl |= 0) <= 0) {
        options.ttl = 12 * 60 * 60 * 1000;
    }
    return {
        targetFile,
        options,
    };
}
exports.handleOptions = handleOptions;
//# sourceMappingURL=util.js.map