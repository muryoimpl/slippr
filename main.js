const electron = require('electron')
const { dialog, ipcMain } = require('electron')
const fs = require('fs')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // NOTE: for debug
  mainWindow.webContents.openDevTools()

  ipcMain.on('show-file-dialog', (event, arg) => {
    const options = {
      properties: ['openFile', 'showHiddenFiles'],
      filters: [
        { name: 'markdown', extensions: ['markdown', 'md', 'mkd', 'mkd', 'mkdn', 'mdown'] }
      ]
    }

    dialog.showOpenDialog(mainWindow, options, (filenames) => {
      if (filenames) {
        console.log(filenames[0])
        fs.readFile(filenames[0], 'utf8', (error, text) => {
          if (error != null) {
            console.log('error: ' + error)
            return
          }

          event.sender.send('reply-file-dialog', { markdown: text, filename: filenames[0] })
        })
      }
    })
  })

  ipcMain.on('save-file-dialog', (event, arg) => {
    const options = {
      title: 'save as ...',
      properties: ['openFile', 'createDirectory'],
      defaultPath: `${getUserHome()}`,
      filters: [
        { name: 'markdown', extensions: ['markdown', 'md', 'mkd', 'mkd', 'mkdn', 'mdown'] }
      ]
    }

    dialog.showSaveDialog(mainWindow, options, (filename) => {
      if (filename) {
        console.log(filename)
        fs.writeFile(filename, arg.markdown, 'utf8', (error) => {
          if (error) {
            console.log('error: ' + error)
            return
          }
        })
        event.sender.send('reply-save-dialog', { filename: filename })
      }
    })
  })

  ipcMain.on('full-screen', (event, arg) => {
    mainWindow.setFullScreen(true)
  })

  ipcMain.on('normal-screen', (event, arg) => {
    mainWindow.setFullScreen(false)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function getUserHome () {
  return process.env.HOME || process.env.USERPROFILE
}
