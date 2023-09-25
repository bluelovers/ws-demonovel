"use strict";

var e = require("uuid");

function newNovelUUID(U, l) {
  let n = U + "#" + String(l);
  return e.v5(n, e.v5.URL);
}

Object.defineProperty(newNovelUUID, "__esModule", {
  value: !0
}), Object.defineProperty(newNovelUUID, "newNovelUUID", {
  value: newNovelUUID
}), Object.defineProperty(newNovelUUID, "default", {
  value: newNovelUUID
}), module.exports = newNovelUUID;
//# sourceMappingURL=index.cjs.production.min.cjs.map
