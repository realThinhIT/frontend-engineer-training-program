import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Col
} from 'antd';

class CategoryForm extends React.Component {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
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
    const { loading, form, item } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...this.formItemLayout} className="item-form" onSubmit={e => this.handleSubmit(e)}>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: item ? item.name : '',
            rules: [
              {
                type: 'string',
                required: true,
                message: 'Please input the name of item!',
              }
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: item ? item.description : '',
            rules: [],
          })(<Input.TextArea />)}
        </Form.Item>

        <Form.Item wrapperCol={{ xs: 24 }}>
          <Col span={12}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {item ? 'SAVE' : 'CREATE'}
            </Button>
          </Col>

          <Col span={1} />

          <Col span={11}>
            <Button
              block
              type="default"
              htmlType="reset"
              onClick={() => form.resetFields()}
            >
              {item ? 'Reset' : 'Clear'}
            </Button>
          </Col>
        </Form.Item>
      </Form>
    );
  }
}

CategoryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  item: PropTypes.object
};

export default Form.create({ name: 'categoryForm' })(CategoryForm);
