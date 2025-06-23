import  { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createEmployee, getEmployeeById, updateEmployee } from '../api/employeeApi';
import { useParams, useNavigate } from 'react-router-dom';

export const AddEditEmployee = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [isEditing, setIsEditing] = useState(!isEditMode); 
  const [initialValues, setInitialValues] = useState({}); 

  useEffect(() => {
    if (isEditMode) {
      getEmployeeById(id)
        .then((res) => {
          form.setFieldsValue(res.data);
          setInitialValues(res.data);
        })
        .catch(() => {
          message.error('Failed to load employee data');
        });
    }
  }, [id, form, isEditMode]);

  const handleValidate = (values) => {
   console.log('Form submitted:', values);

  if (isEditMode && !isEditing) {
    return;
  }
    if (isEditMode) {
      updateEmployee(id, values)
        .then(() => {
          message.success('Employee updated!');
          navigate('/');
        })
        .catch(() => message.error('Update failed'));
    } else {
      createEmployee(values)
        .then(() => {
          message.success('Employee created!');
          navigate('/');
        })
        .catch(() => message.error('Creation failed'));
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
    setIsEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Edit Employee' : 'Add Employee'}</h2>

      <Form form={form} layout="vertical" onFinish={handleValidate}   onKeyDown={(e) => {
    if (
      e.key === 'Enter' &&
      isEditMode &&
      !isEditing
    ) {
      e.preventDefault();
    }
  }}  >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'First name is required' }]}
        >
          <Input disabled={isEditMode && !isEditing} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Last name is required' }]}
        >
          <Input disabled={isEditMode && !isEditing} />
        </Form.Item>

        <Form.Item
          name="mail"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Valid email is required' }]}
        >
          <Input disabled={isEditMode && !isEditing} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Phone number is required' }]}
        >
          <Input disabled={isEditMode && !isEditing} />
        </Form.Item>

        <Form.Item name="cnssNumber" label="N° Cnss">
          <Input disabled={isEditMode && !isEditing} />
        </Form.Item>
        <div className='flex justify-end'>
       <Form.Item>
      {isEditMode && isEditing ? (
          <>
          <Button htmlType="button" onClick={handleCancel} className='mr-5'>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="mr-2">
            Sauvegarder
          </Button></>
      ) : !isEditMode ? (
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      ) : null}
    </Form.Item>
            </div>

      </Form>
       {isEditMode && !isEditing && <div className='flex justify-end mt-[-50px]'>
<Button type="default" onClick={() => setIsEditing(true)} className='flex justify-end'>
      Edit
    </Button>
       </div>
    
  }
    </div>
  );
};
