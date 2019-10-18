# 脚手架使用

## 使用原则

新增模块尽量使用`generator`生成，如果特殊模块需要说明

## 基本使用

```
npm run generate
```

## Generators

即项目模板生成器，可快速生成：
- `container`
- `duck`

### Generator使用细则

#### container

  配置项:
  
  - name: `type`
    类型，`class` / `function` component
  - name: `name`
    模块名称
  - name: `duck`
    模块使用`duck`名称，必须存在
  - name: `singular`
    `duck` 单数名称
  - name: `wantHeaders`
    是否需要 `helmet`， *当前无效*
  - name: `wantMessages`
    是否需要语言文件
  - name: `wantLoadable`
    是否异步加载
  - name: `wantTable`
    是否需要`table`
  - name: `wantCreatePage`
    是否需要`CreatePage`
  - name: `wantUpdatePage`
    是否需要`UpdatePage`
  - name: `wantShowItemPage`
    是否需要`ShowItemPage`

#### duck

  生成`Redux Reducer Bundles`

  配置项：
  
  - name: `name`
    配置 `duck` 名称
  - name: `wannaCreateAction`
    配置 是否支持 `create`
  - name: `wannaUpdateAction`
    配置 是否支持 `update`
  - name: `wannaReadOneAction`
    配置 是否支持 `readOne`
  - name: `wannaRemoveAction`
    配置 是否支持 `remove`
  - name: `wannaResourceActions`
    配置 是否支持 `resource action`
  - name: `hasParents`
    配置 是否有父级资源
  - name: `parents`
    配置 父级资源列表，依次输入，用逗号分隔
