export function zeroPad (value) {
  return `0${value}`.slice(-2)
}

export function convertTimeToNumber (timeValue) {
  const time = String(timeValue).split(':')
  return time.length === 3 ? time.map(e => Number(e)) : [0, 0, 0]
}

export function timerCalculator (hours, minutes, seconds) {
  if (seconds > 0) return [hours, minutes, seconds - 1]
  if (minutes > 0 && seconds === 0) return [hours, minutes - 1, 59]
  if (hours > 0 && minutes === 0 && seconds === 0) return [hours - 1, 59, 59]

  return [hours, minutes, seconds]
}

export function calcTimeProgress (elapsedTime, totalSeconds) {
  return (totalSeconds / 100 * elapsedTime)
}
