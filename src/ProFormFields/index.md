# ProFormFields

```jsx
import { ProForm } from '@ant-design/pro-components';
import { ProFormFields } from 'mido-pro-form-fields';
import { useRef } from 'react';

export default () => {
  const form = useRef();
  return (
    <ProForm
      formRef={form}
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormFields
        form={form}
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
          {
            type: 'ProFormCaptcha',
            props: {
              name: 'code',
              label: '验证码',
              placeholder: '请输入验证码！',
              rules: [
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ],
              captchaProps: {
                size: 'large',
              },
              captchaTextRender: (timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              },
              async onGetCaptcha(mobile, ...args) {
                console.log(mobile, this.current.getFieldsValue());
                // await kehuqiantaihuiyuanrenzheng.sendSmsCode({
                //   mobile: mobile,
                //   scene: 1,
                // });
                // message.success(`获取验证码成功,请注意查看`);
              },
            },
          },
        ]}
      />
    </ProForm>
  );
};
```
