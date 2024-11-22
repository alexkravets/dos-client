
const wait = (ms = 50) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise(resolve => setTimeout(resolve, ms))


const waitRandom = () => {
  const randomMs = Math.floor(Math.random() * 500) + 100
  return wait(randomMs)
}


export {
  wait,
  waitRandom
}
