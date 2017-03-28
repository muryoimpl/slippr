const fs = require('fs')
const ejs = require('ejs')

fs.readdir('./assets/images/emoji', (e, files) => {
  if (e) throw e

  ejs.renderFile('./tasks/templates/emojiConst.ejs', { emojiFiles: files }, { }, (e, renderedFile) => {
    fs.writeFile('./src/constants/emojiConst.js', renderedFile, (e) => {
      if (e) {
        console.log(`error: ${e}`)
      } else {
        console.log('`emojiConst.js` is generated successfully')
      }
    })
  })
})
