const {app, BrowserWindow, Menu, globalShortcut} = require('electron')

// Set enviroment to dev
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV != 'production' ? true : false
// Set platform
console.log(process.platform)
const isWin = process.platform === 'win32' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
// ============== MAIN WINDOW ================================
function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Image Zipper',
        width: 500,
        height:600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`,
        resizable: isDev,
        backgroundColor: 'white'
    })

    // ***** LOAD URL/WEBSITE OR FILE ************************
    // mainWindow.loadURL(`http://www.abrahamtavarez.dev`)
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)

    // ***** YOU CAN ALSO LOAD FILE USING THIS LOAD FUNCTION
    mainWindow.loadFile(`./app/index.html`)
}
// ============= EVENTS =======================================
app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+I': 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())

    mainWindow.on('close', () => mainWindow = null)
})
// ============ MAIN MENU =====================================
const menu = [
    ...(isMac ? [{role: 'appMenu'}] : []),
    {
       role: 'fileMenu'
    },
    ...(isDev ? [
        {
            label: 'Developer',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {type: 'separator'},
                {role: 'toggledevtools'}
            ]
        }
    ] : [])
]

// If the computer is not a MacOS clicking on [x] will close the app
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

// On MacOS it re-creates a Main windows in the app
// when the dick icon is click and there are no other windows open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.contextIsolation = true