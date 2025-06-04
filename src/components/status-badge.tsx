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
        return { color: 'warning', label: 'В очікуванні', icon: 'lucide:clock' };
      case 'in-progress':
        return { color: 'primary', label: 'Виконується', icon: 'lucide:tool' };
      case 'completed':
        return { color: 'success', label: 'Завершено', icon: 'lucide:check-circle' };
      case 'waiting-parts':
        return { color: 'secondary', label: 'Очікує запчастини', icon: 'lucide:package' };
      case 'delayed':
        return { color: 'danger', label: 'Затримано', icon: 'lucide:alert-triangle' };
      default:
        return { color: 'default', label: 'Невідомо', icon: 'lucide:help-circle' };
    }
  };

  const { color, label } = getStatusConfig();

  return (
    <Badge color={color as any} variant="flat">
      {label}
    </Badge>
  );
};
