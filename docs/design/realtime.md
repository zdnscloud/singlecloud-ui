# 实时通讯


### Web实时通讯简述

```
当前，web实时通讯方式有一下几种：commet(ajax longpull)，eventsource，websocket
commet和eventsource都是在原有的http协议上做的封装，受原有协议，软件的约束
websocket是为web实时通讯开发的新协议，支持全双工通讯，实时性更好
```


### 设计目的

最初，为了解决`singlecloud`中的异步时间推送和读取信息，准备使用websocket来解决。
检查后发现，还有一些问题，实时日志系统显示也需要websoket，实时交互如：命令行交互，
或者将来的在线实时编辑，消息发送，都需要websoket来承载。为了解决这些问题，我们使用
websocket来解决当前的通讯问题。


### 设计

#### 数据通道划分

每一个模块单独打开一个websoket连接，监听和发送自己的数据自己的数据。

##### URL 定义

定义方式和其它资源相同，URL中的group部分和REST接口有区分，如下

```
/apis/ws.zcloud.cn/v1/resources

Group: ws.zcloud.cn

Version: v1

resources为需要接入的资源URL
```

现在会在链接上打开一个websocket通道，在通道上传送数据


#### 通讯数据划分分类

- 单向服务器推送
  * 日志推送
  * 告警推送
  * singlecloud事件
  * 集群事件
    * 节点事件
    * namespace事件
- 双向通讯
  * Shell
  * 实时验证
  * 实时通讯


#### 前端实现

为了配置实时通讯，前端需要实现以下功能：

- 服务器事件监听
- 本地状态管理
- 视图状态同步


#### 后端实现

- 连接管理
- 事件监听/推送


#### 资源定义

- 铃铛功能

告警事件列表，可控制

- k8资源事件

当打开某个页面后，建立相关页面的数据变化通道
数据发生变化时，自动更新相关数据
应有类型：
  - list 触发刷新列表
  - create 新增项目到列表
  - update 更新单个资源内容
  - delete 删除单个资源

对应资源变化

- 日志

传输日志，每行一条，日志开头是ISO8601格式时间，空一格后是日志内容

- shell

传输shell模拟器输入输出，传输时做base64编码
