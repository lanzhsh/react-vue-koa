function parseUrlSearch() {
  const search = '?age=25&name=TYJ'
  return search.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
    const [key, val] = v.split("=");
    t[key] = decodeURIComponent(val);
    return t;
  }, {});
}

console.log(parseUrlSearch()); // { age: "25", name: "TYJ" }

