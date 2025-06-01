import React from 'react';
import { Card, CardBody, CardHeader, Divider, Progress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Icon } from '@iconify/react';
import { StatsCard } from '../components/stats-card';
import { StatusBadge } from '../components/status-badge';

export const Dashboard: React.FC = () => {
  // Sample data for dashboard
  const stats = [
    { title: 'Active Repairs', value: 24, icon: 'lucide:wrench', color: 'primary', change: { value: 12, isPositive: true } },
    { title: 'Completed Today', value: 8, icon: 'lucide:check-circle', color: 'success', change: { value: 5, isPositive: true } },
    { title: 'Waiting for Parts', value: 6, icon: 'lucide:package', color: 'warning', change: { value: 2, isPositive: false } },
    { title: 'Delayed Repairs', value: 3, icon: 'lucide:alert-triangle', color: 'danger', change: { value: 1, isPositive: false } },
  ];

  const recentCars = [
    { id: 'CAR-1234', make: 'Toyota', model: 'Camry', year: 2020, status: 'in-progress', mechanic: 'John Smith' },
    { id: 'CAR-2345', make: 'Honda', model: 'Civic', year: 2021, status: 'waiting-parts', mechanic: 'Mike Johnson' },
    { id: 'CAR-3456', make: 'Ford', model: 'F-150', year: 2019, status: 'completed', mechanic: 'Sarah Williams' },
    { id: 'CAR-4567', make: 'BMW', model: '3 Series', year: 2022, status: 'pending', mechanic: 'Robert Brown' },
    { id: 'CAR-5678', make: 'Tesla', model: 'Model 3', year: 2023, status: 'delayed', mechanic: 'Emily Davis' },
  ];

  const serviceStations = [
    { name: 'Downtown Service Center', address: '123 Main St', activeRepairs: 12, capacity: 15 },
    { name: 'Westside Auto Shop', address: '456 West Ave', activeRepairs: 8, capacity: 10 },
    { name: 'Northside Mechanics', address: '789 North Blvd', activeRepairs: 4, capacity: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between">
            <h2 className="text-lg font-semibold">Recent Cars</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <Table removeWrapper aria-label="Recent cars in service">
              <TableHeader>
                <TableColumn>CAR ID</TableColumn>
                <TableColumn>MAKE & MODEL</TableColumn>
                <TableColumn>MECHANIC</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {recentCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>{car.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{car.make} {car.model}</p>
                        <p className="text-tiny text-default-500">{car.year}</p>
                      </div>
                    </TableCell>
                    <TableCell>{car.mechanic}</TableCell>
                    <TableCell>
                      <StatusBadge status={car.status as any} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Service Stations</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              {serviceStations.map((station, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{station.name}</h3>
                      <p className="text-tiny text-default-500 flex items-center">
                        <Icon icon="lucide:map-pin" className="mr-1" width={12} />
                        {station.address}
                      </p>
                    </div>
                    <span className="text-small font-medium">
                      {station.activeRepairs}/{station.capacity}
                    </span>
                  </div>
                  <Progress 
                    value={(station.activeRepairs / station.capacity) * 100} 
                    color={station.activeRepairs / station.capacity > 0.8 ? "warning" : "primary"}
                    size="sm"
                    aria-label={`${station.name} capacity`}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};