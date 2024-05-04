// Author -
// Bhargav Kanodiya
import React, { useState } from 'react';
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
import Swal from "sweetalert2";
import axios from "axios";
import moment from 'moment';
import { useNavigate,useLocation } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = Typography;

const successNotification = () => {
  Swal.fire({
    title: "Expense Added",
    text: "Expense has been added successfully!",
    icon: "success"
  });
}
const errorNotification=(message)=>{
  Swal.fire({
    title:"Expense has not added!",
    text:message,
    icon:"error"
  })
}

const AddExpense = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fileUrl,setFileUrl]=useState('')
  const { state } = location;
  let date = state && state.date ? moment(state.date) : undefined;
  const onFinish = async(values) => {
    const headers = {
      'Authorization':`Bearer ${localStorage.getItem("token")}`,
      'Content-Type':'application/json'
    }
    try{
      values.expenseAttachment=fileUrl
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/expense/add`,values,{headers});
      if(res.data.isSuccess){
        successNotification();
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/notification/create`, {
          message: "Expense added successfully!",
          notificationType: "submitted"
        }, { headers });
      } else {
        throw new Error(res.data.message);
      }
    } catch(err){
      errorNotification(err.message);
    }
    navigate('/listexpenses');
  };
  const uploadFile=async(file)=>{
    const headers = {
      'Authorization':`Bearer ${localStorage.getItem("token")}`,
      'Content-Type':'multipart/form-data'
    }
    try{
    const formData = new FormData();
    if (!formData) {
      throw new Error("FormData initialization failed");
    }
    formData.append('file', file.file.originFileObj);
    formData.append('documentType', 'invoice');
    formData.append('documentName', file.file.originFileObj.name);
    formData.append('documentCategory', 'Expense');
    formData.append('documentDescription', 'An Attachment file for expense');
    let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/documents/addDocument`,formData,{headers});
    if(res.data.success){
      setFileUrl(res.data.url);
    } else {
      throw new Error(res.data.message)
    }
    } catch(err){
      errorNotification(err.message);
  }
  }
  const normFile = () => {
    return fileUrl ? [fileUrl] : [];
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        style={{ width: '90%', maxWidth: '600px', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}
        onFinish={onFinish} 
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title level={3} style={{ color: '#4c4b42' }}>Add Expense</Title>
        </div>
        <Form.Item label="Expense Name" name="expenseName" rules={[{ required: true, message: 'Please enter expense name' }]}>
          <Input/>
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
        <Form.Item label="Date" name="expenseDate" initialValue={date} rules={[{ required: true, message: 'Please select date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Description" name="expenseDescription">
          <TextArea rows={4} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Attach" name="expenseAttachment" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload  listType="picture-card" onChange={uploadFile} fileList={normFile()}>
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
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#4c4b42' }}>Submit</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddExpense;
