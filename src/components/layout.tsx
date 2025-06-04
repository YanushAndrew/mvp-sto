import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { ThemeSwitcher } from './theme-switcher';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Дашборд';
      case '/service-stations':
        return 'СТО';
      case '/employees':
        return 'Працівники';
      case '/cars':
        return 'Авто';
      case '/reports':
        return 'Звіти';
      case '/reviews':
        return 'Відгуки';
      default:
        return 'Дашборд';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden theme-transition">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} onLogout={onLogout} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          maxWidth="full" 
          className="border-b border-divider"
        >
          <NavbarContent className="sm:hidden" justify="start">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Перемкнути бокову панель"
            >
              <Icon icon="lucide:menu" width={24} />
            </Button>
          </NavbarContent>

          <NavbarContent justify="start">
            <NavbarBrand>
              <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem>
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    className="rounded-full"
                    aria-label="Меню користувача"
                  >
                    <Icon icon="lucide:user" width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions">
                  <DropdownItem key="profile">Профіль</DropdownItem>
                  <DropdownItem key="settings">Налаштування</DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={onLogout}>Вийти</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
