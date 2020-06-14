"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptions = void 0;
function handleOptions(targetFile, options) {
    var _a;
    options = {
        ...options,
    };
    options.statFile = (_a = options.statFile) !== null && _a !== void 0 ? _a : targetFile + '.stat';
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