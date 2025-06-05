import React from 'react';
import { Card, CardBody, CardHeader, Divider, Avatar, Tabs, Tab, Accordion, AccordionItem, Image } from '@heroui/react';
import { Icon } from '@iconify/react';

interface Report {
  id: string;
  carId: string;
  carInfo: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    image: string;
  };
  mechanic: {
    name: string;
    avatar: string;
  };
  date: string;
  updates: {
    time: string;
    description: string;
    images?: string[];
  }[];
}

export const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = React.useState<Report | null>(null);
  
  const reports: Report[] = [
    {
      id: 'report-1',
      carId: 'CAR-1234',
      carInfo: {
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        licensePlate: 'ABC-1234',
        image: 'https://img.heroui.chat/image/car?w=800&h=400&u=1'
      },
      mechanic: {
        name: 'John Smith',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1'
      },
      date: '2023-06-14',
      updates: [
        {
          time: '09:15 AM',
          description: 'Первинний огляд завершено. Виявлено проблеми з гальмівними колодками та роторами. Потребують заміни.',
          images: ['https://img.heroui.chat/image/car?w=800&h=600&u=11', 'https://img.heroui.chat/image/car?w=800&h=600&u=12']
        },
        {
          time: '11:30 AM',
          description: 'Замовили заміну гальмівних колодок та роторів. Очікується прибуття завтра.',
        },
        {
          time: '02:45 PM',
          description: 'Заміна оливи та заміна шин за запитом.',
          images: ['https://img.heroui.chat/image/car?w=800&h=600&u=13']
        }
      ]
    },
    {
      id: 'report-2',
      carId: 'CAR-2345',
      carInfo: {
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        licensePlate: 'DEF-5678',
        image: 'https://img.heroui.chat/image/car?w=800&h=400&u=2'
      },
      mechanic: {
        name: 'Mike Johnson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3'
      },
      date: '2023-06-13',
      updates: [
        {
          time: '08:30 AM',
          description: 'Diagnosed engine misfire. Found faulty ignition coil on cylinder 2.',
          images: ['https://img.heroui.chat/image/car?w=800&h=600&u=21']
        },
        {
          time: '10:15 AM',
          description: 'Ordered replacement ignition coil. Currently waiting for parts.',
        },
        {
          time: '03:30 PM',
          description: 'Performed diagnostic scan to check for additional issues. None found.',
          images: ['https://img.heroui.chat/image/car?w=800&h=600&u=22', 'https://img.heroui.chat/image/car?w=800&h=600&u=23']
        }
      ]
    },
    {
      id: 'report-3',
      carId: 'CAR-3456',
      carInfo: {
        make: 'Ford',
        model: 'F-150',
        year: 2019,
        licensePlate: 'GHI-9012',
        image: 'https://img.heroui.chat/image/car?w=800&h=400&u=3'
      },
      mechanic: {
        name: 'Sarah Williams',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2'
      },
      date: '2023-06-12',
      updates: [
        {
          time: '09:00 AM',
          description: 'Completed transmission fluid flush and filter replacement.',
          images: ['https://img.heroui.chat/image/car?w=800&h=600&u=31']
        },
        {
          time: '11:45 AM',
          description: 'Inspected cooling system. Replaced thermostat and coolant.',
          images: ['https://img.heroui.chat/image/car?w=800&h=600&u=32']
        },
        {
          time: '02:30 PM',
          description: 'Final inspection completed. Vehicle ready for pickup.',
        }
      ]
    }
  ];

  React.useEffect(() => {
    if (reports.length > 0 && !selectedReport) {
      setSelectedReport(reports[0]);
    }
  }, [reports, selectedReport]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Recent Reports</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {reports.map((report) => (
                  <div 
                    key={report.id}
                    className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-default-100 transition-colors ${selectedReport?.id === report.id ? 'bg-default-100' : ''}`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="w-16 h-12 overflow-hidden rounded-md">
                      <img 
                        src={report.carInfo.image} 
                        alt={`${report.carInfo.make} ${report.carInfo.model}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{report.carInfo.make} {report.carInfo.model}</h3>
                      <p className="text-small text-default-500">
                        {report.carInfo.licensePlate} • {new Date(report.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Avatar src={report.mechanic.avatar} size="sm" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedReport ? (
            <Card>
              <CardHeader className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedReport.carInfo.make} {selectedReport.carInfo.model}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-default-500">
                        {selectedReport.carInfo.year} • {selectedReport.carInfo.licensePlate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar src={selectedReport.mechanic.avatar} size="sm" />
                    <span>{selectedReport.mechanic.name}</span>
                  </div>
                </div>
                <p className="text-small text-default-500">
                  Report Date: {new Date(selectedReport.date).toLocaleDateString()}
                </p>
              </CardHeader>
              <Divider />
              <CardBody>
                <Tabs aria-label="Report details">
                  <Tab key="updates" title="Звітність">
                    <div className="py-4">
                      <div className="space-y-6">
                        {selectedReport.updates.map((update, index) => (
                          <div key={index} className="relative pl-6 border-l-2 border-default-200">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500"></div>
                            <div className="mb-2">
                              <span className="text-small font-medium">{update.time}</span>
                            </div>
                            <p className="mb-3">{update.description}</p>
                            {update.images && update.images.length > 0 && (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                {update.images.map((image, imgIndex) => (
                                  <div key={imgIndex} className="relative aspect-square overflow-hidden rounded-md">
                                    <Image
                                      src={image}
                                      alt={`Service update ${index + 1} image ${imgIndex + 1}`}
                                      className="object-cover w-full h-full"
                                      removeWrapper
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab>
                  <Tab key="summary" title="Агенда">
                    <div className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-medium font-semibold">Service Overview</h3>
                          <p className="mt-1">
                            This report contains {selectedReport.updates.length} service updates performed on {new Date(selectedReport.date).toLocaleDateString()}.
                          </p>
                        </div>
                        
                        
                        <div>
                          <h3 className="text-medium font-semibold">Services Performed</h3>
                          <ul className="mt-1 space-y-1">
                            {selectedReport.updates.map((update, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Icon icon="lucide:check" className="text-success" width={16} />
                                <span>{update.description.split('.')[0]}.</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-medium font-semibold">Mechanic Notes</h3>
                          <p className="mt-1">
                            All services were performed according to manufacturer specifications. 
                            The vehicle is operating within normal parameters.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  <Tab key="images" title="Зображення">
                    <div className="py-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedReport.updates.flatMap((update, updateIndex) => 
                          update.images ? update.images.map((image, imgIndex) => (
                            <div key={`Service image ${updateIndex}-${imgIndex}`} className="relative aspect-square overflow-hidden rounded-md">
                              <Image
                                src={image}
                                alt={`Service image ${updateIndex + 1}-${imgIndex + 1}`}
                                className="object-cover w-full h-full"
                                removeWrapper
                              />
                            </div>
                          )) : []
                        )}
                      </div>
                      {selectedReport.updates.flatMap(update => update.images || []).length === 0 && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <Icon icon="lucide:image-off" className="text-default-400" width={32} />
                          <p className="mt-2 text-default-500">No images available for this report.</p>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          ) : (
            <Card className="flex items-center justify-center h-full">
              <CardBody className="text-center text-default-500">
                Select a report to view details
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
