import { v5 as e } from "uuid";

function newNovelUUID(n, o) {
  let t = n + "#" + String(o);
  return e(t, e.URL);
}

export { newNovelUUID as default, newNovelUUID };
//# sourceMappingURL=index.esm.mjs.map
