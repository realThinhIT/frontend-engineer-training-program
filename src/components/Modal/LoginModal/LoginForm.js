import React from 'react';
import PropTypes from 'prop-types';
import { 
  Form, 
  Input, 
  Button 
} from 'antd';

class LoginForm extends React.Component {
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
      <Form {...this.formItemLayout} className="log-in-form" onSubmit={e => this.handleSubmit(e)}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please input your username!',
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
                message: 'Please input your password!',
              }
            ],
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item wrapperCol={{ xs: 24 }}>
          <Button 
            block
            type="primary" 
            htmlType="submit"
            size="large"
            loading={loading}
          >
            LOG IN
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Form.create({ name: 'logIn' })(LoginForm);
