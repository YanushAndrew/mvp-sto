import React from 'react';
import { Card, CardBody, CardHeader, Divider, Input, Button, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { StatusBadge } from '../components/status-badge';
import { useHistory } from 'react-router-dom';
import { ServiceDetailsSidebar, ServiceLogDetail } from '../components/ServiceDetailsSidebar';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  owner: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  status: 'pending' | 'in-progress' | 'completed' | 'waiting-parts' | 'delayed';
  assignedTo: string;
  serviceType: string[];
  estimatedCompletion: string;
  image: string;
  serviceHistory: ServiceLogDetail[]; // Add serviceHistory to Car interface
}

export const Cars: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCar, setSelectedCar] = React.useState<Car | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedServiceLog, setSelectedServiceLog] = React.useState<ServiceLogDetail | null>(null);
  const history = useHistory();
  
  const handleAddCarClick = () => {
    history.push('/add-car');
  };

  const handleServiceLogClick = (log: ServiceLogDetail) => {
    setSelectedServiceLog(log);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedServiceLog(null);
  };

  const cars: Car[] = [
    {
      id: 'CAR-1234',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      licensePlate: 'ABC-1234',
      owner: {
        name: 'James Wilson',
        phone: '(555) 123-4567',
        email: 'james@example.com',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10'
      },
      status: 'in-progress',
      assignedTo: 'John Smith',
      serviceType: ['Oil Change', 'Brake Inspection', 'Tire Rotation'],
      estimatedCompletion: '2023-06-15',
      image: 'https://img.heroui.chat/image/car?w=800&h=400&u=1',
      serviceHistory: [
        {
          id: 'log-001',
          date: '2023-05-15',
          service: 'Заміна масла',
          mechanic: 'Олег Коваль',
          cost: '1500 грн',
          details: [
            {
              title: 'Аналіз',
              points: [
                {
                  date: '2023-05-15',
                  headline: 'Перевірка рівня масла',
                  description: 'Перевірено рівень моторного масла, виявлено низький рівень та забруднення.',
                  media: ['https://img.heroui.chat/image/car-service-1?w=400&h=300&u=1']
                }
              ]
            },
            {
              title: 'Ремонт',
              points: [
                {
                  date: '2023-05-15',
                  headline: 'Заміна моторного масла та фільтра',
                  description: 'Виконано повну заміну моторного масла та масляного фільтра. Використано масло Castrol Edge 5W-30.',
                  media: ['https://img.heroui.chat/image/car-service-2?w=400&h=300&u=1', 'https://img.heroui.chat/image/car-service-3?w=400&h=300&u=1']
                }
              ]
            },
            {
              title: 'Верифікація',
              points: [
                {
                  date: '2023-05-15',
                  headline: 'Фінальна перевірка',
                  description: 'Перевірено рівень масла після заміни, відсутність витоків. Двигун працює стабільно.',
                }
              ]
            }
          ]
        },
        {
          id: 'log-002',
          date: '2023-03-10',
          service: 'Діагностика ходової',
          mechanic: 'Іван Петров',
          cost: '800 грн',
          details: [
            {
              title: 'Аналіз',
              points: [
                {
                  date: '2023-03-10',
                  headline: 'Візуальний огляд',
                  description: 'Виявлено знос сайлентблоків передніх важелів.',
                }
              ]
            },
            {
              title: 'Ремонт',
              points: [
                {
                  date: '2023-03-10',
                  headline: 'Заміна сайлентблоків',
                  description: 'Замінено сайлентблоки передніх важелів на нові.',
                }
              ]
            }
          ]
        },
        {
          id: 'log-003',
          date: '2022-01-22',
          service: 'Заміна гальмівних колодок',
          mechanic: 'Марія Сидорова',
          cost: '1200 грн',
          details: [
            {
              title: 'Аналіз',
              points: [
                {
                  date: '2022-01-22',
                  headline: 'Перевірка гальмівної системи',
                  description: 'Виявлено критичний знос передніх гальмівних колодок.',
                }
              ]
            },
            {
              title: 'Ремонт',
              points: [
                {
                  date: '2022-01-22',
                  headline: 'Заміна передніх гальмівних колодок',
                  description: 'Встановлено нові гальмівні колодки Bosch.',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'CAR-2345',
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      licensePlate: 'DEF-5678',
      owner: {
        name: 'Emma Thompson',
        phone: '(555) 234-5678',
        email: 'emma@example.com',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=11'
      },
      status: 'waiting-parts',
      assignedTo: 'Mike Johnson',
      serviceType: ['Engine Repair', 'Electrical System'],
      estimatedCompletion: '2023-06-20',
      image: 'https://img.heroui.chat/image/car?w=800&h=400&u=2',
      serviceHistory: [
        {
          id: 'log-004',
          date: '2023-04-01',
          service: 'Ремонт двигуна',
          mechanic: 'Майк Джонсон',
          cost: '5000 грн',
          details: [
            {
              title: 'Аналіз',
              points: [
                {
                  date: '2023-04-01',
                  headline: 'Діагностика двигуна',
                  description: 'Виявлено несправність системи запалювання.',
                }
              ]
            },
            {
              title: 'Ремонт',
              points: [
                {
                  date: '2023-04-01',
                  headline: 'Заміна свічок запалювання',
                  description: 'Замінено всі свічки запалювання та перевірено котушки.',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'CAR-3456',
      make: 'Ford',
      model: 'F-150',
      year: 2019,
      licensePlate: 'GHI-9012',
      owner: {
        name: 'Michael Brown',
        phone: '(555) 345-6789',
        email: 'michael@example.com',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=12'
      },
      status: 'completed',
      assignedTo: 'Sarah Williams',
      serviceType: ['Transmission Service', 'Cooling System'],
      estimatedCompletion: '2023-06-10',
      image: 'https://img.heroui.chat/image/car?w=800&h=400&u=3',
      serviceHistory: [
        {
          id: 'log-005',
          date: '2023-02-15',
          service: 'Обслуговування трансмісії',
          mechanic: 'Сара Вільямс',
          cost: '3000 грн',
          details: [
            {
              title: 'Аналіз',
              points: [
                {
                  date: '2023-02-15',
                  headline: 'Перевірка трансмісії',
                  description: 'Виявлено незначні шуми при перемиканні передач.',
                }
              ]
            },
            {
              title: 'Ремонт',
              points: [
                {
                  date: '2023-02-15',
                  headline: 'Заміна трансмісійної рідини',
                  description: 'Виконано повну заміну трансмісійної рідини.',
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'CAR-4567',
      make: 'BMW',
      model: '3 Series',
      year: 2022,
      licensePlate: 'JKL-3456',
      owner: {
        name: 'Sophia Garcia',
        phone: '(555) 456-7890',
        email: 'sophia@example.com',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=13'
      },
      status: 'pending',
      assignedTo: 'Robert Brown',
      serviceType: ['Diagnostic', 'Software Update'],
      estimatedCompletion: '2023-06-18',
      image: 'https://img.heroui.chat/image/car?w=800&h=400&u=4',
      serviceHistory: []
    },
    {
      id: 'CAR-5678',
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      licensePlate: 'MNO-7890',
      owner: {
        name: 'Daniel Martinez',
        phone: '(555) 567-8901',
        email: 'daniel@example.com',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=14'
      },
      status: 'delayed',
      assignedTo: 'Emily Davis',
      serviceType: ['Battery Service', 'Charging System'],
      estimatedCompletion: '2023-06-25',
      image: 'https://img.heroui.chat/image/car?w=800&h=400&u=5',
      serviceHistory: []
    }
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.licensePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.owner.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && car.status === activeFilter;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Input
          placeholder="Пошук авто..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" width={18} />}
          className="max-w-md"
        />
        <Button 
          color="primary" 
          startContent={<Icon icon="lucide:plus" width={18} />}
          onPress={handleAddCarClick}
        >
          Додати запис
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeFilter === 'all' ? 'flat' : 'light'} 
            color={activeFilter === 'all' ? 'primary' : 'default'}
            onPress={() => setActiveFilter('all')}
          >
            Усі
          </Button>
          <Button 
            variant={activeFilter === 'pending' ? 'flat' : 'light'} 
            color={activeFilter === 'pending' ? 'warning' : 'default'}
            onPress={() => setActiveFilter('pending')}
            startContent={<Icon icon="lucide:clock" width={16} />}
          >
            В очікуванні
          </Button>
          <Button 
            variant={activeFilter === 'in-progress' ? 'flat' : 'light'} 
            color={activeFilter === 'in-progress' ? 'primary' : 'default'}
            onPress={() => setActiveFilter('in-progress')}
            startContent={<Icon icon="lucide:tool" width={16} />}
          >
            Виконується
          </Button>
          <Button 
            variant={activeFilter === 'waiting-parts' ? 'flat' : 'light'} 
            color={activeFilter === 'waiting-parts' ? 'secondary' : 'default'}
            onPress={() => setActiveFilter('waiting-parts')}
            startContent={<Icon icon="lucide:package" width={16} />}
          >
            Очікує запчастини
          </Button>
          <Button 
            variant={activeFilter === 'completed' ? 'flat' : 'light'} 
            color={activeFilter === 'completed' ? 'success' : 'default'}
            onPress={() => setActiveFilter('completed')}
            startContent={<Icon icon="lucide:check-circle" width={16} />}
          >
            Завершено
          </Button>
          <Button 
            variant={activeFilter === 'delayed' ? 'flat' : 'light'} 
            color={activeFilter === 'delayed' ? 'danger' : 'default'}
            onPress={() => setActiveFilter('delayed')}
            startContent={<Icon icon="lucide:alert-triangle" width={16} />}
          >
            Затримано
          </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Cars in Service</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {filteredCars.map((car) => (
                  <div 
                    key={car.id}
                    className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-default-100 transition-colors ${selectedCar?.id === car.id ? 'bg-default-100' : ''}`}
                    onClick={() => setSelectedCar(car)}
                  >
                    <div className="w-16 h-12 overflow-hidden rounded-md">
                      <img 
                        src={car.image} 
                        alt={`${car.make} ${car.model}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{car.make} {car.model}</h3>
                      <p className="text-small text-default-500">{car.licensePlate} • {car.year}</p>
                    </div>
                    <StatusBadge status={car.status} />
                  </div>
                ))}

                {filteredCars.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8">
                    <Icon icon="lucide:car-off" className="text-default-400" width={32} />
                    <p className="mt-2 text-default-500 text-center">No cars found matching your search.</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedCar ? (
            <Card>
              <CardHeader className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedCar.make} {selectedCar.model}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-default-500">{selectedCar.year} • {selectedCar.licensePlate}</p>
                      <StatusBadge status={selectedCar.status} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="flat" color="primary" startContent={<Icon icon="lucide:edit" width={18} />}>
                      Редагувати
                    </Button>
                    <Button variant="light" color="danger" startContent={<Icon icon="lucide:trash" width={18} />}>
                      Видалити
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="mb-6">
                  <img 
                    src={selectedCar.image} 
                    alt={`${selectedCar.make} ${selectedCar.model}`} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <Tabs aria-label="Car details">
                  <Tab key="service-details" title="Ремонт">
                    <div className="py-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-small text-default-500">Категорії</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedCar.serviceType.map((service, index) => (
                              <Chip key={index} variant="flat" size="sm">{service}</Chip>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-small text-default-500">Відповідальний</p>
                          <p className="font-medium">{selectedCar.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-small text-default-500">Статус</p>
                          <StatusBadge status={selectedCar.status} />
                        </div>
                        <div>
                          <p className="text-small text-default-500">Орієнтоване закінчення</p>
                          <p className="font-medium">{new Date(selectedCar.estimatedCompletion).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="owner-info" title="Власник">
                    <div className="py-4">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar src={selectedCar.owner.avatar} size="lg" />
                        <div>
                          <h3 className="font-medium">{selectedCar.owner.name}</h3>
                          <p className="text-small text-default-500">Власник</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:phone" className="text-default-500" width={16} />
                          <p>{selectedCar.owner.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:mail" className="text-default-500" width={16} />
                          <p>{selectedCar.owner.email}</p>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="service-history" title="Сервісна Історія">
                    <div className="py-4">
                      <Table removeWrapper aria-label="Service history">
                        <TableHeader>
                          <TableColumn>ДАТА</TableColumn>
                          <TableColumn>СЕРВІС</TableColumn>
                          <TableColumn>МЕХАНІК</TableColumn>
                          <TableColumn>ВАРТІСТЬ</TableColumn>
                        </TableHeader>
                        <TableBody>
                          {selectedCar.serviceHistory.length > 0 ? (
                            selectedCar.serviceHistory.map((log) => (
                              <TableRow key={log.id} onClick={() => handleServiceLogClick(log)} className="cursor-pointer hover:bg-default-50">
                                <TableCell>{log.date}</TableCell>
                                <TableCell>{log.service}</TableCell>
                                <TableCell>{log.mechanic}</TableCell>
                                <TableCell>{log.cost}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={4} className="text-center text-default-500 py-4">
                                Немає записів сервісної історії.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-default-200 rounded-large">
              <Icon icon="lucide:car" className="text-default-300" width={48} />
              <p className="mt-4 text-default-500">Select a car to view details</p>
            </div>
          )}
        </div>
      </div>
      <ServiceDetailsSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
        serviceLog={selectedServiceLog} 
      />
    </div>
  );
};
