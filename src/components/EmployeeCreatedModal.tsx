import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface EmployeeCreatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeData: {
    name: string;
    surname: string;
    role: string;
    email: string;
    phone: string;
  };
  crmPassword: string;
}

const EmployeeCreatedModal: React.FC<EmployeeCreatedModalProps> = ({ isOpen, onClose, employeeData, crmPassword }) => {
  if (!isOpen) return null;

  const crmLink = "https://crm.example.com/login"; // Placeholder CRM link
  const crmLoginEmail = employeeData.email; // Assuming email is used for CRM login

  const allEmployeeData = `
Name: ${employeeData.name}
Surname: ${employeeData.surname}
Role: ${employeeData.role}
Email: ${employeeData.email}
Phone Number: ${employeeData.phone}
CRM Password: ${crmPassword}
  `.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-content1 p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Employee Created Successfully!</h2>
        <p className="text-foreground mb-4">Here are the details for the new employee:</p>

        <div className="mb-4">
          <p className="text-sm text-foreground"><strong>Name:</strong> {employeeData.name}</p>
          <p className="text-sm text-foreground"><strong>Surname:</strong> {employeeData.surname}</p>
          <p className="text-sm text-foreground"><strong>Role:</strong> {employeeData.role}</p>
          <p className="text-sm text-foreground"><strong>Email:</strong> {employeeData.email}</p>
          <p className="text-sm text-foreground"><strong>Phone Number:</strong> {employeeData.phone}</p>
          <p className="text-sm text-foreground mt-2"><strong>CRM Account Password:</strong> {crmPassword}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <CopyToClipboard text={`${crmLink}\nEmail: ${crmLoginEmail}`} onCopy={() => alert('CRM link and email copied!')}>
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Copy CRM Link / Email
            </button>
          </CopyToClipboard>
          <CopyToClipboard text={allEmployeeData} onCopy={() => alert('All data copied!')}>
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary-500 hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500">
              Copy All Data
            </button>
          </CopyToClipboard>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-foreground hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCreatedModal;
