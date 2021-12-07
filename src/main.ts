import { app, BrowserWindow, nativeTheme, ipcMain, shell } from "electron";
import * as path from "path";
import MenuBuilder from "./menu/menu";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:8000");

  // Open external urls in default browser.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  //open urls in electron window config

  // mainWindow.webContents.setWindowOpenHandler(({}) => {
  //   return {
  //     action: "allow",
  //     overrideBrowserWindowOptions: {
  //       // These options will be applied to the new BrowserWindow
  //       frame: false,
  //       webPreferences: {
  //         contextIsolation: false,
  //         preload: path.join(__dirname, "preload.js"),
  //       },
  //       // other BrowserWindow settings
  //     },
  //   };
  // });

  ipcMain.on("min", () => mainWindow.minimize());

  ipcMain.on("max", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-max");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-unmax");
  });

  ipcMain.on("status", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.webContents.send("window-max");
    } else {
      mainWindow.webContents.send("window-unmax");
    }
  });
  // load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, "../index.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  nativeTheme.themeSource = "dark";
  createWindow();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
