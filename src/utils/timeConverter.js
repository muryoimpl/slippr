export function zeroPad (value) {
  return `0${value}`.slice(-2)
}

export function convertTimeToNumber (timeValue) {
  const time = String(timeValue).split(':')

  const filled = time.concat([0, 0])
  const ret = filled.map((elm) => {
    return elm ? Number(elm) : 0
  })

  return ret.slice(0, 3)
}

export function timerCalculator (hours, minutes, seconds) {
  if (seconds > 0) return [hours, minutes, seconds - 1]
  if (minutes > 0 && seconds === 0) return [hours, minutes - 1, 59]
  if (hours > 0 && minutes === 0 && seconds === 0) return [hours - 1, 59, 59]

  return [hours, minutes, seconds]
}

export function calcTimeProgress (elapsedSeconds, totalSeconds) {
  return elapsedSeconds / totalSeconds * 100
}

export function calcTotalSeconds (hours, minutes, seconds) {
  return hours * (60 * 60) + minutes * 60 + seconds
}
