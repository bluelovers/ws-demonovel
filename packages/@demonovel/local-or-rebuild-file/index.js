"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalOrRebuild = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const bluebird_1 = (0, tslib_1.__importDefault)(require("bluebird"));
const fs_1 = require("./lib/fs");
const util_1 = require("./lib/util");
function getLocalOrRebuild(targetFile, options) {
    ({ targetFile, options } = (0, util_1.handleOptions)(targetFile, options));
    let isFromLocal = false;
    let existsLocal = false;
    return bluebird_1.default.resolve((0, fs_1.checkStat)(targetFile, options))
        .then(async (stat) => {
        if (!stat) {
            existsLocal = await (0, fs_extra_1.pathExists)(targetFile);
            return Promise.reject();
        }
        return (options.rawFile ? fs_extra_1.readFile : fs_extra_1.readJSON)(targetFile)
            .then(r => {
            existsLocal = true;
            isFromLocal = true;
            return r;
        });
    })
        .catch(async (err) => {
        var _a, _b, _c;
        err && ((_a = options.console) === null || _a === void 0 ? void 0 : _a.warn(err));
        if ((_b = options.makeFns) === null || _b === void 0 ? void 0 : _b.length) {
            for (const fn of options.makeFns) {
                try {
                    let data = await fn(targetFile, options);
                    if (typeof data !== 'undefined') {
                        isFromLocal = false;
                        return data;
                    }
                }
                catch (err) {
                    err && ((_c = options.console) === null || _c === void 0 ? void 0 : _c.warn(err));
                }
            }
        }
        return Promise.reject();
    })
        .catch(err => {
        if (options.fallback) {
            if (options.fallback.module) {
                let data = Promise.resolve().then(() => (0, tslib_1.__importStar)(require(options.fallback.module))).then(m => { var _a; return (_a = m.default) !== null && _a !== void 0 ? _a : m; }).catch();
                if (typeof data !== 'undefined') {
                    isFromLocal = false;
                    return data;
                }
            }
        }
        return Promise.reject();
    })
        .catch(err => {
        var _a;
        err && ((_a = options.console) === null || _a === void 0 ? void 0 : _a.warn(err));
        return (options.rawFile ? fs_extra_1.readFile : fs_extra_1.readJSON)(targetFile)
            .then(r => {
            existsLocal = true;
            isFromLocal = true;
            return r;
        });
    })
        .tap(data => {
        var _a;
        return (_a = options.validFn) === null || _a === void 0 ? void 0 : _a.call(options, data);
    })
        .tap(async (data) => {
        if (!isFromLocal) {
            await (options.rawFile ? fs_1.saveFile : fs_1.saveJSON)(targetFile, data, options);
        }
    });
}
exports.getLocalOrRebuild = getLocalOrRebuild;
exports.default = getLocalOrRebuild;
//# sourceMappingURL=index.js.map