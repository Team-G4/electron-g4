var createDMG = require('electron-installer-dmg')
let dmgIcons


let opts = {
    appPath: "./output/g4x-darwin-x64/g4x.app",
    name: "G4X",
    title: "Install G4X",
    background: "./res/images/background.png",
    icon: "./res/icons/dmgicon.icns",
    debug: false,
    overwrite: true,
    out: "./output/shipping/",
    additionalDMGOptions: {
        contents: dmgIcons
    }
    
}
dmgIcons = [ 
    { x: 448, y: 344, type: 'link', path: '/Applications'},
    { x: 192, y: 344, type: 'file', path: opts.appPath, name: 'G4X.app'} 
]
createDMG(opts, function done (err) { })