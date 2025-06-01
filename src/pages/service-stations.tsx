import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Divider, Button, Input, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ServiceStation {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  capacity: number;
  activeRepairs: number;
  specializations: string[];
  image: string;
}

export const ServiceStations: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const serviceStations: ServiceStation[] = [
    {
      id: 'station-1',
      name: 'Downtown Service Center',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      email: 'service@downtown.com',
      openingHours: {
        weekdays: '8:00 AM - 6:00 PM',
        weekends: '9:00 AM - 5:00 PM'
      },
      capacity: 15,
      activeRepairs: 12,
      specializations: ['European Cars', 'Electric Vehicles', 'Hybrid Vehicles'],
      image: 'https://img.heroui.chat/image/places?w=800&h=400&u=1'
    },
    {
      id: 'station-2',
      name: 'Westside Auto Shop',
      address: '456 West Ave, Westside',
      phone: '(555) 234-5678',
      email: 'service@westside.com',
      openingHours: {
        weekdays: '7:30 AM - 7:00 PM',
        weekends: '8:00 AM - 4:00 PM'
      },
      capacity: 10,
      activeRepairs: 8,
      specializations: ['American Cars', 'Trucks', 'SUVs'],
      image: 'https://img.heroui.chat/image/places?w=800&h=400&u=2'
    },
    {
      id: 'station-3',
      name: 'Northside Mechanics',
      address: '789 North Blvd, Northside',
      phone: '(555) 345-6789',
      email: 'service@northside.com',
      openingHours: {
        weekdays: '8:00 AM - 6:30 PM',
        weekends: '10:00 AM - 3:00 PM'
      },
      capacity: 8,
      activeRepairs: 4,
      specializations: ['Asian Cars', 'Performance Tuning', 'Custom Modifications'],
      image: 'https://img.heroui.chat/image/places?w=800&h=400&u=3'
    },
    {
      id: 'station-4',
      name: 'Eastside Repair Shop',
      address: '101 East St, Eastside',
      phone: '(555) 456-7890',
      email: 'service@eastside.com',
      openingHours: {
        weekdays: '7:00 AM - 8:00 PM',
        weekends: '8:00 AM - 6:00 PM'
      },
      capacity: 12,
      activeRepairs: 9,
      specializations: ['Luxury Cars', 'Classic Cars', 'Diagnostics'],
      image: 'https://img.heroui.chat/image/places?w=800&h=400&u=4'
    }
  ];

  const filteredStations = serviceStations.filter(station => 
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Search service stations..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          startContent={<Icon icon="lucide:search" className="text-default-400" width={18} />}
          className="max-w-md"
        />
        <Button color="primary" startContent={<Icon icon="lucide:plus" width={18} />}>
          Add Service Station
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStations.map((station) => (
          <Card key={station.id} className="overflow-visible">
            <CardHeader className="p-0">
              <img 
                src={station.image} 
                alt={station.name} 
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardBody>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{station.name}</h3>
                <div className="flex items-center gap-1 text-default-500 text-small">
                  <Icon icon="lucide:car" width={16} />
                  <span>{station.activeRepairs}/{station.capacity}</span>
                </div>
              </div>
              
              <p className="text-default-500 flex items-center mt-2">
                <Icon icon="lucide:map-pin" className="mr-1" width={16} />
                {station.address}
              </p>

              <Tabs aria-label="Station details" className="mt-4">
                <Tab key="contact" title="Contact">
                  <div className="py-2 space-y-2">
                    <p className="flex items-center text-small">
                      <Icon icon="lucide:phone" className="mr-2" width={16} />
                      {station.phone}
                    </p>
                    <p className="flex items-center text-small">
                      <Icon icon="lucide:mail" className="mr-2" width={16} />
                      {station.email}
                    </p>
                  </div>
                </Tab>
                <Tab key="hours" title="Hours">
                  <div className="py-2 space-y-2">
                    <p className="flex items-center text-small">
                      <Icon icon="lucide:calendar" className="mr-2" width={16} />
                      <span className="font-medium">Weekdays:</span>
                      <span className="ml-2">{station.openingHours.weekdays}</span>
                    </p>
                    <p className="flex items-center text-small">
                      <Icon icon="lucide:calendar" className="mr-2" width={16} />
                      <span className="font-medium">Weekends:</span>
                      <span className="ml-2">{station.openingHours.weekends}</span>
                    </p>
                  </div>
                </Tab>
                <Tab key="specializations" title="Specializations">
                  <div className="py-2 flex flex-wrap gap-1">
                    {station.specializations.map((spec, index) => (
                      <span key={index} className="text-tiny bg-default-100 px-2 py-1 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button variant="flat" color="primary" startContent={<Icon icon="lucide:edit" width={16} />}>
                  Edit
                </Button>
                <Button variant="light" color="primary" startContent={<Icon icon="lucide:info" width={16} />}>
                  Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredStations.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12">
          <Icon icon="lucide:search-x" className="text-default-400" width={48} />
          <p className="mt-4 text-default-500">No service stations found matching your search.</p>
          <Button 
            variant="flat" 
            color="primary" 
            className="mt-4"
            onPress={() => setSearchQuery('')}
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};