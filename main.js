const electron = require('electron')
const { dialog, ipcMain } = require('electron')
const fs = require('fs')

const Menu = electron.Menu
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow, childWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (!process.env.NODE_ENV) {
    mainWindow.webContents.openDevTools()
  }

  ipcMain.on('show-file-dialog', (event, arg) => {
    const options = {
      properties: ['openFile', 'showHiddenFiles'],
      filters: [
        { name: 'markdown', extensions: ['markdown', 'md', 'mkd', 'mkd', 'mkdn', 'mdown'] }
      ]
    }

    dialog.showOpenDialog(mainWindow, options, (filenames) => {
      if (filenames) {
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

  ipcMain.on('overwrite-file', (event, arg) => {
    fs.writeFile(arg.filename, arg.markdown, 'utf8', (error) => {
      if (error) {
        console.log('error: ' + error)
        return
      }
    })
    event.sender.send('reply-overwrite-file')
  })

  ipcMain.on('full-screen', (event, arg) => {
    mainWindow.setFullScreen(true)
  })

  ipcMain.on('normal-screen', (event, arg) => {
    mainWindow.setFullScreen(false)
  })

  ipcMain.on('open-child-window', (event, arg) => {
    if (!childWindow || childWindow.isDestroyed()) {
      const menu = Menu.buildFromTemplate([{}])
      childWindow = new BrowserWindow({ frame: true, resizable: true })
      childWindow.loadURL(`file://${__dirname}/child.html`)
      childWindow.setMenu(menu)
      if (!process.env.NODE_ENV) {
        childWindow.webContents.openDevTools()
      }
      childWindow.show()
    } else {
      childWindow.show()
    }
  })

  ipcMain.on('alert-time-limit', (event, arg) => {
    if (mainWindow) {
      mainWindow.webContents.send('blink-page')
    }
  })

  ipcMain.on('transition-page', (event, arg) => {
    if (mainWindow) {
      mainWindow.webContents.send('transition-page', { keyCode: arg.keyCode })
    }
  })

  ipcMain.on('send-total-seconds', (event, arg) => {
    if (mainWindow) {
      mainWindow.webContents.send('start-timer-in-page', { totalSeconds: arg.totalSeconds })
    }
  })

  ipcMain.on('stop-timer-in-page', (event, arg) => {
    if (mainWindow) {
      mainWindow.webContents.send('stop-timer-in-page')
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
    childWindow = null
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
