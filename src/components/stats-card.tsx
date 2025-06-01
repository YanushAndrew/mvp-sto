import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, change }) => {
  return (
    <Card className="overflow-visible">
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-small text-default-500">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-semibold">{value}</h3>
              {change && (
                <span className={`text-xs ${change.isPositive ? 'text-success' : 'text-danger'} flex items-center`}>
                  <Icon 
                    icon={change.isPositive ? 'lucide:trending-up' : 'lucide:trending-down'} 
                    className="mr-1" 
                    width={14} 
                  />
                  {change.value}%
                </span>
              )}
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-lg bg-${color}-100`}
          >
            <Icon icon={icon} className={`text-${color}-500`} width={24} />
          </motion.div>
        </div>
      </CardBody>
    </Card>
  );
};