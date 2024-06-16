import { render } from '@testing-library/react';
import { Form } from 'antd';
import ProFormField from './index';

describe('ProFormField', () => {
  it('renders without error', () => {
    render(
      <Form>
        <ProFormField />
      </Form>,
    );
    // Add your assertions here
  });

  it('renders form fields correctly', () => {
    const formFields = [
      {
        type: 'ProFormText',
        props: {
          name: 'name',
          label: 'Name',
        },
      },
      {
        type: 'ProFormSelect',
        props: {
          name: 'gender',
          label: 'Gender',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
        },
      },
    ];

    render(
      <Form>
        <ProFormField formFields={formFields} />
      </Form>,
    );
    // Add your assertions here
  });

  // Add more test cases as needed
});
