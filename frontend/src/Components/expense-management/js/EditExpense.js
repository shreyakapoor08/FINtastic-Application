// Author -
// Bhargav Kanodiya
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  Typography
} from 'antd';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import moment from 'moment';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';

const { TextArea } = Input;
const { Title } = Typography;

const successNotification = () => {
  Swal.fire({
    title: "Expense Updated",
    text: "Expense has been updated successfully!",
    icon: "success"
  });
}

const EditExpense = () => {
  const [expense, setExpense] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState('')
  const { expenseId } = useParams();
  const navigate = useNavigate();

  console.log(expense)
  const errorNotification = (message) => {
    Swal.fire({
      title: "Expense did not retireved!",
      text: message,
      icon: "error"
    })
  }
  useEffect(() => {
    const fetchExpense = async () => {
      const headers = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      }
      try {
        let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense/get/${expenseId}`, { headers });
        if (res.data.isSuccess) {
          res.data.expense.expenseDate = moment(res.data.expense.expenseDate);
          if (res.data.expense.expenseAttachment) {
            res.data.expense.expenseAttachment = [res.data.expense.expenseAttachment];
        } else{
            res.data.expense.expenseAttachment = [];
        }
          setExpense(res.data.expense)
          setLoading(false)
        } else {
          throw new Error(res.data.message);
        }
      } catch (err) {
        errorNotification(err.message);
      }
    }
    fetchExpense()
  }, [])
  const onFinish = async (values) => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    }
    try {
      values.expenseAttachment = fileUrl
      let res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/expense/update/${expenseId}`, values, { headers });
      if (res.data.isSuccess) {
        successNotification();
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/notification/create`, {
          message: "Expense updated successfully!",
          notificationType: "submitted"
        }, { headers });
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      errorNotification(err.message);
    }
    navigate('/listexpenses');

  };
  const uploadFile = async (file) => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'multipart/form-data'
    }
    try {
      const formData = new FormData();
      if (!formData) {
        throw new Error("FormData initialization failed");
      }
      formData.append('file', file.file.originFileObj);
      formData.append('documentType', 'invoice');
      formData.append('documentName', file.file.originFileObj.name);
      formData.append('documentCategory', 'Expense');
      formData.append('documentDescription', 'An Attachment file for expense');
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/documents/addDocument`, formData, { headers });
      if (res.data.success) {
        setFileUrl(res.data.url);
      } else {
        throw new Error(res.data.message)
      }
    } catch (err) {
      errorNotification(err.message);
    }
  }
  const normFile = () => {
    return fileUrl ? [fileUrl] : [];
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ width: '90%', maxWidth: '600px', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}
          onFinish={onFinish}
          initialValues={expense}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Title level={3} style={{ color: '#4c4b42' }}>Edit Expense</Title>
          </div>
          <Form.Item label="Expense Name" name="expenseName" rules={[{ required: true, message: 'Please enter expense name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Enter Amount" name="expenseAmount" rules={[{ required: true, message: 'Please enter expense amount' }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Expense Type" name="expenseType" rules={[{ required: true, message: 'Please select expense type' }]}>
            <Radio.Group>
              <Radio value="paid"> Paid </Radio>
              <Radio value="received"> Received </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Payment Medium" name="paymentMedium" rules={[{ required: true, message: 'Please select payment medium' }]}>
            <Select style={{ width: '100%' }}>
              <Select.Option value="credit">Credit Card</Select.Option>
              <Select.Option value="debit">Debit Card/Bank AC</Select.Option>
              <Select.Option value="cash">Cash</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="expenseDate" rules={[{ required: true, message: 'Please select date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Description" name="expenseDescription">
            <TextArea rows={4} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Attach" name="expenseAttachment" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload onChange={uploadFile} fileList={normFile()} listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Category" name="expenseCategory" rules={[{ required: true, message: 'Please select the category' }]}>
            <Select style={{ width: '100%' }}>
              <Select.Option value="entertainment">Entertainment</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="rent">Rent</Select.Option>
              <Select.Option value="car">Car</Select.Option>
              <Select.Option value="insurance">Insurance</Select.Option>
              <Select.Option value="grocery">Grocery</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="technology">Technology</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#4c4b42' }}>Update</Button>
          </div>
        </Form>
      )}
    </div>

  );
};

export default EditExpense;
