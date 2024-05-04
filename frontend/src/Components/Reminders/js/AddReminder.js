import React, { useState } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = Typography;
const successNotification = () => {
    Swal.fire({
      title: "Reminder Added",
      text: "reminder has been added successfully!",
      icon: "success"
    });
  }
  const errorNotification=(message)=>{
    Swal.fire({
      title:"Reminder has not added!",
      text:message,
      icon:"error"
    })
  }
const AddReminder = () => {
    const location = useLocation();
    const navigate=useNavigate()
    const [occurrenceValue, setOccurrenceValue] = useState(null);
    const { state } = location;
    let date = state && state.date ? moment(state.date) : undefined;
    const handleOccurrenceChange = (value) => {
        setOccurrenceValue(value);
    };
    const onFinish = async (values) => {
        const headers = {
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            'Content-Type':'application/json'
          }
          try{
            if(values.occurrence=="reoccuring"){
                values.isReoccuring=true;
            } else {
                values.isReoccuring=false;
            }
            console.log(values)
            let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reminder/add`,values,{headers});
            if(res.data.isSuccess){
              successNotification();
              await axios.post(`${process.env.REACT_APP_BACKEND_URL}/notification/create`, {
                message: "Reminder added successfully!",
                notificationType: "submitted"
              }, { headers });
            } else {
              throw new Error(res.data.message);
            }
          } catch(err){
            errorNotification(err.message);
          }
          navigate('/calendar');
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
                    <Title level={3} style={{ color: '#4c4b42' }}>Add Reminder</Title>
                </div>
                <Form.Item label="Reminder Name" name="reminderName" rules={[{ required: true, message: 'Please enter expense name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Expense Type" name="expenseType" rules={[{ required: true, message: 'Please select expense type' }]}>
                    <Radio.Group>
                        <Radio value="paid"> Paid </Radio>
                        <Radio value="received"> Received </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Occurrence" name="occurrence" rules={[{ required: true, message: 'Please select occurrence' }]}>
                    <Radio.Group onChange={(e) => handleOccurrenceChange(e.target.value)}>
                        <Radio value="onetime"> One time </Radio>
                        <Radio value="reoccuring"> Reoccuring</Radio>
                    </Radio.Group>
                </Form.Item>
                {occurrenceValue === 'reoccuring' &&
                    <Form.Item label="Occurrence Duration" name="duration" rules={[{ required: true, message: 'Please select occurrence duration' }]}>
                        <Radio.Group>
                            <Radio value="monthly"> Monthly </Radio>
                            <Radio value="yearly"> Yearly</Radio>
                        </Radio.Group>
                    </Form.Item>
                }
                <Form.Item label="Date" name="date" initialValue={date} rules={[{ required: true, message: 'Please select date' }]}>
                    <DatePicker style={{ width: '100%' }} />
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

export default AddReminder;