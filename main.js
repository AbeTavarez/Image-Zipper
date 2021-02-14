const {app, BrowserWindow} = require('electron')
let mainWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Image Zipper',
        width: 500,
        height:600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`
    })

    // ***** LOAD URL/WEBSITE OR FILE
    // mainWindow.loadURL(`http://www.abrahamtavarez.dev`)
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    // ***** YOU CAN ALSO LOAD FILE USING THIS LOAD FUNCTION
    mainWindow.loadFile(`./app/index.html`)
}

app.on('ready', createMainWindow)