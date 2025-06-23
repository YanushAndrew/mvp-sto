import React from 'react';
import { Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ServicePoint {
  date: string;
  headline: string;
  description: string;
  media?: string[];
}

interface ServiceBlock {
  title: string;
  points: ServicePoint[];
}

export interface ServiceLogDetail {
  id: string;
  date: string;
  service: string;
  mechanic: string;
  cost: string;
  details: ServiceBlock[];
}

interface ServiceDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  serviceLog: ServiceLogDetail | null;
  carStatus: 'pending' | 'in-progress' | 'completed' | 'waiting-parts' | 'delayed' | null;
}

export const ServiceDetailsSidebar: React.FC<ServiceDetailsSidebarProps> = ({ isOpen, onClose, serviceLog, carStatus }) => {
  if (!isOpen || !serviceLog) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-default-50 shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="flex items-center justify-between p-4 border-b border-default-200 dark:border-default-100">
        <h2 className="text-xl font-semibold">Деталі Сервісу</h2>
        <Button isIconOnly variant="light" onPress={onClose}>
          <Icon icon="lucide:x" width={24} />
        </Button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-65px)]"> {/* Adjust height based on header */}
        <p className="text-sm text-default-500 mb-1">Дата: {serviceLog.date}</p>
        <h3 className="text-lg font-bold mb-2">{serviceLog.service}</h3>
        <p className="text-default-600 mb-4">Механік: {serviceLog.mechanic} | Вартість: {serviceLog.cost}</p>
        
        <Divider className="my-4" />

        {serviceLog.details.map((block, blockIndex) => (
          <div key={blockIndex} className="mb-6">
            <h4 className="text-md font-semibold mb-3">{block.title}</h4>
            {block.points.map((point, pointIndex) => (
              <div 
                key={pointIndex} 
                className={`mb-4 p-3 rounded-lg ${
                  (carStatus === 'in-progress' || carStatus === 'pending' || carStatus === 'waiting-parts' || carStatus === 'delayed') && pointIndex === 0 
                    ? 'bg-blue-50 dark:bg-blue-950' 
                    : 'bg-default-100 dark:bg-default-100'
                }`}
              >
                <p className="text-xs text-default-500 mb-1">{point.date}</p>
                <h5 className="font-medium mb-1">{point.headline}</h5>
                <p className="text-sm text-default-700 dark:text-default-600">{point.description}</p>
                {point.media && point.media.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {point.media.map((src, mediaIndex) => (
                      <img key={mediaIndex} src={src} alt={`Media ${mediaIndex + 1}`} className="w-full h-24 object-cover rounded-md" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
