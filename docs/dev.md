# 开发管理

## Javascript 项目

开发使用 `lerna` 管理多个项目来协同开发，项目在目录 `/packages` 下

- `ui` UI项目
- `com` 自定UI组件
- `utils` 自定utils
- `helm-icons` 项目的helm图标


## 启动开发

在 `packages/ui` 目录下 执行

```shell
npm start
```


## 开发文档

开发文档位于分支 `docs` 下

编辑修改完成后发布到 `github pages` ， 执行：

``` shell
make deploy
```
