# react-final-form

## 从Redux Form 迁移

[官网修改意见](https://final-form.org/docs/react-final-form/migration/redux-form)

结合项目，需要需改的模块示例： 

### (一) 在CreatePage.js中

(1) 表单引入：

Redux Form： 

```
import CreateClusterForm, { formName } from './CreateForm';

...

	<CreateClusterForm
       onSubmit={doSubmit}
    />


```

react-final-form:

* 无需 formName
* 表单传入值新增formRef，主要用于按钮表单外提交时的绑定

```
import React, { useRef } from 'react';
import CreateClusterForm  from './CreateForm';

...

export const CreateClusterPage = ({ createCluster, url }) => {
 const formRef = useRef(null);
 
 ...
 
	<CreateClusterForm
       onSubmit={doSubmit}
       formRef={formRef}
    />
	
...

### 在CreateForm.js 中:

export const CreateForm = ({  formRef }) => (
  <Form >
    {({ handleSubmit }) => (
      <form
        ref={formRef}
      >

```

(2)表单提交：

Redux Form：

```
import { SubmissionError, submit } from 'redux-form';

  ...
  
  async function doSubmit(formValues) {
    try {
      const data = formValues.toJS();
      await new Promise((resolve, reject) => {
        createCluster(data, {
          resolve,
          reject,
          url,
        });
      });
    } catch (error) {
      throw new SubmissionError({ _error: error });
    }
  }
  
  ...
  
    <Button
      onClick={submitForm}
    >
        FormattedMessage {...messages.formCreate} />
    </Button>
  
  ...
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        ...actions,
        submitForm: () => submit(formName),
      },
      dispatch
    );
  
  
```

react-final-form:

* formValues 不需要转化
* 报错信息处理使用 `FORM_ERROR`
* 外部提交按钮操作不同


```
import { FORM_ERROR } from 'final-form';
...
  async function doSubmit(formValues) {
    try {
      await new Promise((resolve, reject) => {
        createCluster(formValues, {
          resolve,
          reject,
          url,
        });
      });
    } catch (error) {
      return { [FORM_ERROR]: error };
    }
  }
  
  ...
  
   <Button
     onClick={() => {
       formRef.current.dispatchEvent(
          new Event('submit', { cancelable: true })
        );
     }}
     type="submit"
   >
     <FormattedMessage {...messages.formCreate} />
   </Button>
  
  
  ...
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        ...actions,
      },
      dispatch
    );
```

###  (二）在CreateForm.js中

（1）表单 

Redux Form：

```
export const Form = ({
  handleSubmit,
  error,
  formValues,
}) => {
  const classes = useStyles();
  return (
    <form 
	  className={getByKey(classes, 'form')} 
	  onSubmit={handleSubmit}
	>
```

react-final-form:

* 在 `<form>` 外包裹 `<Form>`
* 提交表单的绑定方式不同 

```
import { Form, Field } from 'react-final-form';

...

export const CreateForm = ({ onSubmit, formRef }) => (
  <Form
    onSubmit={(values) => onSubmit(values)}
  >
    {({ handleSubmit, values, submitError }) => (
      <form
        className={getByKey(classes, 'form')}
        onSubmit={handleSubmit}
        ref={formRef}
      >
```

（2）错误验证

Redux Form：

```
const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

...

const ClusterForm = reduxForm({
  form: formName,
  validate,
})(Form);

```

react-final-form:

* 验证信息直接绑定到 `<Form>` 上

```
const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'name',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

...

  <Form
    validate={validate}  
  >
  
```

(3) 错误信息显示：
 
Redux Form：

```
export const Form = ({
  error,
}) => {
	
...

  {error ? (
      <GridItem xs={12} sm={12} md={12}>
            <Danger>{getByKey(error, ['response', 'message'])}</Danger>
      </GridItem>
  ) : null}

```

react-final-form:

* 错误信息从`<Form>`中获取： 

```
 <Form>
    {({ submitError }) => (
	  <form>
	  
	...

	 {submitError ? (
		<GridItem xs={12} sm={12} md={12}>
			<Danger>{getByKey(submitError, ['response', 'message'])}</Danger>
		</GridItem>
	 ) : null}
	 
```


(4) 初始值：  

Redux Form：

```
<CreateClusterForm
   initialValues={fromJS({ name: "cluster.local" })}
/>
```

react-final-form:

* 初始值直接绑定到 `<Form>` 上
* 不需要 `fromJS（)`转化

```
 <Form
    initialValues={{ name: "cluster.local" }}  
  >
```

（5）数组

Redux Form：

```
import { FieldArray } from 'redux-form/immutable';

...

export const Form = ({
  formValues,
}) => {
	
	...
	
	<FieldArray
	   name="containers"
	   formValues={formValues}
	/>


```

react-final-form:

* 替换 FieldArray 的引入源
* Form 新增 arrayMutators 属性
* 传入的 formValues 的来源不同

```
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

...

  <Form
    mutators={{
      ...arrayMutators,
    }}
  >
   {({ values }) => (
	 <form>
  ...
  
  <FieldArray
     name="containers"
     formValues={values}
  />

```

（6）表单清空:

Redux Form：

```
const Form = ({
  reset,
}) => (

...

	<Button
		onClick={reset}
	 >
		 <FormattedMessage {...messages.formRest} />
	</button>

```

react-final-form:

* 提供reset功能的是整个FormApi对象，而不是提供reset()功能

```
<Form>
    {({ form }) => (
	  <form>
...

	<Button
		onClick={form.reset}
	 >
		 <FormattedMessage {...messages.formRest} />
	</button>
```



### (三) 在components中：

需要修改的文件夹涉及：

* CustomInput 
* CustomSwitch
* CostomTextarea
* Filed

具体修改的部分：

* 替换 Field 的引入源

```
-  import { Field } from 'redux-form/immutable'; 
+  import { Field } from 'react-final-form';
  
```

* chexboxesFiled.js

```
line 27   -   let val = input.value || List([])
line 27   +   let val = input.value || [];
```


### （四）在生成模板中：

上述的改动需要同步更新


### 存在问题：

* 表单提交之后，表单会被清空，即使后台有报错信息。

* 自动刷新页面中对表单初始值存在的影响。

* react-final-form的生成的数据格式与之前不同，在处理数据的时候需要做相应的转化，改后需要进行充分的自测。


### 需要讨论的
* 控制表单刷新的条件及实现方案