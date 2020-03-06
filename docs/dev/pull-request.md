# 合并分支流程

### 流程举例

1. 需要开发一个功能或修复一个bug时，创建一个issue，label标记为`feature`或`bug`
2. 这时，对应开发接到任务，创建分支，进行开发
3. 开发完成后，发起pull request，指定对应的issue，指定reviewer来进行review，添加label: `need-review`
```
hub pull-request \
    -b <需要合并到的分支，通常是master> \
    -h <开发功能的分支，默认是当前分支> \
    -i <issue 序号，可以通过hub issue查看到> \
    -r <reviewers, 逗号分割，不能有空格> \
    -l <labels, 逗号分隔>
```
4. 运行对应的自动化检查，自动CI检查通过后@reviewer进行review，CI检查失败则返回开发修复
5. reviewer开始review，assign给自己，在review之后，添加label：`reviewed/approved`，@开发人员，
开发收到后，assign给自己，构建好对应镜像，@测试
若review意见需要修改，则添加label：`reviewed/need-optimize`，@开发人员，再进入步骤2
6. 测试看到pull request后，assign给自己，进行测试
7. 测试完成后，
成功添加label：`tested/passed`，@开发；
失败添加label：`tested/failed`，写失败说明，@开发。
8. 开发看到test/passed，沟通可以合并后，通过pull request合并，并删除对应分支

* 补充：
    * assign给自己，表示自己在处理这个任务，需要别人处理的时候@对应人员
    * 如果发现冲突，则需要将目标分支，合并过来，解决冲突后，提交推送到远端
    * 步骤4后，如果base分支（通常是master）发生变化，如果出现合并冲突，这个时候需要将master合并到分支，并解决冲突
    * Pull request合并可以使用squash and merge方式，会将分支修改所有提交合并为一个commit，使用pull request信息来代替commit信息，方便后续生成release node
    * hub 操作
    ```
    # 快速查看pull request列表
    hub pr list
    # checkout pull request分支
    hub pr checkout <pr number>
    # 快速查看issue
    hub issue
    ```
