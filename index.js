const {app,BrowserWindow,Menu,Tray,globalShortcut,nativeImage} = require('electron')
const path = require('path')
var store = new (require('electron-store'))
var tray = null;
var win;
var iconPlain = path.join(__dirname, 'img', 'favicon.png');
const AutoLaunch = require('auto-launch');

var appAutoLauncher = new AutoLaunch({name:'Bitcoin Status', path:app.getPath('exe'),isHidden:true})
function setTray(){

  tray = new Tray(iconPlain)//'img/favicon.png'
  const menu = Menu.buildFromTemplate([
                    {label: (store.get('lan')=='es')?"Abrir":"Open", click: (item, window, event) => {
                      win.show()

              }},
              {label: (store.get('lan')=='es')?"Cerrar":"Close", click: (item, window, event) => {
                win.removeAllListeners('close');
                tray.destroy();
                win.close();
        }},{
          label: "devTools", click:()=>{
            win.webContents.openDevTools()
          }
        },{
      label: (store.get("lan")=='es')?"Ejecutar al inicio":"Launch at the startup",
      type: 'checkbox',
      checked: true,
      click:(item, window, event)=>{
        if (item.checked) {
          appAutoLauncher.enable();
          store.set('startup','true')
        }else{
          appAutoLauncher.disable();
          store.set('startup','false')
        }

      }
    }
   // "role": system prepared action menu
      ]);
  tray.setToolTip('Bitcoin status')
  tray.setContextMenu(menu)
  tray.on('click',()=>{win.show()})
}
app.on('ready',()=>{
  globalShortcut.register('CommandOrControl+B', () => {
    if (!win.isVisible()) {
        win.show()

    }else{
      win.close()

    }
  })

 win=new BrowserWindow({width: 800, height:755,minWidth:800, minHeight: 755 ,show:false, icon: iconPlain,opacity:0.9,frame:false,vibrancy:'appearance-based'})
 win.loadFile('Bitcoin.html')
 win.once('ready-to-show', () => {
 win.show()
 setTray()

})


 win.on('close',function(event){

    event.preventDefault();
       win.hide();
})
if (store.get("startup")!=='false') {
  appAutoLauncher.enable();
}


//setTray();
  })
