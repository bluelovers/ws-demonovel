'use strict';

var uuid = require('uuid');

function newNovelUUID(siteID, uniqueID) {
  let seed = siteID + '#' + String(uniqueID);
  return uuid.v5(seed, uuid.v5.URL);
}
{
  Object.defineProperty(newNovelUUID, "__esModule", {
    value: true
  });
  Object.defineProperty(newNovelUUID, 'newNovelUUID', {
    value: newNovelUUID
  });
  Object.defineProperty(newNovelUUID, 'default', {
    value: newNovelUUID
  });
}

// @ts-ignore
module.exports = newNovelUUID;
//# sourceMappingURL=index.cjs.development.cjs.map
