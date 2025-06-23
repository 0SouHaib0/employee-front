import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      theme="light"
      style={{ justifyContent: 'center' }}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/employees">
        <Link to="/employees">Employees</Link>
      </Menu.Item>
      <Menu.Item key="/employees/add">
        <Link to="/employees/add">Add Employee</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;