import { wait } from "./wait"

const isLocal = window.location.host.startsWith('localhost')

const RERENDER_DELAY = isLocal
  ? 25
  : 0

const runRequest = (effect) => {
  let isCancelled = false

  wait(RERENDER_DELAY)
    .then(() => {
      if (isCancelled) {
        return
      }

      return effect()
    })

  return () => { isCancelled = true }
}

export default runRequest
