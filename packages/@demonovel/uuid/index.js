"use strict";
/**
 * Created by user on 2020/6/14.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.newNovelUUID = void 0;
const uuid_1 = require("uuid");
function newNovelUUID(siteID, uniqueID) {
    let seed = siteID + '#' + String(uniqueID);
    //return hashSum(seed)
    return uuid_1.v5(seed, uuid_1.v5.URL);
}
exports.newNovelUUID = newNovelUUID;
exports.default = newNovelUUID;
//# sourceMappingURL=index.js.map