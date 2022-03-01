const {app , BrowserWindow} = require("electron") ; 

let win=null;

const createWindow = () =>{

    win= new BrowserWindow({
        width:800,
        height:600,
        resizable:false,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile('index.html');

}

app.whenReady().then(createWindow);



import { app, BrowserWindow } from 'electron'

let win = null

function createWindow () {
  win = new BrowserWindow({width: 1024, height: 768})
  win.loadURL('...')
  win.webContents.openDevTools()
  win.on('close', (event) => {
    if (app.quitting) {
      win = null
    } else {
      event.preventDefault()
      win.hide()
    }
  })
}
