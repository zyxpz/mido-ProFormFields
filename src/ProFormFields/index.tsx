import * as ProFormFields from '@ant-design/pro-components';
import { type ProFormInstance } from '@ant-design/pro-components';
import { Divider } from 'antd';
import get from 'lodash.get';
import React, {
  ComponentProps,
  ComponentType,
  Fragment,
  Key,
  ReactNode,
  useMemo,
} from 'react';

type ProFormFieldsType =
  | 'ProFormText'
  | 'ProFormTextArea'
  | 'ProFormSelect'
  | 'ProFormDatePicker'
  | 'ProFormDateTimePicker'
  | 'ProFormTimePicker'
  | 'ProFormCheckbox'
  | 'ProFormRadio'
  | 'ProFormSwitch'
  | 'ProFormSlider'
  | 'ProFormRate'
  | 'ProFormDigit'
  | 'ProFormGroup'
  | 'ProFormDateRangePicker'
  | 'ProFormDateTimeRangePicker'
  | 'ProFormList'
  | 'ProFormUploadDragger'
  | 'ProFormUploadButton'
  | 'ProFormDependency'
  | 'ProFormCaptcha';

type FormType = 'ProFormRadioGroup' | ProFormFieldsType;

export type ProFormFieldsProps = ComponentProps<
  (typeof ProFormFields)[ProFormFieldsType]
>;

export type IDynamicOptions = ComponentProps<
  typeof ProFormFields.ProFormSelect
>['options'];

export interface IProFormFieLd<T = undefined, CP = undefined> {
  type: FormType | T;
  isDivider?: boolean;
  props: CP extends undefined
    ? ProFormFieldsProps & { allValueEnum?: IProFormFieLd<T, CP> }
    : ProFormFieldsProps & { allValueEnum?: IProFormFieLd<T, CP> } & CP;
  children?: ReactNode;
  items?: IProFormFieLd<T, CP>[];
}

export interface IProForm<T = undefined, CP = undefined> {
  form?: ProFormInstance;
  componentExtension?: {
    [key: string]: ComponentType<any>;
  };
  formFields: IProFormFieLd<T, CP>[];
  dynamicOptions?: {
    [key: string]: IDynamicOptions;
  };
  disabled?: boolean | string[];
}

export type IComponents = typeof ProFormFields;

const proFormComponents: IComponents = Object.keys(ProFormFields).reduce(
  (acc: any, cur) => {
    const key = cur.toUpperCase();
    acc[key] = ProFormFields[cur as ProFormFieldsType];
    return acc;
  },
  {} as IComponents,
);

const ProFormField: <T, CP>(props: IProForm<T, CP>) => any = ({
  form,
  componentExtension,
  formFields,
  dynamicOptions,
  disabled,
}) => {
  const components = useMemo(() => {
    return {
      ...proFormComponents,
      ...componentExtension,
    };
  }, [componentExtension]);

  const renderProForm = (arr: IProFormFieLd[]) => {
    return arr.map((item, key: Key) => {
      const type = item?.type?.toUpperCase() as unknown as ProFormFieldsType;
      const Component: any = components[type];
      let itemProps: any = item.props || {};
      const { name } = itemProps;
      if (dynamicOptions) {
        Object.keys(dynamicOptions).forEach((optionKey) => {
          if (name === optionKey) {
            itemProps.option = dynamicOptions[optionKey];
          }
        });
      }
      if (disabled) {
        if (Array.isArray(disabled)) {
          itemProps.disabled = disabled.includes(name);
        } else {
          itemProps.disabled = disabled;
        }
      }
      if ((type as any) === 'PROFORMDEPENDENCY') {
        return (
          <Fragment key={key}>
            <Component {...itemProps} from={form}>
              {(dependency: any) => {
                const { valueEnum, allValueEnum } = itemProps;
                if (!get(dependency, name)) {
                  return null;
                }
                if (valueEnum) {
                  if (valueEnum[get(dependency, name)]) {
                    const dependencyProps = valueEnum[get(dependency, name)];
                    return renderProForm(dependencyProps as IProFormFieLd[]);
                  }
                  return null;
                }
                if (allValueEnum) {
                  const newAllValueEnum = allValueEnum.map((item: any) => {
                    return {
                      ...item,
                      props: {
                        ...item.props,
                        params: {
                          ...item.props.params,
                          ...dependency,
                        },
                      },
                    };
                  });
                  return renderProForm(newAllValueEnum as IProFormFieLd[]);
                }
                return null;
              }}
            </Component>
            {item.isDivider ? <Divider /> : null}
          </Fragment>
        );
      }
      return Component ? (
        <Fragment>
          <Component {...itemProps} form={form}>
            {item.items ? renderProForm(item.items) : item.children}
          </Component>
        </Fragment>
      ) : null;
    });
  };
  return formFields?.length
    ? renderProForm(formFields as IProFormFieLd[])
    : null;
};

export default ProFormField;
