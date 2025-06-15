import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeCreatedModal from '../components/EmployeeCreatedModal';

const EmployeesAddNew: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    name: '',
    surname: '',
    role: '',
    email: '',
    phone: '',
  });
  const [crmPassword, setCrmPassword] = useState('');

  const generatePassword = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      surname: (form.elements.namedItem('surname') as HTMLInputElement).value,
      role: (form.elements.namedItem('role') as HTMLSelectElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
    };
    setEmployeeData(data);
    setCrmPassword(generatePassword());
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Optionally reset form or navigate away
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="bg-content1 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-default rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-content1 text-foreground"
            />
          </div>
          <div>
            <label htmlFor="surname" className="block text-sm font-medium text-foreground">Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="mt-1 block w-full px-3 py-2 border border-default rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-content1 text-foreground"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-foreground">Role</label>
          <select
            id="role"
            name="role"
            className="mt-1 block w-full px-3 py-2 border border-default rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-content1 text-foreground"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="mechanic">Mechanic</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-default rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-content1 text-foreground"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border border-default rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-content1 text-foreground"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Create
          </button>
        </div>
      </form>
      <EmployeeCreatedModal
        isOpen={showModal}
        onClose={closeModal}
        employeeData={employeeData}
        crmPassword={crmPassword}
      />
    </div>
  );
};

export default EmployeesAddNew;
