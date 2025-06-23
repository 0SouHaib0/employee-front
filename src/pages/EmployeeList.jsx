import { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Modal, Input,message } from 'antd';
import { getAllEmployees, deleteEmployee,searchEmployees  } from '../api/employeeApi';
import { useNavigate } from 'react-router-dom';

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const navigate = useNavigate();
const [searchQuery, setSearchQuery] = useState('');
  const fetchEmployees = async () => {
    try {
      const res = await getAllEmployees();
      setEmployees(res.data);
    } catch {
      message.error('Failed to fetch all employees');
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
      message.error('Search failed');
    }
  };

  const handleConfirmDelete = async () => {
    const correctPin = '123456'; 
    if (pinInput === correctPin) {
      try {
        await deleteEmployee(selectedEmployeeId);
        message.success('Employee deleted');
        setIsModalVisible(false);
        setPinInput('');
        fetchEmployees();
      } catch {
        message.error('Failed to delete employee');
      }
    } else {
      message.error('Incorrect PIN');
    }
  };

  return (
    <>
     <div style={{ marginBottom: 20 }}>
        <Input.Search
          placeholder="Search by name, email, or phone"
          enterButton
          allowClear
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
      </div>

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

      <Modal
        title="Enter 6-digit PIN to confirm deletion"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setPinInput('');
        }}
        onOk={handleConfirmDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <Input
          maxLength={6}
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          placeholder="Enter 6-digit PIN"
        />
      </Modal>
    </>
  );
};
