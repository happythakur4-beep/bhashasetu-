const { app, BrowserWindow, session, ipcMain, dialog } = require('electron');
const path = require('path');
const http = require('http');

let mainWindow = null;
let serverProcess = null;
const PORT = process.env.PORT || 39201;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    title: 'BhashaSetu — Interstate Voice Translator & Offline Mesh',
    backgroundColor: '#090d16',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
    },
  });

  // Automatically approve microphone and audio permissions for walkie-talkie
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowedPermissions = ['media', 'audioCapture', 'microphone', 'notifications'];
    if (allowedPermissions.includes(permission)) {
      return callback(true);
    }
    callback(false);
  });

  // Load production bundle or local server
  const startUrl = process.env.ELECTRON_START_URL || `http://localhost:${PORT}`;

  // Retry connecting to local server before loading
  let retries = 0;
  const tryLoad = () => {
    http.get(`http://localhost:${PORT}/api/health`, (res) => {
      if (res.statusCode === 200) {
        mainWindow.loadURL(startUrl);
      } else if (retries < 15) {
        retries++;
        setTimeout(tryLoad, 400);
      } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
      }
    }).on('error', () => {
      if (retries < 15) {
        retries++;
        setTimeout(tryLoad, 400);
      } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
      }
    });
  };

  tryLoad();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Start embedded backend server
function startEmbeddedServer() {
  try {
    process.env.PORT = String(PORT);
    process.env.NODE_ENV = 'production';
    require(path.join(__dirname, '../dist/server.mjs'));
  } catch (err) {
    console.error('Failed to launch embedded server:', err);
  }
}

app.whenReady().then(() => {
  startEmbeddedServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
