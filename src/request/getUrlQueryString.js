
const getUrlQueryString = query => {
  return Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key])}`)
    .join('&')
}

export default getUrlQueryString
