export const queryParse = (q) => {
  if (!q) return {}
  const _q = q.substr(0, 1) === '?' ? q.substring(1) : q
  const values = _q.split('&')
  const obj = {}
  values.map((v) => {
    const d = v.split('=')
    Object.assign(obj, { [d[0]]: decodeURI(d[1]) })

    return null
  })

  return obj
}
