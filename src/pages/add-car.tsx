import React, { useState } from 'react';
import { Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Avatar, Chip, Card, CardBody, CardHeader, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';

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

interface ServiceHistoryEntry {
  date: string;
  service: string;
  mechanic: string;
  cost: string;
}

const serviceTemplates: { [key: string]: string[] } = {
  '': ['Виберіть шаблон обслуговування'],
  'Шаблон 1: Заміна масла': ['Перевірка рівня масла', 'Заміна масляного фільтра', 'Заміна масла'],
  'Шаблон 2: Планове ТО': ['Перевірка гальмівної системи', 'Заміна повітряного фільтра', 'Перевірка рідин', 'Діагностика ходової'],
  'Шаблон 3: Ремонт двигуна': ['Діагностика двигуна', 'Заміна свічок запалювання', 'Перевірка компресії'],
};

const AddCar: React.FC = () => {
  const [vin, setVin] = useState<string>(''); // Revert to empty string
  const [carInfo, setCarInfo] = useState<CarInfo | null>(null);
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo | null>(null);
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryEntry[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [todoList, setTodoList] = useState<string[]>([]);
  const [purchaseDetails, setPurchaseDetails] = useState<string>('');

  const handleVinCheck = () => {
    console.log('handleVinCheck called. Current VIN:', vin); // Debug log
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
      const newServiceHistory = [
        { date: '2023-05-15', service: 'Заміна масла', mechanic: 'Олег Коваль', cost: '1500 грн' },
        { date: '2023-03-10', service: 'Діагностика ходової', mechanic: 'Сергій Іванов', cost: '800 грн' },
      ];

      setCarInfo(newCarInfo);
      setOwnerInfo(newOwnerInfo);
      setServiceHistory(newServiceHistory);
      console.log('VIN matched. Car Info:', newCarInfo, 'Owner Info:', newOwnerInfo, 'Service History:', newServiceHistory); // Debug log
    } else {
      setCarInfo(null);
      setOwnerInfo(null);
      setServiceHistory([]);
      alert('VIN код не знайдено. Спробуйте "TESTVIN123"');
      console.log('VIN not matched. Cleared car and owner info.'); // Debug log
    }
  };

  React.useEffect(() => {
    console.log('Selected template changed:', selectedTemplate); // Debug log
    setTodoList(serviceTemplates[selectedTemplate] || []);
    console.log('To-Do List updated:', serviceTemplates[selectedTemplate] || []); // Debug log
  }, [selectedTemplate]);

  // Removed temporary useEffect to trigger VIN check on mount for testing
  // React.useEffect(() => {
  //   handleVinCheck();
  // }, []); 

  const handleSubmit = () => {
    console.log({
      vin,
      carInfo,
      ownerInfo,
      serviceHistory,
      selectedTemplate,
      todoList,
      purchaseDetails,
    });
    alert('Інформація про авто збережена!');
    // Here you would typically send data to a backend
  };

  return (
    <div className="p-6 space-y-6">
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
                {serviceHistory.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.service}</TableCell>
                    <TableCell>{entry.mechanic}</TableCell>
                    <TableCell>{entry.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}

      {/* Service Template Area */}
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-700">Шаблони обслуговування</h2>
        </CardHeader>
        <Divider />
        <CardBody className="p-4">
          <select 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Виберіть шаблон</option>
            {Object.keys(serviceTemplates).filter(key => key !== '').map((templateName) => (
              <option key={templateName} value={templateName}>{templateName}</option>
            ))}
          </select>
        </CardBody>
      </Card>

      {/* To-Do List for Service */}
      {todoList.length > 0 && (
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-700">Список завдань для обслуговування</h2>
          </CardHeader>
          <Divider />
          <CardBody className="p-4">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {todoList.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
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
  );
};

export default AddCar;
