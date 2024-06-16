# ProFormFields

```jsx
import { ProForm } from '@ant-design/pro-components';
import { ProFormFields } from 'mido-proFormFields';

export default () => (
  <ProForm
    onFinish={async (values) => {
      console.log(values);
    }}
  >
    <ProFormFields
      formFields={[
        {
          type: 'ProFormText',
          props: {
            name: 'name',
            label: '名字',
            placeholder: '请输入名字',
            rules: [{ required: true, message: '请输入名字' }],
          },
        },
        {
          type: 'ProFormText',
          props: {
            name: 'age',
            label: '年龄',
            placeholder: '请输入年龄',
            rules: [{ required: true, message: '请输入年龄' }],
          },
        },
      ]}
    />
  </ProForm>
);
```
