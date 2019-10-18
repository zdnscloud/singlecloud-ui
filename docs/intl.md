# 页面语言管理

## 基础框架 `react-intl`

Zcloud UI 使用了 `React-Intl` 来管理页面的语言显示

关于[React-intl](https://github.com/formatjs/react-intl/blob/master/docs/README.md)


## 使用规则

#### 命名规则简述：

* 左侧菜单：app.containers.App.leftMenu***

* 头部菜单栏:  
	* 内容：app.containers.App.menubar ***  
 	* 按钮: app.containers.App.menubarButton ***

* 面包屑: app.containers.***page.pageTitle

* 内容标题: app.containers.***page.secondaryTitle *** 
	
* 表格： 
	* 表头：app.containers.***page.tableTitle ***
	* 表体：app.containers.***page.tableContent ***
	* 表尾：app.containers.***page.tableFooter ***

* 表单： 
	* 内容: app.containers.***page.form *** 
	* 按钮：app.containers.***page.formButton ***
	* 过滤搜索：app.containers.***page.search *** 
	* 搜索按钮：app.containers.***page.searchButton ***

* 弹窗：  
	* 标题：app.containers.***page.dialogTitle
	* 内容：app.containers.***page.dialog *** 
	* 按钮：app.containers.***page.dialogButton ***

* 列表：   
	* 标题：app.containers.***page.listTitle ***  
	* 内容：app.containers.***page.list *** 
	* 按钮：app.containers.***page.listButton ***

* 标签页： 
	* 标题：app.containers.***page.tabTitle ***  
	* 内容：app.containers.***page.tab *** 
	* 按钮：app.containers.***page.tabButton ***
