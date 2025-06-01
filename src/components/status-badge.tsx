import React from 'react';
import { Badge } from '@heroui/react';

export type RepairStatus = 'pending' | 'in-progress' | 'completed' | 'waiting-parts' | 'delayed';

interface StatusBadgeProps {
  status: RepairStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { color: 'warning', label: 'Pending', icon: 'lucide:clock' };
      case 'in-progress':
        return { color: 'primary', label: 'In Progress', icon: 'lucide:tool' };
      case 'completed':
        return { color: 'success', label: 'Completed', icon: 'lucide:check-circle' };
      case 'waiting-parts':
        return { color: 'secondary', label: 'Waiting Parts', icon: 'lucide:package' };
      case 'delayed':
        return { color: 'danger', label: 'Delayed', icon: 'lucide:alert-triangle' };
      default:
        return { color: 'default', label: 'Unknown', icon: 'lucide:help-circle' };
    }
  };

  const { color, label } = getStatusConfig();

  return (
    <Badge color={color as any} variant="flat">
      {label}
    </Badge>
  );
};