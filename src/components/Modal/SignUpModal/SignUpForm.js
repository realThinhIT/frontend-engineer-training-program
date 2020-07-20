import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

class SignUpForm extends React.Component {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  constructor(...args) {
    super(...args);

    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
  }

  /**
   * Check if 2 fields password and re-password matches.
   *
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  compareToFirstPassword(rule, value, callback) {
    const { form } = this.props;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords do not match!');
    } else {
      callback();
    }
  }

  /**
   * Validate form and if it passes, pass valid values to callback function from parent component.
   *
   * @param {*} e
   */
  handleSubmit(e) {
    const { onSubmit } = this.props;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...this.formItemLayout} className="sign-up-form" onSubmit={e => this.handleSubmit(e)}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                type: 'email',
                message: 'The input is not valid e-mail!',
              },
              {
                max: 255,
                message: 'Your email is too long.'
              }
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please input your desired username!',
              },
              {
                min: 5,
                max: 30,
                message: 'Username must be between 5 - 30 characters.',
              },
              {
                pattern: '^[A-Za-z0-9]+$',
                message: 'Username must not contain any special characters.'
              }
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please input your desired password!',
              },
              {
                whitespace: true,
                message: 'Password must not have any whitespaces.'
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Password has to have the length of more than 8 characters, at least one letter and one number.'
              }
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item label="Confirm password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              }
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please input your name!',
              },
              {
                min: 1,
                max: 40,
                message: 'Your name must be between 1 - 40 characters.',
              }
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item wrapperCol={{ xs: 24 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
          >
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Form.create({ name: 'signUp' })(SignUpForm);
