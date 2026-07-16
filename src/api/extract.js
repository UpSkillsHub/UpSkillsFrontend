// The backend wraps responses as { success, message, data: {...} }, and the
// list lives under a resource key (users, courses, ...). This digs it out
// robustly no matter the exact nesting so the UI never crashes on shape drift.
export function pickArray(res, ...keys) {
  const layers = [res, res?.data, res?.data?.data];
  for (const layer of layers) {
    if (Array.isArray(layer)) return layer;
    if (!layer || typeof layer !== "object") continue;
    for (const k of [...keys, "results", "rows", "items"]) {
      if (Array.isArray(layer[k])) return layer[k];
    }
  }
  return [];
}

// Total count when the API returns one, else the array length.
export function pickCount(res, arr) {
  const layers = [res, res?.data, res?.data?.data];
  for (const layer of layers) {
    if (layer && typeof layer === "object") {
      for (const k of ["total", "count", "totalCount"]) {
        if (typeof layer[k] === "number") return layer[k];
      }
    }
  }
  return arr.length;
}
