import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-blue-50">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to the Employee CRUD App By Hahn Software</h1>
        <p className="text-gray-700 mb-6">You can view, add, or update employees from the menu above.</p>
        <Link to="/employees">
          <Button type="primary" size="large">
            View Employee List
          </Button>
        </Link>
      </div>
    </div>
  );
};

