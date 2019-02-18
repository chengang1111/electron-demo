electron打包

1. 输入我们的打包神器：npm install electron-packager -g
2. 然后在输入： electron-packager . app --win --out presenterTool --arch=x64 --version 1.4.14 --overwrite --ignore=node_modules即可进行打包
3. 如果报错，可尝试：删除版本号
4. electron-packager . 可执行文件的文件名 --win --out 打包成的文件夹名 --arch=x64位还是32位 --version版本号 --overwrite --ignore=node_modules对上面命令的解释

note记事本事例：https://www.jianshu.com/p/57d910008612