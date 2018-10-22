/* eslint-disable no-console */
const electron = require('electron');
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

const { Menu, app, BrowserWindow } = electron;

let mainWindow;
let timerWindow;
let printWindow;
let printTargetObject = {
  markdown: '',
  theme: '',
  ratio: 60,
  highlight: '',
};

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

function createChildWindow(htmlName, toShow = true) {
  const menu = Menu.buildFromTemplate([{}]);
  const windowVariable = new BrowserWindow({ frame: true, resizable: true, show: toShow });
  windowVariable.loadURL(`file://${__dirname}/internals/${htmlName}.html`);
  windowVariable.setMenu(menu);

  if (process.env.NODE_ENV === 'development') {
    windowVariable.webContents.openDevTools();
  }

  return windowVariable;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: true,
    icon: path.join(__dirname, 'assets/images/icons/png/1024x1024.png'),
  });

  mainWindow.loadURL(`file://${__dirname}/internals/index.html`);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('show-file-dialog', (event) => {
    const options = {
      properties: ['openFile', 'showHiddenFiles'],
      filters: [
        { name: 'markdown', extensions: ['markdown', 'md', 'mkd', 'mkd', 'mkdn', 'mdown'] },
      ],
    };

    dialog.showOpenDialog(mainWindow, options, (filenames) => {
      if (filenames) {
        fs.readFile(filenames[0], 'utf8', (error, text) => {
          if (error != null) {
            console.log(`error: ${error}`);
            return;
          }

          event.sender.send('reply-file-dialog', { markdown: text, filename: filenames[0] });
        });
      }
    });
  });

  ipcMain.on('save-file-dialog', (event, arg) => {
    const options = {
      title: 'save as ...',
      properties: ['openFile', 'createDirectory'],
      defaultPath: `${getUserHome()}`,
      filters: [
        { name: 'markdown', extensions: ['markdown', 'md', 'mkd', 'mkd', 'mkdn', 'mdown'] },
      ],
    };

    dialog.showSaveDialog(mainWindow, options, (filename) => {
      if (filename) {
        fs.writeFile(filename, arg.markdown, 'utf8', (error) => {
          if (error) {
            console.log(`error: ${error}`);
          }
        });
        event.sender.send('reply-save-dialog', { filename });
      }
    });
  });

  ipcMain.on('overwrite-file', (event, arg) => {
    fs.writeFile(arg.filename, arg.markdown, 'utf8', (error) => {
      if (error) {
        console.log(`error: ${error}`);
      }
    });
    event.sender.send('reply-overwrite-file');
  });

  ipcMain.on('full-screen', () => {
    mainWindow.setFullScreen(true);
  });

  ipcMain.on('normal-screen', () => {
    mainWindow.setFullScreen(false);
  });

  ipcMain.on('open-child-window', () => {
    if (!timerWindow || timerWindow.isDestroyed()) {
      timerWindow = createChildWindow('timer');
      timerWindow.show();
    } else {
      timerWindow.show();
    }
  });

  ipcMain.on('transition-page', (event, arg) => {
    if (mainWindow) {
      mainWindow.webContents.send('transition-page', { keyCode: arg.keyCode });
    }
  });

  ipcMain.on('send-total-seconds', (event, arg) => {
    if (mainWindow) {
      mainWindow.webContents.send('start-timer-in-page', { totalSeconds: arg.totalSeconds });
    }
  });

  ipcMain.on('stop-timer-in-page', () => {
    if (mainWindow) {
      mainWindow.webContents.send('stop-timer-in-page');
    }
  });

  ipcMain.on('open-print-window', (event, arg) => {
    const {
      highlight,
      markdown,
      theme,
      ratio,
    } = arg;

    printTargetObject = Object.assign(printTargetObject, {
      markdown,
      theme,
      ratio,
      highlight,
    });

    if (printWindow && !printWindow.isDestroyed()) {
      printWindow.close();
    }

    printWindow = createChildWindow('print', false);

    printWindow.webContents.on('did-finish-load', () => {
      const height = arg.ratio === 60 ? 167000 : 210000;
      const option = {
        printBackground: true,
        marginsType: 1,
        landscape: false,
        pageSize: { width: 297000, height },
      };

      printWindow.webContents.printToPDF(option, (error, data) => {
        if (error) console.log(`error: ${error}`);

        const options = {
          title: 'save as ...',
          defaultPath: `${getUserHome()}`,
          filters: [
            { name: 'pdf', extensions: ['pdf'] },
          ],
        };

        dialog.showSaveDialog(printWindow, options, (filename) => {
          if (filename) {
            fs.writeFile(filename, data, (writeError) => {
              if (error) {
                console.log(`error: ${writeError}`);
              }
              printWindow.close();
            });
          }
        });
      });
    });
  });

  ipcMain.on('get-print-target', () => {
    printWindow.webContents.send('reply-get-print-target', printTargetObject);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    timerWindow = null;
    printWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
