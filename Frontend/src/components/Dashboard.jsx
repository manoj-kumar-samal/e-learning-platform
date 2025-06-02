import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Your Dashboard</h3>
        {user.role === 'student' && (
          <div>
            <p className="text-gray-600">Your enrolled courses will appear here.</p>
          </div>
        )}
        {user.role === 'instructor' && (
          <div>
            <p className="text-gray-600">Your courses and students will appear here.</p>
          </div>
        )}
        {user.role === 'admin' && (
          <div>
            <p className="text-gray-600">Admin controls will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;