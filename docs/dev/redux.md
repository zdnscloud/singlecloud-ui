# Redux开发

我们的项目使用`redux`来做状态管理，`redux`是一个全局状态机，统一管理页面所有状态

我们使用 `Ducks: Redux Reducer Bundles` 的设计建议来定义一个redux模块，我们认为一个模块为一个 `duck`

所有的 `duck` 保存在在项目目录 `app/ducks` 下

## 设计规则

### **文件定义**

- **必须** 使用 `export default` 在`index.js`中导出 `reducer`
- **必须** 使用 `export` 在`actions.js`中导出 `actions`
- **必须** 使用 `export` 在`constants.js`中导出 `action types`
- **必须** 使用 `export` 在`selectors.js`中导出 `selector makers`
- **必须** 使用 `export default` 在`epic.js`中导出 `epic`, 多个 `epic` 通过 `combineEpic` 合并为一个


### **action**

`action` 包含
- `type`, type: `<string>`, `action type` 在 `constants.js` 中定义，名称必须为大写
- `payload`, type: `<any>`, `action` 所包含的数据
- `meta`, type: `<any>`, `action` 关联数据，`context`, 如果是需要 `epic` 异步处理，则需要包含 `resolve`, `reject`
- `error`, type: `<boolean>`, 为`true`时表明这个`action`是一个`error`, `payload`装在着一个·`Error`对象


### **epic**

每个`epic.js`中可以包含多个`epic`，每个`epic`定义一个异步请求操作

**`ajax`**

我们定义一个 `ajax` 异步请求包含三个`action`，一个名为`loadClusters`的`action`会有三个`action`:

- loadClusters 发起请求
```js
export const loadClusters = (url, meta = {}) => ({
   type: c.LOAD_CLUSTERS,
   payload: url,
   meta,
 });
```
- loadClustersSuccess 请求成功
```js
 export const loadClustersSuccess = (resp, meta = {}) => ({
   type: c.LOAD_CLUSTERS_SUCCESS,
   payload: resp,
   meta,
 });
```
- loadClustersFailure 请求失败
```js
 export const loadClustersFailure = (error, meta = {}) => ({
   type: c.LOAD_CLUSTERS_FAILURE,
   payload: error,
   meta,
   error: true,
 });
```
对应一个 **`epic`**

```js
export const loadClustersEpic = (action$, state$, { ajax }) =>
   action$.pipe(
     ofType(c.LOAD_CLUSTERS),
     mergeMap(({ payload, meta }) =>
       ajax(payload).pipe(
         map((resp) => {
           meta.resolve && meta.resolve(resp);
           return a.loadClustersSuccess(resp, meta);
         }),
         catchError((error) => {
           meta.reject && meta.reject(error);
           return of(a.loadClustersFailure(error, meta));
         })
       )
     )
   );
```

