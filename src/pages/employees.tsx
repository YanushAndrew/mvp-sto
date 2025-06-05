import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Button,
  Avatar,
  Badge,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { StatusBadge } from '../components/status-badge';

interface Employee {
  id: string;
  name: string;
  position: string;
  avatar: string;
  specialization: string[];
  status: 'available' | 'busy' | 'off-duty';
  assignedCars: {
    id: string;
    make: string;
    model: string;
    year: number;
    status: 'pending' | 'in-progress' | 'completed' | 'waiting-parts' | 'delayed';
  }[];
}

export const Employees: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  
  const employees: Employee[] = [
    {
      id: 'emp-1',
      name: 'John Smith',
      position: 'Senior Mechanic',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
      specialization: ['Engine Repair', 'Electrical Systems', 'Diagnostics'],
      status: 'busy',
      assignedCars: [
        { id: 'CAR-1234', make: 'Toyota', model: 'Camry', year: 2020, status: 'in-progress' },
        { id: 'CAR-5678', make: 'Honda', model: 'Accord', year: 2019, status: 'waiting-parts' }
      ]
    },
    {
      id: 'emp-2',
      name: 'Sarah Williams',
      position: 'Master Technician',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
      specialization: ['Transmission', 'Brake Systems', 'Suspension'],
      status: 'available',
      assignedCars: [
        { id: 'CAR-3456', make: 'Ford', model: 'F-150', year: 2021, status: 'completed' }
      ]
    },
    {
      id: 'emp-3',
      name: 'Mike Johnson',
      position: 'Mechanic',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
      specialization: ['Oil Change', 'Tire Service', 'General Maintenance'],
      status: 'busy',
      assignedCars: [
        { id: 'CAR-2345', make: 'Honda', model: 'Civic', year: 2021, status: 'in-progress' },
        { id: 'CAR-7890', make: 'Nissan', model: 'Altima', year: 2018, status: 'pending' }
      ]
    },
    {
      id: 'emp-4',
      name: 'Emily Davis',
      position: 'Electric Vehicle Specialist',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
      specialization: ['Electric Vehicles', 'Hybrid Systems', 'Battery Repair'],
      status: 'off-duty',
      assignedCars: []
    },
    {
      id: 'emp-5',
      name: 'Robert Brown',
      position: 'Diagnostic Technician',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=5',
      specialization: ['Computer Diagnostics', 'Software Updates', 'Electrical Troubleshooting'],
      status: 'available',
      assignedCars: [
        { id: 'CAR-4567', make: 'BMW', model: '3 Series', year: 2022, status: 'pending' }
      ]
    }
  ];

  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'success';
      case 'busy': return 'warning';
      case 'off-duty': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return 'lucide:check-circle';
      case 'busy': return 'lucide:clock';
      case 'off-duty': return 'lucide:x-circle';
      default: return 'lucide:help-circle';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Пошук працівників..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" width={18} />}
          className="max-w-md"
        />
        <Link to="/employees/add-new">
          <Button color="primary" startContent={<Icon icon="lucide:user-plus" width={18} />}>
            Додати працівника
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Працівники</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {filteredEmployees.map((employee) => (
                  <div 
                    key={employee.id}
                    className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-default-100 transition-colors ${selectedEmployee?.id === employee.id ? 'bg-default-100' : ''}`}
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <Avatar src={employee.avatar} size="md" />
                    <div className="flex-1">
                      <h3 className="font-medium">{employee.name}</h3>
                      <p className="text-small text-default-500">{employee.position}</p>
                    </div>
                    <Badge 
                      color={getStatusColor(employee.status) as any} 
                      variant="flat"
                      content={<Icon icon={getStatusIcon(employee.status)} width={14} />}
                      placement="top-right"
                    >
                      <div className="w-3 h-3"></div>
                    </Badge>
                  </div>
                ))}

                {filteredEmployees.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8">
                    <Icon icon="lucide:user-x" className="text-default-400" width={32} />
                    <p className="mt-2 text-default-500 text-center">
                      Не знайдено працівників, що відповідають пошуку.
                    </p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedEmployee ? (
            <Card>
              <CardHeader className="flex justify-between">
                <div className="flex items-center gap-4">
                  <Avatar src={selectedEmployee.avatar} size="lg" />
                  <div>
                    <h2 className="text-xl font-semibold">{selectedEmployee.name}</h2>
                    <div className="flex items-center gap-2">
                      <p className="text-default-500">{selectedEmployee.position}</p>
                      <Badge color={getStatusColor(selectedEmployee.status) as any} variant="flat">
                        {selectedEmployee.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="flat" color="primary" startContent={<Icon icon="lucide:edit" width={18} />}>
                    Редагувати
                  </Button>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <Tabs aria-label="Деталі працівника">
                  <Tab key="assigned-cars" title="Призначені авто">
                    {selectedEmployee.assignedCars.length > 0 ? (
                      <Table removeWrapper aria-label="Призначені авто">
                        <TableHeader>
                          <TableColumn>ID авто</TableColumn>
                          <TableColumn>Марка й модель</TableColumn>
                          <TableColumn>Рік</TableColumn>
                          <TableColumn>Статус</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {selectedEmployee.assignedCars.map((car) => (
                            <TableRow key={car.id}>
                              <TableCell>{car.id}</TableCell>
                              <TableCell>{car.make} {car.model}</TableCell>
                              <TableCell>{car.year}</TableCell>
                              <TableCell><StatusBadge status={car.status} /></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Icon icon="lucide:car-off" className="text-default-400" width={32} />
                        <p className="mt-2 text-default-500">Немає призначених авто.</p>
                      </div>
                    )}
                  </Tab>
                  <Tab key="specializations" title="Спеціалізації">
                    <div className="py-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.specialization.map((spec, index) => (
                          <Badge key={index} variant="flat" className="py-1 px-2">{spec}</Badge>
                        ))}
                      </div>
                    </div>
                  </Tab>
                  <Tab key="schedule" title="Розклад">
                    <div className="py-4 flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:calendar" width={18} />
                          <span>Понеділок – П’ятниця</span>
                        </div>
                        <span>9:00 – 17:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:calendar" width={18} />
                          <span>Субота</span>
                        </div>
                        <span>10:00 – 15:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:calendar" width={18} />
                          <span>Неділя</span>
                        </div>
                        <span>Вихідний</span>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-default-200 rounded-large">
              <Icon icon="lucide:user" className="text-default-300" width={48} />
              <p className="mt-4 text-default-500">Виберіть працівника, щоб переглянути деталі</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
