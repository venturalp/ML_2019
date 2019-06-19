export const pad = (n, width, z) => {
  const _z = z || '0'
  const _n = `${n}`

  return n.length >= width ? _n : new Array(width - _n.length + 1).join(_z) + _n
}
