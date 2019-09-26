const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const spawn = require('child_process').spawn;
const context_menu = require('electron-context-menu');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScrispt object is garbage collected.
const boot_files = ['display/map_lay.html', 'display/homepage.html'];
const windows = [null];
// ----------------------------------------------------------------------------------------
// Importing this adds a right-click menu with 'Inspect Element' option [worth it]
context_menu({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: params.mediaType === 'image',
    }],
});
// ----------------------------------------------------------------------------------------
function closeWin(i) {
    return () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        windows[i] = null;
    };
}
function createWindow() {
    var i;
    // Create the browser window.
    //This will activate browsers for all of the needed screens.
    for (i = 0; i < boot_files.length; i++) {
        // Curious if a macOS works better this way with multi-windows...
        if (windows[i] == null) {
            windows[i] = new BrowserWindow({ 
                width: 1600, height: 1200, nodeIntegration: true });
            // and load the index.html of the app.
            windows[i].loadURL(url.format({
                pathname: path.join(__dirname, boot_files[i]),
                protocol: 'file:',
              
              slashes: true,
            }));
            // Open the DevTools. inspect element
            //windows[i].webContents.openDevTools();
            // Emitted when the window is closed.
            windows[i].on('closed', closeWin(i));
        }
    }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createWindow();
});
