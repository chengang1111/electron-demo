import { app, BrowserWindow,Menu,MenuItem,dialog,ipcMain } from 'electron';
import {appMenuTemplate} from './appmenu.js';
let safeExit = false;
let mainWindow;
const createWindow = () =>{
  mainWindow = new BrowserWindow({
    width:800,
    height:600,
  })

mainWindow.loadURL(`file://${__dirname}/index.html`);
//增加主菜单
const menu = Menu.buildFromTemplate(appMenuTemplate);//从模版创建主菜单；
//在file菜单下添加名为New的子菜单
menu.items[0].submenu.append(new MenuItem({
  label:'New',
  click(){
    mainWindow.webContents.send('action','new');//点击后向主页面渲染进程发送‘新建文件’的命令
  },
  accelerator:'CmdOrCtrl+N'//快捷键
}));
//在New菜单后面添加名为Open的同级菜单
menu.items[0].submenu.append(new MenuItem({
  label:'Open',
  click(){
    mainWindow.webContents.send('action','open');//点击后向主页面渲染进程发送‘打开文件’的命令
  },
  accelerator:'CmdOrCtrl+O'
}));
menu.items[0].submenu.append(new MenuItem({
  label:'Save',
  click(){
    mainWindow.webContents.send('action','save');//点击后向主页渲染进程发送‘保存’的命令
  },
  accelerator:'CmdOrCtrl+S'
}))
menu.items[0].submenu.append(new MenuItem({
  type:'separator'
}));
menu.items[0].submenu.append(new MenuItem({
  role:'quit'
}));
Menu.setApplicationMenu(menu);//注意：这个代码要放到菜单添加完成之后，否则会造成新增菜单快捷键的无效

mainWindow.on('close',(e) => {
  if(!safeExit){
    e.preventDefault();
    mainWindow.webContents.send('action','exiting');
  }
});
mainWindow.on('close',() => {
  mainWindow = null;
})
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
app.on('ready',createWindow);
app.on('window-all-closed',() => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
});
app.on('activate',() => {
  if(mainWindow === null) {
    createWindow();
  }
});
ipcMain.on('reqaction',(event,arg) => {
  switch(arg){
    case 'exit': 
      safeExit=true;
      app.quit();
      break
  }
})