import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, onLogout }) => {
  const location = useLocation();
  const history = useHistory();
  
  const navItems: NavItem[] = [
    { path: '/', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
    { path: '/service-stations', label: 'Service Stations', icon: 'lucide:building' },
    { path: '/employees', label: 'Employees', icon: 'lucide:users' },
    { path: '/cars', label: 'Cars', icon: 'lucide:car' },
    { path: '/reports', label: 'Reports', icon: 'lucide:clipboard-list' },
    { path: '/reviews', label: 'Reviews', icon: 'lucide:message-square' },
  ];

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  return (
    <motion.aside
      initial={{ width: isOpen ? 240 : 64 }}
      animate={{ width: isOpen ? 240 : 64 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="border-r border-divider h-screen overflow-y-auto flex flex-col bg-content1 z-10"
    >
      <div className="p-4 flex items-center justify-between border-b border-divider">
        {isOpen ? (
          <h1 className="text-xl font-bold">Car Service</h1>
        ) : (
          <div className="w-full flex justify-center">
            <Icon icon="lucide:car" width={24} />
          </div>
        )}
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onToggle}
          className="hidden sm:flex"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Icon icon={isOpen ? "lucide:chevron-left" : "lucide:chevron-right"} width={18} />
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="px-2">
                <Button
                  variant={isActive ? "flat" : "light"}
                  color={isActive ? "primary" : "default"}
                  className={`w-full justify-start ${isOpen ? '' : 'justify-center'}`}
                  startContent={isOpen ? <Icon icon={item.icon} width={20} /> : undefined}
                  isIconOnly={!isOpen}
                  onPress={() => handleNavigation(item.path)}
                >
                  {!isOpen ? (
                    <Icon icon={item.icon} width={20} />
                  ) : (
                    item.label
                  )}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-divider">
        <Button
          variant="light"
          className={`w-full justify-start ${isOpen ? '' : 'justify-center'}`}
          startContent={isOpen ? <Icon icon="lucide:log-out" width={20} /> : undefined}
          isIconOnly={!isOpen}
          onPress={onLogout}
        >
          {!isOpen ? (
            <Icon icon="lucide:log-out" width={20} />
          ) : (
            "Logout"
          )}
        </Button>
      </div>
    </motion.aside>
  );
};
