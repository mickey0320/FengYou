function promisify(fn) {
  return function (arg = {}) {
    return new Promise((resolve, reject) => {
      arg.success = (res) => {
        resolve(res)
      }
      arg.fail = (err) => {
        reject(err)
      }
      fn(arg)
    })
  }
}

const combination = function (arr, size) {
  const r = [];

  function _(t, a, n) {
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (let i = 0, l = a.length - n; i <= l; i++) {
      const b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }

  _([], arr, size);
  return r;
}

export {
  promisify,
  combination,
}