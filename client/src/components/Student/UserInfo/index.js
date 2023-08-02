import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { phoneNumberValidator } from 'utils/validator';
import ProvincePicker from '../ProvincePicker';

const UserInfo = props => {
  const dateFormat = 'DD/MM/yyyy';

  const numberValidator = (rule, value, callback) => {
    try {
      if (!Number(value) && value) {
        callback('Phone number must be number!!!');
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };

  const dobValidator = (rule, value, callback) => {
    try {
      if (value > Date.now()) {
        callback('Date of birth is not greater than current date');
      } else {
        callback();
      }
    } catch {
      callback();
    }
  };

  return (
    <div>
      <Row gutter={20} justify="center">
        <Col span={12}>
          <Form.Item label="Full name" name="fullName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="others">Others</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            label="DOB"
            name="dob"
            rules={[{ required: true }, { validator: dobValidator }]}>
            <DatePicker format={dateFormat} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            onKeyPress={event => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            label="Phone number"
            name="phoneNumber"
            rules={[{ required: true }, { validator: phoneNumberValidator }]}>
            <Input type="text" placeholder="Phone number" minLength={10} maxLength={10} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <ProvincePicker city={props.city} form={props.form} />
    </div>
  );
};

export default UserInfo;
