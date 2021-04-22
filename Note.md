## 命令行功能要点

* 命令行
* 交互命令
* shell执行
* 文件读取写入
* 模板文件
* 模板引擎
* 提示信息工具 chalk
* 日志
* 队列


### 模板引擎

* 方案一 ：ejs （所有项目文件，不管文件后缀名，都看成是ejs模板，则可以在文件内容中使用ejs语法。）

1. men-fs： 文件读取存入内存
2. men-fs-editor： 内存中的文件信息，使用ejs语法进行编译。最后调用commit方法输出最终文件

* 方案二：handlebars.js 渲染引擎

1. ncp 拷贝文件夹
2. recursive-readdir 递归文件夹及子文件夹下文件


### log及主题

* ora 加载文案
* chalk 主题颜色

### 队列执行

* grouped-queue


## TODOLIST
* 使用mem-fs mem-fs-editor文件操作
* cli 封装Generator common Api （参考yeoman）
* typescript 二期

## 参考
* https://zxljack.com/2019/04/mem-fs/
