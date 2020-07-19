function stringifyUrl(search = {}) {
  return Object.entries(search).reduce(
    (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
    Object.keys(search).length ? "?" : ""
  ).replace(/&$/, "");
}

console.log(stringifyUrl({ age: 27, name: "YZW" })); // "?age=27&name=YZW"