import React, { useState } from 'react';
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import CustomSelect from '../components/custom-select';
import { ServiceDetailsSidebar, ServiceLogDetail } from '../components/ServiceDetailsSidebar';

type CarStatus = 'pending' | 'in-progress' | 'completed' | 'waiting-parts' | 'delayed';

interface CarInfo {
  photo: string;
  brand: string;
  model: string;
  year: number;
}

interface OwnerInfo {
  fullName: string;
  contact: string;
  email: string;
}

// Update ServiceHistoryEntry to match ServiceLogDetail structure
interface ServiceHistoryEntry extends ServiceLogDetail {}

interface ServiceTemplateStep {
  name: string;
  description?: string;
}

interface ServiceTemplate {
  name: string;
  steps: ServiceTemplateStep[];
}

const serviceTemplates: ServiceTemplate[] = [
  {
    name: 'Виберіть шаблон обслуговування',
    steps: [],
  },
  {
    name: 'Шаблон 1: Заміна масла',
    steps: [
      { name: 'Analysis/Diagnostics', description: 'Перевірка рівня масла та загального стану двигуна.' },
      { name: 'Disassembly', description: 'Зняття масляного фільтра та злив старого масла.' },
      { name: 'Installation', description: 'Встановлення нового масляного фільтра та заливка свіжого масла.' },
      { name: 'Adjustment/Calibration', description: 'Перевірка та корекція рівня масла.' },
      { name: 'Testing', description: 'Запуск двигуна та перевірка на витоки.' },
      { name: 'Completion/Documentation', description: 'Запис про заміну масла в сервісну історію.' },
    ],
  },
  {
    name: 'Шаблон 2: Планове ТО',
    steps: [
      { name: 'Analysis/Diagnostics', description: 'Комплексна діагностика всіх систем автомобіля.' },
      { name: 'Disassembly', description: 'Зняття повітряного фільтра, перевірка гальмівних колодок.' },
      { name: 'Installation', description: 'Встановлення нового повітряного фільтра.' },
      { name: 'Adjustment/Calibration', description: 'Регулювання гальмівної системи, перевірка тиску в шинах.' },
      { name: 'Testing', description: 'Тестова поїздка, перевірка роботи всіх систем.' },
      { name: 'Completion/Documentation', description: 'Оформлення акту виконаних робіт.' },
    ],
  },
  {
    name: 'Шаблон 3: Ремонт двигуна',
    steps: [
      { name: 'Analysis/Diagnostics', description: 'Діагностика двигуна для виявлення несправностей.' },
      { name: 'Disassembly', description: 'Розбирання двигуна, зняття пошкоджених компонентів.' },
      { name: 'Installation', description: 'Встановлення нових або відремонтованих деталей двигуна.' },
      { name: 'Adjustment/Calibration', description: 'Налаштування параметрів двигуна.' },
      { name: 'Testing', description: 'Тестування двигуна на стенді та в реальних умовах.' },
      { name: 'Completion/Documentation', description: 'Документування всіх етапів ремонту.' },
    ],
  },
];

const AddCar: React.FC = () => {
  const [vin, setVin] = useState<string>('');
  const [carInfo, setCarInfo] = useState<CarInfo | null>(null);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null);
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryEntry[]>([]);
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>('Виберіть шаблон обслуговування');
  const [selectedTemplateDetails, setSelectedTemplateDetails] = useState<ServiceTemplate | null>(null);
  const [purchaseDetails, setPurchaseDetails] = useState<string>('');
  const [isCustomSelectOpen, setIsCustomSelectOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar
  const [selectedServiceLog, setSelectedServiceLog] = useState<ServiceLogDetail | null>(null); // New state for selected log
  const [carStatus, setCarStatus] = useState<CarStatus | null>(null); // New state for car status

  const handleServiceLogClick = (log: ServiceLogDetail) => {
    setSelectedServiceLog(log);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedServiceLog(null);
  };

  const handleVinCheck = () => {
    console.log('handleVinCheck called. Current VIN:', vin);
    // Simulate VIN check and data loading
    if (vin === 'TESTVIN123') {
      const newCarInfo = {
        photo: 'https://img.heroui.chat/image/car?w=800&h=400&u=1',
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
      };
      const newOwnerInfo = {
        fullName: 'Іван Петренко',
        contact: '+380 50 123 4567',
        email: 'ivan.petrenko@example.com',
      };
      const newServiceHistory: ServiceHistoryEntry[] = [
        {
          id: 'add-log-001',
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
          id: 'add-log-002',
          date: '2023-03-10',
          service: 'Діагностика ходової',
          mechanic: 'Сергій Іванов',
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
      ];

      setCarInfo(newCarInfo);
      setOwnerInfo(newOwnerInfo);
      setServiceHistory(newServiceHistory);
      setCarStatus('in-progress'); // Set to 'in-progress' for demonstration purposes
      console.log('VIN matched. Car Info:', newCarInfo, 'Owner Info:', newOwnerInfo, 'Service History:', newServiceHistory);
    } else {
      setCarInfo(null);
      setOwnerInfo(null);
      setServiceHistory([]);
      alert('VIN код не знайдено. Спробуйте "TESTVIN123"');
      console.log('VIN not matched. Cleared car and owner info.');
    }
  };

  React.useEffect(() => {
    console.log('Selected template name changed:', selectedTemplateName);
    const template = serviceTemplates.find(t => t.name === selectedTemplateName);
    setSelectedTemplateDetails(template || null);
    console.log('Selected template details updated:', template || null);
  }, [selectedTemplateName]);

  const handleSubmit = () => {
    console.log({
      vin,
      carInfo,
      ownerInfo,
      serviceHistory,
      selectedTemplateName,
      selectedTemplateDetails,
      purchaseDetails,
    });
    alert('Інформація про авто збережена!');
    // Here you would typically send data to a backend
  };

  return (
    <div className="p-6 space-y-6 lg:grid lg:grid-cols-3 lg:gap-6">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Додати нове авто</h1>

        {/* VIN Input Area */}
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-700">VIN Код</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Input
                type="text"
                placeholder="Введіть VIN код"
                value={vin}
                onValueChange={setVin}
                className="flex-grow"
                startContent={<Icon icon="lucide:barcode" width={20} className="text-default-400" />}
              />
              <Button 
                color="primary" 
                onPress={handleVinCheck}
                startContent={<Icon icon="lucide:check-circle" width={20} />}
              >
                Перевірити
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Auto Information Block */}
        {carInfo && (
          <Card className="shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-700">Інформація про авто</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-48 h-32 overflow-hidden rounded-md flex-shrink-0">
                  <img 
                    src={carInfo.photo} 
                    alt="Car Photo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-lg"><strong>Марка:</strong> <span className="text-gray-700">{carInfo.brand}</span></p>
                  <p className="text-lg"><strong>Модель:</strong> <span className="text-gray-700">{carInfo.model}</span></p>
                  <p className="text-lg"><strong>Рік:</strong> <span className="text-gray-700">{carInfo.year}</span></p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Auto Owner Information */}
        {ownerInfo && (
          <Card className="shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-700">Інформація про власника</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:user" className="text-default-500" width={20} />
                  <p className="text-lg">{ownerInfo.fullName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:phone" className="text-default-500" width={20} />
                  <p className="text-lg">{ownerInfo.contact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:mail" className="text-default-500" width={20} />
                  <p className="text-lg">{ownerInfo.email}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Service History Section */}
        {serviceHistory.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-700">Історія обслуговування</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <Table removeWrapper aria-label="Service history">
                <TableHeader>
                  <TableColumn>ДАТА</TableColumn>
                  <TableColumn>СЕРВІС</TableColumn>
                  <TableColumn>МЕХАНІК</TableColumn>
                  <TableColumn>ВАРТІСТЬ</TableColumn>
                </TableHeader>
                <TableBody>
                  {serviceHistory.length > 0 ? (
                    serviceHistory.map((entry) => (
                      <TableRow key={entry.id} onClick={() => handleServiceLogClick(entry)} className="cursor-pointer hover:bg-default-50">
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.service}</TableCell>
                        <TableCell>{entry.mechanic}</TableCell>
                        <TableCell>{entry.cost}</TableCell>
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
            </CardBody>
          </Card>
        )}

        {/* Purchase Details Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-700">Деталі покупки запчастин/матеріалів</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-4">
            <textarea
              placeholder="Введіть деталі покупки (наприклад, назва запчастини, кількість, ціна)"
              rows={6}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              value={purchaseDetails}
              onChange={(e) => setPurchaseDetails(e.target.value)}
            ></textarea>
          </CardBody>
        </Card>

        {/* Submit Button */}
        <div className="text-right pt-4">
          <Button 
            color="success" 
            size="lg" 
            onPress={handleSubmit}
            startContent={<Icon icon="lucide:save" width={24} />}
          >
            Зберегти авто
          </Button>
        </div>
      </div>

      {/* New Service Template Column */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="shadow-sm h-full">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-700">Шаблони обслуговування</h2>
          </CardHeader>
          <Divider />
          <CardBody
            className="p-4 overflow-hidden transition-all duration-500 ease-in-out"
            data-locator="D:\!mvp-sto\proj\src\pages\add-car.tsx:div:284:6"
          >
            <CustomSelect
              options={serviceTemplates.map(template => ({ value: template.name, label: template.name }))}
              value={selectedTemplateName}
              onChange={setSelectedTemplateName}
              placeholder="Виберіть шаблон"
              className="w-full"
              onOpenChange={setIsCustomSelectOpen}
            />

            {selectedTemplateDetails && selectedTemplateDetails.steps.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Структура шаблону:</h3>
                <ol className="relative border-s border-gray-200 dark:border-gray-700 ml-4">                  
                  {selectedTemplateDetails.steps.map((step, index) => (
                    <li key={index} className="mb-6 ms-6">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <Icon icon="lucide:check" className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                      </span>
                      <h4 className="flex items-center mb-1 text-md font-semibold text-gray-900 dark:text-white">{step.name}</h4>
                      {step.description && <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{step.description}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
      <ServiceDetailsSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
        serviceLog={selectedServiceLog}
        carStatus={carStatus}
      />
    </div>
  );
};

export default AddCar;
