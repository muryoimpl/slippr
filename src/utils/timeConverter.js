export function zeroPad (value) {
  return `0${value}`.slice(-2)
}

export function convertTimeToNumber (timeValue) {
  const time = String(timeValue).split(':')
  return time.length === 2 ? time.map(e => Number(e)) : [0, 0]
}

export function timerCalculator (minutes, seconds) {
  if (minutes === 0 && seconds === 0) return [minutes, seconds]
  if (minutes > 0 && seconds === 0) return [minutes - 1, 59]

  if (minutes === 0 && seconds > 0) return [minutes, seconds - 1]
  if (minutes > 0 && seconds > 0) return [minutes, seconds - 1]
}
