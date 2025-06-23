import { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal, Input } from 'antd';
import { getAllEmployees, deleteEmployee,searchEmployees  } from '../api/employeeApi';
import { useNavigate } from 'react-router-dom';
import { useGlobalMessage } from '../components/MessageProvider';
import { generateOtp } from '../helpers/services.helper';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const messageApi = useGlobalMessage();
  const [otpCode, setOtpCode] = useState(generateOtp(6));

  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch {
      messageApi.error('Failed to fetch all employees');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id);
    setIsModalVisible(true);
  };

   const handleSearch = async (value) => {
    setSearchQuery(value);
    if (value.trim() === '') {
      fetchEmployees();
      return;
    }

    try {
      const res = await searchEmployees(value);
      setEmployees(res.data);
    } catch {
      messageApi.error('Search failed');
    }
  };

  const handleConfirmDelete = async () => { 
    if (pinInput === otpCode) {
      try {
        await deleteEmployee(selectedEmployeeId);
        messageApi.success('Employee deleted');
        setIsModalVisible(false);
        setPinInput('');
        fetchEmployees();
      } catch {
        messageApi.error('Failed to delete employee');
      }
    } else {
      messageApi.error('Incorrect PIN');
    }
  };

  return (
    <>
     <div className='m-10 flex justify-center'>
        <Input.Search
          placeholder="Search by name, email, or phone"
          enterButton
          allowClear
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
      <div className='px-5'>
      <Row gutter={[16, 16]}>
        {employees.map((employee) => (
          <Col xs={24} sm={12} md={8} lg={6} key={employee.id}>
            <Card
              title={`${employee.firstName} ${employee.lastName}`}
              actions={[
                <Button type="link" onClick={() => handleEdit(employee.id)}>
                  Edit
                </Button>,
                <Button type="link" danger onClick={() => handleDeleteClick(employee.id)}>
                  Delete
                </Button>,
              ]}
            >
              <p><strong>Email:</strong> {employee.mail}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>CNSS:</strong> {employee.cnssNumber}</p>
            </Card>
          </Col>
        ))}
      </Row>
</div>
      <Modal
        title={<span>Enter this OTP <span className='text-red-600'>{otpCode}</span> to delete this employee</span>}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setPinInput('');
          setOtpCode(generateOtp(6))
        }}
        onOk={handleConfirmDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <Input
          maxLength={6}
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          placeholder="Enter PIN"
        />
      </Modal>
       
    </>
  );
};
