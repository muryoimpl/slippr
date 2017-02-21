export function zeroPad (value) {
  return `0${value}`.slice(-2)
}

export function convertTimeToNumber (timeStr) {
  const time = timeStr.split(':')
  return time.length === 2 ? time : [0, 0]
}
