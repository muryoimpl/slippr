const exec = require('child_process').exec

const archArray = [
  'slippr-darwin-x64',
  'slippr-linux-ia32',
  'slippr-linux-x64',
  'slippr-win32-ia32',
  'slippr-win32-x64'
]

archArray.forEach((arch) => {
  exec(`zip -r packages/${arch}-${process.argv[2]}.zip packages/${arch} >& /dev/null`, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      console.log(stdout)
      console.log(`zipped: packages/${arch}-${process.argv[2]}.zip`)
    }
    return
  })
})
