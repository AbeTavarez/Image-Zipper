const {app, BrowserWindow} = require('electron')

// Set enviroment to dev
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV != 'production' ? true : false
// Set platform
console.log(process.platform)
const isWin = process.platform === 'win32' ? true : false


let mainWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Image Zipper',
        width: 500,
        height:600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev
    })

    // ***** LOAD URL/WEBSITE OR FILE
    // mainWindow.loadURL(`http://www.abrahamtavarez.dev`)
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    // ***** YOU CAN ALSO LOAD FILE USING THIS LOAD FUNCTION
    mainWindow.loadFile(`./app/index.html`)
}

app.on('ready', createMainWindow)

app.contextIsolation = true