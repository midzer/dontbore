export function convertMS(ms) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
  
    let ret = '';
    if (d) {
      ret += d + ' days, ';
    }
    if (h) {
      ret += h + ' hours, ';
    }
    if (m) {
      ret += m + ' minutes, ';
    }
    if (s) {
      ret += s + ' seconds';
    }

    return ret;
}
